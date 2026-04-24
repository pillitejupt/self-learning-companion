import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import QuizTypes "../types/quiz";
import QuizLib "../lib/quiz";

mixin (
  accessControlState : AccessControl.AccessControlState,
  quizzes : Map.Map<Common.QuizId, QuizTypes.Quiz>,
  quizAttempts : Map.Map<Nat, QuizTypes.QuizAttempt>,
) {
  var nextQuizId : Nat = 0;
  var nextAttemptId : Nat = 0;

  public query ({ caller }) func getQuizForTopic(topicId : Common.TopicId) : async ?QuizTypes.Quiz {
    QuizLib.getQuizByTopic(quizzes, topicId)
  };

  public shared ({ caller }) func saveAiGeneratedQuiz(topicId : Common.TopicId, questions : [QuizTypes.QuizQuestion]) : async QuizTypes.Quiz {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    // Replace existing quiz for this topic if present
    switch (QuizLib.getQuizByTopic(quizzes, topicId)) {
      case (?existing) {
        quizzes.remove(existing.id);
      };
      case null {};
    };
    let quiz = QuizLib.saveQuiz(quizzes, nextQuizId, topicId, questions, now);
    nextQuizId += 1;
    quiz
  };

  public shared ({ caller }) func submitQuizAttempt(quizId : Common.QuizId, answers : [Nat]) : async QuizTypes.QuizAttempt {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let quiz = switch (QuizLib.getQuiz(quizzes, quizId)) {
      case (?q) q;
      case null Runtime.trap("Quiz not found");
    };
    let now = Time.now();
    let attempt = QuizLib.submitAttempt(
      quizAttempts,
      nextAttemptId,
      caller,
      quizId,
      quiz.topicId,
      quiz,
      answers,
      now,
    );
    nextAttemptId += 1;
    attempt
  };

  public query ({ caller }) func getMyQuizAttempts() : async [QuizTypes.QuizAttempt] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    QuizLib.getUserAttempts(quizAttempts, caller)
  };

  public query ({ caller }) func getTopicQuizAttempts(topicId : Common.TopicId) : async [QuizTypes.QuizAttempt] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    QuizLib.getTopicAttempts(quizAttempts, caller, topicId)
  };
};
