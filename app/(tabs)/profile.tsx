import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { COLORS, HERO_CLASSES, FITNESS_GOALS, COMMITMENT_LEVELS } from '@/lib/constants';
import { loadAppData, resetAppData } from '@/lib/storage';
import { getXPProgress } from '@/lib/leveling';
import { AppData } from '@/lib/types';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [appData, setAppData] = useState<AppData | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadAppData().then(setAppData);
    }, [])
  );

  const handleReset = () => {
    Alert.alert(
      'RESET HERO?',
      'This will permanently delete all your progress, XP, and badges. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'RESET EVERYTHING',
          style: 'destructive',
          onPress: async () => {
            if (Platform.OS !== 'web') {
              Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
            }
            await resetAppData();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  if (!appData || !appData.userProfile) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>LOADING...</Text>
        </View>
      </View>
    );
  }

  const { userProfile, gameStats } = appData;
  const heroClass = HERO_CLASSES[userProfile.heroClass];
  const xpData = getXPProgress(gameStats.totalXP);
  const goals = FITNESS_GOALS.filter((g) => userProfile.goals.includes(g.id as never));
  const commitment = COMMITMENT_LEVELS.find((c) => c.id === userProfile.commitment);

  const statItems = [
    { label: 'LEVEL', value: String(xpData.level), icon: '⭐' },
    { label: 'TOTAL XP', value: gameStats.totalXP.toLocaleString(), icon: '⚡' },
    { label: 'WORKOUTS', value: String(gameStats.totalWorkouts), icon: '💪' },
    { label: 'BEST STREAK', value: `${gameStats.maxStreak}d`, icon: '🔥' },
    { label: 'BADGES', value: String(gameStats.earnedBadges.length), icon: '🏅' },
    { label: 'CLASS', value: heroClass.name, icon: heroClass.icon },
  ];

  return (
    // Light mode for profile screen
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 20 }]}
      >
        {/* Hero Card - Dark */}
        <View style={styles.heroCard}>
          <View style={styles.heroCardGlow} />
          <View style={styles.heroCardContent}>
            <View style={[styles.heroIconBg, { backgroundColor: heroClass.bgColor, borderColor: heroClass.color }]}>
              <Text style={styles.heroIcon}>{heroClass.icon}</Text>
            </View>
            <View style={styles.heroInfo}>
              <Text style={styles.heroClassName}>{heroClass.name}</Text>
              <Text style={styles.heroClassSubtitle}>{heroClass.subtitle}</Text>
              <View style={styles.heroBadgeRow}>
                <View style={[styles.heroBadge, { backgroundColor: heroClass.bgColor, borderColor: heroClass.color }]}>
                  <Text style={[styles.heroBadgeText, { color: heroClass.color }]}>
                    {heroClass.primaryStat.toUpperCase()}
                  </Text>
                </View>
                <View style={styles.levelBadge}>
                  <Text style={styles.levelBadgeText}>LVL {xpData.level}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* XP bar */}
          <View style={styles.xpSection}>
            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>XP PROGRESS</Text>
              <Text style={styles.xpValues}>{xpData.currentXP} / {xpData.xpNeeded}</Text>
            </View>
            <View style={styles.xpBarTrack}>
              <View style={[styles.xpBarFill, { width: `${xpData.percentage * 100}%` }]} />
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <Text style={styles.sectionTitle}>HERO STATS</Text>
        <View style={styles.statsGrid}>
          {statItems.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Class Skills */}
        <Text style={styles.sectionTitle}>CLASS SKILLS</Text>
        <View style={styles.skillsCard}>
          {heroClass.skills.map((skill, idx) => (
            <View key={skill} style={[styles.skillRow, idx > 0 && styles.skillRowBorder]}>
              <View style={styles.skillDot} />
              <Text style={styles.skillText}>{skill}</Text>
              <Text style={styles.skillLevelText}>TRAINED</Text>
            </View>
          ))}
        </View>

        {/* Goals */}
        <Text style={styles.sectionTitle}>ACTIVE GOALS</Text>
        <View style={styles.goalsCard}>
          {goals.map((goal, idx) => (
            <View key={goal.id} style={[styles.goalRow, idx > 0 && styles.goalRowBorder]}>
              <Text style={styles.goalIcon}>{goal.icon}</Text>
              <View style={styles.goalTexts}>
                <Text style={styles.goalLabel}>{goal.label}</Text>
                <Text style={styles.goalDesc}>{goal.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Commitment */}
        {commitment && (
          <>
            <Text style={styles.sectionTitle}>TRAINING COMMITMENT</Text>
            <View style={styles.commitmentCard}>
              <Text style={styles.commitmentIcon}>{commitment.icon}</Text>
              <View>
                <Text style={styles.commitmentLabel}>{commitment.label}</Text>
                <Text style={styles.commitmentDesc}>{commitment.description}</Text>
              </View>
              <View style={styles.commitmentBadge}>
                <Text style={styles.commitmentDays}>{commitment.days}</Text>
                <Text style={styles.commitmentDaysLabel}>DAYS/WK</Text>
              </View>
            </View>
          </>
        )}

        {/* Workout Type */}
        <View style={styles.workoutTypeCard}>
          <Text style={styles.workoutTypeLabel}>SPECIALIZATION</Text>
          <Text style={styles.workoutTypeValue}>{heroClass.workoutType}</Text>
          <Text style={styles.workoutTypeDesc}>{heroClass.description}</Text>
        </View>

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.8}>
          <Text style={styles.resetBtnText}>⚠️  RESET HERO & START OVER</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
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
    gap: 14,
  },
  // Hero Card (dark style)
  heroCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  heroCardGlow: {
    height: 3,
    backgroundColor: COLORS.ember,
  },
  heroCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },
  heroIconBg: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  heroIcon: {
    fontSize: 36,
  },
  heroInfo: {
    flex: 1,
    gap: 4,
  },
  heroClassName: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 2,
  },
  heroClassSubtitle: {
    color: COLORS.textLightMuted,
    fontSize: 13,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  heroBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  heroBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  levelBadge: {
    backgroundColor: COLORS.emberGlow,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.ember,
  },
  levelBadgeText: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  xpSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  xpLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  xpValues: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '600',
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
  // Section Title
  sectionTitle: {
    color: COLORS.textDarkMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 4,
  },
  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    width: '30%',
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: { fontSize: 22 },
  statValue: {
    color: COLORS.textDark,
    fontSize: 18,
    fontWeight: '900',
  },
  statLabel: {
    color: COLORS.textDarkMuted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  // Skills
  skillsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  skillRowBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightBorder,
  },
  skillDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ember,
  },
  skillText: {
    flex: 1,
    color: COLORS.textDark,
    fontSize: 14,
    fontWeight: '600',
  },
  skillLevelText: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  // Goals
  goalsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  goalRowBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.lightBorder,
  },
  goalIcon: { fontSize: 20 },
  goalTexts: { flex: 1 },
  goalLabel: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  goalDesc: {
    color: COLORS.textDarkMuted,
    fontSize: 11,
    marginTop: 1,
  },
  // Commitment
  commitmentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  commitmentIcon: { fontSize: 28 },
  commitmentLabel: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
  },
  commitmentDesc: {
    color: COLORS.textDarkMuted,
    fontSize: 12,
  },
  commitmentBadge: {
    marginLeft: 'auto',
    alignItems: 'center',
    backgroundColor: COLORS.ember,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commitmentDays: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
  },
  commitmentDaysLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  // Workout type
  workoutTypeCard: {
    backgroundColor: COLORS.obsidian,
    borderRadius: 12,
    padding: 20,
    gap: 6,
  },
  workoutTypeLabel: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  workoutTypeValue: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  workoutTypeDesc: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  // Reset
  resetBtn: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.red,
    marginTop: 8,
  },
  resetBtnText: {
    color: COLORS.red,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
});
