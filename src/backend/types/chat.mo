import Common "common";

module {
  public type MessageRole = {
    #user;
    #assistant;
  };

  public type ChatMessage = {
    role : MessageRole;
    content : Text;
    timestamp : Common.Timestamp;
  };

  public type LearningSession = {
    id : Common.SessionId;
    userId : Common.UserId;
    topicId : Common.TopicId;
    messages : [ChatMessage];
    startedAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    isActive : Bool;
  };
};
