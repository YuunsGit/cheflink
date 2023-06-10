"use client";

import { createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children, user }) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
