import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { fetchCurrentUser, loginUser, logoutUser, registerUser } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("shopgen-user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  const syncUser = async () => {
    try {
      const response = await fetchCurrentUser();
      if (response?.user) {
        setUser(response.user);
        localStorage.setItem("shopgen-user", JSON.stringify(response.user));
      } else {
        setUser(null);
        localStorage.removeItem("shopgen-user");
      }
    } catch {
      setUser(null);
      localStorage.removeItem("shopgen-user");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncUser();
  }, []);

  const handleLogin = async (formData) => {
    const response = await loginUser(formData);
    const nextUser = response?.user || null;
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem("shopgen-user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("shopgen-user");
    }
    return response;
  };

  const handleRegister = async (formData) => {
    const response = await registerUser(formData);
    const nextUser = response?.user || null;
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem("shopgen-user", JSON.stringify(nextUser));
    } else {
      localStorage.removeItem("shopgen-user");
    }
    return response;
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore server logout errors and clear local state anyway.
    }

    setUser(null);
    localStorage.removeItem("shopgen-user");
  };

  const value = useMemo(
    () => ({ user, isLoading, login: handleLogin, register: handleRegister, logout: handleLogout }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
