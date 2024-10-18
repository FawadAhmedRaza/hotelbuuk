"use client";

import { AuthContext } from "./auth-context";

// -----------------------------------------

export function AuthConsumer({ children }) {
  return <AuthContext.Consumer>{() => children}</AuthContext.Consumer>;
}
