"use client";

import { createContext, useContext } from "react";

// ----------------------------------------------------------------------

export const AuthContext = createContext({});

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext can't use outside the context");
  return context;
};
