
import { z } from "zod";
import {
  nameField,
  emailField,
  phoneField,
  messageField,
} from "@/lib/validators";

export const ContactSchema = z.object({
  name: nameField("Name"),
  email: emailField("Email"),
  phone: phoneField("Phone"),
  message: messageField("Message"),
});

export type ContactFormData = z.infer<typeof ContactSchema>;