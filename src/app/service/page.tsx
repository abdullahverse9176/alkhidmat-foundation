"use client";

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

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(ContactSchema)
  });

  function onSubmit(data: ContactFormData) {
    console.log(data);
  }

  return (
    <div className="min-h-screen bg-white pt-32">
      <Navbar />

      <div className="max-w-xl mx-auto mb-10">
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <div className="text-center">
            <FormBtn text="Submit" />
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}