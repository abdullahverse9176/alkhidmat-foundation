"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Users, Sparkles, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1600",
    badge: "Disaster Relief & Management",
    title: "Serving Humanity in Crisis",
    accentTitle: "Rebuilding Communities.",
    description: "Alkhidmat Foundation is Pakistan's leading non-profit, non-political humanitarian organization. We are first to respond to earthquakes, floods, and emergencies, providing food, medical shelter, and long-term rehabilitation.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&q=80&w=1600",
    badge: "Clean Water Initiative",
    title: "Safe Drinking Water for All",
    accentTitle: "Saving Precious Lives.",
    description: "Access to clean water is a basic human right. We install hand pumps, construct deep water wells, and set up solar-powered filtration plants in underserved, arid regions of Pakistan.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1600",
    badge: "Orphan Care & Education",
    title: "Empowering the Next Generation",
    accentTitle: "Securing Their Dreams.",
    description: "We provide comprehensive care to thousands of orphan children, sponsoring high-quality school education, medical support, clothing, and safe shelters to build their future.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1576091160621-26330057b435?auto=format&fit=crop&q=80&w=1600",
    badge: "Healthcare & Medical Camps",
    title: "Accessible Medical Support",
    accentTitle: "Promoting Health & Dignity.",
    description: "We run free medical camps, operate hospitals, maintain an emergency blood donor network, and establish mobile clinics to provide quality healthcare to families in need.",
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_PLAY_TIME = 6000;

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(slideNext, AUTO_PLAY_TIME);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.05
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.6 },
        scale: { duration: 0.8 }
      }
    })
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden bg-neutral-dark"
    >
      {/* Background Image Carousel Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50) {
                slideNext();
                resetTimer();
              } else if (swipe > 50) {
                slidePrev();
                resetTimer();
              }
            }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full cursor-grab active:cursor-grabbing"
            style={{
              backgroundImage: `url('${slides[currentIndex].image}')`,
            }}
          />
        </AnimatePresence>
        
        {/* Dark & Primary Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/95 via-neutral-dark/85 to-primary/40 pointer-events-none" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy - Animate on slide changes */}
          <div className="lg:col-span-7 text-left min-h-[400px] flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-accent font-semibold text-xs uppercase tracking-wider backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slides[currentIndex].badge}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  {slides[currentIndex].title}<br />
                  <span className="text-accent bg-clip-text">{slides[currentIndex].accentTitle}</span>
                </h1>

                <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-medium">
                  {slides[currentIndex].description}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <Link
                    href="/#donation"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-slate-900 text-base font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-center inline-flex"
                  >
                    <Heart className="w-5 h-5 fill-current text-slate-900" />
                    <span>Donate Now</span>
                  </Link>

                  <Link
                    href="/volunteer"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 text-base font-bold rounded-xl transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5 cursor-pointer text-center inline-flex"
                  >
                    <Users className="w-5 h-5" />
                    <span>Become a Volunteer</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Controls (Dots & Arrows) */}
            <div className="flex items-center gap-6 mt-12">
              {/* Chevron Arrows */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    slidePrev();
                    resetTimer();
                  }}
                  className="p-2.5 bg-white/10 hover:bg-primary text-white border border-white/20 hover:border-primary rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center backdrop-blur-sm"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    slideNext();
                    resetTimer();
                  }}
                  className="p-2.5 bg-white/10 hover:bg-primary text-white border border-white/20 hover:border-primary rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center backdrop-blur-sm"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots Indicators */}
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                      resetTimer();
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx 
                        ? "bg-accent w-7" 
                        : "bg-white/40 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Floating Statistics / Interaction Widget */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full max-w-sm rounded-2xl glass-card-dark p-6 shadow-2xl relative group overflow-hidden border border-white/10 backdrop-blur-md"
            >
              {/* Highlight background shine */}
              <div className="absolute -inset-y-12 -inset-x-12 bg-primary/20 blur-3xl opacity-50 group-hover:opacity-75 transition-opacity pointer-events-none" />

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

                <Link
                  href="/welfare-projects"
                  className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg transition-colors duration-150 text-center uppercase tracking-wider cursor-pointer block"
                >
                  View Active Projects
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Slide Progress Timer Line Indicator at the Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
        <motion.div
          key={currentIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: AUTO_PLAY_TIME / 1000, ease: "linear" }}
          className="h-full bg-accent"
        />
      </div>

      {/* Decorative Wave/Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 sm:h-12 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.05,116.66,128.89,112.87,196.24,96.65,248.65,84.05,294.67,69.57,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}

