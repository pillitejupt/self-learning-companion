import Map "mo:core/Map";
import Types "../types/quiz";
import Common "../types/common";

module {
  public func getQuiz(
    quizzes : Map.Map<Common.QuizId, Types.Quiz>,
    quizId : Common.QuizId,
  ) : ?Types.Quiz {
    quizzes.get(quizId)
  };

  public func getQuizByTopic(
    quizzes : Map.Map<Common.QuizId, Types.Quiz>,
    topicId : Common.TopicId,
  ) : ?Types.Quiz {
    for ((_, quiz) in quizzes.entries()) {
      if (quiz.topicId == topicId) {
        return ?quiz;
      };
    };
    null
  };

  public func saveQuiz(
    quizzes : Map.Map<Common.QuizId, Types.Quiz>,
    nextId : Nat,
    topicId : Common.TopicId,
    questions : [Types.QuizQuestion],
    now : Common.Timestamp,
  ) : Types.Quiz {
    let quiz : Types.Quiz = {
      id = nextId;
      topicId;
      questions;
      createdAt = now;
    };
    quizzes.add(nextId, quiz);
    quiz
  };

  public func submitAttempt(
    attempts : Map.Map<Nat, Types.QuizAttempt>,
    nextId : Nat,
    userId : Common.UserId,
    quizId : Common.QuizId,
    topicId : Common.TopicId,
    quiz : Types.Quiz,
    answers : [Nat],
    now : Common.Timestamp,
  ) : Types.QuizAttempt {
    let totalQuestions = quiz.questions.size();
    // Count correct answers
    var correct = 0;
    for (i in quiz.questions.keys()) {
      if (i < answers.size()) {
        let question = quiz.questions[i];
        if (answers[i] == question.correctOptionId) {
          correct += 1;
        };
      };
    };
    let accuracy = if (totalQuestions == 0) 0 else (correct * 100) / totalQuestions;
    // Base points: 5 per quiz attempt + bonus 5 for >85% accuracy
    let basePoints = 5;
    let bonusPoints = if (accuracy > 85) 5 else 0;
    let pointsEarned = basePoints + bonusPoints;

    let attempt : Types.QuizAttempt = {
      id = nextId;
      userId;
      quizId;
      topicId;
      answers;
      score = correct;
      totalQuestions;
      accuracy;
      pointsEarned;
      completedAt = now;
    };
    attempts.add(nextId, attempt);
    attempt
  };

  public func getUserAttempts(
    attempts : Map.Map<Nat, Types.QuizAttempt>,
    userId : Common.UserId,
  ) : [Types.QuizAttempt] {
    attempts.values().filter(func(a) { a.userId == userId }).toArray()
  };

  public func getTopicAttempts(
    attempts : Map.Map<Nat, Types.QuizAttempt>,
    userId : Common.UserId,
    topicId : Common.TopicId,
  ) : [Types.QuizAttempt] {
    attempts.values().filter(func(a) { a.userId == userId and a.topicId == topicId }).toArray()
  };
};
