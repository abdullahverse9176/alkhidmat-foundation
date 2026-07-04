"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, MessageSquare, ArrowRight } from "lucide-react";

interface CTAProps {
  onNavigate: (sectionId: string) => void;
}

export default function CTA({ onNavigate }: CTAProps) {
  const cards = [
    {
      title: "Join as a Volunteer",
      description: "Sign up today to join our local regional cells, distribute food rations, or support medical logistics directly on the ground.",
      buttonText: "Register as Volunteer",
      icon: Users,
      actionId: "volunteer",
      bgColor: "bg-primary/5 border-primary/20",
      iconColor: "text-primary bg-primary/10",
      btnClass: "bg-primary hover:bg-primary-hover text-white"
    },
    {
      title: "Donate to Campaigns",
      description: "Support our ongoing relief projects, clean water wells, and child welfare clinics. Your support is fully tax-exempt.",
      buttonText: "Donate Online Now",
      icon: Heart,
      actionId: "donation",
      bgColor: "bg-accent/5 border-accent/20",
      iconColor: "text-accent bg-accent/10",
      btnClass: "bg-accent hover:bg-accent-hover text-white"
    },
    {
      title: "Inquire & Partner",
      description: "Are you an NGO representative, local leader, or corporate partner? Reach out to collaborate on major regional operations.",
      buttonText: "Get in Touch",
      icon: MessageSquare,
      actionId: "contact",
      bgColor: "bg-neutral-dark/5 border-neutral-dark/10",
      iconColor: "text-neutral-dark bg-neutral-dark/10",
      btnClass: "bg-neutral-dark hover:bg-neutral-dark/90 text-white"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className={`p-8 rounded-3xl border flex flex-col justify-between space-y-6 transition-all duration-300 ${card.bgColor}`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-neutral-dark">
                    {card.title}
                  </h3>

                  <p className="text-xs text-neutral-light leading-relaxed font-semibold">
                    {card.description}
                  </p>
                </div>

                <button
                  onClick={() => onNavigate(card.actionId)}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${card.btnClass}`}
                >
                  <span>{card.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
