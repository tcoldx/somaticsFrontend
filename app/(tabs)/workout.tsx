import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTextGeneration } from '@fastshot/ai';
import { COLORS, HERO_CLASSES, COMMITMENT_LEVELS } from '@/lib/constants';
import { loadAppData, saveWorkoutPlan } from '@/lib/storage';
import { AppData, Workout, WorkoutPlan, Exercise } from '@/lib/types';
import { generateFallbackPlan } from '@/lib/leveling';

function parseAIWorkouts(text: string, planId: string): Workout[] | null {
  try {
    let cleaned = text.replace(/```(?:json)?\s*/g, '').replace(/```\s*/g, '').trim();
    let parsed: { workouts?: unknown[] } | null = null;
    try {
      parsed = JSON.parse(cleaned) as { workouts?: unknown[] };
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]) as { workouts?: unknown[] };
    }
    if (!parsed || !Array.isArray(parsed.workouts)) return null;

    return (parsed.workouts as unknown[]).map((w: unknown, idx: number) => {
      const wo = w as Record<string, unknown>;
      const exercises = (Array.isArray(wo.exercises) ? wo.exercises : []) as unknown[];
      return {
        id: `${planId}-${idx}`,
        week: Number(wo.week) || Math.floor(idx / 5) + 1,
        day: Number(wo.day) || (idx % 5) + 1,
        name: String(wo.name || `Quest ${idx + 1}`).toUpperCase(),
        type: String(wo.type || 'Training'),
        duration: Number(wo.duration) || 45,
        difficulty: String(wo.difficulty || 'Intermediate'),
        exercises: exercises.map((ex: unknown, eIdx: number) => {
          const e = ex as Record<string, unknown>;
          return {
            id: `${planId}-ex-${idx}-${eIdx}`,
            name: String(e.name || 'Exercise'),
            sets: Number(e.sets) || 3,
            reps: String(e.reps || '10'),
            notes: e.notes ? String(e.notes) : undefined,
          } satisfies Exercise;
        }),
        totalXP: 75 + Math.floor((Number(wo.week) || 1) - 1) * 10,
        completed: false,
      } satisfies Workout;
    }).filter((w) => w.exercises.length > 0);
  } catch {
    return null;
  }
}

