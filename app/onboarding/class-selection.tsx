import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { COLORS, HERO_CLASSES, HeroClassId, EquipmentType } from '@/lib/constants';
import { UserProfile, WorkoutPlan, GoalId, CommitmentLevel } from '@/lib/types';
import { saveUserProfile, saveWorkoutPlan, completeOnboarding } from '@/lib/storage';
import { generateQuestPlan } from '@/lib/questEngine';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@fastshot/auth';
import { syncProfileToSupabase } from '@/lib/supabase';

export default function ClassSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ goals: string; commitment: string; equipment: string }>();
  const [selectedClass, setSelectedClass] = useState<HeroClassId | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSelect = (id: HeroClassId) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setSelectedClass(id);
  };

  const handleBeginQuest = async () => {
    if (!selectedClass) return;
    setIsGenerating(true);

    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    const goals = (params.goals || '').split(',').filter(Boolean) as GoalId[];
    const commitment = (params.commitment || 'regular') as CommitmentLevel;
    const equipment = (params.equipment || 'full_gym') as EquipmentType;
    const planId = `plan-${Date.now()}`;

    const profile: UserProfile = {
      id: user?.id ?? `user-${Date.now()}`,
      heroClass: selectedClass,
      goals,
      commitment,
      equipment,
      createdAt: new Date().toISOString(),
    };

    await saveUserProfile(profile);

    // Sync to Supabase if user is authenticated
    if (user?.id) {
      await syncProfileToSupabase(user.id, {
        heroClass: selectedClass,
        goals,
        commitment,
        equipment,
      });
    }

    // Generate quest plan from static library
    const workouts = generateQuestPlan(selectedClass, equipment, commitment, goals, planId);

    const plan: WorkoutPlan = {
      id: planId,
      heroClass: selectedClass,
      goals,
      commitment,
      equipment,
      workouts: workouts.map((w, i) => ({ ...w, id: `${planId}-${i}` })),
      generatedAt: new Date().toISOString(),
    };

    await saveWorkoutPlan(plan);
    await completeOnboarding();

    setIsGenerating(false);
    router.replace('/(tabs)');
  };

  const classes = Object.values(HERO_CLASSES);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          disabled={isGenerating}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '100%' }]} />
        </View>
        <Text style={styles.stepText}>4 / 4</Text>
      </View>

      {isGenerating ? (
        <View style={styles.generatingContainer}>
          <View style={styles.generatingCard}>
            <ActivityIndicator size="large" color={COLORS.ember} />
            <Text style={styles.generatingTitle}>ASSEMBLING YOUR QUEST</Text>
            <Text style={styles.generatingText}>
              Building your personalized 4-week{' '}
              <Text style={{ color: COLORS.ember }}>
                {selectedClass ? HERO_CLASSES[selectedClass].name : ''}
              </Text>{' '}
              chapter plan...
            </Text>
            <View style={styles.loadingDots}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.dot} />
              ))}
            </View>
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleSection}>
            <Text style={styles.eyebrow}>STEP 4 — HERO CLASS</Text>
            <Text style={styles.title}>CHOOSE YOUR{'\n'}DESTINY</Text>
            <Text style={styles.subtitle}>
              Your class shapes your workout style, XP path, and quest names.
            </Text>
          </View>

          <View style={styles.classGrid}>
            {classes.map((heroClass) => {
              const isSelected = selectedClass === heroClass.id;
              return (
                <TouchableOpacity
                  key={heroClass.id}
                  style={[
                    styles.classCard,
                    isSelected && styles.classCardSelected,
                    { borderColor: isSelected ? heroClass.color : COLORS.obsidianBorder },
                    isSelected && { backgroundColor: heroClass.bgColor },
                  ]}
                  onPress={() => handleSelect(heroClass.id)}
                  activeOpacity={0.85}
                >
                  <View style={styles.classTop}>
                    <View
                      style={[
                        styles.classIconWrapper,
                        { backgroundColor: isSelected ? `${heroClass.color}25` : COLORS.obsidianCardAlt },
                      ]}
                    >
                      <Text style={styles.classIcon}>{heroClass.icon}</Text>
                    </View>
                    <View style={styles.classInfo}>
                      <Text
                        style={[
                          styles.className,
                          { color: isSelected ? heroClass.color : COLORS.textLight },
                        ]}
                      >
                        {heroClass.name}
                      </Text>
                      <Text style={styles.classSubtitle}>{heroClass.subtitle}</Text>
                    </View>
                    {isSelected && (
                      <View style={[styles.selectedBadge, { backgroundColor: heroClass.color }]}>
                        <Text style={styles.selectedBadgeText}>✓</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.classDescription}>{heroClass.description}</Text>

                  <View style={styles.skillsRow}>
                    {heroClass.skills.map((skill) => (
                      <View
                        key={skill}
                        style={[
                          styles.skillChip,
                          isSelected && {
                            borderColor: `${heroClass.color}60`,
                            backgroundColor: `${heroClass.color}15`,
                          },
                        ]}
                      >
                        <Text
                          style={[styles.skillText, isSelected && { color: heroClass.color }]}
                        >
                          {skill}
                        </Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.statBadge}>
                    <Text style={styles.statBadgeLabel}>PRIMARY STAT</Text>
                    <Text style={[styles.statBadgeValue, { color: heroClass.color }]}>
                      {heroClass.primaryStat.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}

      {/* Bottom CTA */}
      {!isGenerating && (
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
          <TouchableOpacity
            style={[styles.nextBtn, !selectedClass && styles.nextBtnDisabled]}
            onPress={handleBeginQuest}
            disabled={!selectedClass}
            activeOpacity={0.85}
          >
            <Text style={styles.nextBtnText}>
              {selectedClass
                ? `BEGIN AS ${HERO_CLASSES[selectedClass].name}  ⚔️`
                : 'CHOOSE YOUR CLASS'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: { color: COLORS.textLight, fontSize: 22 },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.ember,
    borderRadius: 2,
  },
  stepText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
    minWidth: 32,
    textAlign: 'right',
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 8, gap: 24 },
  titleSection: { gap: 10 },
  eyebrow: {
    color: COLORS.ember,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  title: {
    color: COLORS.white,
    fontSize: 36,
    fontWeight: '900',
    lineHeight: 42,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: COLORS.textLightMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  classGrid: { gap: 14 },
  classCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    gap: 12,
  },
  classCardSelected: {
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  classTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  classIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  classIcon: { fontSize: 28 },
  classInfo: { flex: 1, gap: 2 },
  className: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  classSubtitle: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  selectedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedBadgeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
  },
  classDescription: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    lineHeight: 19,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillChip: {
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  skillText: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statBadgeLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  statBadgeValue: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  // Generating state
  generatingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  generatingCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.ember,
    padding: 32,
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  generatingTitle: {
    color: COLORS.ember,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },
  generatingText: {
    color: COLORS.textLightMuted,
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  loadingDots: { flexDirection: 'row', gap: 8 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ember,
    opacity: 0.7,
  },
  // Bottom
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.obsidianBorder,
    backgroundColor: COLORS.obsidian,
  },
  nextBtn: {
    backgroundColor: COLORS.ember,
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  nextBtnDisabled: {
    backgroundColor: COLORS.obsidianBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
});
