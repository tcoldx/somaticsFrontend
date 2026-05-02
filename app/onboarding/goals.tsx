import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { COLORS, FITNESS_GOALS } from '@/lib/constants';
import { GoalId } from '@/lib/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GoalsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<GoalId[]>([]);

  const toggle = (id: GoalId) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selected.length === 0) return;
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push({ pathname: '/onboarding/commitment', params: { goals: selected.join(',') } });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '25%' }]} />
        </View>
        <Text style={styles.stepText}>1 / 4</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.eyebrow}>STEP 1 — GOALS</Text>
          <Text style={styles.title}>{"WHAT'S YOUR"}{'\n'}MISSION?</Text>
          <Text style={styles.subtitle}>Choose all that apply. Your quest engine will filter workouts to your goals.</Text>
        </View>

        <View style={styles.goalGrid}>
          {FITNESS_GOALS.map((goal) => {
            const isSelected = selected.includes(goal.id as GoalId);
            return (
              <TouchableOpacity
                key={goal.id}
                style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                onPress={() => toggle(goal.id as GoalId)}
                activeOpacity={0.8}
              >
                <View style={[styles.goalIconWrapper, isSelected && styles.goalIconWrapperSelected]}>
                  <Text style={styles.goalIcon}>{goal.icon}</Text>
                </View>
                <Text style={[styles.goalLabel, isSelected && styles.goalLabelSelected]}>
                  {goal.label}
                </Text>
                <Text style={styles.goalDesc}>{goal.description}</Text>
                {isSelected && (
                  <View style={styles.checkMark}>
                    <Text style={styles.checkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.nextBtn, selected.length === 0 && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selected.length === 0}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {selected.length > 0 ? `CONTINUE  →` : 'SELECT AT LEAST ONE'}
          </Text>
        </TouchableOpacity>
      </View>
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
    gap: 28,
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
  goalGrid: {
    gap: 12,
  },
  goalCard: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  goalCardSelected: {
    borderColor: COLORS.ember,
    backgroundColor: COLORS.emberGlow,
  },
  goalIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: COLORS.obsidianCardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalIconWrapperSelected: {
    backgroundColor: COLORS.emberGlowStrong,
  },
  goalIcon: {
    fontSize: 24,
  },
  goalLabel: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    flex: 1,
  },
  goalLabelSelected: {
    color: COLORS.ember,
  },
  goalDesc: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    position: 'absolute',
    bottom: 8,
    left: 78,
  },
  checkMark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.ember,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '900',
  },
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
