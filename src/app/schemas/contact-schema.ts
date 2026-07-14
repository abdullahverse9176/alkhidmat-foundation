
import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Invalid email"),

  phone: z
    .string()
    .min(11, "Phone number is required"),
});

export type ContactFormData = z.infer<typeof ContactSchema>;