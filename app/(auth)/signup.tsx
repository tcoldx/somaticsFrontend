import React, { useState } from 'react';
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
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@fastshot/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/lib/constants';

export default function SignUpScreen() {
  const insets = useSafeAreaInsets();
  const { signUpWithEmail, isLoading, error, clearError, pendingEmailVerification } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Info', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }
    clearError?.();
    await signUpWithEmail(email.trim(), password);
  };

  if (pendingEmailVerification) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.verifyContainer}>
          <Text style={styles.verifyIcon}>📬</Text>
          <Text style={styles.verifyTitle}>CHECK YOUR EMAIL</Text>
          <Text style={styles.verifyText}>
            We sent a verification link to{'\n'}
            <Text style={styles.verifyEmail}>{email}</Text>
          </Text>
          <Text style={styles.verifySubtext}>
            Click the link to activate your Somatics account and begin your journey.
          </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.backToLoginBtn}>
              <Text style={styles.backToLoginText}>BACK TO SIGN IN</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
          {/* Back */}
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.backBtn}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>
          </Link>

          {/* Header */}
          <View style={styles.headerSection}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⚡ SOMATICS</Text>
            </View>
            <Text style={styles.title}>CREATE{'\n'}ACCOUNT</Text>
            <Text style={styles.subtitle}>{"Begin your hero's journey"}</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorBanner}>
                <Text style={styles.errorText}>⚠️  {error.message}</Text>
              </View>
            )}

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
                placeholder="Minimum 6 characters"
                placeholderTextColor={COLORS.textLightMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
              <TextInput
                style={[styles.input, confirmPassword && password !== confirmPassword && styles.inputError]}
                placeholder="Re-enter password"
                placeholderTextColor={COLORS.textLightMuted}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!isLoading}
              />
            </View>

            <TouchableOpacity
              style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
              onPress={handleSignUp}
              disabled={isLoading}
              activeOpacity={0.85}
            >
              <Text style={styles.primaryBtnText}>
                {isLoading ? 'CREATING ACCOUNT...' : 'BEGIN YOUR QUEST  →'}
              </Text>
            </TouchableOpacity>

            <View style={styles.disclaimer}>
              <Text style={styles.disclaimerText}>
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </View>
          </View>
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
  scroll: {
    paddingHorizontal: 24,
    gap: 28,
  },
  backBtn: {
    alignSelf: 'flex-start',
  },
  backText: {
    color: COLORS.ember,
    fontSize: 15,
    fontWeight: '600',
  },
  headerSection: {
    gap: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: COLORS.emberGlow,
  },
  badgeText: {
    color: COLORS.ember,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 3,
  },
  title: {
    color: COLORS.white,
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 52,
    letterSpacing: -1,
  },
  subtitle: {
    color: COLORS.textLightMuted,
    fontSize: 15,
    fontWeight: '500',
  },
  formContainer: {
    gap: 16,
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
  inputError: {
    borderColor: COLORS.red,
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
  disclaimer: {
    paddingHorizontal: 4,
  },
  disclaimerText: {
    color: COLORS.textLightMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
  },
  // Verification state
  verifyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  verifyIcon: {
    fontSize: 56,
  },
  verifyTitle: {
    color: COLORS.ember,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },
  verifyText: {
    color: COLORS.textLightMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  verifyEmail: {
    color: COLORS.white,
    fontWeight: '700',
  },
  verifySubtext: {
    color: COLORS.textLightMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  backToLoginBtn: {
    backgroundColor: COLORS.emberGlow,
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  backToLoginText: {
    color: COLORS.ember,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
