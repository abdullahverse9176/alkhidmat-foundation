"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BloodDonorData, BloodDonorSchema } from "@/app/schemas/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecaptcha } from "@/app/hooks/useRecaptcha";
import useUTM from "@/app/hooks/useUTM";
import useGTM from "@/app/hooks/useGTM";
import { submitFormAction } from "@/app/actions/form-actions";
import { getAreasAction } from "@/app/actions/area-actions";
import TextInput from "./forms-component/TextInput";
import PhoneInputField from "./forms-component/PhoneInputField";
import SelectBox from "./forms-component/SelectBox";
import Autocomplete from "./forms-component/Autocomplete";
import { Heart, ShieldCheck } from "lucide-react";

interface BloodDonorRegisterProps {
  onSuccess?: () => void;
}

export default function BloodDonorRegister({ onSuccess }: BloodDonorRegisterProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BloodDonorData>({
    resolver: zodResolver(BloodDonorSchema),
    defaultValues: {
      bloodGroup: "A+",
      lastDonated: "Never",
      city: "",
      area: "",
    }
  });

  const [rawAreas, setRawAreas] = useState<any[]>([]);

  // Register custom fields manually
  useEffect(() => {
    register("city");
    register("area");
  }, [register]);

  // Fetch areas from DB on mount
  useEffect(() => {
    async function loadAreas() {
      try {
        const data = await getAreasAction();
        setRawAreas(data);
      } catch (err) {
        console.error("Failed to load areas:", err);
      }
    }
    loadAreas();
  }, []);

  const cityValue = watch("city") || "";
  const areaValue = watch("area") || "";

  // Get unique list of cities
  const cities = Array.from(new Set(rawAreas.map((a: any) => a.city)));

  // Filter areas based on selected city
  const filteredAreas = cityValue
    ? rawAreas.filter((a: any) => a.city.toLowerCase() === cityValue.toLowerCase()).map((a: any) => a.name)
    : rawAreas.map((a: any) => a.name);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const donationIntervals = [
    "Never",
    "More than 3 months ago",
    "Less than 3 months ago"
  ];

  const { getToken } = useRecaptcha();
  const utm = useUTM();
  const { trackFormSubmit, trackFormError } = useGTM();

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const bloodDonorFormSubmit = async (data: BloodDonorData) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const token = await getToken("blood_donor");
      const response = await submitFormAction("blood_donor", data, utm, token);

      if (response.success) {
        setSuccessMessage(response.message || "Donor registration successful!");
        trackFormSubmit("blood_donor", utm);
        reset();
        onSuccess?.();
      } else {
        setErrorMessage(response.error || "Something went wrong.");
        trackFormError("blood_donor", response.error);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to submit form.");
      trackFormError("blood_donor", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(bloodDonorFormSubmit)} className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="bg-red-50 text-red-500 p-2.5 rounded-xl border border-red-100">
          <Heart className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h3 className="text-lg font-black text-neutral-dark">
            Join the Life Saver Network
          </h3>
          <p className="text-[10px] text-neutral-light font-semibold uppercase tracking-wider">
            Become a volunteer blood donor today
          </p>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 text-sm text-green-800 rounded-lg bg-green-50 border border-green-100 animate-fadeIn" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-100 animate-fadeIn" role="alert">
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
          label="Email Address"
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

        <Autocomplete
          label="City"
          placeholder="Search or select city..."
          value={cityValue}
          onChange={(val) => {
            setValue("city", val, { shouldValidate: true });
            setValue("area", "", { shouldValidate: true });
          }}
          suggestions={cities}
          error={errors.city}
        />

        <Autocomplete
          label="Area / Muhalla / Village / Society"
          placeholder="Search or select area..."
          value={areaValue}
          onChange={(val) => setValue("area", val, { shouldValidate: true })}
          suggestions={filteredAreas}
          error={errors.area}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectBox
          label="Blood Group"
          registration={register("bloodGroup")}
          error={errors.bloodGroup}
          placeholder="Select blood group"
        >
          {bloodGroups.map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </SelectBox>

        <SelectBox
          label="Last Blood Donation"
          registration={register("lastDonated")}
          error={errors.lastDonated}
          placeholder="When did you last donate?"
        >
          {donationIntervals.map((interval) => (
            <option key={interval} value={interval}>
              {interval}
            </option>
          ))}
        </SelectBox>
      </div>

      <div className="flex items-start gap-2 pt-2 border-t border-gray-100">
        <ShieldCheck className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-neutral-light leading-normal font-semibold">
          By registering, you consent to Al-Khidmat Foundation sharing your contact information with patients/hospitals during emergencies in your area.
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          "Register as Blood Donor"
        )}
      </button>
    </form>
  );
}
