import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import { useAppStore } from "../store/useAppStore";
import type {
  ChatMessage,
  LearningSession,
  ProgressSummary,
  QuizAttempt,
  SkillLevel,
  Topic,
  UserProfile,
} from "../types";

type AnyActor = Record<string, (...args: unknown[]) => Promise<unknown>>;

function useBkActor() {
  return useActor(createActor);
}

// ─── User Profile ───────────────────────────────────────────────────────────
export function useUserProfile() {
  const { actor, isFetching } = useBkActor();
  const setProfile = useAppStore((s) => s.setProfile);

  return useQuery<UserProfile | null>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      const act = actor as unknown as AnyActor;
      if (!act.getCallerUserProfile) return null;
      const result = await act.getCallerUserProfile();
      if (!result) return null;
      const profile = result as UserProfile;
      setProfile(profile);
      return profile;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateProfile() {
  const { actor } = useBkActor();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      learningGoals: string;
      skillLevel: SkillLevel;
    }) => {
      if (!actor) throw new Error("No actor");
      const act = actor as unknown as AnyActor;
      if (!act.saveCallerUserProfile) return;
      return act.saveCallerUserProfile({
        name: data.name,
        learningGoals: data.learningGoals,
        skillLevel: data.skillLevel,
        createdAt: BigInt(Date.now()),
        updatedAt: BigInt(Date.now()),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

export function useUpdateProfile() {
  const { actor } = useBkActor();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      learningGoals: string;
      skillLevel: SkillLevel;
    }) => {
      if (!actor) throw new Error("No actor");
      const act = actor as unknown as AnyActor;
      if (!act.saveCallerUserProfile) return;
      return act.saveCallerUserProfile({
        name: data.name,
        learningGoals: data.learningGoals,
        skillLevel: data.skillLevel,
        createdAt: BigInt(Date.now()),
        updatedAt: BigInt(Date.now()),
      });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["userProfile"] }),
  });
}

// ─── Topics ─────────────────────────────────────────────────────────────────
export function useTopics() {
  const { actor, isFetching } = useBkActor();

  return useQuery<Topic[]>({
    queryKey: ["topics"],
    queryFn: async () => {
      if (!actor) return [];
      const act = actor as unknown as AnyActor;
      if (!act.listTopics) return [];
      const result = await act.listTopics();
      return (result as Topic[]) ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTopic(topicId: number | undefined) {
  const { actor, isFetching } = useBkActor();

  return useQuery<Topic | null>({
    queryKey: ["topic", topicId],
    queryFn: async () => {
      if (!actor || topicId === undefined) return null;
      const act = actor as unknown as AnyActor;
      if (!act.getTopic) return null;
      const result = await act.getTopic(BigInt(topicId));
      return (result as Topic) ?? null;
    },
    enabled: !!actor && !isFetching && topicId !== undefined,
  });
}

// ─── Learning Sessions ───────────────────────────────────────────────────────
export function useLearningSession(topicId: number | undefined) {
  const { actor, isFetching } = useBkActor();

  return useQuery<LearningSession | null>({
    queryKey: ["learningSession", topicId],
    queryFn: async () => {
      if (!actor || topicId === undefined) return null;
      const act = actor as unknown as AnyActor;
      if (!act.getSessionHistory) return null;
      const messages = await act.getSessionHistory(BigInt(topicId));
      if (!messages) return null;
      // Wrap the message array into a LearningSession-like object
      return {
        id: 0,
        userId: "",
        topicId,
        messages: (messages as ChatMessage[]) ?? [],
        startedAt: BigInt(0),
        updatedAt: BigInt(0),
        isActive: true,
      } as unknown as LearningSession;
    },
    enabled: !!actor && !isFetching && topicId !== undefined,
  });
}

export function useSendMessage() {
  const { actor } = useBkActor();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { topicId: number; message: string }) => {
      if (!actor) throw new Error("No actor");
      const act = actor as unknown as AnyActor;
      if (!act.sendMessage) throw new Error("sendMessage not available");
      const resp = (await act.sendMessage(
        BigInt(data.topicId),
        data.message,
      )) as string;
      // Backend returns raw string — wrap into ChatMessage
      const msg: ChatMessage = {
        role: "assistant" as const,
        content: resp,
        timestamp: BigInt(Date.now()),
      };
      return msg;
    },
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({
        queryKey: ["learningSession", variables.topicId],
      });
    },
  });
}

// ─── Quiz ────────────────────────────────────────────────────────────────────
export function useQuizAttempts(topicId?: number) {
  const { actor, isFetching } = useBkActor();

  return useQuery<QuizAttempt[]>({
    queryKey: ["quizAttempts", topicId],
    queryFn: async () => {
      if (!actor) return [];
      const act = actor as unknown as AnyActor;
      if (topicId !== undefined) {
        if (!act.getTopicQuizAttempts) return [];
        const result = await act.getTopicQuizAttempts(BigInt(topicId));
        return (result as QuizAttempt[]) ?? [];
      }
      if (!act.getMyQuizAttempts) return [];
      const result = await act.getMyQuizAttempts();
      return (result as QuizAttempt[]) ?? [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuiz() {
  const { actor } = useBkActor();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      topicId: number;
      answers: { questionId: number; answer: string }[];
      quizId?: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      const act = actor as unknown as AnyActor;
      if (!act.submitQuizAttempt)
        throw new Error("submitQuizAttempt not available");
      // Convert answer indices to bigint array (use answer indices 0-based)
      const answerIndices: bigint[] = data.answers.map((_, i) => BigInt(i));
      const quizId = data.quizId ?? BigInt(data.topicId);
      return act.submitQuizAttempt(
        quizId,
        answerIndices,
      ) as Promise<QuizAttempt>;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["quizAttempts"] });
      qc.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}

// ─── Mark Topic Completed ────────────────────────────────────────────────────
export function useMarkTopicCompleted() {
  const { actor } = useBkActor();
  const qc = useQueryClient();
  const setPoints = useAppStore((s) => s.setPoints);
  const currentPoints = useAppStore((s) => s.points);

  return useMutation({
    mutationFn: async (topicId: number) => {
      if (!actor) throw new Error("No actor");
      const act = actor as unknown as AnyActor;
      if (!act.markTopicCompleted)
        throw new Error("markTopicCompleted not available");
      const result = await act.markTopicCompleted(BigInt(topicId));
      return result as bigint;
    },
    onSuccess: (pointsEarned) => {
      const earned = Number(pointsEarned);
      setPoints(currentPoints + earned);
      qc.invalidateQueries({ queryKey: ["progress"] });
      qc.invalidateQueries({ queryKey: ["learningSession"] });
    },
  });
}

// ─── Progress ────────────────────────────────────────────────────────────────
export function useProgress() {
  const { actor, isFetching } = useBkActor();
  const setProgressSummary = useAppStore((s) => s.setProgressSummary);

  return useQuery<ProgressSummary | null>({
    queryKey: ["progress"],
    queryFn: async () => {
      if (!actor) return null;
      const act = actor as unknown as AnyActor;
      if (!act.getProgressSummary) return null;
      const result = await act.getProgressSummary();
      if (!result) return null;
      const summary = result as ProgressSummary;
      setProgressSummary(summary);
      return summary;
    },
    enabled: !!actor && !isFetching,
  });
}
