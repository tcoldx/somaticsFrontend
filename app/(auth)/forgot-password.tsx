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
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '@fastshot/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/lib/constants';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const { resetPassword, isLoading, error, clearError, pendingPasswordReset } = useAuth();
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    if (!email.trim()) {
      Alert.alert('Missing Email', 'Please enter your email address.');
      return;
    }
    clearError?.();
    await resetPassword(email.trim());
  };

  if (pendingPasswordReset) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.successContainer}>
          <Text style={styles.successIcon}>🔐</Text>
          <Text style={styles.successTitle}>CHECK YOUR EMAIL</Text>
          <Text style={styles.successText}>
            We sent password reset instructions to{'\n'}
            <Text style={styles.successEmail}>{email}</Text>
          </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.backBtn}>
              <Text style={styles.backBtnText}>BACK TO SIGN IN</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity style={styles.backLink}>
              <Text style={styles.backLinkText}>← Back to Sign In</Text>
            </TouchableOpacity>
          </Link>

          <View style={styles.headerSection}>
            <Text style={styles.lockIcon}>🔒</Text>
            <Text style={styles.title}>RESET{'\n'}PASSWORD</Text>
            <Text style={styles.subtitle}>
              {"Enter your email and we'll send you a reset link."}
            </Text>
          </View>

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠️  {error.message}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
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

          <TouchableOpacity
            style={[styles.primaryBtn, isLoading && styles.primaryBtnDisabled]}
            onPress={handleReset}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>
              {isLoading ? 'SENDING...' : 'SEND RESET LINK  →'}
            </Text>
          </TouchableOpacity>
        </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 24,
    paddingTop: 8,
  },
  backLink: {
    alignSelf: 'flex-start',
  },
  backLinkText: {
    color: COLORS.ember,
    fontSize: 15,
    fontWeight: '600',
  },
  headerSection: {
    gap: 10,
    marginTop: 16,
  },
  lockIcon: {
    fontSize: 48,
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
    lineHeight: 22,
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
  // Success state
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  successIcon: {
    fontSize: 56,
  },
  successTitle: {
    color: COLORS.ember,
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    textAlign: 'center',
  },
  successText: {
    color: COLORS.textLightMuted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  successEmail: {
    color: COLORS.white,
    fontWeight: '700',
  },
  backBtn: {
    backgroundColor: COLORS.emberGlow,
    borderWidth: 1,
    borderColor: COLORS.ember,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginTop: 8,
  },
  backBtnText: {
    color: COLORS.ember,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
});
