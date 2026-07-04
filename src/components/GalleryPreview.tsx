"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZoomIn, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { galleryData, GalleryItem } from "@/data/mockData";

export default function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", "Healthcare", "Disaster Relief", "Welfare", "Education", "Development", "Community"];

  const filteredItems = activeCategory === "All"
    ? galleryData
    : galleryData.filter(item => item.category === activeCategory);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Our Operations Log
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Campaign Gallery Preview
          </h2>
          <p className="text-neutral-light mt-4 text-base">
            Glimpses of our active teams working directly in healthcare camps, clean water installations, and flood emergency sites.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setLightboxIndex(null);
              }}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer border ${
                activeCategory === cat
                  ? "border-primary bg-primary text-white shadow-sm"
                  : "border-gray-200 bg-gray-50 text-neutral-light hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setLightboxIndex(index)}
                className="relative h-64 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl group cursor-pointer border border-gray-100"
              >
                {/* Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay filter */}
                <div className="absolute inset-0 bg-neutral-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                {/* Text and icons */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 text-white">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-accent tracking-widest block">
                      {item.category}
                    </span>
                    <h4 className="font-extrabold text-sm leading-snug mt-0.5">
                      {item.title}
                    </h4>
                  </div>
                  <div className="bg-primary p-2.5 rounded-xl shadow-md text-white">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setActiveCategory("All")}
            className="px-8 py-3.5 border border-primary text-primary hover:bg-primary hover:text-white font-bold text-sm rounded-xl transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
          >
            Reset Filters & View All
          </button>
        </div>

      </div>

      {/* Lightbox full-screen modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 bg-neutral-dark/95 backdrop-blur-md z-50 flex flex-col items-center justify-center p-4"
          >
            {/* Close button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Slider frame */}
            <div className="relative max-w-4xl w-full flex items-center justify-center">
              {/* Prev button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:-left-16 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Central Frame */}
              <div 
                className="bg-neutral-dark/80 rounded-2xl overflow-hidden max-h-[75vh] max-w-3xl w-full border border-white/10 flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                />
                
                {/* Caption Bar */}
                <div className="bg-neutral-dark p-5 border-t border-white/10 text-white">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h4 className="font-extrabold text-base mt-0.5">
                    {filteredItems[lightboxIndex].title}
                  </h4>
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:-right-16 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
