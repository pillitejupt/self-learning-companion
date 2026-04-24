import Common "common";

module {
  public type QuizOption = {
    id : Nat;
    text : Text;
  };

  public type QuizQuestion = {
    id : Nat;
    question : Text;
    options : [QuizOption];
    correctOptionId : Nat;
    explanation : Text;
  };

  public type Quiz = {
    id : Common.QuizId;
    topicId : Common.TopicId;
    questions : [QuizQuestion];
    createdAt : Common.Timestamp;
  };

  public type QuizAttempt = {
    id : Nat;
    userId : Common.UserId;
    quizId : Common.QuizId;
    topicId : Common.TopicId;
    answers : [Nat];
    score : Nat;
    totalQuestions : Nat;
    accuracy : Nat;
    pointsEarned : Nat;
    completedAt : Common.Timestamp;
  };
};
