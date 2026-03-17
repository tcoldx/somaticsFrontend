import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Particle {
  id: number;
  angle: number;
  distance: number;
  delay: number;
  size: number;
}

interface ParticleItemProps {
  particle: Particle;
  originX: number;
  originY: number;
  onFinish?: () => void;
}

function ParticleItem({ particle, originX, originY, onFinish }: ParticleItemProps) {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const targetX = Math.cos(particle.angle) * particle.distance;
    const targetY = Math.sin(particle.angle) * particle.distance;

    opacity.value = withDelay(particle.delay, withTiming(1, { duration: 100 }));
    scale.value = withDelay(particle.delay, withSpring(1, { damping: 8, stiffness: 200 }));
    x.value = withDelay(particle.delay, withSpring(targetX, { damping: 10, stiffness: 80 }));
    y.value = withDelay(
      particle.delay,
      withSpring(targetY, { damping: 10, stiffness: 80 }, (finished) => {
        if (finished && onFinish) {
          runOnJS(onFinish)();
        }
      })
    );

    const totalDuration = particle.delay + 600;
    opacity.value = withDelay(
      totalDuration,
      withTiming(0, { duration: 400 })
    );
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: x.value },
      { translateY: y.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          width: particle.size,
          height: particle.size,
          borderRadius: particle.size / 2,
          left: originX - particle.size / 2,
          top: originY - particle.size / 2,
          backgroundColor: Math.random() > 0.5 ? '#FF8C00' : '#FFD700',
        },
        animStyle,
      ]}
    />
  );
}

interface ParticleEffectProps {
  visible: boolean;
  onComplete?: () => void;
  originX?: number;
  originY?: number;
}

const PARTICLE_COUNT = 16;

export default function ParticleEffect({
  visible,
  onComplete,
  originX = SCREEN_WIDTH / 2,
  originY = SCREEN_HEIGHT / 2,
}: ParticleEffectProps) {
  if (!visible) return null;

  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    angle: (i / PARTICLE_COUNT) * Math.PI * 2,
    distance: 60 + Math.random() * 80,
    delay: Math.random() * 150,
    size: 4 + Math.random() * 8,
  }));

  return (
    <>
      {particles.map((p, idx) => (
        <ParticleItem
          key={p.id}
          particle={p}
          originX={originX}
          originY={originY}
          onFinish={idx === 0 ? onComplete : undefined}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
  },
});
