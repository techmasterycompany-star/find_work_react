import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login as loginRequest } from "../modules/auth/services/authApi";

const TOKEN_STORAGE_KEY = "token";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isInitializing, setIsInitializing] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_STORAGE_KEY)),
  );

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

    if (!storedToken) {
      return undefined;
    }

    let isActive = true;

    getCurrentUser()
      .then((currentUser) => {
        if (!isActive) return;
        setToken(storedToken);
        setUser(currentUser);
      })
      .catch(() => {
        if (isActive) clearSession();
      })
      .finally(() => {
        if (isActive) setIsInitializing(false);
      });

    return () => {
      isActive = false;
    };
  }, [clearSession]);

  const login = useCallback(
    async (credentials) => {
      const loginData = await loginRequest(credentials);
      const accessToken = loginData.accessToken;

      localStorage.setItem(TOKEN_STORAGE_KEY, accessToken);
      setToken(accessToken);

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        return currentUser;
      } catch (error) {
        clearSession();
        throw error;
      }
    },
    [clearSession],
  );

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? null,
      token,
      isInitializing,
      isAuthenticated: Boolean(token && user),
      login,
      clearSession,
    }),
    [clearSession, isInitializing, login, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
