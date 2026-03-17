import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { COLORS, HERO_CLASSES } from '@/lib/constants';
import { loadAppData } from '@/lib/storage';
import { getXPProgress } from '@/lib/leveling';
import XPBar from '@/components/XPBar';
import { AppData } from '@/lib/types';

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const headerOpacity = useSharedValue(0);
  const headerY = useSharedValue(-20);
  const cardScale = useSharedValue(0.95);

  const loadData = useCallback(async () => {
    const data = await loadAppData();
    setAppData(data);
  }, []);

  useFocusEffect(
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => {
      loadData();
      headerOpacity.value = withDelay(100, withTiming(1, { duration: 500 }));
      headerY.value = withDelay(100, withSpring(0, { damping: 12, stiffness: 100 }));
      cardScale.value = withDelay(200, withSpring(1, { damping: 14, stiffness: 100 }));
    }, [loadData])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerY.value }],
  }));
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  if (!appData || !appData.userProfile) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>LOADING...</Text>
      </View>
    );
  }

  const { userProfile, gameStats, workoutPlan } = appData;
  const heroClass = HERO_CLASSES[userProfile.heroClass];
  const xpData = getXPProgress(gameStats.totalXP);

  // Get next uncompleted workout
  const nextWorkout = workoutPlan?.workouts.find((w) => !w.completed);
  const completedCount = workoutPlan?.workouts.filter((w) => w.completed).length ?? 0;
  const totalWorkouts = workoutPlan?.workouts.length ?? 0;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING,';
    if (hour < 17) return 'GOOD AFTERNOON,';
    return 'GOOD EVENING,';
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.ember}
          />
        }
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerStyle]}>
          <View>
            <Text style={styles.greeting}>{getGreeting()}</Text>
            <Text style={styles.heroTitle}>{heroClass.name}</Text>
          </View>
          <View style={[styles.classIcon, { backgroundColor: heroClass.bgColor, borderColor: heroClass.color }]}>
            <Text style={styles.classEmoji}>{heroClass.icon}</Text>
          </View>
        </Animated.View>

        {/* Hero Status Card */}
        <Animated.View style={cardStyle}>
          <View style={styles.statusCard}>
            {/* Ember glow top border */}
            <View style={styles.statusCardGlow} />

            <View style={styles.statusCardContent}>
              <View style={styles.statusRow}>
                <View>
                  <Text style={styles.statusLabel}>HERO STATUS</Text>
                  <Text style={styles.statusClass}>{heroClass.subtitle}</Text>
                </View>
                <View style={styles.levelCircle}>
                  <Text style={styles.levelCircleLabel}>LVL</Text>
                  <Text style={styles.levelCircleNumber}>{xpData.level}</Text>
                </View>
              </View>

              <XPBar
                percentage={xpData.percentage}
                level={xpData.level}
                currentXP={xpData.currentXP}
                xpNeeded={xpData.xpNeeded}
              />

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{gameStats.totalWorkouts}</Text>
                  <Text style={styles.statLabel}>QUESTS</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{gameStats.totalXP}</Text>
                  <Text style={styles.statLabel}>TOTAL XP</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>{completedCount}/{totalWorkouts}</Text>
                  <Text style={styles.statLabel}>PROGRESS</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Streak Counter */}
        <View style={styles.streakCard}>
          <View style={styles.streakLeft}>
            <Text style={styles.streakFlame}>🔥</Text>
            <View>
              <Text style={styles.streakLabel}>CURRENT STREAK</Text>
              <Text style={styles.streakValue}>
                {gameStats.currentStreak}{' '}
                <Text style={styles.streakUnit}>
                  {gameStats.currentStreak === 1 ? 'DAY' : 'DAYS'}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.streakRight}>
            <Text style={styles.streakMaxLabel}>BEST</Text>
            <Text style={styles.streakMaxValue}>{gameStats.maxStreak}d</Text>
          </View>
        </View>

        {/* Daily Quest */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>DAILY QUEST</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/workout')}>
            <Text style={styles.seeAll}>VIEW ALL →</Text>
          </TouchableOpacity>
        </View>

        {nextWorkout ? (
          <TouchableOpacity
            style={styles.questCard}
            onPress={() =>
              router.push({
                pathname: '/workout/[id]',
                params: { id: nextWorkout.id },
              })
            }
            activeOpacity={0.85}
          >
            <View style={styles.questTop}>
              <View style={styles.questBadge}>
                <Text style={styles.questBadgeText}>WEEK {nextWorkout.week}</Text>
              </View>
              <View style={styles.questXP}>
                <Text style={styles.questXPText}>+{nextWorkout.totalXP} XP</Text>
              </View>
            </View>
            <Text style={styles.questName}>{nextWorkout.name}</Text>
            <Text style={styles.questType}>{nextWorkout.type}</Text>
            <View style={styles.questMeta}>
              <View style={styles.questMetaItem}>
                <Text style={styles.questMetaIcon}>⏱️</Text>
                <Text style={styles.questMetaText}>{nextWorkout.duration} min</Text>
              </View>
              <View style={styles.questMetaItem}>
                <Text style={styles.questMetaIcon}>💪</Text>
                <Text style={styles.questMetaText}>{nextWorkout.exercises.length} exercises</Text>
              </View>
              <View style={styles.questMetaItem}>
                <Text style={styles.questMetaIcon}>⚡</Text>
                <Text style={styles.questMetaText}>{nextWorkout.difficulty}</Text>
              </View>
            </View>
            <View style={styles.questStartBtn}>
              <Text style={styles.questStartText}>START QUEST  →</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View style={styles.allDoneCard}>
            <Text style={styles.allDoneEmoji}>🏆</Text>
            <Text style={styles.allDoneTitle}>ALL QUESTS COMPLETE!</Text>
            <Text style={styles.allDoneText}>{"You've conquered your training cycle."}</Text>
            <TouchableOpacity
              style={styles.regenBtn}
              onPress={() => router.push('/(tabs)/workout')}
            >
              <Text style={styles.regenBtnText}>GENERATE NEW CYCLE</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Stats */}
        <Text style={styles.sectionTitle}>BADGES EARNED</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
          {gameStats.earnedBadges.length > 0 ? (
            gameStats.earnedBadges.map((badgeId) => (
              <View key={badgeId} style={styles.badgeChip}>
                <Text style={styles.badgeChipText}>{badgeId.toUpperCase().replace(/_/g, ' ')}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noBadgesCard}>
              <Text style={styles.noBadgesText}>Complete quests to earn badges! 🏅</Text>
            </View>
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  loading: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: COLORS.ember,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  greeting: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
    marginTop: 2,
  },
  classIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  classEmoji: {
    fontSize: 26,
  },
  // Status Card
  statusCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    overflow: 'hidden',
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  statusCardGlow: {
    height: 2,
    backgroundColor: COLORS.ember,
  },
  statusCardContent: {
    padding: 20,
    gap: 16,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  statusClass: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  levelCircle: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: COLORS.emberGlow,
    borderWidth: 1.5,
    borderColor: COLORS.ember,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelCircleLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  levelCircleNumber: {
    color: COLORS.ember,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: COLORS.obsidianBorder,
  },
  // Streak
  streakCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  streakFlame: {
    fontSize: 32,
  },
  streakLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  streakValue: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
  },
  streakUnit: {
    fontSize: 14,
    color: COLORS.textLightMuted,
    fontWeight: '600',
  },
  streakRight: {
    alignItems: 'center',
    backgroundColor: COLORS.obsidianCardAlt,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  streakMaxLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  streakMaxValue: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: '900',
  },
  // Section
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  sectionTitle: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  seeAll: {
    color: COLORS.ember,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  // Quest Card
  questCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 0, 0.25)',
    padding: 20,
    gap: 10,
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  questTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questBadge: {
    backgroundColor: COLORS.obsidianCardAlt,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  questBadgeText: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  questXP: {
    backgroundColor: COLORS.emberGlow,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.ember,
  },
  questXPText: {
    color: COLORS.ember,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  questName: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
  questType: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  questMeta: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  questMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questMetaIcon: {
    fontSize: 14,
  },
  questMetaText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  questStartBtn: {
    backgroundColor: COLORS.ember,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  questStartText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  // All done
  allDoneCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.gold,
    padding: 28,
    alignItems: 'center',
    gap: 10,
  },
  allDoneEmoji: { fontSize: 40 },
  allDoneTitle: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
  },
  allDoneText: {
    color: COLORS.textLightMuted,
    fontSize: 14,
  },
  regenBtn: {
    backgroundColor: COLORS.gold,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  regenBtnText: {
    color: COLORS.obsidian,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  // Badges
  badgesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  badgeChip: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.gold,
  },
  badgeChipText: {
    color: COLORS.gold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  noBadgesCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  noBadgesText: {
    color: COLORS.textLightMuted,
    fontSize: 13,
  },
});
