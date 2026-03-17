import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { COLORS, EQUIPMENT_OPTIONS, EquipmentType } from '@/lib/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EquipmentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ goals: string; commitment: string }>();
  const [selected, setSelected] = useState<EquipmentType | null>(null);

  const handleSelect = (id: EquipmentType) => {
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
      params: { goals: params.goals, commitment: params.commitment, equipment: selected },
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
          <View style={[styles.progressFill, { width: '75%' }]} />
        </View>
        <Text style={styles.stepText}>3 / 4</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 120 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleSection}>
          <Text style={styles.eyebrow}>STEP 3 — EQUIPMENT</Text>
          <Text style={styles.title}>{"WHAT'S YOUR\nARSENAL?"}</Text>
          <Text style={styles.subtitle}>
            Your Quest Engine will build workouts using only the tools you have available.
          </Text>
        </View>

        <View style={styles.cardGrid}>
          {EQUIPMENT_OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => handleSelect(option.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconWrapper, isSelected && styles.iconWrapperSelected]}>
                  <Text style={styles.icon}>{option.icon}</Text>
                </View>

                <View style={styles.cardContent}>
                  <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                    {option.label}
                  </Text>
                  <Text style={styles.cardDescription}>{option.description}</Text>
                  <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
                </View>

                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            💡 You can update your equipment profile anytime from your profile settings.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <TouchableOpacity
          style={[styles.nextBtn, !selected && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!selected}
          activeOpacity={0.85}
        >
          <Text style={styles.nextBtnText}>
            {selected ? 'CHOOSE YOUR CLASS  →' : 'SELECT YOUR EQUIPMENT'}
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
  cardGrid: {
    gap: 12,
  },
  card: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.obsidianBorder,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  cardSelected: {
    borderColor: COLORS.ember,
    backgroundColor: COLORS.emberGlow,
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  iconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: COLORS.obsidianCardAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperSelected: {
    backgroundColor: COLORS.emberGlowStrong,
  },
  icon: {
    fontSize: 28,
  },
  cardContent: {
    flex: 1,
    gap: 3,
  },
  cardLabel: {
    color: COLORS.textLight,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  cardLabelSelected: {
    color: COLORS.ember,
  },
  cardDescription: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  cardSubtitle: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontStyle: 'italic',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.obsidianBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: COLORS.ember,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.ember,
  },
  note: {
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  noteText: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    lineHeight: 19,
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
