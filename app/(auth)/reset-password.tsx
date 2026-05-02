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
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/lib/constants';

export default function ResetPasswordScreen() {
  const insets = useSafeAreaInsets();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdatePassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert('Missing Password', 'Please fill out both password fields.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords Do Not Match', 'Please make sure both passwords match.');
      return;
    }

    try {
      setIsSubmitting(true);

      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      Alert.alert('Password Updated', 'Your password has been changed successfully.', [
        {
          text: 'Back to Sign In',
          onPress: () => router.replace('/(auth)/login'),
        },
      ]);
    } catch (err: any) {
      Alert.alert(
        'Update Failed',
        err?.message || 'There was a problem updating your password.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.backLink}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.backLinkText}>← Back to Sign In</Text>
          </TouchableOpacity>

          <View style={styles.heroCard}>
            <Text style={styles.icon}>🔥</Text>

            <Text style={styles.title}>
              CREATE NEW{'\n'}PASSWORD
            </Text>

            <Text style={styles.subtitle}>
              Choose a strong password and lock your account back down.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NEW PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                placeholderTextColor={COLORS.textLightMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isSubmitting}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm new password"
                placeholderTextColor={COLORS.textLightMuted}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isSubmitting}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.primaryBtn,
                isSubmitting && styles.primaryBtnDisabled,
              ]}
              onPress={handleUpdatePassword}
              disabled={isSubmitting}
              activeOpacity={0.85}
            >
              {isSubmitting ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={styles.primaryBtnText}>UPDATE PASSWORD →</Text>
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            After updating, you’ll be sent back to sign in.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.obsidian,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    gap: 24,
  },
  backLink: {
    alignSelf: 'flex-start',
  },
  backLinkText: {
    color: COLORS.ember,
    fontSize: 15,
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: COLORS.obsidianCard,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    borderRadius: 18,
    padding: 22,
    gap: 12,
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.14,
    shadowRadius: 18,
    elevation: 6,
  },
  icon: {
    fontSize: 44,
  },
  title: {
    color: COLORS.white,
    fontSize: 40,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: -1,
  },
  subtitle: {
    color: COLORS.textLightMuted,
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 300,
  },
  formCard: {
    backgroundColor: COLORS.obsidianCardAlt,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    borderRadius: 18,
    padding: 18,
    gap: 18,
  },
  inputGroup: {
    gap: 7,
  },
  inputLabel: {
    color: COLORS.textLightMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  input: {
    backgroundColor: COLORS.obsidianCard,
    borderWidth: 1,
    borderColor: COLORS.obsidianBorder,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '600',
  },
  primaryBtn: {
    backgroundColor: COLORS.ember,
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: 'center',
    shadowColor: COLORS.ember,
    shadowOffset: { width: 0, height: 8 },
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
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  footerText: {
    color: COLORS.textLightMuted,
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
  },
});