import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Link, useRouter} from 'expo-router';
import { useAuth } from '../../lib/AuthProvider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/lib/constants';

const { height } = Dimensions.get('window');

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const {  isLoading, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logoOpacity = useSharedValue(0);
  const logoY = useSharedValue(-30);
  const formOpacity = useSharedValue(0);
  const formY = useSharedValue(20);

  useEffect(() => {
    logoOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    logoY.value = withDelay(200, withSpring(0, { damping: 12, stiffness: 80 }));
    formOpacity.value = withDelay(500, withTiming(1, { duration: 600 }));
    formY.value = withDelay(500, withSpring(0, { damping: 14, stiffness: 100 }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoY.value }],
  }));
  const formStyle = useAnimatedStyle(() => ({
    opacity: formOpacity.value,
    transform: [{ translateY: formY.value }],
  }));

  const handleEmailLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Info', 'Please enter your email and password.');
      return;
    }
    
    await signIn(email.trim(), password);
    // now we navigate to the main screen if user is already signed up!
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {/* Background orb */}
      <View style={styles.glowOrb} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo Section */}
          <Animated.View style={[styles.logoSection, logoStyle]}>
            <Text style={styles.logoLine1}>SOMA</Text>
            <Text style={styles.logoLine2}>TICS</Text>
            <Text style={styles.tagline}>Train like a legend. Become one.</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View style={[styles.formContainer, formStyle]}>
            <Text style={styles.formTitle}>SIGN IN</Text>
            <Text style={styles.formSubtitle}>Access your hero profile</Text>
{/* 
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>⚠️  {error.message}</Text>
              </View>
            )} */}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="hero@somatics.app"
                placeholderTextColor={COLORS.textLightMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                placeholderTextColor={COLORS.textLightMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <Link href="/(auth)/forgot-password" asChild>
              <TouchableOpacity style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
              onPress={handleEmailLogin}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>
                {isLoading ? 'SIGNING IN...' : 'SIGN IN  →'}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity
              style={styles.socialBtn}
              // onPress={signInWithGoogle}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={styles.socialIcon}>🌐</Text>
              <Text style={styles.socialBtnText}>Continue with Google</Text>
            </TouchableOpacity>

            {Platform.OS === 'ios' && (
              <TouchableOpacity
                style={styles.socialBtn}
                // onPress={signInWithApple}
                disabled={isLoading}
                activeOpacity={0.85}
              >
                <Text style={styles.socialIcon}>🍎</Text>
                <Text style={styles.socialBtnText}>Continue with Apple</Text>
              </TouchableOpacity>
            )}

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>New to Somatics? </Text>
              <Link href="/(auth)/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  glowOrb: {
    position: 'absolute',
    top: height * 0.05,
    left: '50%',
    marginLeft: -160,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(255, 140, 0, 0.05)',
  },
  scroll: {
    paddingHorizontal: 24,
    gap: 32,
  },
  logoSection: {
    alignItems: 'center',
    gap: 8,
    paddingTop: 20,
  },
  logoBadge: {
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 4,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: COLORS.emberGlow,
    marginBottom: 8,
  },
  logoBadgeText: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
  },
  logoLine1: {
    color: COLORS.white,
    fontSize: 72,
    fontWeight: '900',
    lineHeight: 72,
    letterSpacing: -2,
    textAlign: 'center',
  },
  logoLine2: {
    color: COLORS.ember,
    fontSize: 72,
    fontWeight: '900',
    lineHeight: 72,
    letterSpacing: -2,
    textAlign: 'center',
    marginTop: -8,
  },
  tagline: {
    color: COLORS.textLightMuted,
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
    marginTop: 8,
  },
  formContainer: {
    gap: 16,
  },
  formTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  formSubtitle: {
    color: COLORS.textLightMuted,
    fontSize: 14,
    marginTop: -8,
    marginBottom: 4,
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.4)',
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
  input: {
    backgroundColor: COLORS.obsidianCard,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '500',
  },
  forgotRow: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  forgotText: {
    color: COLORS.ember,
    fontSize: 13,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: COLORS.ember,
    borderRadius: 8,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
    marginTop: 4,
  },
  primaryBtnDisabled: {
    backgroundColor: COLORS.obsidianBorder,
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.obsidianBorder,
  },
  dividerText: {
    color: COLORS.textLightMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.obsidianCard,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    borderRadius: 8,
    paddingVertical: 14,
  },
  socialIcon: {
    fontSize: 18,
  },
  socialBtnText: {
    color: COLORS.textLight,
    fontSize: 14,
    fontWeight: '700',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  signupText: {
    color: COLORS.textLightMuted,
    fontSize: 14,
  },
  signupLink: {
    color: COLORS.ember,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
