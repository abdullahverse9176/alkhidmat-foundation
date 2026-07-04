"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonialsData, TestimonialItem } from "@/data/mockData";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(slideNext, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const activeTestimonial = testimonialsData[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0
    })
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative quotes background */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-48 h-48 text-gray-50 pointer-events-none z-0">
        <Quote className="w-full h-full fill-current" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Words of Trust
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-dark mt-4">
            What Our Supporters Say
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-gray-50 rounded-3xl border border-gray-150 p-8 sm:p-12 shadow-sm min-h-[300px] flex flex-col justify-between">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-accent justify-center sm:justify-start">
                {[...Array(activeTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-neutral-light italic text-base sm:text-lg leading-relaxed text-center sm:text-left font-medium">
                &ldquo;{activeTestimonial.text}&rdquo;
              </p>

              {/* User Bio */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-gray-200/65">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeTestimonial.avatarUrl}
                  alt={activeTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-md"
                />
                <div className="text-center sm:text-left">
                  <h4 className="font-extrabold text-neutral-dark text-base">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-xs text-neutral-light font-bold">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
            <div className="flex gap-1.5">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                    resetTimer();
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                    currentIndex === idx 
                      ? "bg-primary w-6" 
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  slidePrev();
                  resetTimer();
                }}
                className="p-2 bg-white hover:bg-primary hover:text-white border border-gray-200 text-neutral-dark rounded-xl transition-all shadow-sm cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  slideNext();
                  resetTimer();
                }}
                className="p-2 bg-white hover:bg-primary hover:text-white border border-gray-200 text-neutral-dark rounded-xl transition-all shadow-sm cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
