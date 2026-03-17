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
import { COLORS, HERO_CLASSES, FITNESS_GOALS, COMMITMENT_LEVELS, EQUIPMENT_OPTIONS } from '@/lib/constants';
import { loadAppData, resetAppData } from '@/lib/storage';
import { getXPProgress } from '@/lib/leveling';
import { AppData } from '@/lib/types';
import { useAuth } from '@fastshot/auth';
import XPBar from '@/components/XPBar';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [appData, setAppData] = useState<AppData | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadAppData().then(setAppData);
    }, [])
  );

  const handleSignOut = () => {
    Alert.alert(
      'SIGN OUT',
      'Are you sure you want to sign out of Somatics?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'SIGN OUT',
          style: 'destructive',
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

  const handleReset = () => {
    Alert.alert(
      'RESET HERO?',
      'This will permanently delete all local progress, XP, and badges. You will restart onboarding.',
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

  if (!appData?.userProfile) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>LOADING PROFILE...</Text>
        </View>
      </View>
    );
  }

  const { userProfile, gameStats } = appData;
  const heroClass = HERO_CLASSES[userProfile.heroClass];
  const xpData = getXPProgress(gameStats.totalXP);
  const equipment = EQUIPMENT_OPTIONS.find((e) => e.id === userProfile.equipment);

  const activeGoals = FITNESS_GOALS.filter((g) =>
    userProfile.goals.includes(g.id as never)
  );
  const commitmentLevel = COMMITMENT_LEVELS.find((c) => c.id === userProfile.commitment);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 20 }]}
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageHeaderEyebrow}>YOUR PROFILE</Text>
          <Text style={styles.pageHeaderTitle}>HERO DOSSIER</Text>
        </View>

        {/* Hero Card */}
        <View style={[styles.heroCard, { borderColor: heroClass.color }]}>
          <View style={[styles.heroCardTop, { backgroundColor: heroClass.color }]}>
            <Text style={styles.heroCardEmoji}>{heroClass.icon}</Text>
            <View>
              <Text style={styles.heroCardClass}>{heroClass.name}</Text>
              <Text style={styles.heroCardSubtitle}>{heroClass.subtitle}</Text>
            </View>
            <View style={styles.heroCardLevel}>
              <Text style={styles.heroCardLevelLabel}>LVL</Text>
              <Text style={styles.heroCardLevelNum}>{xpData.level}</Text>
            </View>
          </View>
          <View style={styles.heroCardBody}>
            {user?.email && (
              <View style={styles.emailRow}>
                <Text style={styles.emailIcon}>📧</Text>
                <Text style={styles.emailText}>{user.email}</Text>
              </View>
            )}
            <XPBar
              percentage={xpData.percentage}
              level={xpData.level}
              currentXP={xpData.currentXP}
              xpNeeded={xpData.xpNeeded}
            />
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {[
            { label: 'LEVEL', value: String(xpData.level), icon: '⭐' },
            { label: 'TOTAL XP', value: gameStats.totalXP.toLocaleString(), icon: '⚡' },
            { label: 'QUESTS', value: String(gameStats.totalWorkouts), icon: '⚔️' },
            { label: 'BEST STREAK', value: `${gameStats.maxStreak}d`, icon: '🔥' },
            { label: 'BADGES', value: String(gameStats.earnedBadges.length), icon: '🏅' },
            { label: 'STAT', value: heroClass.primaryStat.toUpperCase(), icon: heroClass.icon },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Equipment Profile */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>ARSENAL</Text>
          <View style={styles.equipmentRow}>
            <Text style={styles.equipmentIcon}>{equipment?.icon ?? '⚔️'}</Text>
            <View>
              <Text style={styles.equipmentLabel}>{equipment?.label ?? 'UNKNOWN'}</Text>
              <Text style={styles.equipmentSub}>{equipment?.subtitle ?? ''}</Text>
            </View>
          </View>
        </View>

        {/* Skills */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>CLASS SKILLS</Text>
          <View style={styles.skillsList}>
            {heroClass.skills.map((skill) => (
              <View key={skill} style={[styles.skillChip, { borderColor: heroClass.color }]}>
                <Text style={[styles.skillChipText, { color: heroClass.color }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Active Goals */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>ACTIVE MISSIONS</Text>
          <View style={styles.goalsList}>
            {activeGoals.map((goal) => (
              <View key={goal.id} style={styles.goalRow}>
                <Text style={styles.goalRowIcon}>{goal.icon}</Text>
                <View>
                  <Text style={styles.goalRowLabel}>{goal.label}</Text>
                  <Text style={styles.goalRowDesc}>{goal.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Training Schedule */}
        <View style={styles.infoCard}>
          <Text style={styles.infoCardTitle}>TRAINING PROTOCOL</Text>
          {commitmentLevel && (
            <View style={styles.commitmentRow}>
              <Text style={styles.commitmentIcon}>{commitmentLevel.icon}</Text>
              <View>
                <Text style={styles.commitmentLabel}>{commitmentLevel.label}</Text>
                <Text style={styles.commitmentDesc}>{commitmentLevel.description}</Text>
              </View>
              <View style={styles.commitmentDays}>
                <Text style={styles.commitmentDaysNum}>{commitmentLevel.days}</Text>
                <Text style={styles.commitmentDaysLabel}>DAYS/WK</Text>
              </View>
            </View>
          )}
        </View>

        {/* Upgrade Banner */}
        <TouchableOpacity
          style={styles.upgradeBanner}
          onPress={() => router.push('/paywall')}
          activeOpacity={0.85}
        >
          <Text style={styles.upgradeBannerIcon}>⚡</Text>
          <View style={styles.upgradeBannerText}>
            <Text style={styles.upgradeBannerTitle}>UPGRADE TO SOMATICS+</Text>
            <Text style={styles.upgradeBannerSub}>Full chapters, analytics & more</Text>
          </View>
          <Text style={styles.upgradeBannerArrow}>→</Text>
        </TouchableOpacity>

        {/* Danger Zone */}
        <View style={styles.dangerZone}>
          <Text style={styles.dangerZoneTitle}>ACCOUNT</Text>

          <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.85}>
            <Text style={styles.signOutIcon}>🚪</Text>
            <Text style={styles.signOutText}>SIGN OUT</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.85}>
            <Text style={styles.resetBtnIcon}>⚠️</Text>
            <Text style={styles.resetBtnText}>RESET HERO PROGRESS</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>SOMATICS v1.0  ·  Built for legends</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.lightBg },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { color: COLORS.textDarkMuted, fontSize: 13, fontWeight: '700', letterSpacing: 2 },
  scroll: { paddingHorizontal: 20, paddingTop: 16, gap: 16 },
  // Header
  pageHeader: { gap: 2, marginBottom: 4 },
  pageHeaderEyebrow: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  pageHeaderTitle: {
    color: COLORS.textDark,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  // Hero Card
  heroCard: {
    backgroundColor: COLORS.lightCard,
    borderRadius: 16,
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  heroCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  heroCardEmoji: { fontSize: 36 },
  heroCardClass: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
  },
  heroCardSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  heroCardLevel: {
    marginLeft: 'auto',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  heroCardLevelLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroCardLevelNum: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 28,
  },
  heroCardBody: { padding: 16, gap: 12 },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emailIcon: { fontSize: 14 },
  emailText: {
    color: COLORS.textDarkMuted,
    fontSize: 13,
    fontWeight: '500',
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
    backgroundColor: COLORS.lightCard,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  // Info Card
  infoCard: {
    backgroundColor: COLORS.lightCard,
    borderRadius: 14,
    padding: 18,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  infoCardTitle: {
    color: COLORS.textDarkMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  // Equipment
  equipmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  equipmentIcon: { fontSize: 32 },
  equipmentLabel: {
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  equipmentSub: {
    color: COLORS.textDarkMuted,
    fontSize: 12,
    marginTop: 2,
  },
  // Skills
  skillsList: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip: {
    borderWidth: 1.5,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skillChipText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Goals
  goalsList: { gap: 10 },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  goalRowIcon: { fontSize: 22 },
  goalRowLabel: {
    color: COLORS.textDark,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  goalRowDesc: {
    color: COLORS.textDarkMuted,
    fontSize: 11,
    marginTop: 1,
  },
  // Commitment
  commitmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  commitmentIcon: { fontSize: 28 },
  commitmentLabel: {
    flex: 1,
    color: COLORS.textDark,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1,
  },
  commitmentDesc: {
    color: COLORS.textDarkMuted,
    fontSize: 12,
    marginTop: 2,
  },
  commitmentDays: {
    alignItems: 'center',
    backgroundColor: COLORS.ember,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  commitmentDaysNum: { color: COLORS.white, fontSize: 20, fontWeight: '900' },
  commitmentDaysLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  // Upgrade banner
  upgradeBanner: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.premiumGold,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  upgradeBannerIcon: { fontSize: 28 },
  upgradeBannerText: { flex: 1 },
  upgradeBannerTitle: {
    color: COLORS.premiumGold,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  upgradeBannerSub: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    marginTop: 2,
  },
  upgradeBannerArrow: {
    color: COLORS.premiumGold,
    fontSize: 20,
    fontWeight: '700',
  },
  // Danger Zone
  dangerZone: {
    backgroundColor: COLORS.lightCard,
    borderRadius: 14,
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  dangerZoneTitle: {
    color: COLORS.textDarkMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  signOutBtn: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  signOutIcon: { fontSize: 18 },
  signOutText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  resetBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  resetBtnIcon: { fontSize: 18 },
  resetBtnText: {
    color: COLORS.red,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  versionText: {
    color: COLORS.textDarkMuted,
    fontSize: 11,
    textAlign: 'center',
    opacity: 0.5,
    marginTop: 4,
    marginBottom: 8,
  },
});
