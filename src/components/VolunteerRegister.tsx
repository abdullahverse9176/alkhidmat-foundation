"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";

interface VolunteerRegisterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VolunteerRegister({ isOpen, onClose }: VolunteerRegisterProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    program: "Disaster Relief",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const programs = [
    "Disaster Relief",
    "Food Distribution",
    "Medical Camps",
    "Education Support",
    "Blood Donation Net",
    "Tree Plantation",
    "Women Empowerment",
    "Youth Development"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.city) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-md z-50 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl relative border border-gray-100 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-neutral-light hover:text-neutral-dark p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-neutral-dark">
                      Join Our Volunteer Network
                    </h3>
                    <p className="text-[10px] text-neutral-light font-semibold uppercase tracking-wider">
                      Over 15,400+ citizens actively serving
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +92 300 1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      City of Residence
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chiniot"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-neutral-dark mb-1">
                      Preferred Relief Program
                    </label>
                    <select
                      value={formData.program}
                      onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                      className="w-full p-2.5 bg-gray-50 border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold"
                    >
                      {programs.map((prog) => (
                        <option key={prog} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-neutral-light leading-normal font-semibold">
                    By submitting, you agree to coordinate with local area heads and receive safety brief alerts regarding emergency disaster deployments.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Submit Volunteer Registration"
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="inline-flex p-3.5 bg-primary/10 text-primary rounded-full animate-bounce">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                
                <h4 className="font-extrabold text-neutral-dark text-xl">
                  Registration Successful!
                </h4>

                <p className="text-xs text-neutral-light leading-relaxed max-w-sm mx-auto font-medium">
                  Welcome to the squad, **{formData.name}**! A regional cell head from **{formData.city}** will contact you at **{formData.phone}** within 48 hours for onboarding.
                </p>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({ name: "", email: "", phone: "", city: "", program: "Disaster Relief" });
                      onClose();
                    }}
                    className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
