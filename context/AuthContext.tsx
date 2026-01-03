"use client";

import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthState, User } from "@/lib/types";

const AuthContext = createContext<AuthState>({
  user: null,
  isAuthenticated: false,
  token: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    Cookies.get("auth_token") || null
  );
  const router = useRouter();

  const login = (newToken: string, userData?: User) => {
    Cookies.set("auth_token", newToken, { expires: 7 }); // 7 days
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
    if (userData) setUser(userData);
    router.push("/products"); // Redirect to products
  };

  const logout = () => {
    Cookies.remove("auth_token");
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!token,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
