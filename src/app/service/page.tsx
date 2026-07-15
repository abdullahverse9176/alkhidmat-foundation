"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  ContactSchema,
  ContactFormData,
} from "@/app/schemas/contact-schema";
import TextInput from "@/components/forms-component/TextInput";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FormBtn from "@/components/forms-component/FormBtn";
import { useRecaptcha } from "@/app/hooks/useRecaptcha";
import useUTM from "@/app/hooks/useUTM";
import { submitFormAction } from "@/app/actions/form-actions";

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema),
  });

  const { getToken } = useRecaptcha();
  const utm = useUTM();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(data: ContactFormData) {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      // 1. Get Google reCAPTCHA v3 token
      const token = await getToken("contact_submit");

      // 2. Call backend server action
      const response = await submitFormAction("contact", data, utm, token);

      if (response.success) {
        setSuccessMessage(response.message || "Submitted successfully!");
        reset();
      } else {
        setErrorMessage(response.error || "Something went wrong.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to submit form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <Navbar />

      <div className="max-w-xl mx-auto mb-10 p-6 bg-gray-50 rounded-xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

          <TextInput
            label="Name"
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

          <TextInput
            label="Phone"
            placeholder="Enter your phone number"
            type="tel"
            registration={register("phone")}
            error={errors.phone}
          />

          <div className="text-center pt-2">
            <FormBtn text={isSubmitting ? "Submitting..." : "Submit"} disabled={isSubmitting} />
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}