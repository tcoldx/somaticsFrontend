import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@/lib/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function OnboardingWelcome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const titleOpacity = useSharedValue(0);
  const titleY = useSharedValue(40);
  const subtitleOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonScale = useSharedValue(0.85);

  useEffect(() => {
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 700 }));
    titleY.value = withDelay(300, withSpring(0, { damping: 12, stiffness: 80 }));
    subtitleOpacity.value = withDelay(700, withTiming(1, { duration: 600 }));
    buttonOpacity.value = withDelay(1100, withTiming(1, { duration: 600 }));
    buttonScale.value = withDelay(1100, withSpring(1, { damping: 12, stiffness: 100 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));
  const subtitleStyle = useAnimatedStyle(() => ({ opacity: subtitleOpacity.value }));
  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background lines */}
      <View style={styles.bgPattern}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View
            key={i}
            style={[styles.bgLine, { top: (height / 10) * i, opacity: 0.03 + i * 0.003 }]}
          />
        ))}
      </View>

      {/* Ember glow orb */}
      <View style={styles.glowOrb} />
      <View style={styles.glowOrbBottom} />

      <View style={[styles.content, { paddingBottom: insets.bottom + 40 }]}>
        {/* Title */}
        <Animated.View style={titleStyle}>
          <Text style={styles.titleLine1}>SOMA</Text>
          <Text style={styles.titleLine2}>TICS</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, subtitleStyle]}>
          {"Forge your body. Ascend your limits."}{'\n'}Level up. Earn XP. Become legendary.
        </Animated.Text>

        {/* Feature pillars */}
        <Animated.View style={[styles.pillarsRow, subtitleStyle]}>
          {[
            { label: 'XP SYSTEM', icon: '⚡' },
            { label: 'HERO CLASS', icon: '🏆' },
            { label: 'CHAPTERS', icon: '📖' },
          ].map((item) => (
            <View key={item.label} style={styles.pillar}>
              <Text style={styles.pillarIcon}>{item.icon}</Text>
              <Text style={styles.pillarLabel}>{item.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* CTA */}
        <Animated.View style={[styles.ctaWrapper, buttonStyle]}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/onboarding/goals')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>BEGIN YOUR QUEST</Text>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>4 quick steps · Takes under 2 minutes</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  bgPattern: {
    ...StyleSheet.absoluteFillObject,
  },
  bgLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: COLORS.ember,
  },
  glowOrb: {
    position: 'absolute',
    top: height * 0.08,
    left: width * 0.5 - 180,
    width: 360,
    height: 360,
    borderRadius: 180,
    backgroundColor: 'rgba(255, 140, 0, 0.05)',
  },
  glowOrbBottom: {
    position: 'absolute',
    bottom: height * 0.05,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 140, 0, 0.03)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 28,
  },
  badge: {
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 7,
    backgroundColor: COLORS.emberGlow,
  },
  badgeText: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
  },
  titleLine1: {
    color: COLORS.white,
    fontSize: 90,
    fontWeight: '900',
    lineHeight: 90,
    letterSpacing: -2,
    textAlign: 'center',
  },
  titleLine2: {
    color: COLORS.ember,
    fontSize: 90,
    fontWeight: '900',
    lineHeight: 90,
    letterSpacing: -2,
    textAlign: 'center',
    marginTop: -10,
  },
  tagline: {
    color: COLORS.textLightMuted,
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  pillarsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  pillar: {
    flex: 1,
    alignItems: 'center',
    gap: 7,
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 10,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  pillarIcon: {
    fontSize: 22,
  },
  pillarLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  ctaWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.ember,
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 8,
    gap: 10,
    width: '100%',
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 2,
  },
  ctaArrow: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  ctaSubtext: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    textAlign: 'center',
  },
});
