"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { 
  Flame, 
  Apple, 
  Stethoscope, 
  GraduationCap, 
  Droplet, 
  Trees, 
  Sparkles, 
  Briefcase,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/mockData";

const iconMap = {
  Flame: Flame,
  Apple: Apple,
  Stethoscope: Stethoscope,
  GraduationCap: GraduationCap,
  Droplet: Droplet,
  Trees: Trees,
  Sparkles: Sparkles,
  Briefcase: Briefcase,
};

export interface ServicesProps {
  initialServices?: ServiceItem[];
}

export default function Services({ initialServices }: ServicesProps) {
  const displayServices = (initialServices && initialServices.length > 0 
    ? initialServices 
    : servicesData).slice(0, 4);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.querySelector(".service-card")?.clientWidth || (container.clientWidth * 0.80);
      const gap = 24; // gap-6 is 24px
      const index = Math.round(container.scrollLeft / (cardWidth + gap));
      setScrollIndex(index);
    }
  };

  const scrollToCard = (index: number) => {
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.querySelector(".service-card")?.clientWidth || (container.clientWidth * 0.80);
      const gap = 24;
      container.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth"
      });
      setScrollIndex(index);
    }
  };

  const scrollNext = () => {
    const nextIndex = Math.min(scrollIndex + 1, displayServices.length - 1);
    scrollToCard(nextIndex);
  };

  const scrollPrev = () => {
    const prevIndex = Math.max(scrollIndex - 1, 0);
    scrollToCard(prevIndex);
  };

  return (
    <section id="services" className="py-10 sm:py-12 md:py-16 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Our Care Areas
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Compassionate Services For All
          </h2>
          <p className="text-neutral-light mt-4 text-base sm:text-lg">
            We provide structured, transparent welfare operations to lift the community, preserve the environment, and establish strong civic support frameworks.
          </p>
        </div>

        {/* Carousel / Services Grid Container */}
        <div className="relative">
          {/* Scroll container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 no-scrollbar scroll-smooth w-full"
          >
            {displayServices.map((service: any) => {
              const Icon = iconMap[service.iconName as keyof typeof iconMap] || Sparkles;

              return (
                <Link 
                  className="service-card snap-start shrink-0 w-[80%] sm:w-[50%] md:w-auto bg-white rounded-2xl p-6 border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer" 
                  href={`/services/${service.slug}`} 
                  key={service.id || service._id}
                >
                  <div>
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-neutral-dark mt-5 group-hover:text-primary transition-colors duration-200">
                      {service.title}
                    </h3>

                    <p className="text-xs text-neutral-light mt-2.5 leading-relaxed font-semibold">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-6 flex items-center gap-1.5 text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Swipe indicator dots and arrow buttons for mobile scroll control */}
          <div className="flex items-center justify-between mt-4 md:hidden">
            <div className="flex gap-2">
              {displayServices.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    scrollIndex === idx ? "bg-primary w-5" : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                disabled={scrollIndex === 0}
                className="p-2 bg-white border border-gray-200 text-neutral-dark rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                disabled={scrollIndex >= displayServices.length - 1}
                className="p-2 bg-white border border-gray-200 text-neutral-dark rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white"
                aria-label="Next Service"
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
