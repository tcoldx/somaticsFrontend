import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import { COLORS } from '@/lib/constants';

interface XPBarProps {
  percentage: number;
  level: number;
  currentXP: number;
  xpNeeded: number;
  compact?: boolean;
}

export default function XPBar({ percentage, level, currentXP, xpNeeded, compact = false }: XPBarProps) {
  const [barWidth, setBarWidth] = useState(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (barWidth > 0) {
      progress.value = withDelay(
        300,
        withSpring(Math.min(percentage, 1), {
          damping: 14,
          stiffness: 80,
          mass: 1,
        })
      );
    }
  }, [percentage, barWidth]);

  const animatedFill = useAnimatedStyle(() => ({
    width: barWidth * progress.value,
  }));

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0) {
      setBarWidth(w);
      progress.value = withSpring(Math.min(percentage, 1), {
        damping: 14,
        stiffness: 80,
      });
    }
  };

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <View style={styles.compactLevelBadge}>
          <Text style={styles.compactLevelText}>{level}</Text>
        </View>
        <View style={styles.compactBarWrapper}>
          <View style={styles.compactBarTrack} onLayout={handleLayout}>
            <Animated.View style={[styles.compactBarFill, animatedFill]} />
          </View>
          <Text style={styles.compactXPText}>{currentXP}/{xpNeeded} XP</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelLabel}>LVL</Text>
          <Text style={styles.levelNumber}>{level}</Text>
        </View>
        <Text style={styles.xpText}>
          {currentXP} <Text style={styles.xpSeparator}>/</Text> {xpNeeded} XP
        </Text>
      </View>
      <View style={styles.barTrack} onLayout={handleLayout}>
        <Animated.View style={[styles.barFill, animatedFill]}>
          <View style={styles.barShine} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  levelLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  levelNumber: {
    color: COLORS.ember,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  xpText: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  xpSeparator: {
    color: COLORS.obsidianBorder,
  },
  barTrack: {
    height: 8,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 140, 0, 0.1)',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.ember,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  // Compact
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactLevelBadge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.ember,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactLevelText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
  },
  compactBarWrapper: {
    flex: 1,
    gap: 4,
  },
  compactBarTrack: {
    height: 6,
    backgroundColor: COLORS.obsidianBorder,
    borderRadius: 3,
    overflow: 'hidden',
  },
  compactBarFill: {
    height: '100%',
    backgroundColor: COLORS.ember,
    borderRadius: 3,
  },
  compactXPText: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '600',
  },
});
