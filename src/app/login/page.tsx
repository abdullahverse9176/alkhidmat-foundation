"use client";

// STEP 7: Premium Login Page Component
// Yeh page ek completely responsive, modern aur glassmorphism-based UI ke sath design kiya gaya hai.
// Isme input validations, custom error states, loading spinners aur Framer Motion animations shamil hain.

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, ArrowRight, Loader2, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // NextAuth credentials signIn call
      // redirect: false taaki hum error ko state me handle kar sakein bina page refresh ke
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        // Agar error ho (e.g. invalid credentials)
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      } else {
        // Successful login ke baad user ko dashboard par redirect karein
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-neutral-dark text-white">
      {/* Background Graphic Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        {/* Card Animation with Framer Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-card-dark rounded-3xl p-8 shadow-2xl border border-white/10"
        >
          {/* Logo & Heading */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 group justify-center">
              <div className="bg-primary p-2.5 rounded-xl text-white group-hover:scale-105 transition-transform duration-200 shadow-md">
                <Sparkles className="w-6 h-6 text-accent animate-pulse" />
              </div>
              <span className="font-black text-xl tracking-tight uppercase text-white">
                AL-KHIDMAT
              </span>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="text-xs text-neutral-light mt-2 font-medium">
              Sign in to manage campaigns and volunteers
            </p>
          </div>

          {/* Quick Sandbox Help Alert */}
          <div className="mb-6 bg-primary/10 border border-primary/20 rounded-xl p-3 text-left">
            <p className="text-[11px] text-primary-hover font-semibold leading-relaxed uppercase tracking-wider mb-1 flex items-center gap-1 text-emerald-400">
              <Sparkles className="w-3 h-3 text-accent" /> Sandbox Login (For Testing)
            </p>
            <p className="text-[11px] text-gray-300 leading-normal">
              Agar aapke paas database ready nahi hai, toh aap is dummy login se test kar sakte hain:<br />
              <strong>Email:</strong> <code className="text-accent">admin@alkhidmat.org</code><br />
              <strong>Password:</strong> <code className="text-accent">password123</code>
            </p>
          </div>

          {/* Error Message Box */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-5 bg-red-900/30 border border-red-500/30 rounded-xl p-3.5 flex items-start gap-2.5 text-red-200"
            >
              <ShieldAlert className="w-4 h-4 mt-0.5 shrink-0" />
              <span className="text-xs font-semibold leading-snug">{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5 text-left">
              <label htmlFor="email" className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-sm transition-all outline-none text-white placeholder-gray-500"
                />
                <Mail className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-sm transition-all outline-none text-white placeholder-gray-500"
                />
                <Lock className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white rounded-xl font-bold uppercase tracking-wider text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 border border-primary-hover"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </form>

          {/* Bottom links */}
          <div className="mt-8 border-t border-white/5 pt-5 text-center flex flex-col gap-2">
            <Link
              href="/"
              className="text-xs font-semibold text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
