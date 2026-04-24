import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProgressSummary {
    averageAccuracy: bigint;
    badges: Array<Badge>;
    quizAttemptCount: bigint;
    topicsCompletedCount: bigint;
    totalPoints: bigint;
    weakAreas: Array<WeakArea>;
    currentStreak: bigint;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface QuizQuestion {
    id: bigint;
    correctOptionId: bigint;
    question: string;
    explanation: string;
    options: Array<QuizOption>;
}
export interface Quiz {
    id: QuizId;
    createdAt: Timestamp;
    questions: Array<QuizQuestion>;
    topicId: TopicId;
}
export type SessionId = bigint;
export interface UserProgress {
    userId: UserId;
    badges: Array<Badge>;
    topicsCompleted: Array<TopicId>;
    longestStreak: bigint;
    totalPoints: bigint;
    lastActivityAt: Timestamp;
    currentStreak: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface LearningSession {
    id: SessionId;
    startedAt: Timestamp;
    messages: Array<ChatMessage>;
    userId: UserId;
    isActive: boolean;
    updatedAt: Timestamp;
    topicId: TopicId;
}
export type UserId = Principal;
export type TopicId = bigint;
export interface QuizAttempt {
    id: bigint;
    completedAt: Timestamp;
    userId: UserId;
    answers: Array<bigint>;
    score: bigint;
    pointsEarned: bigint;
    totalQuestions: bigint;
    quizId: QuizId;
    topicId: TopicId;
    accuracy: bigint;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Topic {
    id: TopicId;
    title: string;
    difficulty: DifficultyLevel;
    createdAt: Timestamp;
    description: string;
    category: string;
}
export interface ChatMessage {
    content: string;
    role: MessageRole;
    timestamp: Timestamp;
}
export interface TopicCompletion {
    completedAt: Timestamp;
    userId: UserId;
    pointsEarned: bigint;
    topicId: TopicId;
}
export interface QuizOption {
    id: bigint;
    text: string;
}
export interface WeakArea {
    averageAccuracy: bigint;
    attemptCount: bigint;
    topicTitle: string;
    topicId: TopicId;
}
export interface UserProfile {
    learningGoals: string;
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    skillLevel: SkillLevel;
}
export type QuizId = bigint;
export enum Badge {
    streak = "streak",
    perfectScore = "perfectScore",
    quizMaster = "quizMaster",
    firstSteps = "firstSteps"
}
export enum DifficultyLevel {
    easy = "easy",
    hard = "hard",
    medium = "medium"
}
export enum MessageRole {
    user = "user",
    assistant = "assistant"
}
export enum SkillLevel {
    intermediate = "intermediate",
    beginner = "beginner",
    advanced = "advanced"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    closeSession(sessionId: SessionId): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyProgress(): Promise<UserProgress | null>;
    getMyQuizAttempts(): Promise<Array<QuizAttempt>>;
    getOrCreateSession(topicId: TopicId): Promise<LearningSession>;
    getProgressSummary(): Promise<ProgressSummary>;
    getQuizForTopic(topicId: TopicId): Promise<Quiz | null>;
    getRecommendedTopics(): Promise<Array<Topic>>;
    getSessionHistory(topicId: TopicId): Promise<Array<ChatMessage>>;
    getTopic(topicId: TopicId): Promise<Topic | null>;
    getTopicCompletionStatus(topicId: TopicId): Promise<TopicCompletion | null>;
    getTopicQuizAttempts(topicId: TopicId): Promise<Array<QuizAttempt>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWeakAreas(): Promise<Array<WeakArea>>;
    isCallerAdmin(): Promise<boolean>;
    listTopics(): Promise<Array<Topic>>;
    markTopicCompleted(topicId: TopicId): Promise<bigint>;
    saveAiGeneratedQuiz(topicId: TopicId, questions: Array<QuizQuestion>): Promise<Quiz>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendMessage(topicId: TopicId, userMessage: string): Promise<string>;
    submitQuizAttempt(quizId: QuizId, answers: Array<bigint>): Promise<QuizAttempt>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
