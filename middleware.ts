import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// STEP 5: Middleware Setup
// Next.js routing se pehle is file ko parse karta hai.
// Yahan hum NextAuth ko authConfig ke sath initialize kar ke export kar rahe hain.
// NextAuth check karega ke user logged in hai ya nahi (using the authorized callback).
// Note: Hum dynamic next-auth import direct use kar rahe hain taaki Mongoose aur Bcrypt Edge Runtime me load na hon.

export default NextAuth(authConfig).auth;

export const config = {
  // is matcher regex ka matlab hai ke ye middleware static files, images, aur api paths ko chorh kar
  // baki tamam routes (jaise /dashboard, /login etc.) par run karega.
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
