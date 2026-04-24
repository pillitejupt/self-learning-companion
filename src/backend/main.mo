import Map "mo:core/Map";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Common "types/common";
import ProfileTypes "types/profile";
import TopicTypes "types/topic";
import ChatTypes "types/chat";
import QuizTypes "types/quiz";
import ProgressTypes "types/progress";
import ProfileMixin "mixins/profile-api";
import TopicMixin "mixins/topic-api";
import ChatMixin "mixins/chat-api";
import QuizMixin "mixins/quiz-api";
import ProgressMixin "mixins/progress-api";
import TopicLib "lib/topic";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User profiles
  let profiles = Map.empty<Common.UserId, ProfileTypes.UserProfile>();
  include ProfileMixin(accessControlState, profiles);

  // Topics and completions — seed default topics on first run
  let topics = Map.empty<Common.TopicId, TopicTypes.Topic>();
  let completions = Map.empty<(Common.UserId, Common.TopicId), TopicTypes.TopicCompletion>();
  ignore TopicLib.seedDefaultTopics(topics, topics.size(), Time.now());
  include TopicMixin(accessControlState, topics, completions, profiles);

  // Chat / learning sessions
  let sessions = Map.empty<Common.SessionId, ChatTypes.LearningSession>();
  include ChatMixin(accessControlState, sessions);

  // Quizzes and attempts
  let quizzes = Map.empty<Common.QuizId, QuizTypes.Quiz>();
  let quizAttempts = Map.empty<Nat, QuizTypes.QuizAttempt>();
  include QuizMixin(accessControlState, quizzes, quizAttempts);

  // Progress tracking
  let progressMap = Map.empty<Common.UserId, ProgressTypes.UserProgress>();
  include ProgressMixin(accessControlState, progressMap, quizAttempts, topics);
};
