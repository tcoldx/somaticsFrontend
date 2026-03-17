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
  const buttonScale = useSharedValue(0.8);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    titleOpacity.value = withDelay(400, withTiming(1, { duration: 700 }));
    titleY.value = withDelay(400, withSpring(0, { damping: 12, stiffness: 80 }));
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
    buttonOpacity.value = withDelay(1200, withTiming(1, { duration: 600 }));
    buttonScale.value = withDelay(1200, withSpring(1, { damping: 12, stiffness: 100 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background pattern */}
      <View style={styles.bgPattern}>
        {Array.from({ length: 8 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.bgLine,
              {
                top: (height / 8) * i,
                opacity: 0.04 + i * 0.005,
              },
            ]}
          />
        ))}
      </View>

      {/* Ember glow orb */}
      <View style={styles.glowOrb} />

      <View style={[styles.content, { paddingBottom: insets.bottom + 40 }]}>
        {/* Badge */}
        <Animated.View style={[styles.badge, subtitleStyle]}>
          <Text style={styles.badgeText}>⚔️  RPG FITNESS  ⚔️</Text>
        </Animated.View>

        {/* Title */}
        <Animated.View style={titleStyle}>
          <Text style={styles.titleLine1}>FIT</Text>
          <Text style={styles.titleLine2}>QUEST</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text style={[styles.tagline, subtitleStyle]}>
          {"Your fitness journey is a hero's quest."}{'\n'}Level up. Earn XP. Become legendary.
        </Animated.Text>

        {/* Stats preview */}
        <Animated.View style={[styles.statsRow, subtitleStyle]}>
          {[
            { label: 'XP SYSTEM', icon: '⚡' },
            { label: 'AI QUESTS', icon: '🤖' },
            { label: 'HERO CLASS', icon: '🏆' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statItem}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* CTA Button */}
        <Animated.View style={buttonStyle}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/onboarding/goals')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>BEGIN YOUR QUEST</Text>
            <Text style={styles.ctaArrow}>→</Text>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>Free · No account required</Text>
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
    top: height * 0.15,
    left: width * 0.5 - 150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(255, 140, 0, 0.06)',
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
    paddingVertical: 6,
    backgroundColor: COLORS.emberGlow,
  },
  badgeText: {
    color: COLORS.ember,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 3,
  },
  titleLine1: {
    color: COLORS.white,
    fontSize: 80,
    fontWeight: '900',
    lineHeight: 80,
    letterSpacing: -2,
    textAlign: 'center',
  },
  titleLine2: {
    color: COLORS.ember,
    fontSize: 80,
    fontWeight: '900',
    lineHeight: 80,
    letterSpacing: -2,
    textAlign: 'center',
    marginTop: -8,
  },
  tagline: {
    color: COLORS.textLightMuted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.obsidianCard,
    borderRadius: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
  },
  statIcon: {
    fontSize: 22,
  },
  statLabel: {
    color: COLORS.textLightMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
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
    marginTop: 10,
  },
});
