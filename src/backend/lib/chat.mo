import Map "mo:core/Map";
import Types "../types/chat";
import Common "../types/common";

module {
  public func getSession(
    sessions : Map.Map<Common.SessionId, Types.LearningSession>,
    sessionId : Common.SessionId,
  ) : ?Types.LearningSession {
    sessions.get(sessionId)
  };

  public func getActiveSession(
    sessions : Map.Map<Common.SessionId, Types.LearningSession>,
    userId : Common.UserId,
    topicId : Common.TopicId,
  ) : ?Types.LearningSession {
    for ((_, session) in sessions.entries()) {
      if (session.userId == userId and session.topicId == topicId and session.isActive) {
        return ?session;
      };
    };
    null
  };

  public func createSession(
    sessions : Map.Map<Common.SessionId, Types.LearningSession>,
    nextId : Nat,
    userId : Common.UserId,
    topicId : Common.TopicId,
    now : Common.Timestamp,
  ) : Types.LearningSession {
    let session : Types.LearningSession = {
      id = nextId;
      userId;
      topicId;
      messages = [];
      startedAt = now;
      updatedAt = now;
      isActive = true;
    };
    sessions.add(nextId, session);
    session
  };

  public func appendMessage(
    sessions : Map.Map<Common.SessionId, Types.LearningSession>,
    sessionId : Common.SessionId,
    message : Types.ChatMessage,
    now : Common.Timestamp,
  ) : () {
    switch (sessions.get(sessionId)) {
      case (?session) {
        let updated : Types.LearningSession = {
          session with
          messages = session.messages.concat([message]);
          updatedAt = now;
        };
        sessions.add(sessionId, updated);
      };
      case null {};
    };
  };

  public func closeSession(
    sessions : Map.Map<Common.SessionId, Types.LearningSession>,
    sessionId : Common.SessionId,
    now : Common.Timestamp,
  ) : () {
    switch (sessions.get(sessionId)) {
      case (?session) {
        let updated : Types.LearningSession = {
          session with
          isActive = false;
          updatedAt = now;
        };
        sessions.add(sessionId, updated);
      };
      case null {};
    };
  };

  public func getUserSessions(
    sessions : Map.Map<Common.SessionId, Types.LearningSession>,
    userId : Common.UserId,
  ) : [Types.LearningSession] {
    sessions.values().filter(func(s) { s.userId == userId }).toArray()
  };
};
