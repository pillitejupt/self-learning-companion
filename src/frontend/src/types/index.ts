export type UserId = string;
export type TopicId = number;
export type QuizId = number;
export type SessionId = number;
export type Timestamp = bigint;

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type Badge = "firstSteps" | "quizMaster" | "perfectScore" | "streak";

export type DifficultyLevel = "easy" | "medium" | "hard";

export type MessageRole = "user" | "assistant";

export interface UserProfile {
  name: string;
  learningGoals: string;
  skillLevel: SkillLevel;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Topic {
  id: TopicId;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  category: string;
  createdAt: Timestamp;
}

export interface TopicCompletion {
  topicId: TopicId;
  userId: UserId;
  completedAt: Timestamp;
  pointsEarned: number;
}

export interface ChatMessage {
  role: MessageRole;
  content: string;
  timestamp: Timestamp;
}

export interface LearningSession {
  id: SessionId;
  userId: UserId;
  topicId: TopicId;
  messages: ChatMessage[];
  startedAt: Timestamp;
  updatedAt: Timestamp;
  isActive: boolean;
}

export interface QuizAttempt {
  id: bigint;
  userId: UserId;
  quizId: bigint;
  topicId: bigint;
  score: bigint;
  totalQuestions: bigint;
  accuracy: bigint;
  pointsEarned: bigint;
  completedAt: Timestamp;
}

export interface WeakArea {
  topicId: bigint;
  topicTitle: string;
  averageAccuracy: bigint;
  attemptCount: bigint;
}

export interface ProgressSummary {
  totalPoints: bigint;
  badges: Badge[];
  topicsCompletedCount: bigint;
  quizAttemptCount: bigint;
  averageAccuracy: bigint;
  weakAreas: WeakArea[];
  currentStreak: bigint;
}

export const BADGE_LABELS: Record<Badge, string> = {
  firstSteps: "First Steps",
  quizMaster: "Quiz Master",
  perfectScore: "Perfect Score",
  streak: "Streak Hero",
};

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};
