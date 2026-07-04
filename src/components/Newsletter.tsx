"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    // Simulate API sign up
    setTimeout(() => {
      setLoading(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1200);
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Decorative vectors */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-accent font-bold text-[10px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stay in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xs sm:text-sm text-gray-200 max-w-xl mx-auto leading-relaxed font-medium">
            Get real-time updates regarding our emergency deployments, volunteer schedules, and political campaigns delivered straight to your inbox.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubscribe}
                className="space-y-3"
              >
                <div className="relative flex flex-col sm:flex-row gap-2 bg-white/10 p-1.5 rounded-2xl border border-white/20 backdrop-blur-sm">
                  <div className="relative flex-grow">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">
                      <Mail className="w-5 h-5 text-gray-300" />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrorMsg("");
                      }}
                      className="w-full pl-11 pr-4 py-3 bg-transparent border-0 text-white placeholder-gray-300 text-sm focus:outline-none focus:ring-0"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="sm:px-6 py-3 bg-accent hover:bg-accent-hover text-neutral-dark font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center shrink-0"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-neutral-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>

                {errorMsg && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-accent font-extrabold text-left pl-3"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/15 border border-white/20 rounded-2xl p-6 text-center space-y-3 backdrop-blur-sm"
              >
                <div className="inline-flex p-2 bg-accent/20 text-accent rounded-full">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-extrabold text-white text-base">
                  Successfully Subscribed!
                </h4>
                <p className="text-xs text-gray-205 leading-relaxed max-w-sm mx-auto font-medium">
                  Your email has been added to our newsletter index. We respect your privacy and will never spam you.
                </p>
                <button
                  onClick={() => setIsSubscribed(false)}
                  className="text-xs text-accent font-bold hover:underline cursor-pointer"
                >
                  Subscribe another email
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
