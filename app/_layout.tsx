import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { AuthProvider } from '@fastshot/auth';
import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import { adapty } from 'react-native-adapty';

function AdaptyInit() {
  useEffect(() => {
    const ADAPTY_KEY = process.env.EXPO_PUBLIC_ADAPTY_API_KEY;
    if (ADAPTY_KEY) {
      adapty.activate(ADAPTY_KEY, {
        __ignoreActivationOnFastRefresh: __DEV__,
      }).catch(() => {
        // Graceful failure
      });
    }
  }, []);
  return null;
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AuthProvider>
          <AdaptyInit />
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth/callback" />
            <Stack.Screen
              name="paywall"
              options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
            />
            <Stack.Screen
              name="workout/[id]"
              options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
            />
          </Stack>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
