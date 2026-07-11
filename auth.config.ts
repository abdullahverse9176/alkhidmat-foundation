import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    // Jab user auth na ho to is page par redirect hoga
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // STEP 3: Protected Routes aur Auth Callback setup
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');

      if (isOnDashboard) {
        // Agar dashboard par hai aur logged in hai to access do
        if (isLoggedIn) return true;
        // Agar logged in nahi hai to login page par redirect kar do
        return false;
      } else if (isLoggedIn && isOnLogin) {
        // Agar logged in user login page par aaye to use dashboard par bhej do
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      // Baki saare pages (home, contact, services etc.) open rahenge
      return true;
    },
  },
  providers: [], // Providers list. Ye auth.ts me update hogi
} satisfies NextAuthConfig;