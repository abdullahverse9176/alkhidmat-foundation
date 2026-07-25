"use server";

import { dbConnect } from "@/lib/db";
import { FormSubmission } from "@/models/FormSubmission";
import { revalidatePath } from "next/cache";

interface DonorFilter {
  bloodGroup?: string;
  cityVillageArea?: string;
  status?: string;
}

/**
 * Fetch blood donors from MongoDB with filtering
 */
export async function getBloodDonorsAction(filters: DonorFilter = {}) {
  await dbConnect();
  try {
    const query: any = { formType: "blood_donor" };

    if (filters.bloodGroup && filters.bloodGroup !== "all") {
      query["data.bloodGroup"] = filters.bloodGroup;
    }

    if (filters.cityVillageArea && filters.cityVillageArea.trim() !== "") {
      query["data.cityVillageArea"] = { $regex: filters.cityVillageArea.trim(), $options: "i" };
    }

    if (filters.status && filters.status !== "all") {
      query.status = filters.status;
    }

    const donors = await FormSubmission.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(donors));
  } catch (error: any) {
    console.error("Error in getBloodDonorsAction:", error);
    throw new Error(error.message || "Failed to fetch blood donors");
  }
}

/**
 * Update a donor's status
 */
export async function updateDonorStatusAction(id: string, status: "approved" | "rejected" | "pending") {
  await dbConnect();
  try {
    const updated = await FormSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    revalidatePath("/dashboard/blood-donors");
    return JSON.parse(JSON.stringify(updated));
  } catch (error: any) {
    console.error("Error in updateDonorStatusAction:", error);
    throw new Error(error.message || "Failed to update donor status");
  }
}
