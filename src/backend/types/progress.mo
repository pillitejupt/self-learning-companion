import Common "common";

module {
  public type WeakArea = {
    topicId : Common.TopicId;
    topicTitle : Text;
    averageAccuracy : Nat;
    attemptCount : Nat;
  };

  public type UserProgress = {
    userId : Common.UserId;
    totalPoints : Nat;
    badges : [Common.Badge];
    topicsCompleted : [Common.TopicId];
    currentStreak : Nat;
    longestStreak : Nat;
    lastActivityAt : Common.Timestamp;
  };

  public type ProgressSummary = {
    totalPoints : Nat;
    badges : [Common.Badge];
    topicsCompletedCount : Nat;
    quizAttemptCount : Nat;
    averageAccuracy : Nat;
    weakAreas : [WeakArea];
    currentStreak : Nat;
  };
};
