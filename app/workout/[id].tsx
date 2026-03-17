import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  Dimensions,
  Modal,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import * as WebBrowser from 'expo-web-browser';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
} from 'react-native-reanimated';
import { COLORS, HERO_CLASSES } from '@/lib/constants';
import { loadAppData, completeWorkout } from '@/lib/storage';
import {
  calculateWorkoutXP,
  updateStreakOnCompletion,
  checkNewBadges,
  getLevel,
} from '@/lib/leveling';
import { Workout, AppData } from '@/lib/types';
import ParticleEffect from '@/components/ParticleEffect';

const { width, height } = Dimensions.get('window');

function ExerciseRow({
  exercise,
  index,
  heroColor,
}: {
  exercise: { id: string; name: string; sets: number; reps: string; notes?: string };
  index: number;
  heroColor: string;
}) {
  const openDemo = async () => {
    const query = encodeURIComponent(`${exercise.name} proper form tutorial workout`);
    const url = `https://www.youtube.com/results?search_query=${query}`;
    try {
      await WebBrowser.openBrowserAsync(url, {
        toolbarColor: COLORS.obsidian,
        controlsColor: COLORS.ember,
      });
    } catch (err) {
      console.error('Failed to open browser:', err);
    }
  };

  return (
    <View style={[exStyles.row, { borderLeftColor: heroColor }]}>
      <View style={exStyles.indexBadge}>
        <Text style={exStyles.indexText}>{index + 1}</Text>
      </View>
      <View style={exStyles.info}>
        <Text style={exStyles.name}>{exercise.name}</Text>
        <View style={exStyles.setsRepsRow}>
          <View style={exStyles.setsChip}>
            <Text style={exStyles.setsLabel}>SETS</Text>
            <Text style={exStyles.setsValue}>{exercise.sets}</Text>
          </View>
          <View style={exStyles.repsChip}>
            <Text style={exStyles.repsLabel}>REPS</Text>
            <Text style={exStyles.repsValue}>{exercise.reps}</Text>
          </View>
          {exercise.notes && (
            <Text style={exStyles.notes} numberOfLines={2}>
              {exercise.notes}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={exStyles.demoBtn} onPress={openDemo} activeOpacity={0.8}>
        <Text style={exStyles.demoBtnIcon}>▶</Text>
        <Text style={exStyles.demoBtnText}>DEMO</Text>
      </TouchableOpacity>
    </View>
  );
}

function LevelUpModal({
  visible,
  newLevel,
  onClose,
}: {
  visible: boolean;
  newLevel: number;
  onClose: () => void;
}) {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }
  }, [visible]);

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={lvStyles.overlay}>
        <Animated.View style={[lvStyles.card, modalStyle]}>
          <Text style={lvStyles.emoji}>⚡</Text>
          <Text style={lvStyles.title}>LEVEL UP!</Text>
          <Text style={lvStyles.level}>LEVEL {newLevel}</Text>
          <Text style={lvStyles.subtitle}>
            {"You've grown stronger, hero."}{'\n'}Keep pushing forward!
          </Text>
          <TouchableOpacity style={lvStyles.btn} onPress={onClose} activeOpacity={0.8}>
            <Text style={lvStyles.btnText}>CONTINUE  →</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [appData, setAppData] = useState<AppData | null>(null);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isCompleting, setIsCompleting] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [completionDone, setCompletionDone] = useState(false);

  const completeBtnScale = useSharedValue(1);
  const headerOpacity = useSharedValue(0);
  const headerY = useSharedValue(30);

  useEffect(() => {
    loadAppData().then((data) => {
      setAppData(data);
      if (data.workoutPlan) {
        const found = data.workoutPlan.workouts.find((w) => w.id === id);
        setWorkout(found ?? null);
      }
    });
    headerOpacity.value = withDelay(200, withTiming(1, { duration: 500 }));
    headerY.value = withDelay(200, withSpring(0, { damping: 12, stiffness: 80 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerY.value }],
  }));

  const completeBtnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: completeBtnScale.value }],
  }));

  const handleCompleteQuest = async () => {
    if (!appData || !workout || !appData.workoutPlan || isCompleting) return;

    setIsCompleting(true);

    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    // Animate button
    completeBtnScale.value = withSequence(
      withSpring(0.95, { damping: 5, stiffness: 300 }),
      withSpring(1.05, { damping: 8, stiffness: 200 }),
      withSpring(1, { damping: 12, stiffness: 100 })
    );

    const hour = new Date().getHours();
    const isStreakDay = appData.gameStats.currentStreak > 0;
    const xpEarned = calculateWorkoutXP(workout, isStreakDay);

    const oldLevel = appData.gameStats.level;
    let updatedStats = {
      ...appData.gameStats,
      totalXP: appData.gameStats.totalXP + xpEarned,
      totalWorkouts: appData.gameStats.totalWorkouts + 1,
    };
    updatedStats = updateStreakOnCompletion(updatedStats);
    const newLvl = getLevel(updatedStats.totalXP);
    updatedStats.level = newLvl;

    const newBadges = checkNewBadges(updatedStats, hour);
    updatedStats.earnedBadges = [...updatedStats.earnedBadges, ...newBadges];

    // Update workout as completed
    const updatedPlan = {
      ...appData.workoutPlan,
      workouts: appData.workoutPlan.workouts.map((w) =>
        w.id === workout.id
          ? { ...w, completed: true, completedDate: new Date().toISOString() }
          : w
      ),
    };

    await completeWorkout(workout.id, xpEarned, updatedStats, updatedPlan);

    // Show particles
    setShowParticles(true);

    if (newLvl > oldLevel) {
      setNewLevel(newLvl);
      setTimeout(() => {
        setShowParticles(false);
        setShowLevelUp(true);
      }, 1200);
    } else {
      // Show new badges if earned
      if (newBadges.length > 0) {
        setTimeout(() => {
          setShowParticles(false);
          Alert.alert(
            '🏅 NEW BADGE UNLOCKED!',
            `You earned: ${newBadges.map((b) => b.toUpperCase().replace(/_/g, ' ')).join(', ')}`,
            [{ text: 'CLAIM BADGE', onPress: () => setCompletionDone(true) }]
          );
        }, 800);
      } else {
        setTimeout(() => {
          setShowParticles(false);
          setCompletionDone(true);
        }, 1000);
      }
    }

    setIsCompleting(false);
  };

  useEffect(() => {
    if (completionDone) {
      router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completionDone]);

  const handleLevelUpClose = () => {
    setShowLevelUp(false);
    setCompletionDone(true);
  };

  if (!workout || !appData?.userProfile) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.errorView}>
          <Text style={styles.errorText}>Quest not found.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backBtnText}>← GO BACK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const heroClass = HERO_CLASSES[appData.userProfile.heroClass];

  const difficultyColor = {
    Beginner: '#4CAF50',
    Intermediate: COLORS.ember,
    Advanced: '#EF4444',
  }[workout.difficulty] ?? COLORS.ember;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Particle effect */}
      {showParticles && (
        <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
          <ParticleEffect
            visible={showParticles}
            originX={width / 2}
            originY={height * 0.7}
          />
        </View>
      )}

      {/* Level up modal */}
      <LevelUpModal
        visible={showLevelUp}
        newLevel={newLevel}
        onClose={handleLevelUpClose}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
          <Text style={styles.closeBtnText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerWeek}>WEEK {workout.week} · DAY {workout.day}</Text>
        </View>
        <View style={[styles.xpBadge, { backgroundColor: COLORS.emberGlow, borderColor: COLORS.ember }]}>
          <Text style={styles.xpBadgeText}>+{workout.totalXP} XP</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
      >
        {/* Workout Info */}
        <Animated.View style={[styles.infoSection, headerStyle]}>
          <View style={styles.topBadges}>
            <View style={[styles.typeBadge, { borderColor: heroClass.color, backgroundColor: heroClass.bgColor }]}>
              <Text style={styles.typeBadgeIcon}>{heroClass.icon}</Text>
              <Text style={[styles.typeBadgeText, { color: heroClass.color }]}>{workout.type}</Text>
            </View>
            <View style={[styles.diffBadge, { borderColor: difficultyColor }]}>
              <Text style={[styles.diffText, { color: difficultyColor }]}>
                {workout.difficulty.toUpperCase()}
              </Text>
            </View>
          </View>

          <Text style={styles.workoutName}>{workout.name}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{workout.duration} MIN</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>💪</Text>
              <Text style={styles.metaText}>{workout.exercises.length} EXERCISES</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⚡</Text>
              <Text style={styles.metaText}>{workout.totalXP} XP</Text>
            </View>
          </View>

          {workout.completed && (
            <View style={styles.completedBanner}>
              <Text style={styles.completedBannerText}>✓ QUEST COMPLETED</Text>
            </View>
          )}
        </Animated.View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Exercise list */}
        <View style={styles.exercisesSection}>
          <Text style={styles.sectionLabel}>
            EXERCISES ({workout.exercises.length})
          </Text>
          {workout.exercises.map((exercise, idx) => (
            <ExerciseRow
              key={exercise.id}
              exercise={exercise}
              index={idx}
              heroColor={heroClass.color}
            />
          ))}
        </View>

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>⚔️  QUEST TIPS</Text>
          <Text style={styles.tipsText}>
            • Warm up for 5 minutes before starting{'\n'}
            • Rest 60-90 seconds between sets{'\n'}
            • Stay hydrated throughout the workout{'\n'}
            • Focus on form over weight/speed{'\n'}
            • Tap DEMO on any exercise to watch a tutorial
          </Text>
        </View>
      </ScrollView>

      {/* Complete Quest Button */}
      {!workout.completed && (
        <View style={[styles.completeBar, { paddingBottom: insets.bottom + 12 }]}>
          <Animated.View style={completeBtnStyle}>
            <TouchableOpacity
              style={[styles.completeBtn, isCompleting && styles.completeBtnActive]}
              onPress={handleCompleteQuest}
              disabled={isCompleting}
              activeOpacity={0.9}
            >
              <Text style={styles.completeBtnIcon}>⚔️</Text>
              <Text style={styles.completeBtnText}>
                {isCompleting ? 'COMPLETING...' : 'COMPLETE QUEST'}
              </Text>
              <Text style={styles.completeBtnXP}>+{workout.totalXP} XP</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {workout.completed && (
        <View style={[styles.completeBar, { paddingBottom: insets.bottom + 12 }]}>
          <View style={styles.completedBtn}>
            <Text style={styles.completedBtnText}>✓  QUEST COMPLETE  ·  +{workout.totalXP} XP</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const exStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.obsidianCardAlt,
    borderRadius: 10,
    borderLeftWidth: 3,
    padding: 14,
    gap: 12,
  },
  indexBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.obsidianBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  indexText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '800',
  },
  info: {
    flex: 1,
    gap: 8,
  },
  name: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  setsRepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  setsChip: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  setsLabel: {
    color: COLORS.textLightMuted,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  setsValue: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
  },
  repsChip: {
    backgroundColor: COLORS.emberGlow,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.ember,
  },
  repsLabel: {
    color: COLORS.emberLight,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 1,
  },
  repsValue: {
    color: COLORS.ember,
    fontSize: 14,
    fontWeight: '900',
  },
  notes: {
    flex: 1,
    color: COLORS.textLightMuted,
    fontSize: 11,
    lineHeight: 15,
    fontStyle: 'italic',
  },
  demoBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 50, 50, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 3,
    minWidth: 56,
  },
  demoBtnIcon: {
    color: '#FF4444',
    fontSize: 14,
  },
  demoBtnText: {
    color: '#FF6666',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
});

