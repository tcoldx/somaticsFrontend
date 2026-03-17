import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { COLORS, COMMITMENT_LEVELS } from '@/lib/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CommitmentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ goals: string }>();
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    setSelected(id);
  };

  const handleNext = () => {
    if (!selected) return;
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push({
      pathname: '/onboarding/class-selection',
      params: { goals: params.goals, commitment: selected },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: '66%' }]} />
        </View>
        <Text style={styles.stepText}>2 / 3</Text>
      </View>

      <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
        <View style={styles.titleSection}>
          <Text style={styles.eyebrow}>STEP 2 — COMMITMENT</Text>
          <Text style={styles.title}>HOW HARD{'\n'}DO YOU TRAIN?</Text>
          <Text style={styles.subtitle}>
            Choose your weekly training frequency. Be honest — consistency beats intensity.
          </Text>
        </View>

        <View style={styles.cards}>
          {COMMITMENT_LEVELS.map((level) => {
            const isSelected = selected === level.id;
            return (
              <TouchableOpacity
                key={level.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => handleSelect(level.id)}
                activeOpacity={0.8}
              >
                <View style={styles.cardLeft}>
                  <Text style={styles.cardIcon}>{level.icon}</Text>
                  <View style={styles.cardTexts}>
                    <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                      {level.label}
                    </Text>
                    <Text style={styles.cardDescription}>{level.description}</Text>
                    <Text style={styles.cardSubtitle}>{level.subtitle}</Text>
                  </View>
                </View>
                <View style={[styles.daysChip, isSelected && styles.daysChipSelected]}>
                  <Text style={[styles.daysNumber, isSelected && styles.daysNumberSelected]}>
                    {level.days}
                  </Text>
                  <Text style={[styles.daysLabel, isSelected && styles.daysLabelSelected]}>
                    DAYS
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Warning for champion */}
        {selected === 'champion' && (
          <View style={styles.warningBox}>
            <Text style={styles.warningText}>
              ⚡ Elite commitment requires proper recovery. Make sure to sleep 7-9 hours nightly.
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.nextBtn, !selected && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {selected ? 'CHOOSE YOUR CLASS  →' : 'SELECT AN OPTION'}
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
  content: {
    flex: 1,
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
  cards: {
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardSelected: {
    borderColor: COLORS.ember,
    backgroundColor: COLORS.emberGlow,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTexts: {
    gap: 2,
  },
  cardLabel: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  cardLabelSelected: {
    color: COLORS.ember,
  },
  cardDescription: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    marginTop: 2,
  },
  daysChip: {
    alignItems: 'center',
    backgroundColor: COLORS.obsidianCardAlt,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  daysChipSelected: {
    backgroundColor: COLORS.ember,
    borderColor: COLORS.ember,
  },
  daysNumber: {
    color: COLORS.textLight,
    fontSize: 22,
    fontWeight: '900',
  },
  daysNumberSelected: {
    color: COLORS.white,
  },
  daysLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  daysLabelSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  warningBox: {
    backgroundColor: 'rgba(255, 140, 0, 0.08)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 0, 0.3)',
    padding: 14,
  },
  warningText: {
    color: COLORS.emberLight,
    fontSize: 13,
    lineHeight: 20,
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
    marginTop: 'auto',
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
