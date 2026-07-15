import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';

// STEP 4: NextAuth main initialization file (auth.ts)
// Yahan hum Credentials provider configure karenge.
// credentials verify karne ke liye hum MongoDB database se user fetch karenge.

async function getUser(email: string) {
  try {
    // Database se connect karein
    await dbConnect();
    // User ko find karein email ke zariye
    return await User.findOne({ email });
  } catch (error) {
    console.error('Database connection error in getUser:', error);
    return null;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Zod validation ke zariye input data ko validate karein
        const parsedCredentials = z
          .object({ 
            email: z.string().email('Invalid email address'), 
            password: z.string().min(6, 'Password must be at least 6 characters') 
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log('Zod Validation Failed:', parsedCredentials.error.issues);
          return null;
        }

        const { email, password } = parsedCredentials.data;

        // --- REAL DATABASE AUTHENTICATION ---
        const user = await getUser(email);
        if (!user) {
          console.log('User not found in database');
          return null;
        }

        // Password ko compare karein (Bcrypt use kar ke)
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (passwordsMatch) {
          // Agar password sahi hai, toh user object return karein
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role || 'user',
          };
        }

        console.log('Invalid password match');
        return null;
      },
    }),
  ],
  // JWT aur Session me details insert karne ke liye callbacks
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      // Jab user pehli baar sign-in karega, tab 'user' populated hoga
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || 'user';
      }
      return token;
    },
    async session({ session, token }) {
      // Session object me custom details (id, role) transfer karein
      if (token && session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
});
