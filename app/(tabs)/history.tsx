import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import { COLORS, BADGES, HERO_CLASSES } from '@/lib/constants';
import { loadAppData, getCompletedDates } from '@/lib/storage';
import { getXPProgress } from '@/lib/leveling';
import { AppData, GlobalRankingEntry } from '@/lib/types';
import { getGlobalRankings } from '@/lib/supabase';
import { useAuth } from '@fastshot/auth';

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
              key={dateStr}
              style={[
                calStyles.cell,
                isCompleted && calStyles.cellCompleted,
                isToday && !isCompleted && calStyles.cellToday,
              ]}
            >
              <Text
                style={[
                  calStyles.dayNum,
                  isCompleted && calStyles.dayNumCompleted,
                  isToday && !isCompleted && calStyles.dayNumToday,
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

const calStyles = StyleSheet.create({
  container: { gap: 12 },
  monthTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 2,
    textAlign: 'center',
  },
  dayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayName: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    width: DAY_SIZE,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  cell: {
    width: DAY_SIZE,
    height: DAY_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    gap: 2,
  },
  cellCompleted: {
    backgroundColor: COLORS.ember,
  },
  cellToday: {
    borderWidth: 1.5,
    borderColor: COLORS.ember,
  },
  dayNum: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  dayNumCompleted: {
    color: COLORS.white,
    fontWeight: '800',
  },
  dayNumToday: {
    color: COLORS.ember,
    fontWeight: '800',
  },
  completedDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});

function GlobalRankingRow({
  entry,
  rank,
  isCurrentUser,
}: {
  entry: GlobalRankingEntry;
  rank: number;
  isCurrentUser: boolean;
}) {
  const classInfo = HERO_CLASSES[entry.hero_class as keyof typeof HERO_CLASSES];
  const rankEmoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`;

  return (
    <View style={[rankStyles.row, isCurrentUser && rankStyles.rowCurrent]}>
      <Text style={[rankStyles.rankText, rank <= 3 && { fontSize: 18 }]}>{rankEmoji}</Text>
      <View style={rankStyles.heroInfo}>
        <Text style={rankStyles.heroClass}>
          {classInfo?.icon ?? '⚡'} {classInfo?.name ?? entry.hero_class.toUpperCase()}
        </Text>
        {isCurrentUser && <Text style={rankStyles.youBadge}>YOU</Text>}
      </View>
      <View style={rankStyles.stats}>
        <Text style={rankStyles.level}>LV {entry.level}</Text>
        <Text style={rankStyles.xp}>{entry.total_xp.toLocaleString()} XP</Text>
      </View>
    </View>
  );
}

const rankStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  rowCurrent: {
    borderColor: COLORS.ember,
    backgroundColor: COLORS.emberGlow,
  },
  rankText: {
    fontSize: 14,
    fontWeight: '900',
    color: COLORS.textLightMuted,
    width: 32,
    textAlign: 'center',
  },
  heroInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroClass: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  youBadge: {
    backgroundColor: COLORS.ember,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: COLORS.white,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  stats: { alignItems: 'flex-end', gap: 2 },
  level: {
    color: COLORS.ember,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  xp: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '600',
  },
});

export default function HistoryScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();
  const [appData, setAppData] = useState<AppData | null>(null);
  const [completedDates, setCompletedDates] = useState<Set<string>>(new Set());
  const [rankings, setRankings] = useState<GlobalRankingEntry[]>([]);
  const [rankingsLoading, setRankingsLoading] = useState(false);

  const loadData = useCallback(async () => {
    const data = await loadAppData();
    setAppData(data);
    const dates = await getCompletedDates();
    setCompletedDates(new Set(dates));
  }, []);

  const loadRankings = useCallback(async () => {
    setRankingsLoading(true);
    const data = await getGlobalRankings();
    setRankings(data.map((entry, idx) => ({ ...entry, rank: idx + 1 })));
    setRankingsLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
      loadRankings();
    }, [loadData, loadRankings])
  );

  if (!appData) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={COLORS.ember} />
      </View>
    );
  }

  const { gameStats, workoutPlan, completedWorkouts } = appData;
  const xpData = getXPProgress(gameStats.totalXP);
  const recentWorkouts = [...completedWorkouts].reverse().slice(0, 10);

  // Find current user's rank
  const myRank = user?.id ? rankings.findIndex((r) => r.id === user.id) : -1;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerEyebrow}>ACHIEVEMENT HALL</Text>
          <Text style={styles.headerTitle}>CHRONICLES</Text>
        </View>

        {/* XP Progression */}
        <View style={styles.card}>
          <View style={styles.cardGlow} />
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>XP PROGRESSION</Text>
            <View style={styles.xpMainRow}>
              <View>
                <Text style={styles.xpLevel}>Level {xpData.level}</Text>
                <Text style={styles.xpTotalValue}>{gameStats.totalXP.toLocaleString()} XP</Text>
              </View>
              <View style={styles.xpNextLevel}>
                <Text style={styles.xpNextLabel}>NEXT LEVEL</Text>
                <Text style={styles.xpNextValue}>{xpData.xpNeeded - xpData.currentXP} XP</Text>
              </View>
            </View>
            <View style={styles.xpBarTrack}>
              <View style={[styles.xpBarFill, { width: `${xpData.percentage * 100}%` }]} />
            </View>
            <Text style={styles.xpBarLabel}>
              {xpData.currentXP} / {xpData.xpNeeded} XP to Level {xpData.level + 1}
            </Text>
          </View>
        </View>

        {/* Streak Stats */}
        <View style={styles.streakGrid}>
          <View style={styles.streakStat}>
            <Text style={styles.streakStatIcon}>🔥</Text>
            <Text style={styles.streakStatValue}>{gameStats.currentStreak}</Text>
            <Text style={styles.streakStatLabel}>CURRENT{'\n'}STREAK</Text>
          </View>
          <View style={styles.streakDivider} />
          <View style={styles.streakStat}>
            <Text style={styles.streakStatIcon}>👑</Text>
            <Text style={styles.streakStatValue}>{gameStats.maxStreak}</Text>
            <Text style={styles.streakStatLabel}>BEST{'\n'}STREAK</Text>
          </View>
          <View style={styles.streakDivider} />
          <View style={styles.streakStat}>
            <Text style={styles.streakStatIcon}>⚔️</Text>
            <Text style={styles.streakStatValue}>{gameStats.totalWorkouts}</Text>
            <Text style={styles.streakStatLabel}>TOTAL{'\n'}QUESTS</Text>
          </View>
        </View>

        {/* Training Calendar */}
        <View style={styles.card}>
          <View style={[styles.cardGlow, { backgroundColor: COLORS.ember }]} />
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>TRAINING CALENDAR</Text>
            <CalendarView completedDates={completedDates} />
          </View>
        </View>

        {/* Global Ranking */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>GLOBAL RANKING</Text>
          {myRank >= 0 && (
            <View style={styles.myRankBadge}>
              <Text style={styles.myRankText}>YOUR RANK: #{myRank + 1}</Text>
            </View>
          )}
        </View>

        <View style={styles.rankingCard}>
          {rankingsLoading ? (
            <View style={styles.rankingLoading}>
              <ActivityIndicator color={COLORS.ember} size="small" />
              <Text style={styles.rankingLoadingText}>Fetching rankings...</Text>
            </View>
          ) : rankings.length === 0 ? (
            <View style={styles.rankingEmpty}>
              <Text style={styles.rankingEmptyIcon}>🌍</Text>
              <Text style={styles.rankingEmptyTitle}>CONNECT SUPABASE</Text>
              <Text style={styles.rankingEmptyText}>
                Global rankings sync when Supabase is connected to your project.
              </Text>
            </View>
          ) : (
            <View style={styles.rankingList}>
              {rankings.slice(0, 10).map((entry, idx) => (
                <GlobalRankingRow
                  key={entry.id}
                  entry={entry}
                  rank={idx + 1}
                  isCurrentUser={entry.id === user?.id}
                />
              ))}
            </View>
          )}
        </View>

        {/* Badges Gallery */}
        <Text style={styles.sectionTitle}>BADGE COLLECTION</Text>
        <View style={styles.badgeGrid}>
          {BADGES.map((badge) => {
            const isEarned = gameStats.earnedBadges.includes(badge.id as never);
            return (
              <View
                key={badge.id}
                style={[styles.badgeCard, isEarned && { borderColor: badge.color }]}
              >
                <View
                  style={[
                    styles.badgeIconWrapper,
                    isEarned
                      ? { backgroundColor: `${badge.color}20` }
                      : { backgroundColor: COLORS.obsidianCardAlt },
                  ]}
                >
                  <Text style={[styles.badgeIcon, !isEarned && styles.badgeIconLocked]}>
                    {isEarned ? badge.icon : '🔒'}
                  </Text>
                </View>
                <Text style={[styles.badgeName, isEarned && { color: badge.color }]}>
                  {badge.name}
                </Text>
                <Text style={styles.badgeDesc}>{badge.description}</Text>
              </View>
            );
          })}
        </View>

        {/* Recent Quests */}
        {recentWorkouts.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>RECENT QUESTS</Text>
            <View style={styles.recentList}>
              {recentWorkouts.map((cw) => {
                const workout = workoutPlan?.workouts.find((w) => w.id === cw.workoutId);
                return (
                  <View key={cw.workoutId + cw.completedAt} style={styles.recentItem}>
                    <View style={styles.recentItemLeft}>
                      <Text style={styles.recentItemName}>
                        {workout?.name ?? 'Quest Completed'}
                      </Text>
                      <Text style={styles.recentItemDate}>
                        {new Date(cw.completedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </Text>
                    </View>
                    <View style={styles.recentXPBadge}>
                      <Text style={styles.recentXPText}>+{cw.xpEarned} XP</Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </>
        )}

        {/* Premium Analytics Tease */}
        <TouchableOpacity
          style={styles.analyticsTease}
          onPress={() => router.push('/paywall')}
          activeOpacity={0.85}
        >
          <View style={styles.analyticsBlur}>
            <View style={styles.analyticsBlurLine} />
            <View style={styles.analyticsBlurLine} />
            <View style={[styles.analyticsBlurLine, { width: '60%' }]} />
          </View>
          <View style={styles.analyticsLock}>
            <Text style={styles.analyticsLockIcon}>🔒</Text>
            <Text style={styles.analyticsLockTitle}>ADVANCED ANALYTICS</Text>
            <Text style={styles.analyticsLockSub}>Unlock with Somatics+</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.obsidian },
  loading: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: { padding: 20, gap: 16 },
  header: { gap: 2, marginBottom: 4 },
  headerEyebrow: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // Cards
  card: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    overflow: 'hidden',
  },
  cardGlow: {
    height: 2,
    backgroundColor: COLORS.ember,
  },
  cardContent: { padding: 20, gap: 14 },
  cardLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  // XP
  xpMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  xpLevel: {
    color: COLORS.ember,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  xpTotalValue: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginTop: 2,
  },
  xpNextLevel: { alignItems: 'flex-end' },
  xpNextLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  xpNextValue: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '900',
    marginTop: 2,
  },
  xpBarTrack: {
    height: 6,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: COLORS.ember,
    borderRadius: 3,
  },
  xpBarLabel: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    textAlign: 'center',
  },
  // Streak grid
  streakGrid: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakStat: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  streakStatIcon: { fontSize: 26 },
  streakStatValue: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
  },
  streakStatLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  streakDivider: {
    width: 1,
    height: 48,
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
    marginTop: 4,
  },
  myRankBadge: {
    backgroundColor: COLORS.emberGlow,
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  myRankText: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  // Rankings
  rankingCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    overflow: 'hidden',
    padding: 12,
  },
  rankingLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 16,
  },
  rankingLoadingText: {
    color: COLORS.textLightMuted,
    fontSize: 13,
  },
  rankingEmpty: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  rankingEmptyIcon: { fontSize: 36 },
  rankingEmptyTitle: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  rankingEmptyText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  rankingList: { gap: 6 },
  // Badges
  badgeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  badgeCard: {
    width: (width - 40 - 10) / 2,
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 14,
    gap: 6,
    alignItems: 'center',
  },
  badgeIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIcon: { fontSize: 26 },
  badgeIconLocked: { opacity: 0.4 },
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
    lineHeight: 14,
    textAlign: 'center',
    opacity: 0.7,
  },
  // Recent quests
  recentList: { gap: 8 },
  recentItem: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentItemLeft: { flex: 1, gap: 3 },
  recentItemName: {
    color: COLORS.textLight,
    fontSize: 13,
    fontWeight: '700',
  },
  recentItemDate: {
    color: COLORS.textLightMuted,
    fontSize: 11,
  },
  recentXPBadge: {
    backgroundColor: COLORS.emberGlow,
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  recentXPText: { color: COLORS.ember, fontSize: 12, fontWeight: '900' },
  // Analytics tease
  analyticsTease: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.premiumGold,
    padding: 20,
    alignItems: 'center',
    gap: 12,
    overflow: 'hidden',
  },
  analyticsBlur: {
    width: '100%',
    gap: 10,
  },
  analyticsBlurLine: {
    height: 10,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 5,
    width: '100%',
  },
  analyticsLock: {
    alignItems: 'center',
    gap: 4,
  },
  analyticsLockIcon: { fontSize: 28 },
  analyticsLockTitle: {
    color: COLORS.premiumGold,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  analyticsLockSub: {
    color: COLORS.textLightMuted,
    fontSize: 12,
  },
});
