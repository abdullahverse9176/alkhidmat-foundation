import { handlers } from "@/../auth";

// STEP 6: NextAuth API Routes setup
// Yeh file GET aur POST requests ko handle karegi (jaise sign-in, sign-out, session recovery etc.)
// Hum directly auth.ts se 'handlers' import kar ke export kar rahe hain.

export const { GET, POST } = handlers;
