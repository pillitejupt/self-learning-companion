import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";
import AccessControl "mo:caffeineai-authorization/access-control";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Common "../types/common";
import ChatTypes "../types/chat";
import ChatLib "../lib/chat";

mixin (
  accessControlState : AccessControl.AccessControlState,
  sessions : Map.Map<Common.SessionId, ChatTypes.LearningSession>,
) {
  var nextSessionId : Nat = 0;

  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input)
  };

  public shared ({ caller }) func getOrCreateSession(topicId : Common.TopicId) : async ChatTypes.LearningSession {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (ChatLib.getActiveSession(sessions, caller, topicId)) {
      case (?session) session;
      case null {
        let now = Time.now();
        let session = ChatLib.createSession(sessions, nextSessionId, caller, topicId, now);
        nextSessionId += 1;
        session
      };
    }
  };

  public shared ({ caller }) func sendMessage(topicId : Common.TopicId, userMessage : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let now = Time.now();
    // Get or create session for this topic
    let session = switch (ChatLib.getActiveSession(sessions, caller, topicId)) {
      case (?s) s;
      case null {
        let s = ChatLib.createSession(sessions, nextSessionId, caller, topicId, now);
        nextSessionId += 1;
        s
      };
    };

    // Persist user message
    let userMsg : ChatTypes.ChatMessage = {
      role = #user;
      content = userMessage;
      timestamp = now;
    };
    ChatLib.appendMessage(sessions, session.id, userMsg, now);

    // Build messages array for the LLM request
    let systemPrompt = "You are an intelligent Self-Learning Companion designed to act as a personalized tutor, mentor, and guide for users. Understand the user's learning goals, level (beginner/intermediate/advanced), and preferences. Break down complex topics into simple, easy-to-understand explanations. Teach step-by-step with examples, analogies, and real-world applications. Adapt dynamically based on user responses and progress. Provide quizzes, practice problems, and mini-tests after each topic. Give instant feedback and explain mistakes clearly. Suggest learning paths, resources, and improvements. Track progress and motivate the user consistently. Be friendly, clear, and supportive.";

    // Build conversation history
    let historyParts = session.messages.map(
      func(msg) {
        let roleStr = switch (msg.role) { case (#user) "User"; case (#assistant) "Assistant" };
        roleStr # ": " # msg.content
      }
    );
    let historyText = historyParts.vals().join("\n");

    // Build JSON body for the LLM API
    let escapedSystem = escapeJson(systemPrompt);
    let escapedHistory = escapeJson(historyText);
    let escapedMessage = escapeJson(userMessage);
    let requestBody = "{\"model\":\"gpt-4o-mini\",\"messages\":[{\"role\":\"system\",\"content\":\"" # escapedSystem # "\"},{\"role\":\"user\",\"content\":\"Previous conversation:\\n" # escapedHistory # "\\n\\nUser: " # escapedMessage # "\"}]}";

    let headers : [OutCall.Header] = [
      { name = "Content-Type"; value = "application/json" },
      { name = "Authorization"; value = "Bearer OPENAI_API_KEY" },
    ];

    let responseText = await OutCall.httpPostRequest(
      "https://api.openai.com/v1/chat/completions",
      headers,
      requestBody,
      transform,
    );

    // Extract content from response
    let assistantContent = extractContent(responseText);

    // Persist assistant reply
    let assistantMsg : ChatTypes.ChatMessage = {
      role = #assistant;
      content = assistantContent;
      timestamp = Time.now();
    };
    ChatLib.appendMessage(sessions, session.id, assistantMsg, Time.now());

    assistantContent
  };

  public shared ({ caller }) func closeSession(sessionId : Common.SessionId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (ChatLib.getSession(sessions, sessionId)) {
      case (?session) {
        if (session.userId != caller) {
          Runtime.trap("Unauthorized: Not your session");
        };
        ChatLib.closeSession(sessions, sessionId, Time.now());
      };
      case null {};
    };
  };

  public query ({ caller }) func getSessionHistory(topicId : Common.TopicId) : async [ChatTypes.ChatMessage] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    switch (ChatLib.getActiveSession(sessions, caller, topicId)) {
      case (?session) session.messages;
      case null [];
    }
  };

  // Minimal JSON string escaper
  func escapeJson(s : Text) : Text {
    var result = s;
    result := result.replace(#text "\\", "\\\\");
    result := result.replace(#text "\"", "\\\"");
    result := result.replace(#text "\n", "\\n");
    result := result.replace(#text "\r", "\\r");
    result := result.replace(#text "\t", "\\t");
    result
  };

  // Extract "content" field value from OpenAI JSON response
  // Splits on the marker "content":"  and then reads until the next unescaped quote
  func extractContent(response : Text) : Text {
    let marker = "\"content\":\"";
    // Split response on marker; if present, second part starts right after the opening quote
    let parts = response.split(#text marker).toArray();
    if (parts.size() < 2) {
      return response;
    };
    let afterMarker = parts[1];
    var result = "";
    var escaped = false;
    var found = false;
    for (c in afterMarker.toIter()) {
      if (found) {
        // done — ignore remaining chars
      } else if (escaped) {
        result #= Text.fromChar(c);
        escaped := false;
      } else if (c == '\\') {
        escaped := true;
        result #= "\\";
      } else if (c == '\"') {
        found := true;
      } else {
        result #= Text.fromChar(c);
      };
    };
    if (found) result else response
  };
};