const lvStyles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  card: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.gold,
    padding: 36,
    alignItems: 'center',
    gap: 12,
    width: width * 0.8,
    shadowColor: COLORS.gold,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 16,
  },
  emoji: { fontSize: 52 },
  title: {
    color: COLORS.gold,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
  },
  level: {
    color: COLORS.white,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: 2,
  },
  subtitle: {
    color: COLORS.textLightMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  btn: {
    backgroundColor: COLORS.gold,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  btnText: {
    color: COLORS.obsidian,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  errorView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  errorText: {
    color: COLORS.textLightMuted,
    fontSize: 16,
  },
  backBtn: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtnText: {
    color: COLORS.ember,
    fontSize: 14,
    fontWeight: '700',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    gap: 12,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.obsidianCardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    color: COLORS.textLightMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerWeek: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  xpBadge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  xpBadgeText: {
    color: COLORS.ember,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 4,
  },
  infoSection: {
    gap: 12,
  },
  topBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  typeBadgeIcon: { fontSize: 12 },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  diffBadge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
  },
  diffText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  workoutName: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: 1,
    lineHeight: 38,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  metaIcon: { fontSize: 14 },
  metaText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.obsidianBorder,
  },
  completedBanner: {
    backgroundColor: COLORS.greenGlow,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.green,
    paddingVertical: 10,
    alignItems: 'center',
  },
  completedBannerText: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.obsidianBorder,
  },
  exercisesSection: {
    gap: 10,
  },
  sectionLabel: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 2,
  },
  tipsCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    gap: 10,
  },
  tipsTitle: {
    color: COLORS.ember,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  tipsText: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    lineHeight: 22,
  },
  // Complete bar
  completeBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: COLORS.obsidian,
    borderTopWidth: 1,
    borderTopColor: COLORS.obsidianBorder,
  },
  completeBtn: {
    backgroundColor: COLORS.ember,
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  completeBtnActive: {
    opacity: 0.8,
  },
  completeBtnIcon: {
    fontSize: 20,
  },
  completeBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  completeBtnXP: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 13,
    fontWeight: '700',
  },
  completedBtn: {
    backgroundColor: COLORS.greenGlow,
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.green,
  },
  completedBtnText: {
    color: COLORS.green,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});
