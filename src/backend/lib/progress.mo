import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/progress";
import Common "../types/common";
import QuizTypes "../types/quiz";
import TopicTypes "../types/topic";

module {
  public func getProgress(
    progressMap : Map.Map<Common.UserId, Types.UserProgress>,
    userId : Common.UserId,
  ) : ?Types.UserProgress {
    progressMap.get(userId)
  };

  public func initProgress(
    progressMap : Map.Map<Common.UserId, Types.UserProgress>,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Types.UserProgress {
    let progress : Types.UserProgress = {
      userId;
      totalPoints = 0;
      badges = [];
      topicsCompleted = [];
      currentStreak = 0;
      longestStreak = 0;
      lastActivityAt = now;
    };
    progressMap.add(userId, progress);
    progress
  };

  func getOrInit(
    progressMap : Map.Map<Common.UserId, Types.UserProgress>,
    userId : Common.UserId,
    now : Common.Timestamp,
  ) : Types.UserProgress {
    switch (progressMap.get(userId)) {
      case (?p) p;
      case null initProgress(progressMap, userId, now);
    }
  };

  // Compute streak: increments if last activity was within ~24h, resets to 1 otherwise
  func computeStreak(progress : Types.UserProgress, now : Common.Timestamp) : Nat {
    let oneDayNs : Int = 86_400_000_000_000;
    let diff = now - progress.lastActivityAt;
    if (diff <= oneDayNs) {
      progress.currentStreak + 1
    } else {
      1
    }
  };

  func hasBadge(badges : [Common.Badge], badge : Common.Badge) : Bool {
    badges.find(func(b) { b == badge }) != null
  };

  func addBadgeIfMissing(badges : [Common.Badge], badge : Common.Badge) : [Common.Badge] {
    if (hasBadge(badges, badge)) badges
    else badges.concat([badge])
  };

  public func awardTopicPoints(
    progressMap : Map.Map<Common.UserId, Types.UserProgress>,
    userId : Common.UserId,
    topicId : Common.TopicId,
    now : Common.Timestamp,
  ) : Nat {
    let progress = getOrInit(progressMap, userId, now);
    let pointsEarned = 10;
    let alreadyCompleted = progress.topicsCompleted.find(func(t) { t == topicId }) != null;
    let newTopicsCompleted = if (alreadyCompleted) {
      progress.topicsCompleted
    } else {
      progress.topicsCompleted.concat([topicId])
    };
    let newStreak = computeStreak(progress, now);
    let updated : Types.UserProgress = {
      progress with
      totalPoints = progress.totalPoints + pointsEarned;
      topicsCompleted = newTopicsCompleted;
      currentStreak = newStreak;
      longestStreak = if (newStreak > progress.longestStreak) newStreak else progress.longestStreak;
      lastActivityAt = now;
    };
    progressMap.add(userId, updated);
    pointsEarned
  };

  public func awardQuizPoints(
    progressMap : Map.Map<Common.UserId, Types.UserProgress>,
    userId : Common.UserId,
    attempt : QuizTypes.QuizAttempt,
    now : Common.Timestamp,
  ) : Nat {
    let progress = getOrInit(progressMap, userId, now);
    let newStreak = computeStreak(progress, now);
    let updated : Types.UserProgress = {
      progress with
      totalPoints = progress.totalPoints + attempt.pointsEarned;
      currentStreak = newStreak;
      longestStreak = if (newStreak > progress.longestStreak) newStreak else progress.longestStreak;
      lastActivityAt = now;
    };
    progressMap.add(userId, updated);
    attempt.pointsEarned
  };

  public func checkAndAwardBadges(
    progressMap : Map.Map<Common.UserId, Types.UserProgress>,
    userId : Common.UserId,
    attempts : [QuizTypes.QuizAttempt],
  ) : () {
    switch (progressMap.get(userId)) {
      case (?progress) {
        var badges = progress.badges;
        // First Steps: completed at least 1 topic
        if (progress.topicsCompleted.size() >= 1) {
          badges := addBadgeIfMissing(badges, #firstSteps);
        };
        // Quiz Master: attempted at least 5 quizzes
        if (attempts.size() >= 5) {
          badges := addBadgeIfMissing(badges, #quizMaster);
        };
        // Perfect Score: at least 1 attempt with 100% accuracy
        let hasPerfect = attempts.find(func(a) { a.accuracy == 100 }) != null;
        if (hasPerfect) {
          badges := addBadgeIfMissing(badges, #perfectScore);
        };
        // Streak badge: current streak >= 3
        if (progress.currentStreak >= 3) {
          badges := addBadgeIfMissing(badges, #streak);
        };
        let updated : Types.UserProgress = { progress with badges };
        progressMap.add(userId, updated);
      };
      case null {};
    };
  };

  public func getProgressSummary(
    progressMap : Map.Map<Common.UserId, Types.UserProgress>,
    userId : Common.UserId,
    attempts : [QuizTypes.QuizAttempt],
    topics : Map.Map<Common.TopicId, TopicTypes.Topic>,
  ) : Types.ProgressSummary {
    switch (progressMap.get(userId)) {
      case (?progress) {
        let totalAcc = attempts.foldLeft(0, func(acc, a) { acc + a.accuracy });
        let avgAccuracy = if (attempts.size() == 0) 0 else totalAcc / attempts.size();
        {
          totalPoints = progress.totalPoints;
          badges = progress.badges;
          topicsCompletedCount = progress.topicsCompleted.size();
          quizAttemptCount = attempts.size();
          averageAccuracy = avgAccuracy;
          weakAreas = getWeakAreas(attempts, topics);
          currentStreak = progress.currentStreak;
        }
      };
      case null {
        {
          totalPoints = 0;
          badges = [];
          topicsCompletedCount = 0;
          quizAttemptCount = 0;
          averageAccuracy = 0;
          weakAreas = [];
          currentStreak = 0;
        }
      };
    }
  };

  public func getWeakAreas(
    attempts : [QuizTypes.QuizAttempt],
    topics : Map.Map<Common.TopicId, TopicTypes.Topic>,
  ) : [Types.WeakArea] {
    // Group attempts by topicId and compute per-topic average accuracy
    let topicAccMap = Map.empty<Common.TopicId, (Nat, Nat)>(); // topicId -> (totalAcc, count)
    for (attempt in attempts.vals()) {
      switch (topicAccMap.get(attempt.topicId)) {
        case (?(totalAcc, count)) {
          topicAccMap.add(attempt.topicId, (totalAcc + attempt.accuracy, count + 1));
        };
        case null {
          topicAccMap.add(attempt.topicId, (attempt.accuracy, 1));
        };
      };
    };
    let weakList = List.empty<Types.WeakArea>();
    for ((topicId, (totalAcc, count)) in topicAccMap.entries()) {
      let avgAcc = totalAcc / count;
      if (avgAcc < 70) {
        let title = switch (topics.get(topicId)) {
          case (?t) t.title;
          case null "Unknown Topic";
        };
        weakList.add({
          topicId;
          topicTitle = title;
          averageAccuracy = avgAcc;
          attemptCount = count;
        });
      };
    };
    weakList.toArray()
  };
};
