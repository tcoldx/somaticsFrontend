// AuthProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from './supabase';
import { Session, User } from '@supabase/supabase-js';
const [pendingPasswordReset, setPendingPasswordReset] = useState<boolean>(false);
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  resetPassword: (email: string) => Promise<void>;
  pendingPasswordReset: boolean
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      setIsLoading(false);
    };


    init();

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange(async (_event, session) => {
        if (_event === "PASSWORD_RECOVERY") {
          setPendingPasswordReset(true);
          const newPass = prompt("What would you like the new password to be?");
          if (!newPass) {
            alert("Password update cancelled!");
            return;
          }
          const {data, error} = await supabase.auth.updateUser({password: newPass});
          if (data) alert("Password updated successfully!")
          if (error) alert("There was an error updating your password.")
            setPendingPasswordReset(false);
        }
        setSession(session);
        setIsLoading(false);
      });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => { // this stays the way it is, remember auth is supabase handled and doesnt update the screen on change. and in the components we do manual touch based screen change!
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };
const signOut = async () => {
    await supabase.auth.signOut();
  };
const resetPassword = async (val: string) => {
  console.log("redirect working!");
const {data, error} = await supabase.auth.resetPasswordForEmail(val, {
  redirectTo: 'somatics://reset-password',
});

}

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        isAuthenticated: !!session,
        isLoading,
        resetPassword,
        pendingPasswordReset,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Make sure you export this hook
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}