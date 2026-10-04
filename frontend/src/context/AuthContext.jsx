import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  fetchCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);

  useEffect(() => {
    async function syncUser() {
      try {
        const response = await fetchCurrentUser();

        const nextUser = response?.authenticated
          ? response.user
          : null;

        setUser(nextUser);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    syncUser();
  }, []);

  const login = async (formData) => {
    const response = await loginUser(formData);

    const nextUser = response?.user || null;

    setUser(nextUser);
    setLoginPromptOpen(false);

    return response;
  };

  const register = async (formData) => {
    const response = await registerUser(formData);

    const nextUser = response?.user || null;

    setUser(nextUser);
    setLoginPromptOpen(false);

    return response;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Session may already be expired on the backend.
    }

    setUser(null);
    setLoginPromptOpen(false);
  };

  const requestLoginPrompt = () => {
    setLoginPromptOpen(true);
  };

  const closeLoginPrompt = () => {
    setLoginPromptOpen(false);
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
      loginPromptOpen,
      requestLoginPrompt,
      closeLoginPrompt,
    }),
    [user, isLoading, loginPromptOpen]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}