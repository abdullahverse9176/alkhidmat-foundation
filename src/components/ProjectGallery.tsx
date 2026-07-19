"use client";

import React, { useState } from "react";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
        <span>Project Site Gallery</span>
      </h3>

      {/* Featured Large Image Card */}
      <div 
        onClick={() => setIsLightboxOpen(true)}
        className="group relative h-96 sm:h-[450px] w-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md cursor-zoom-in border border-slate-100 bg-slate-50"
      >
        <img 
          src={images[activeIndex]} 
          alt={`${title} featured`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
        />
        
        {/* Glassmorphic hover overlay */}
        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/35 transition-colors duration-300 flex items-center justify-center">
          <div className="p-3.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100 transform">
            <ZoomIn className="w-6 h-6" />
          </div>
        </div>

        {/* Captions */}
        <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-900/75 backdrop-blur-sm border border-white/10 text-white text-xs flex justify-between items-center">
          <span className="font-semibold tracking-wide">Click to expand</span>
          <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
            Image {activeIndex + 1} of {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative h-20 rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${
              activeIndex === idx 
                ? "border-emerald-600 scale-[0.98] ring-2 ring-emerald-500/20" 
                : "border-transparent hover:border-slate-300 opacity-70 hover:opacity-100"
            }`}
          >
            <img 
              src={img} 
              alt={`${title} thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox Fullscreen Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-md z-[999] flex flex-col items-center justify-center p-4 transition-all duration-300 animate-fadeIn"
        >
          {/* Close button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Slider Frame */}
          <div className="relative max-w-4xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-16 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Central image box */}
            <div className="bg-slate-900/50 rounded-2xl overflow-hidden max-h-[80vh] border border-white/10 flex flex-col relative w-full items-center justify-center">
              <img
                src={images[activeIndex]}
                alt={`${title} zoomed`}
                className="w-auto max-w-full max-h-[70vh] object-contain mx-auto"
              />
              
              {/* Caption */}
              <div className="w-full bg-slate-950 p-4 border-t border-white/5 text-white flex justify-between items-center text-sm">
                <span className="font-semibold text-slate-300">{title}</span>
                <span className="font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/20 text-xs">
                  {activeIndex + 1} / {images.length}
                </span>
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
        </div>
      )}
    </div>
  );
}
