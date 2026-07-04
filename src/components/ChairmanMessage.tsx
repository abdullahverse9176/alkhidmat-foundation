"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { chairmanMessageData } from "@/data/mockData";

export default function ChairmanMessage() {
  return (
    <section id="leadership" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gray-50 rounded-3xl border border-gray-150 shadow-sm overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Photo with frame decorations */}
            <div className="lg:col-span-4 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group max-w-sm"
              >
                <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-accent rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur" />
                <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={chairmanMessageData.imageUrl}
                    alt={chairmanMessageData.name}
                    className="w-full h-[380px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>

            {/* Right side: Message details */}
            <div className="lg:col-span-8 space-y-6 relative">
              <Quote className="w-16 h-16 text-primary/10 absolute -top-8 -left-6 pointer-events-none" />

              <div className="space-y-1">
                <span className="text-xs font-bold text-primary uppercase tracking-widest block">
                  Movement Leadership
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-dark tracking-tight">
                  Message From Our Chairman
                </h2>
              </div>

              <blockquote className="text-neutral-light italic text-base sm:text-lg leading-relaxed font-semibold">
                &ldquo;{chairmanMessageData.message}&rdquo;
              </blockquote>

              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="font-extrabold text-neutral-dark text-base">
                    {chairmanMessageData.name}
                  </h4>
                  <p className="text-xs text-neutral-light font-bold uppercase mt-0.5 tracking-wider">
                    {chairmanMessageData.role}
                  </p>
                </div>

                {/* Styled signature representation */}
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-xs text-neutral-light font-semibold uppercase tracking-wider block mb-1">
                    Signature
                  </span>
                  <div className="font-serif italic text-2xl font-bold text-primary tracking-wide py-1.5 px-3 bg-white rounded-lg border border-gray-150 shadow-inner">
                    {chairmanMessageData.signatureText}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
