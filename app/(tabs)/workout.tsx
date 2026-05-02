import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, HERO_CLASSES, CHAPTER_NAMES } from '@/lib/constants';
import { loadAppData } from '@/lib/storage';
import { AppData, Workout } from '@/lib/types';

export default function WorkoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [activeWeek, setActiveWeek] = useState(1);

  const loadData = useCallback(async () => {
    const data = await loadAppData();
    setAppData(data);
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

  if (!appData || !appData.userProfile || !appData.workoutPlan) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.ember} size="large" />
          <Text style={styles.loadingText}>LOADING CHAPTERS...</Text>
        </View>
      </View>
    );
  }

  const { userProfile, workoutPlan } = appData;
  const heroClass = HERO_CLASSES[userProfile.heroClass];
  const weeks = [1, 2, 3, 4];
  const weekWorkouts = workoutPlan.workouts.filter((w) => w.week === activeWeek);
  const completedInWeek = weekWorkouts.filter((w) => w.completed).length;
  const activeChapter = CHAPTER_NAMES.find((c) => c.week === activeWeek);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerEyebrow}>QUEST BOARD</Text>
          <Text style={styles.headerTitle}>4-WEEK JOURNEY</Text>
        </View>
        <View style={[styles.classBadge, { backgroundColor: heroClass.bgColor, borderColor: heroClass.color }]}>
          <Text style={styles.classBadgeIcon}>{heroClass.icon}</Text>
          <Text style={[styles.classBadgeName, { color: heroClass.color }]}>{heroClass.name}</Text>
        </View>
      </View>

      {/* Chapter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chapterTabsScroll}
        contentContainerStyle={styles.chapterTabs}
      >
        {weeks.map((week) => {
          const chapter = CHAPTER_NAMES.find((c) => c.week === week)!;
          const wWorkouts = workoutPlan.workouts.filter((w) => w.week === week);
          const completed = wWorkouts.filter((w) => w.completed).length;
          const isActive = week === activeWeek;
          const isComplete = completed === wWorkouts.length && wWorkouts.length > 0;

          return (
            <TouchableOpacity
              key={week}
              style={[
                styles.chapterTab,
                isActive && styles.chapterTabActive,
                isActive && { borderColor: chapter.color },
              ]}
              onPress={() => setActiveWeek(week)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chapterTabTitle, isActive && { color: chapter.color }]}>
                {chapter.title}
              </Text>
              <Text style={[styles.chapterTabSub, isActive && { color: chapter.color, opacity: 0.8 }]}>
                {chapter.subtitle}
              </Text>
              <Text style={[styles.chapterTabProgress, isActive && { color: chapter.color }]}>
                {completed}/{wWorkouts.length}{isComplete ? ' ✓' : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Chapter info bar */}
      {activeChapter && (
        <View style={[styles.chapterInfoBar, { borderLeftColor: activeChapter.color }]}>
          <View style={styles.chapterInfoLeft}>
            <Text style={[styles.chapterInfoTitle, { color: activeChapter.color }]}>
              {activeChapter.title}: {activeChapter.subtitle}
            </Text>
            <Text style={styles.chapterInfoSub}>
              {completedInWeek}/{weekWorkouts.length} quests complete
            </Text>
          </View>
          {activeChapter.premium && (
            <TouchableOpacity
              style={styles.premiumLockBadge}
              onPress={() => router.push('/paywall')}
            >
              <Text style={styles.premiumLockIcon}>🔒</Text>
              <Text style={styles.premiumLockText}>PLUS</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Progress bar */}
      <View style={styles.weekProgressBar}>
        <View style={styles.weekProgressTrack}>
          <View
            style={[
              styles.weekProgressFill,
              {
                width: weekWorkouts.length > 0
                  ? `${(completedInWeek / weekWorkouts.length) * 100}%`
                  : '0%',
                backgroundColor: activeChapter?.color ?? COLORS.ember,
              },
            ]}
          />
        </View>
      </View>

      {/* Workout list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.workoutList, { paddingBottom: insets.bottom + 20 }]}
      >
        {weekWorkouts.map((workout, idx) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
            index={idx}
            chapterColor={activeChapter?.color ?? COLORS.ember}
            isPremiumChapter={activeChapter?.premium ?? false}
            onPress={() => {
              if (activeChapter?.premium) {
                router.push('/paywall');
                return;
              }
              router.push({ pathname: '/workout/[id]', params: { id: workout.id } });
            }}
          />
        ))}

        {weekWorkouts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateEmoji}>📖</Text>
            <Text style={styles.emptyStateText}>No quests for this chapter.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function WorkoutCard({
  workout,
  index,
  chapterColor,
  isPremiumChapter,
  onPress,
}: {
  workout: Workout;
  index: number;
  chapterColor: string;
  isPremiumChapter: boolean;
  onPress: () => void;
}) {
  const difficultyColor = {
    Beginner: '#4CAF50',
    Intermediate: COLORS.ember,
    Advanced: '#EF4444',
  }[workout.difficulty] ?? COLORS.ember;

  return (
    <TouchableOpacity
      style={[
        styles.workoutCard,
        workout.completed && styles.workoutCardCompleted,
        isPremiumChapter && styles.workoutCardLocked,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {workout.completed && <View style={styles.completedOverlay} />}

      {isPremiumChapter && (
        <View style={styles.lockedOverlay}>
          <Text style={styles.lockedIcon}>🔒</Text>
          <Text style={styles.lockedText}>SOMATICS+ REQUIRED</Text>
        </View>
      )}

      <View style={styles.workoutCardTop}>
        <View style={[styles.dayBadge, { borderColor: chapterColor }]}>
          <Text style={[styles.dayBadgeText, { color: chapterColor }]}>DAY {workout.day}</Text>
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

      <Text style={[
        styles.workoutName,
        workout.completed && styles.workoutNameCompleted,
        isPremiumChapter && styles.workoutNameLocked,
      ]}>
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
  container: { flex: 1, backgroundColor: COLORS.obsidian },
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
    letterSpacing: 0.5,
  },
  classBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
  },
  classBadgeIcon: { fontSize: 14 },
  classBadgeName: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  // Chapter tabs
  chapterTabsScroll: { maxHeight: 80 },
  chapterTabs: {
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 10,
  },
  chapterTab: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.obsidianCard,
    borderWidth: 1.5,
    borderColor: COLORS.obsidianBorder,
    minWidth: 90,
  },
  chapterTabActive: {
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  chapterTabTitle: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  chapterTabSub: {
    color: COLORS.textLightMuted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 1,
    opacity: 0.7,
  },
  chapterTabProgress: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 3,
  },
  // Chapter info bar
  chapterInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
    paddingLeft: 12,
    borderLeftWidth: 3,
    borderRadius: 2,
  },
  chapterInfoLeft: { gap: 2 },
  chapterInfoTitle: {
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1,
  },
  chapterInfoSub: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  premiumLockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.premiumGoldGlow,
    borderWidth: 1,
    borderColor: COLORS.premiumGold,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  premiumLockIcon: { fontSize: 12 },
  premiumLockText: {
    color: COLORS.premiumGold,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  // Progress bar
  weekProgressBar: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  weekProgressTrack: {
    height: 3,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  // Workout list
  workoutList: { padding: 16, gap: 10 },
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
    opacity: 0.72,
  },
  workoutCardLocked: {
    opacity: 0.5,
  },
  completedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(76, 175, 80, 0.04)',
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    zIndex: 1,
  },
  lockedIcon: { fontSize: 28 },
  lockedText: {
    color: COLORS.premiumGold,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
  },
  workoutCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dayBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  dayBadgeText: {
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
  workoutNameCompleted: { color: COLORS.textLightMuted },
  workoutNameLocked: { color: COLORS.textLightMuted },
  workoutType: { color: COLORS.textLightMuted, fontSize: 12, fontWeight: '600' },
  workoutMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  workoutMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  workoutMetaIcon: { fontSize: 12 },
  workoutMetaText: { color: COLORS.textLightMuted, fontSize: 12, fontWeight: '600' },
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
  xpChipText: { color: COLORS.ember, fontSize: 11, fontWeight: '800' },
  xpChipTextDone: { color: COLORS.green },
  emptyState: { alignItems: 'center', padding: 40, gap: 10 },
  emptyStateEmoji: { fontSize: 40 },
  emptyStateText: { color: COLORS.textLightMuted, fontSize: 14 },
});
