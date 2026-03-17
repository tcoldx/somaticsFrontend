import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAuth } from '@fastshot/auth';
import { loadAppData } from '@/lib/storage';
import { COLORS } from '@/lib/constants';

export default function Index() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    loadAppData().then((data) => {
      setOnboardingDone(data?.onboardingCompleted ?? false);
      setDataLoading(false);
    });
  }, [isAuthenticated]);

  if (authLoading || dataLoading) {
    return (
      <View style={styles.loading}>
        <Text style={styles.brand}>SOMATICS</Text>
        <ActivityIndicator size="large" color={COLORS.ember} style={{ marginTop: 24 }} />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!onboardingDone) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    color: COLORS.ember,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 6,
  },
});
