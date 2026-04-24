import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Common "../types/common";
import TopicTypes "../types/topic";
import ProfileTypes "../types/profile";
import TopicLib "../lib/topic";

mixin (
  accessControlState : AccessControl.AccessControlState,
  topics : Map.Map<Common.TopicId, TopicTypes.Topic>,
  completions : Map.Map<(Common.UserId, Common.TopicId), TopicTypes.TopicCompletion>,
  profiles : Map.Map<Common.UserId, ProfileTypes.UserProfile>,
) {
  public query ({ caller }) func listTopics() : async [TopicTypes.Topic] {
    TopicLib.listTopics(topics)
  };

  public query ({ caller }) func getTopic(topicId : Common.TopicId) : async ?TopicTypes.Topic {
    TopicLib.getTopic(topics, topicId)
  };

  public query ({ caller }) func getTopicCompletionStatus(topicId : Common.TopicId) : async ?TopicTypes.TopicCompletion {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    TopicLib.getCompletionStatus(completions, caller, topicId)
  };

  public query ({ caller }) func getRecommendedTopics() : async [TopicTypes.Topic] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (profiles.get(caller)) {
      case (?profile) TopicLib.getRecommendations(topics, completions, caller, profile);
      case null TopicLib.listTopics(topics);
    }
  };

  public shared ({ caller }) func markTopicCompleted(topicId : Common.TopicId) : async Nat {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    let pointsEarned = 10;
    TopicLib.markCompleted(completions, caller, topicId, pointsEarned, now);
    pointsEarned
  };
};
