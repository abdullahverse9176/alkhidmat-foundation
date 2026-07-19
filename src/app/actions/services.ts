"use server";

import { dbConnect } from "@/lib/db";
import { Service, Project } from "@/models/Service";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

/**
 * Server Action to upload an image from a FormData file directly to Cloudinary.
 * @param formData FormData containing the 'file' input
 * @returns Secure URL string of the uploaded image
 */
export async function uploadImageAction(formData: FormData): Promise<string> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      throw new Error("No file provided in FormData");
    }

    // Convert file to buffer and base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = buffer.toString("base64");
    const fileUri = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const result = await uploadToCloudinary(fileUri, "services");
    return result.secure_url;
  } catch (error: any) {
    console.error("Error in uploadImageAction:", error);
    throw new Error(error.message || "Failed to upload image");
  }
}

/* ==========================================================================
   Service Actions
   ========================================================================== */

/**
 * Fetch all services from MongoDB
 */
export async function getServicesAction() {
  await dbConnect();
  try {
    const services = await Service.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error("Error in getServicesAction:", error);
    throw new Error("Failed to fetch services");
  }
}

/**
 * Create or Update a Service
 * @param serviceData JSON object matching the Service model
 */
export async function saveServiceAction(serviceData: any) {
  await dbConnect();
  try {
    const { slug } = serviceData;
    if (!slug) throw new Error("Service slug is required");

    // Upsert the service by slug
    const updated = await Service.findOneAndUpdate(
      { slug },
      { ...serviceData },
      { new: true, upsert: true, runValidators: true }
    );

    revalidatePath("/services");
    revalidatePath(`/services/${slug}`);
    return JSON.parse(JSON.stringify(updated));
  } catch (error: any) {
    console.error("Error in saveServiceAction:", error);
    throw new Error(error.message || "Failed to save service");
  }
}

/**
 * Delete a Service by ID or Slug
 */
export async function deleteServiceAction(idOrSlug: string) {
  await dbConnect();
  try {
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: idOrSlug } 
      : { slug: idOrSlug };

    const deleted = await Service.findOneAndDelete(query);
    revalidatePath("/services");
    if (deleted) {
      revalidatePath(`/services/${deleted.slug}`);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteServiceAction:", error);
    throw new Error(error.message || "Failed to delete service");
  }
}

/* ==========================================================================
   Project Actions
   ========================================================================== */

/**
 * Fetch projects. Optionally filter by serviceSlug.
 */
export async function getProjectsAction(serviceSlug?: string) {
  await dbConnect();
  try {
    const query = serviceSlug ? { serviceSlug } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Error in getProjectsAction:", error);
    throw new Error("Failed to fetch projects");
  }
}

/**
 * Create or Update a Project
 * @param projectData JSON object matching the Project model
 */
export async function saveProjectAction(projectData: any) {
  await dbConnect();
  try {
    const { slug } = projectData;
    if (!slug) throw new Error("Project slug is required");

    const updated = await Project.findOneAndUpdate(
      { slug },
      { ...projectData },
      { new: true, upsert: true, runValidators: true }
    );

    revalidatePath(`/services/${projectData.serviceSlug}`);
    revalidatePath(`/services/${projectData.serviceSlug}/${slug}`);
    return JSON.parse(JSON.stringify(updated));
  } catch (error: any) {
    console.error("Error in saveProjectAction:", error);
    throw new Error(error.message || "Failed to save project");
  }
}

/**
 * Delete a Project by ID or Slug
 */
export async function deleteProjectAction(idOrSlug: string) {
  await dbConnect();
  try {
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) 
      ? { _id: idOrSlug } 
      : { slug: idOrSlug };

    const deleted = await Project.findOneAndDelete(query);
    if (deleted) {
      revalidatePath(`/services/${deleted.serviceSlug}`);
      revalidatePath(`/services/${deleted.serviceSlug}/${deleted.slug}`);
    }
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteProjectAction:", error);
    throw new Error(error.message || "Failed to delete project");
  }
}
