"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { VolunteerRegisterData, VolunteerRegisterSchema } from "@/app/schemas/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecaptcha } from "@/app/hooks/useRecaptcha";
import useUTM from "@/app/hooks/useUTM";
import useGTM from "@/app/hooks/useGTM";
import { submitFormAction } from "@/app/actions/form-actions";
import TextInput from "./forms-component/TextInput";
import PhoneInputField from "./forms-component/PhoneInputField";
import SelectBox from "./forms-component/SelectBox";

interface VolunteerRegisterProps {
  onSuccess?: () => void;
}

export default function VolunteerRegister({ onSuccess }: VolunteerRegisterProps) {

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerRegisterData>({
    resolver: zodResolver(VolunteerRegisterSchema),
  });


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

  const { getToken } = useRecaptcha();
  const utm = useUTM();
  const { trackFormSubmit, trackFormError } = useGTM();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const volunteerRegisterationForm = async (data: VolunteerRegisterData) => {

    setSuccessMessage(null);
    setErrorMessage(null);

    try {

      const token = await getToken("volunteer_register");

      const response = await submitFormAction("volunteer_register", data, utm, token);

      if (response.success) {
        setSuccessMessage(response.message || "Submitted successfully!");
        trackFormSubmit("volunteer_register", utm);
        reset();
        onSuccess?.();
      } else {
        setErrorMessage(response.error || "Something went wrong.");
        trackFormError("contact", response.error);
      }


    } catch (error: any) {
      setErrorMessage(error.message || "Failed to submit form.");
      trackFormError("volunteer_register", error.message);
    }
  }


  return (

    <>
      <form onSubmit={handleSubmit(volunteerRegisterationForm)} className="space-y-5">
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

        {successMessage && (
          <div className="p-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-100" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-100" role="alert">
            {errorMessage}
          </div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Full Name"
            placeholder="Enter your name"
            registration={register("name")}
            error={errors.name}
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            type="email"
            registration={register("email")}
            error={errors.email}
          />
          <PhoneInputField
            name="phone"
            control={control}
            label="Phone Number"
            error={errors.phone}
          />

          <TextInput
            label="City of Residence"
            placeholder="Enter your city"
            registration={register("city")}
            error={errors.city}
          />

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
          <SelectBox
            label="Preferred Relief Program"
            registration={register("program")}
            error={errors.program}
            placeholder="Select your preferred relief program"
          >
            {programs.map((prog) => (
              <option key={prog} value={prog}>
                {prog}
              </option>
            ))}
          </SelectBox>
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
    </>

  );
}
