import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import ProgressTypes "../types/progress";
import QuizTypes "../types/quiz";
import TopicTypes "../types/topic";
import ProgressLib "../lib/progress";
import QuizLib "../lib/quiz";

mixin (
  accessControlState : AccessControl.AccessControlState,
  progressMap : Map.Map<Common.UserId, ProgressTypes.UserProgress>,
  quizAttempts : Map.Map<Nat, QuizTypes.QuizAttempt>,
  topics : Map.Map<Common.TopicId, TopicTypes.Topic>,
) {
  public query ({ caller }) func getMyProgress() : async ?ProgressTypes.UserProgress {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    ProgressLib.getProgress(progressMap, caller)
  };

  public query ({ caller }) func getProgressSummary() : async ProgressTypes.ProgressSummary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let userAttempts = QuizLib.getUserAttempts(quizAttempts, caller);
    ProgressLib.getProgressSummary(progressMap, caller, userAttempts, topics)
  };

  public query ({ caller }) func getWeakAreas() : async [ProgressTypes.WeakArea] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let userAttempts = QuizLib.getUserAttempts(quizAttempts, caller);
    ProgressLib.getWeakAreas(userAttempts, topics)
  };
};
