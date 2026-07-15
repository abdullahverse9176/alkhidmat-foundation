"use server";

import { dbConnect } from "@/lib/db";
import { FormSubmission } from "@/models/FormSubmission";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { ContactSchema } from "@/app/schemas/contact-schema";
import { headers } from "next/headers";
import { z } from "zod";

// Schema registry to easily support multiple schemas / forms in the future
const schemas: Record<string, z.ZodSchema> = {
  contact: ContactSchema,
  // Add other form schemas here as your project grows:
  // newsletter: NewsletterSchema,
  // volunteer: VolunteerSchema,
};

export interface SubmitFormResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: Record<string, any>;
}

export async function submitFormAction(
  formType: string,
  data: unknown,
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  },
  recaptchaToken: string
): Promise<SubmitFormResponse> {
  try {
    // 1. Verify reCAPTCHA
    let verification: any = await verifyRecaptcha(recaptchaToken);
    
    const isDev = process.env.NODE_ENV === "development";
    const forceRecaptcha = process.env.FORCE_RECAPTCHA === "true";

    if (!verification.success || (verification.score < 0.5)) {
      if (isDev && !forceRecaptcha) {
        console.warn(
          `[DEV MODE] reCAPTCHA validation failed (Error: ${verification.error}, Score: ${verification.score}). Bypassing validation check for local testing.`
        );
        verification = {
          success: true,
          score: 0.9,
        };
      } else {
        return {
          success: false,
          error: `reCAPTCHA verification failed (${verification.error || "Please try again."}).`,
        };
      }
    }

    // 2. Resolve Schema based on formType
    const schema = schemas[formType];
    if (!schema) {
      return {
        success: false,
        error: `Form type "${formType}" is not registered or supported on the server.`,
      };
    }

    // 3. Validate form data with Zod
    const parsedData = schema.safeParse(data);
    if (!parsedData.success) {
      return {
        success: false,
        error: "Form validation failed.",
        details: parsedData.error.flatten().fieldErrors,
      };
    }

    // 4. Connect to DB
    await dbConnect();

    // 5. Get IP Address of the requester (optional but helpful)
    let ip = "";
    try {
      const headersList = await headers();
      ip = headersList.get("x-forwarded-for")?.split(",")[0] || "";
    } catch (e) {
      console.warn("Failed to retrieve IP address:", e);
    }

    // 6. Save submission to MongoDB
    await FormSubmission.create({
      formType,
      data: parsedData.data,
      utm: {
        source: utm.source || "",
        medium: utm.medium || "",
        campaign: utm.campaign || "",
        term: utm.term || "",
        content: utm.content || "",
      },
      recaptchaScore: verification.score,
      ip,
    });

    return {
      success: true,
      message: "Your submission has been received successfully!",
    };
  } catch (error) {
    console.error("Error in submitFormAction:", error);
    return {
      success: false,
      error: "An unexpected server error occurred. Please try again later.",
    };
  }
}
