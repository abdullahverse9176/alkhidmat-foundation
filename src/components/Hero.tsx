"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Sparkles, ShieldCheck } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-neutral-dark"
    >
      {/* Background Image with Dark & Primary Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/95 via-neutral-dark/85 to-primary/40" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs uppercase tracking-wider backdrop-blur-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Political Movement & social Welfare</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight"
            >
              Serving Humanity.<br />
              <span className="text-accent bg-clip-text">Building a Better Future.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-medium"
            >
              Al-Khidmat Citizens Alliance unites political accountability with grassroots social reform. We believe public service should build sustainable food systems, clean water, and quality education for all citizens.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={() => onNavigate("donation")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-base font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-current text-white" />
                <span>Donate Now</span>
              </button>

              <button
                onClick={() => onNavigate("volunteer")}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-base font-bold rounded-xl transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 cursor-pointer"
              >
                <Users className="w-5 h-5" />
                <span>Become a Volunteer</span>
              </button>
            </motion.div>
          </div>

          {/* Floating Statistics / Interaction Widget */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-sm rounded-2xl glass-card-dark p-6 shadow-2xl relative group overflow-hidden border border-white/10"
            >
              {/* Highlight background shine */}
              <div className="absolute -inset-y-12 -inset-x-12 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/20 p-2 rounded-lg text-primary">
                      <ShieldCheck className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Impact Snapshot</h4>
                      <p className="text-[10px] text-gray-400">Audited & Transparent</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-accent px-2 py-1 bg-accent/10 rounded border border-accent/20">
                    LIVE UPDATE
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                      Active Campaign Goal
                    </span>
                    <span className="text-2xl font-black text-white">$1,200,000</span>
                    <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden mt-1.5 border border-white/5">
                      <div className="bg-primary h-full rounded-full" style={{ width: "70.8%" }} />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1 font-semibold">
                      <span>70.8% Raised</span>
                      <span className="text-accent font-bold">$850,000 collected</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block">Volunteers</span>
                      <span className="text-lg font-bold text-white">15,430+</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold block">Relief Sites</span>
                      <span className="text-lg font-bold text-white">120+ Cities</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate("projects")}
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors duration-150 text-center uppercase tracking-wider cursor-pointer"
                >
                  View Active Projects
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Decorative Wave/Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 sm:h-12 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.05,116.66,128.89,112.87,196.24,96.65,248.65,84.05,294.67,69.57,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