export default function WorkoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeWeek, setActiveWeek] = useState(1);

  const { generateText } = useTextGeneration();

  const loadData = useCallback(async () => {
    const data = await loadAppData();
    setAppData(data);
    // Find the active week (week of first uncompleted workout)
    if (data.workoutPlan) {
      const firstUncompleted = data.workoutPlan.workouts.find((w) => !w.completed);
      if (firstUncompleted) setActiveWeek(firstUncompleted.week);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleRegenerate = async () => {
    if (!appData?.userProfile) return;

    Alert.alert(
      'REGENERATE PLAN?',
      'This will create a new AI-powered 4-week quest cycle. Your progress will be reset.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'FORGE NEW PLAN',
          style: 'destructive',
          onPress: async () => {
            setIsRegenerating(true);
            if (Platform.OS !== 'web') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }

            const userProfile = appData.userProfile!;
            const heroClass = HERO_CLASSES[userProfile.heroClass];
            const commitmentDays =
              COMMITMENT_LEVELS.find((c) => c.id === userProfile.commitment)?.days ?? 4;
            const planId = `plan-${Date.now()}`;

            try {
              const prompt = `You are an expert fitness coach creating a ${heroClass.workoutType} program.

Hero Class: ${heroClass.name} (${heroClass.workoutType})
Goals: ${userProfile.goals.join(', ')}
Training Days Per Week: ${commitmentDays}
Total Workouts: ${commitmentDays * 4}

Return ONLY valid JSON, no markdown:
{"workouts":[{"week":1,"day":1,"name":"QUEST NAME","type":"Type","duration":45,"difficulty":"Intermediate","exercises":[{"name":"Exercise","sets":3,"reps":"8-12","notes":"tip"}]}]}

Include ${commitmentDays * 4} workouts (${commitmentDays} per week, 4 weeks). 4-6 exercises each. Progressive difficulty.`;

              const result = await generateText(prompt);
              let workouts: Workout[] | null = null;
              if (result) workouts = parseAIWorkouts(result, planId);
              if (!workouts || workouts.length < 4) {
                workouts = generateFallbackPlan(userProfile.heroClass, commitmentDays, planId);
              }

              const plan: WorkoutPlan = {
                id: planId,
                heroClass: userProfile.heroClass,
                goals: userProfile.goals,
                commitment: userProfile.commitment,
                workouts: workouts.map((w, i) => ({ ...w, id: `${planId}-${i}` })),
                generatedAt: new Date().toISOString(),
              };

              await saveWorkoutPlan(plan);
              await loadData();
              setActiveWeek(1);

              if (Platform.OS !== 'web') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
              }
            } catch (err) {
              console.error('Regeneration failed:', err);
              const workouts = generateFallbackPlan(
                appData.userProfile!.heroClass,
                commitmentDays,
                planId
              );
              const plan: WorkoutPlan = {
                id: planId,
                heroClass: userProfile.heroClass,
                goals: userProfile.goals,
                commitment: userProfile.commitment,
                workouts: workouts.map((w, i) => ({ ...w, id: `${planId}-${i}` })),
                generatedAt: new Date().toISOString(),
              };
              await saveWorkoutPlan(plan);
              await loadData();
            } finally {
              setIsRegenerating(false);
            }
          },
        },
      ]
    );
  };

  if (!appData || !appData.userProfile || !appData.workoutPlan) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.ember} size="large" />
          <Text style={styles.loadingText}>LOADING QUESTS...</Text>
        </View>
      </View>
    );
  }

  const { userProfile, workoutPlan } = appData;
  const heroClass = HERO_CLASSES[userProfile.heroClass];
  const weeks = [1, 2, 3, 4];
  const weekWorkouts = workoutPlan.workouts.filter((w) => w.week === activeWeek);
  const completedInWeek = weekWorkouts.filter((w) => w.completed).length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>QUEST BOARD</Text>
          <Text style={styles.headerTitle}>TRAINING CYCLE</Text>
        </View>
        <TouchableOpacity
          style={styles.regenBtn}
          onPress={handleRegenerate}
          disabled={isRegenerating}
        >
          {isRegenerating ? (
            <ActivityIndicator size="small" color={COLORS.ember} />
          ) : (
            <Text style={styles.regenBtnText}>⚡ AI</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Plan info */}
      <View style={styles.planInfo}>
        <View style={[styles.planBadge, { backgroundColor: heroClass.bgColor, borderColor: heroClass.color }]}>
          <Text style={styles.planBadgeIcon}>{heroClass.icon}</Text>
          <Text style={[styles.planBadgeName, { color: heroClass.color }]}>{heroClass.name}</Text>
        </View>
        <Text style={styles.planDate}>
          Generated {new Date(workoutPlan.generatedAt).toLocaleDateString()}
        </Text>
      </View>

      {/* Week tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.weekTabsScroll}
        contentContainerStyle={styles.weekTabs}
      >
        {weeks.map((week) => {
          const wWorkouts = workoutPlan.workouts.filter((w) => w.week === week);
          const completed = wWorkouts.filter((w) => w.completed).length;
          const isActive = week === activeWeek;
          const isComplete = completed === wWorkouts.length && wWorkouts.length > 0;
          return (
            <TouchableOpacity
              key={week}
              style={[styles.weekTab, isActive && styles.weekTabActive]}
              onPress={() => setActiveWeek(week)}
            >
              <Text style={[styles.weekTabText, isActive && styles.weekTabTextActive]}>
                WEEK {week}
              </Text>
              <Text style={[styles.weekTabProgress, isActive && styles.weekTabProgressActive]}>
                {completed}/{wWorkouts.length} {isComplete ? '✓' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Workout list */}
      {isRegenerating ? (
        <View style={styles.regeneratingView}>
          <ActivityIndicator size="large" color={COLORS.ember} />
          <Text style={styles.regeneratingText}>FORGING NEW QUESTS...</Text>
          <Text style={styles.regeneratingSubtext}>AI is crafting your personalized training cycle</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.workoutList, { paddingBottom: insets.bottom + 20 }]}
        >
          {/* Week progress */}
          <View style={styles.weekProgressBar}>
            <View style={styles.weekProgressTrack}>
              <View
                style={[
                  styles.weekProgressFill,
                  { width: weekWorkouts.length > 0 ? `${(completedInWeek / weekWorkouts.length) * 100}%` : '0%' },
                ]}
              />
            </View>
            <Text style={styles.weekProgressText}>
              {completedInWeek}/{weekWorkouts.length} QUESTS COMPLETE
            </Text>
          </View>

          {weekWorkouts.map((workout, idx) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              index={idx}
              onPress={() =>
                router.push({
                  pathname: '/workout/[id]',
                  params: { id: workout.id },
                })
              }
            />
          ))}

          {weekWorkouts.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No quests for this week.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

function WorkoutCard({
  workout,
  index,
  onPress,
}: {
  workout: Workout;
  index: number;
  onPress: () => void;
}) {
  const difficultyColor = {
    Beginner: '#4CAF50',
    Intermediate: COLORS.ember,
    Advanced: '#EF4444',
  }[workout.difficulty] ?? COLORS.ember;

  return (
    <TouchableOpacity
      style={[styles.workoutCard, workout.completed && styles.workoutCardCompleted]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {workout.completed && <View style={styles.completedOverlay} />}
      <View style={styles.workoutCardTop}>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>DAY {workout.day}</Text>
        </View>
        <View style={[styles.difficultyBadge, { borderColor: difficultyColor }]}>
          <Text style={[styles.difficultyText, { color: difficultyColor }]}>
            {workout.difficulty.toUpperCase()}
          </Text>
        </View>
        {workout.completed && (
          <View style={styles.completedBadge}>
            <Text style={styles.completedBadgeText}>✓ DONE</Text>
          </View>
        )}
      </View>

      <Text style={[styles.workoutName, workout.completed && styles.workoutNameCompleted]}>
        {workout.name}
      </Text>
      <Text style={styles.workoutType}>{workout.type}</Text>

      <View style={styles.workoutMeta}>
        <View style={styles.workoutMetaItem}>
          <Text style={styles.workoutMetaIcon}>⏱️</Text>
          <Text style={styles.workoutMetaText}>{workout.duration}m</Text>
        </View>
        <View style={styles.workoutMetaItem}>
          <Text style={styles.workoutMetaIcon}>💪</Text>
          <Text style={styles.workoutMetaText}>{workout.exercises.length} exercises</Text>
        </View>
        <View style={[styles.xpChip, workout.completed && styles.xpChipDone]}>
          <Text style={[styles.xpChipText, workout.completed && styles.xpChipTextDone]}>
            +{workout.totalXP} XP
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerEyebrow: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
    marginBottom: 2,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  regenBtn: {
    backgroundColor: COLORS.emberGlow,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.ember,
    minWidth: 56,
    alignItems: 'center',
  },
  regenBtnText: {
    color: COLORS.ember,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  planInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  planBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  planBadgeIcon: { fontSize: 14 },
  planBadgeName: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  planDate: {
    color: COLORS.textLightMuted,
    fontSize: 11,
  },
  weekTabsScroll: {
    maxHeight: 64,
  },
  weekTabs: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 8,
  },
  weekTab: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: COLORS.obsidianCard,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    minWidth: 80,
  },
  weekTabActive: {
    backgroundColor: COLORS.emberGlow,
    borderColor: COLORS.ember,
  },
  weekTabText: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  weekTabTextActive: {
    color: COLORS.ember,
  },
  weekTabProgress: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  weekTabProgressActive: {
    color: COLORS.emberLight,
  },
  workoutList: {
    padding: 20,
    gap: 12,
  },
  weekProgressBar: {
    gap: 8,
    marginBottom: 4,
  },
  weekProgressTrack: {
    height: 4,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: '100%',
    backgroundColor: COLORS.ember,
    borderRadius: 2,
  },
  weekProgressText: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  workoutCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    gap: 8,
    overflow: 'hidden',
  },
  workoutCardCompleted: {
    borderColor: COLORS.green,
    opacity: 0.75,
  },
  completedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(76, 175, 80, 0.04)',
  },
  workoutCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayBadge: {
    backgroundColor: COLORS.obsidianCardAlt,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  dayBadgeText: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  difficultyBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  completedBadge: {
    backgroundColor: COLORS.greenGlow,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.green,
    marginLeft: 'auto',
  },
  completedBadgeText: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  workoutName: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  workoutNameCompleted: {
    color: COLORS.textLightMuted,
  },
  workoutType: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  workoutMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  workoutMetaIcon: { fontSize: 12 },
  workoutMetaText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  xpChip: {
    marginLeft: 'auto',
    backgroundColor: COLORS.emberGlow,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.ember,
  },
  xpChipDone: {
    backgroundColor: COLORS.greenGlow,
    borderColor: COLORS.green,
  },
  xpChipText: {
    color: COLORS.ember,
    fontSize: 11,
    fontWeight: '800',
  },
  xpChipTextDone: {
    color: COLORS.green,
  },
  regeneratingView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  regeneratingText: {
    color: COLORS.ember,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  regeneratingSubtext: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    color: COLORS.textLightMuted,
    fontSize: 14,
  },
});
