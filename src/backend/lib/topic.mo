import Map "mo:core/Map";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Types "../types/topic";
import Common "../types/common";
import ProfileTypes "../types/profile";

module {
  // Compare function for (UserId, TopicId) tuples
  func pairCompare(a : (Common.UserId, Common.TopicId), b : (Common.UserId, Common.TopicId)) : { #less; #equal; #greater } {
    let pc = Principal.compare(a.0, b.0);
    switch (pc) {
      case (#equal) {
        if (a.1 < b.1) #less
        else if (a.1 > b.1) #greater
        else #equal
      };
      case other other;
    }
  };

  public func listTopics(
    topics : Map.Map<Common.TopicId, Types.Topic>,
  ) : [Types.Topic] {
    let list = List.empty<Types.Topic>();
    for ((_, topic) in topics.entries()) {
      list.add(topic);
    };
    list.toArray()
  };

  public func getTopic(
    topics : Map.Map<Common.TopicId, Types.Topic>,
    topicId : Common.TopicId,
  ) : ?Types.Topic {
    topics.get(topicId)
  };

  public func getCompletionStatus(
    completions : Map.Map<(Common.UserId, Common.TopicId), Types.TopicCompletion>,
    userId : Common.UserId,
    topicId : Common.TopicId,
  ) : ?Types.TopicCompletion {
    completions.get(pairCompare, (userId, topicId))
  };

  public func markCompleted(
    completions : Map.Map<(Common.UserId, Common.TopicId), Types.TopicCompletion>,
    userId : Common.UserId,
    topicId : Common.TopicId,
    pointsEarned : Nat,
    now : Common.Timestamp,
  ) : () {
    let completion : Types.TopicCompletion = {
      topicId;
      userId;
      completedAt = now;
      pointsEarned;
    };
    completions.add(pairCompare, (userId, topicId), completion);
  };

  public func getRecommendations(
    topics : Map.Map<Common.TopicId, Types.Topic>,
    completions : Map.Map<(Common.UserId, Common.TopicId), Types.TopicCompletion>,
    userId : Common.UserId,
    profile : ProfileTypes.UserProfile,
  ) : [Types.Topic] {
    let targetDifficulty : Types.DifficultyLevel = switch (profile.skillLevel) {
      case (#beginner) #easy;
      case (#intermediate) #medium;
      case (#advanced) #hard;
    };
    let list = List.empty<Types.Topic>();
    for ((_, topic) in topics.entries()) {
      let isCompleted = completions.containsKey(pairCompare, (userId, topic.id));
      if (not isCompleted and topic.difficulty == targetDifficulty) {
        list.add(topic);
      };
    };
    // If no matching difficulty topics remain, return all uncompleted topics
    if (list.isEmpty()) {
      for ((_, topic) in topics.entries()) {
        let isCompleted = completions.containsKey(pairCompare, (userId, topic.id));
        if (not isCompleted) {
          list.add(topic);
        };
      };
    };
    list.toArray()
  };

  public func seedDefaultTopics(
    topics : Map.Map<Common.TopicId, Types.Topic>,
    nextId : Nat,
    now : Common.Timestamp,
  ) : Nat {
    let defaults : [(Text, Text, Types.DifficultyLevel, Text)] = [
      ("Math Basics", "Learn fundamental arithmetic, algebra, and geometry concepts.", #easy, "Mathematics"),
      ("History", "Explore world history from ancient civilizations to modern times.", #medium, "Humanities"),
      ("Science", "Discover physics, chemistry, and biology fundamentals.", #medium, "Science"),
      ("Programming", "Learn to code with hands-on exercises in popular languages.", #hard, "Technology"),
      ("Languages", "Pick up new language skills through immersive lessons.", #easy, "Languages"),
      ("Advanced Algebra", "Dive deep into linear algebra, polynomials and equations.", #hard, "Mathematics"),
      ("World Geography", "Explore continents, countries, capitals, and cultures.", #easy, "Humanities"),
      ("Chemistry Basics", "Understand atomic structure, bonds, and reactions.", #medium, "Science"),
    ];
    var id = nextId;
    for ((title, desc, diff, cat) in defaults.vals()) {
      topics.add(
        id,
        {
          id;
          title;
          description = desc;
          difficulty = diff;
          category = cat;
          createdAt = now;
        },
      );
      id += 1;
    };
    id
  };
};
