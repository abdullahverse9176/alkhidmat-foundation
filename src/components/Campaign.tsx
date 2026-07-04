"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, Award } from "lucide-react";
import { campaignData } from "@/data/mockData";
import Link from "next/link";

export default function Campaign() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(campaignData.electionDate).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative py-24 text-white overflow-hidden bg-neutral-dark">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-30"
        style={{
          backgroundImage: `url('${campaignData.imageUrl}')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-dark via-neutral-dark/95 to-primary/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Campaign Details Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/20 border border-accent/30 text-accent font-bold text-xs uppercase tracking-wider rounded-full backdrop-blur-sm animate-pulse">
              <Award className="w-3.5 h-3.5" />
              <span>Election Call 2026</span>
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {campaignData.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl font-medium">
              {campaignData.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/volunteer"
                className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-neutral-dark font-black text-sm rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer hover:-translate-y-0.5 text-center inline-flex"
              >
                Join Campaign As Volunteer
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm rounded-xl transition-all duration-200 backdrop-blur-sm cursor-pointer hover:-translate-y-0.5 text-center inline-flex"
              >
                Contact Campaign Office
              </Link>
            </div>
          </div>

          {/* Countdown Clock Column */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-md rounded-2xl glass-card-dark p-8 border border-white/10 text-center shadow-2xl relative"
            >
              <h3 className="font-extrabold text-lg text-white mb-6 uppercase tracking-wider">
                Countdown to Election Day
              </h3>

              {/* Countdown Numbers Grid */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Mins" },
                  { value: timeLeft.seconds, label: "Secs" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                    <span className="block text-2xl sm:text-3xl font-black text-accent tracking-tight">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] uppercase font-bold text-gray-400 mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-gray-400 font-semibold">
                <Calendar className="w-4 h-4 text-accent" />
                <span>Target: October 15, 2026</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
