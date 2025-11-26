import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { setAccessToken, getAccessToken, clearAccessToken } from "@/api/token";
import { authService } from "@/services/auth/authService"; // class-based service
import { userService } from "@/services/user/userService";
import { User } from "@/types/author";


type AuthContextType = {
  user: User;
  token: string | null;
  loading: boolean;
  signIn: (payload: { username: string; password: string; remember?: boolean }) => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate từ localStorage
  useEffect(() => {
    const at = getAccessToken();
    if (at) {
      setToken(at);
      userService.getMe().then(setUser).catch(() => setUser(null));
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(async (payload: { username: string; password: string; remember?: boolean }) => {
    const res = await authService.login({
      username: payload.username,
      password: payload.password,
    });
    setAccessToken(res.access_token, payload.remember);
    setToken(res.access_token);

    userService.getMe().then(setUser).catch(() => setUser(null));
  }, []);

  const signOut = useCallback(async () => {
    try {
      await authService.logout();
      console.log("Logged out successfully");
    } catch(error) {
      throw new error;
    }
    clearAccessToken();
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, signIn, signOut }),
    [user, token, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
