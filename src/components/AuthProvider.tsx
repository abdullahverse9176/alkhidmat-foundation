"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";

// STEP 9: Client-side Session Provider
// Next.js Server Components me client state (like Auth Session) direct access nahi hoti.
// Isliye hum dynamic Client Provider banate hain taaki use hooks (jaise 'useSession') ke zariye access kar sakein.

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
