"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { EventVolunteerData, EventVolunteerSchema } from "@/app/schemas/contact-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecaptcha } from "@/app/hooks/useRecaptcha";
import useUTM from "@/app/hooks/useUTM";
import useGTM from "@/app/hooks/useGTM";
import { submitFormAction } from "@/app/actions/form-actions";
import { getAreasAction } from "@/app/actions/area-actions";
import TextInput from "./forms-component/TextInput";
import PhoneInputField from "./forms-component/PhoneInputField";
import Autocomplete from "./forms-component/Autocomplete";
import { X, Calendar, Clock, MapPin, Sparkles, ShieldCheck } from "lucide-react";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface EventVolunteerModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export default function EventVolunteerModal({ event, onClose }: EventVolunteerModalProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EventVolunteerData>({
    resolver: zodResolver(EventVolunteerSchema),
    defaultValues: {
      city: "",
      area: "",
      eventId: "",
      eventName: "",
    }
  });

  const [rawAreas, setRawAreas] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { getToken } = useRecaptcha();
  const utm = useUTM();
  const { trackFormSubmit, trackFormError } = useGTM();

  // Register custom fields manually
  useEffect(() => {
    register("city");
    register("area");
    register("eventId");
    register("eventName");
  }, [register]);

  // Set event details when selected
  useEffect(() => {
    if (event) {
      setValue("eventId", event._id);
      setValue("eventName", event.title);
      setSuccessMessage(null);
      setErrorMessage(null);
    }
  }, [event, setValue]);

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

  if (!event) return null;

  const cityValue = watch("city") || "";
  const areaValue = watch("area") || "";

  // Get unique list of cities
  const cities = Array.from(new Set(rawAreas.map((a: any) => a.city)));

  // Filter areas based on selected city
  const filteredAreas = cityValue
    ? rawAreas.filter((a: any) => a.city.toLowerCase() === cityValue.toLowerCase()).map((a: any) => a.name)
    : rawAreas.map((a: any) => a.name);

  const onSubmit = async (data: EventVolunteerData) => {
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const token = await getToken("event_volunteer");
      const response = await submitFormAction("event_volunteer", data, utm, token);

      if (response.success) {
        setSuccessMessage(response.message || "Successfully registered for this event!");
        trackFormSubmit("event_volunteer", utm);
        reset({
          city: "",
          area: "",
          eventId: event._id,
          eventName: event.title,
        });
      } else {
        setErrorMessage(response.error || "Something went wrong.");
        trackFormError("event_volunteer", response.error);
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to register.");
      trackFormError("event_volunteer", error.message);
    }
  };

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 transition-all animate-fadeIn">
      <div className="bg-white rounded-3xl border border-gray-150 p-6 sm:p-8 w-full max-w-xl shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-650 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-5 text-left">
          <div className="bg-primary/10 text-primary p-2.5 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-gray-900 text-lg">
              Event Volunteer signup
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              Register to support this specific program
            </p>
          </div>
        </div>

        {/* Event Meta Brief */}
        <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 mb-6 text-left space-y-2">
          <h4 className="font-bold text-gray-800 text-sm leading-snug">{event.title}</h4>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-gray-505">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {event.time}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              {event.location}
            </span>
          </div>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="p-4 text-xs font-semibold text-green-800 rounded-xl bg-green-50 border border-green-100 flex items-start gap-2 mb-5 text-left">
            <Sparkles className="w-4.5 h-4.5 text-green-500 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="p-4 text-xs font-semibold text-red-800 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2 mb-5 text-left">
            <X className="w-4.5 h-4.5 text-red-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Inputs */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
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
          </div>

          <div className="grid grid-cols-1 gap-4 text-left">
            <Autocomplete
              label="Area / Muhalla / Village / Society"
              placeholder="Search or select area..."
              value={areaValue}
              onChange={(val) => setValue("area", val, { shouldValidate: true })}
              suggestions={filteredAreas}
              error={errors.area}
            />
          </div>

          <div className="flex items-start gap-2 pt-2 border-t border-gray-100 text-left">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-[10px] text-gray-400 leading-normal font-semibold">
              By submitting, you agree to coordinate with this event's supervisor and receive details regarding active deployments at the venue location.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Confirm Registration"
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
