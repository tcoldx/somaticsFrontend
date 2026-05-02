import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useAuth } from '@fastshot/auth';
import { loadAppData } from '@/lib/storage';
import { COLORS } from '@/lib/constants';

export default function Index() {
  const { isAuthenticated, signUp, isLoading } = useAuth();
  const [onboardingDone, setOnboardingDone] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  useEffect(() => {
    const mount = async () => {
      const data = await loadAppData();
      setOnboardingDone(data.onboardingCompleted ?? false);
      setDataLoading(false);
    };
    mount();
  }, [isAuthenticated])
  
  if (isLoading || onboardingDone === null || dataLoading) { 
    return (
      <View style={styles.loading}>
        <Text style={styles.brand}>SOMATICS</Text>
        <ActivityIndicator size="large" color={COLORS.ember} style={{ marginTop: 24 }} />
      </View>
    );
  }
    if (!isAuthenticated) {
        return <Redirect href="/(auth)/signup" />;
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
