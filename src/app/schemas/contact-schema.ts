
import { z } from "zod";
import {
  nameField,
  emailField,
  phoneField,
  messageField,
  cityField,
} from "@/lib/validators";

export const ContactSchema = z.object({
  name: nameField("Name"),
  email: emailField("Email"),
  phone: phoneField("Phone"),
  message: messageField("Message"),
});

export const VolunteerRegisterSchema = z.object({
  name: nameField("Name"),
  email: emailField("Email"),
  phone: phoneField("Phone"),
  city: cityField("City"),
  program: z.enum(["Disaster Relief", "Food Distribution", "Medical Camps", "Education Support", "Blood Donation Net", "Tree Plantation", "Women Empowerment", "Youth Development"]),
});

export const BloodDonorSchema = z.object({
  name: nameField("Name"),
  email: emailField("Email"),
  phone: phoneField("Phone"),
  cityVillageArea: z.string().min(2, "City, Village or Area name is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  lastDonated: z.string().optional(),
});

export type VolunteerRegisterData = z.infer<typeof VolunteerRegisterSchema>;
export type ContactFormData = z.infer<typeof ContactSchema>;
export type BloodDonorData = z.infer<typeof BloodDonorSchema>;