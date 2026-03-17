import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { COLORS, BADGES } from '@/lib/constants';
import { loadAppData } from '@/lib/storage';
import { getXPProgress } from '@/lib/leveling';
import { AppData } from '@/lib/types';

const { width } = Dimensions.get('window');
const DAY_SIZE = (width - 40 - 6 * 6) / 7;

function CalendarView({ completedDates }: { completedDates: Set<string> }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = now.getDate();

  const monthName = now.toLocaleString('default', { month: 'long' }).toUpperCase();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <View style={calStyles.container}>
      <Text style={calStyles.monthTitle}>{monthName} {year}</Text>
      <View style={calStyles.dayNamesRow}>
        {dayNames.map((d) => (
          <Text key={d} style={calStyles.dayName}>{d}</Text>
        ))}
      </View>
      <View style={calStyles.grid}>
        {cells.map((day, idx) => {
          if (day === null) return <View key={`empty-${idx}`} style={calStyles.cell} />;
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isCompleted = completedDates.has(dateStr);
          const isToday = day === today;
          return (
            <View
              key={`day-${day}`}
              style={[
                calStyles.cell,
                isToday && calStyles.cellToday,
                isCompleted && calStyles.cellCompleted,
              ]}
            >
              <Text
                style={[
                  calStyles.cellText,
                  isToday && calStyles.cellTextToday,
                  isCompleted && calStyles.cellTextCompleted,
                ]}
              >
                {day}
              </Text>
              {isCompleted && <View style={calStyles.completedDot} />}
            </View>
          );
        })}
      </View>
    </View>
  );
}

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [completedDates, setCompletedDates] = useState<Set<string>>(new Set());

  useFocusEffect(
    useCallback(() => {
      loadAppData().then((data) => {
        setAppData(data);
        const dates = new Set(
          data.completedWorkouts.map((w) => w.completedAt.split('T')[0])
        );
        setCompletedDates(dates);
      });
    }, [])
  );

  if (!appData) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      </View>
    );
  }

  const { gameStats, completedWorkouts } = appData;
  const xpData = getXPProgress(gameStats.totalXP);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEyebrow}>CHRONICLES</Text>
          <Text style={styles.headerTitle}>PROGRESSION</Text>
        </View>

        {/* XP Progression Card */}
        <View style={styles.xpCard}>
          <View style={styles.xpCardGlow} />
          <View style={styles.xpCardContent}>
            <Text style={styles.cardLabel}>HERO PROGRESSION</Text>
            <View style={styles.xpMainRow}>
              <View>
                <Text style={styles.levelBig}>{xpData.level}</Text>
                <Text style={styles.levelLabel}>CURRENT LEVEL</Text>
              </View>
              <View style={styles.xpDetails}>
                <View style={styles.xpDetailRow}>
                  <Text style={styles.xpDetailLabel}>TOTAL XP</Text>
                  <Text style={styles.xpDetailValue}>{gameStats.totalXP.toLocaleString()}</Text>
                </View>
                <View style={styles.xpDetailRow}>
                  <Text style={styles.xpDetailLabel}>NEXT LEVEL</Text>
                  <Text style={styles.xpDetailValue}>{xpData.xpNeeded - xpData.currentXP} XP</Text>
                </View>
                <View style={styles.xpDetailRow}>
                  <Text style={styles.xpDetailLabel}>WORKOUTS</Text>
                  <Text style={styles.xpDetailValue}>{gameStats.totalWorkouts}</Text>
                </View>
              </View>
            </View>

            {/* XP Progress bar */}
            <View style={styles.xpBarContainer}>
              <View style={styles.xpBarTrack}>
                <View
                  style={[
                    styles.xpBarFill,
                    { width: `${xpData.percentage * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.xpBarText}>
                {xpData.currentXP} / {xpData.xpNeeded} XP TO LEVEL {xpData.level + 1}
              </Text>
            </View>
          </View>
        </View>

        {/* Streak Stats */}
        <View style={styles.streakRow}>
          <View style={styles.streakStat}>
            <Text style={styles.streakStatEmoji}>🔥</Text>
            <Text style={styles.streakStatValue}>{gameStats.currentStreak}</Text>
            <Text style={styles.streakStatLabel}>CURRENT STREAK</Text>
          </View>
          <View style={styles.streakStatDivider} />
          <View style={styles.streakStat}>
            <Text style={styles.streakStatEmoji}>🏆</Text>
            <Text style={styles.streakStatValue}>{gameStats.maxStreak}</Text>
            <Text style={styles.streakStatLabel}>BEST STREAK</Text>
          </View>
        </View>

        {/* Calendar */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>TRAINING CALENDAR</Text>
        </View>
        <View style={styles.calendarCard}>
          <CalendarView completedDates={completedDates} />
        </View>

        {/* Badge Gallery */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>BADGE GALLERY</Text>
          <Text style={styles.sectionCount}>
            {gameStats.earnedBadges.length}/{BADGES.length}
          </Text>
        </View>
        <View style={styles.badgeGrid}>
          {BADGES.map((badge) => {
            const earned = gameStats.earnedBadges.includes(badge.id as never);
            return (
              <View
                key={badge.id}
                style={[
                  styles.badgeCard,
                  earned && { borderColor: badge.color, backgroundColor: `${badge.color}10` },
                ]}
              >
                <Text style={[styles.badgeIcon, !earned && styles.badgeIconLocked]}>
                  {earned ? badge.icon : '🔒'}
                </Text>
                <Text style={[styles.badgeName, earned && { color: badge.color }]}>
                  {badge.name}
                </Text>
                <Text style={styles.badgeDesc}>{badge.description}</Text>
              </View>
            );
          })}
        </View>

        {/* Recent Workouts */}
        {completedWorkouts.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>RECENT QUESTS</Text>
            </View>
            <View style={styles.recentList}>
              {[...completedWorkouts]
                .reverse()
                .slice(0, 10)
                .map((cw, idx) => {
                  const workout = appData.workoutPlan?.workouts.find(
                    (w) => w.id === cw.workoutId
                  );
                  return (
                    <View key={`${cw.workoutId}-${idx}`} style={styles.recentItem}>
                      <View style={styles.recentLeft}>
                        <Text style={styles.recentCheck}>✓</Text>
                        <View>
                          <Text style={styles.recentName}>
                            {workout?.name ?? 'WORKOUT'}
                          </Text>
                          <Text style={styles.recentDate}>
                            {new Date(cw.completedAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.recentXP}>+{cw.xpEarned} XP</Text>
                    </View>
                  );
                })}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const calStyles = StyleSheet.create({
  container: { gap: 12 },
  monthTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  dayNamesRow: {
    flexDirection: 'row',
    gap: 6,
  },
  dayName: {
    width: DAY_SIZE,
    textAlign: 'center',
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  cell: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.obsidianCardAlt,
  },
  cellToday: {
    borderWidth: 1.5,
    borderColor: COLORS.ember,
    backgroundColor: COLORS.emberGlow,
  },
  cellCompleted: {
    backgroundColor: COLORS.greenGlow,
    borderWidth: 1,
    borderColor: COLORS.green,
  },
  cellText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  cellTextToday: {
    color: COLORS.ember,
    fontWeight: '900',
  },
  cellTextCompleted: {
    color: COLORS.green,
    fontWeight: '900',
  },
  completedDot: {
    position: 'absolute',
    bottom: 3,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.green,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  loading: {
    flex: 1,
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
    gap: 2,
    marginBottom: 4,
  },
  headerEyebrow: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '900',
    letterSpacing: 1,
  },
  // XP Card
  xpCard: {
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
  xpCardGlow: {
    height: 2,
    backgroundColor: COLORS.ember,
  },
  xpCardContent: {
    padding: 20,
    gap: 16,
  },
  cardLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  xpMainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
  },
  levelBig: {
    color: COLORS.ember,
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 60,
  },
  levelLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  xpDetails: {
    flex: 1,
    gap: 8,
    paddingTop: 8,
  },
  xpDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpDetailLabel: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
  },
  xpDetailValue: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
  },
  xpBarContainer: { gap: 6 },
  xpBarTrack: {
    height: 8,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 4,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: COLORS.ember,
    borderRadius: 4,
  },
  xpBarText: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  // Streak row
  streakRow: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  streakStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  streakStatEmoji: { fontSize: 28 },
  streakStatValue: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
  },
  streakStatLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  streakStatDivider: {
    width: 1,
    height: 60,
    backgroundColor: COLORS.obsidianBorder,
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
  sectionCount: {
    color: COLORS.ember,
    fontSize: 12,
    fontWeight: '700',
  },
  // Calendar
  calendarCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
  },
  // Badge grid
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeCard: {
    width: (width - 40 - 10) / 2,
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    gap: 6,
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 32,
  },
  badgeIconLocked: {
    opacity: 0.4,
  },
  badgeName: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  badgeDesc: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
    opacity: 0.7,
  },
  // Recent
  recentList: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    overflow: 'hidden',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.obsidianBorder,
  },
  recentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recentCheck: {
    color: COLORS.green,
    fontSize: 16,
    fontWeight: '900',
    width: 24,
    textAlign: 'center',
  },
  recentName: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  recentDate: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    marginTop: 2,
  },
  recentXP: {
    color: COLORS.ember,
    fontSize: 13,
    fontWeight: '800',
  },
});
