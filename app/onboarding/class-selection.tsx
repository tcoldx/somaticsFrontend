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
import { useTextGeneration } from '@fastshot/ai';
import { COLORS, HERO_CLASSES, HeroClassId, COMMITMENT_LEVELS } from '@/lib/constants';
import { UserProfile, WorkoutPlan, GoalId, CommitmentLevel, Workout, Exercise } from '@/lib/types';
import { saveUserProfile, saveWorkoutPlan, completeOnboarding } from '@/lib/storage';
import { generateFallbackPlan } from '@/lib/leveling';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function parseAIWorkouts(text: string): Workout[] | null {
  try {
    // Strip markdown code blocks
    let cleaned = text.replace(/```(?:json)?\s*/g, '').replace(/```\s*/g, '').trim();

    // Try direct parse
    let parsed: { workouts?: unknown[] } | null = null;
    try {
      parsed = JSON.parse(cleaned) as { workouts?: unknown[] };
    } catch {
      // Try to extract JSON object
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]) as { workouts?: unknown[] };
      }
    }

    if (!parsed || !Array.isArray(parsed.workouts)) return null;

    return (parsed.workouts as unknown[])
      .map((w: unknown, idx: number) => {
        const wo = w as Record<string, unknown>;
        const exercises = (Array.isArray(wo.exercises) ? wo.exercises : []) as unknown[];
        return {
          id: `ai-w${wo.week || 1}-d${wo.day || idx + 1}`,
          week: Number(wo.week) || Math.floor(idx / 5) + 1,
          day: Number(wo.day) || (idx % 5) + 1,
          name: String(wo.name || `Quest ${idx + 1}`).toUpperCase(),
          type: String(wo.type || 'Training'),
          duration: Number(wo.duration) || 45,
          difficulty: String(wo.difficulty || 'Intermediate'),
          exercises: exercises.map((ex: unknown, eIdx: number) => {
            const e = ex as Record<string, unknown>;
            return {
              id: `ai-ex-${idx}-${eIdx}`,
              name: String(e.name || 'Exercise'),
              sets: Number(e.sets) || 3,
              reps: String(e.reps || '10'),
              notes: e.notes ? String(e.notes) : undefined,
            } satisfies Exercise;
          }),
          totalXP: 75 + Math.floor((Number(wo.week) || 1) - 1) * 10,
          completed: false,
        } satisfies Workout;
      })
      .filter((w) => w.exercises.length > 0);
  } catch {
    return null;
  }
}

export default function ClassSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ goals: string; commitment: string }>();
  const [selectedClass, setSelectedClass] = useState<HeroClassId | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { generateText } = useTextGeneration();

  const commitmentDays =
    COMMITMENT_LEVELS.find((c) => c.id === params.commitment)?.days ?? 4;

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

    const heroClass = HERO_CLASSES[selectedClass];
    const goals = (params.goals || '').split(',').filter(Boolean) as GoalId[];
    const commitment = (params.commitment || 'regular') as CommitmentLevel;

    const planId = `plan-${Date.now()}`;

    // Save user profile
    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      heroClass: selectedClass,
      goals,
      commitment,
      createdAt: new Date().toISOString(),
    };
    await saveUserProfile(profile);

    try {
      const prompt = `You are an expert fitness coach creating a personalized ${heroClass.workoutType} program.

Hero Class: ${heroClass.name} (${heroClass.workoutType})
Primary Stat: ${heroClass.primaryStat}
Goals: ${goals.join(', ')}
Training Days Per Week: ${commitmentDays}
Program Length: 4 weeks (${commitmentDays * 4} total workouts)

Create a progressive 4-week training plan. Return ONLY valid JSON, no markdown, no code blocks, no extra text:

{"workouts":[{"week":1,"day":1,"name":"QUEST NAME","type":"Training Type","duration":45,"difficulty":"Intermediate","exercises":[{"name":"Exercise Name","sets":3,"reps":"8-12","notes":"Form tip here"}]}]}

Rules:
- Include ${commitmentDays * 4} workouts total (${commitmentDays} per week)
- 4-6 exercises per workout
- Progress difficulty from week 1 (easier) to week 4 (harder)
- Keep exercise names simple and well-known
- Reps as string e.g. "8-12" or "30 sec" or "10 each side"
- Quest names should be dramatic/epic (uppercase)
- Fit the ${heroClass.workoutType} style`;

      const result = await generateText(prompt);
      let workouts: Workout[] | null = null;

      if (result) {
        workouts = parseAIWorkouts(result);
      }

      if (!workouts || workouts.length < 4) {
        workouts = generateFallbackPlan(selectedClass, commitmentDays, planId);
      }

      const plan: WorkoutPlan = {
        id: planId,
        heroClass: selectedClass,
        goals,
        commitment,
        workouts: workouts.map((w, i) => ({ ...w, id: `${planId}-${i}` })),
        generatedAt: new Date().toISOString(),
      };

      await saveWorkoutPlan(plan);
      await completeOnboarding();

      router.replace('/(tabs)');
    } catch (err) {
      console.error('AI generation failed:', err);
      // Use fallback plan
      const workouts = generateFallbackPlan(selectedClass, commitmentDays, planId);
      const plan: WorkoutPlan = {
        id: planId,
        heroClass: selectedClass,
        goals,
        commitment,
        workouts: workouts.map((w, i) => ({ ...w, id: `${planId}-${i}` })),
        generatedAt: new Date().toISOString(),
      };
      await saveWorkoutPlan(plan);
      await completeOnboarding();
      router.replace('/(tabs)');
    } finally {
      setIsGenerating(false);
    }
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
        <Text style={styles.stepText}>3 / 3</Text>
      </View>

      {isGenerating ? (
        <View style={styles.generatingContainer}>
          <View style={styles.generatingCard}>
            <ActivityIndicator size="large" color={COLORS.ember} />
            <Text style={styles.generatingTitle}>FORGING YOUR DESTINY</Text>
            <Text style={styles.generatingText}>
              Your AI trainer is crafting a personalized 4-week quest cycle for your{' '}
              <Text style={{ color: COLORS.ember }}>
                {selectedClass ? HERO_CLASSES[selectedClass].name : ''}
              </Text>{' '}
              hero...
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
            <Text style={styles.eyebrow}>STEP 3 — HERO CLASS</Text>
            <Text style={styles.title}>CHOOSE YOUR{'\n'}DESTINY</Text>
            <Text style={styles.subtitle}>
              Your class determines your training style and AI-generated quest types.
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
                          isSelected && { borderColor: `${heroClass.color}60`, backgroundColor: `${heroClass.color}15` },
                        ]}
                      >
                        <Text
                          style={[
                            styles.skillText,
                            isSelected && { color: heroClass.color },
                          ]}
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
  backText: {
    color: COLORS.textLight,
    fontSize: 22,
  },
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    gap: 24,
  },
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
  classGrid: {
    gap: 14,
  },
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
  classIcon: {
    fontSize: 28,
  },
  classInfo: {
    flex: 1,
    gap: 2,
  },
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
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ember,
    opacity: 0.6,
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
