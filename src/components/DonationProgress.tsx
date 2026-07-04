"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, DollarSign, CheckCircle2, X, Award } from "lucide-react";

export default function DonationProgress() {
  const [selectedAmount, setSelectedAmount] = useState<number | "custom">(50);
  const [customAmount, setCustomAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [donorName, setDonorName] = useState("");

  const presetAmounts = [25, 50, 100, 250, 500];

  const handlePresetClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomFocus = () => {
    setSelectedAmount("custom");
  };

  const getFinalAmount = (): number => {
    if (selectedAmount === "custom") {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) ? 0 : parsed;
    }
    return selectedAmount;
  };

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const donationVal = getFinalAmount();
    if (donationVal <= 0) {
      alert("Please specify a donation amount greater than $0.");
      return;
    }
    setIsSubmitting(true);
    // Simulate transaction
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  // Main campaign specs
  const goalAmount = 1500000;
  const raisedAmount = 1062500;
  const progressPercent = Math.round((raisedAmount / goalAmount) * 100);

  return (
    <section id="donation" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest px-3 py-1 bg-primary/10 rounded-full">
            Financial Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-dark mt-4">
            Fueling Grassroots Relief
          </h2>
          <p className="text-neutral-light mt-4 text-base">
            Every contribution directly funds field operations. Select an amount below to make a secure tax-deductible contribution to our general welfare fund.
          </p>
        </div>

        {/* Large Widget Card */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-150 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Progress Meter */}
            <div className="lg:col-span-6 p-8 sm:p-10 bg-gradient-to-br from-primary to-primary-hover text-white flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-accent uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>General Welfare Fund</span>
                </span>
                
                <h3 className="text-2xl font-black tracking-tight leading-snug">
                  Help Us Secure Safe Shelter and Nutritious Food for Displaced Families
                </h3>

                <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                  This core fund covers general emergency deployments, orphan education stipends, and mobile health equipment logistics. Your funds go directly where they are needed most.
                </p>
              </div>

              {/* Progress bar and details */}
              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block">Raised</span>
                    <span className="text-3xl font-black text-white">${raisedAmount.toLocaleString()}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider block">Target Goal</span>
                    <span className="text-xl font-extrabold text-accent">${goalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="w-full bg-white/10 h-3.5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progressPercent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="bg-accent h-full rounded-full"
                  />
                </div>

                <div className="flex justify-between items-center text-[10px] font-bold text-gray-200">
                  <span>{progressPercent}% Complete</span>
                  <span>100% Secure SSL Transaction</span>
                </div>
              </div>

            </div>

            {/* Right Column: Donation Form Panel */}
            <div className="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center">
              <form onSubmit={handleDonateSubmit} className="space-y-6">
                <h4 className="font-extrabold text-neutral-dark text-lg">
                  Select Donation Amount (USD)
                </h4>

                {/* Preset Options Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {presetAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handlePresetClick(amount)}
                      className={`py-3 rounded-xl border text-sm font-black transition-all cursor-pointer ${
                        selectedAmount === amount
                          ? "border-primary bg-primary text-white shadow-md"
                          : "border-gray-200 hover:border-primary/50 text-neutral-dark bg-gray-50"
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}

                  <div className="relative col-span-3">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-light">
                      <DollarSign className="w-4 h-4 text-neutral-light" />
                    </span>
                    <input
                      type="number"
                      placeholder="Enter Custom Amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount("custom");
                      }}
                      onFocus={handleCustomFocus}
                      className={`w-full pl-9 pr-4 py-3 bg-gray-50 border rounded-xl text-sm focus:outline-none focus:bg-white text-neutral-dark font-extrabold transition-all ${
                        selectedAmount === "custom"
                          ? "border-primary ring-2 ring-primary/20 bg-white"
                          : "border-gray-205"
                      }`}
                    />
                  </div>
                </div>

                {/* Donor details */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-extrabold text-neutral-dark mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Muhammad Abdullah"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-250 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white text-neutral-dark font-semibold"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl text-white text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                    isSubmitting ? "bg-primary/70" : "bg-primary hover:bg-primary-hover"
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Heart className="w-4 h-4 fill-current" />
                      <span>Donate Now (${getFinalAmount()})</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>

      </div>

      {/* Success Receipt Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl relative border border-gray-100"
            >
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setDonorName("");
                  setCustomAmount("");
                  setSelectedAmount(50);
                }}
                className="absolute top-4 right-4 text-neutral-light hover:text-neutral-dark p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center py-4 space-y-4">
                <div className="inline-flex p-3.5 bg-primary/10 text-primary rounded-full">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                
                <h4 className="font-extrabold text-neutral-dark text-xl">
                  Donation Successful!
                </h4>

                <p className="text-xs text-neutral-light leading-relaxed max-w-xs mx-auto">
                  Thank you, **{donorName}**, for your contribution of **${getFinalAmount()}** to the Al-Khidmat General Welfare Fund.
                </p>

                {/* Receipt Details Box */}
                <div className="bg-gray-50 rounded-xl p-4 text-left text-xs text-neutral-light space-y-1.5 border border-gray-150 font-mono">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-bold text-neutral-dark">TXN-849204820-AK</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax Exemption Code:</span>
                    <span className="font-bold text-neutral-dark">501(c)(3) Compliant</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-bold text-neutral-dark">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-[10px] text-primary font-bold">
                  A receipt is being forwarded to your billing address.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
