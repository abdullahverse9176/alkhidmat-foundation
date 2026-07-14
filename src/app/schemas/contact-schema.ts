
import { z } from "zod";
import {
  nameField,
  emailField,
  phoneField,
} from "@/lib/validators";

export const ContactSchema = z.object({
  name: nameField("Name"),
  email: emailField("Email"),
  phone: phoneField("Phone"),
});

export type ContactFormData = z.infer<typeof ContactSchema>;