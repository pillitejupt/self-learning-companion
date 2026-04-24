import Common "common";

module {
  public type DifficultyLevel = {
    #easy;
    #medium;
    #hard;
  };

  public type Topic = {
    id : Common.TopicId;
    title : Text;
    description : Text;
    difficulty : DifficultyLevel;
    category : Text;
    createdAt : Common.Timestamp;
  };

  public type TopicCompletion = {
    topicId : Common.TopicId;
    userId : Common.UserId;
    completedAt : Common.Timestamp;
    pointsEarned : Nat;
  };
};
