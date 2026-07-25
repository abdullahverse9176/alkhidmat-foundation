"use server";

import { dbConnect } from "@/lib/db";
import { FormSubmission } from "@/models/FormSubmission";
import { Project } from "@/models/Service";
import { revalidatePath } from "next/cache";

interface VolunteerFilter {
  program?: string;
  city?: string;
  area?: string;
  status?: string;
}

/**
 * Fetch volunteer submissions from MongoDB with filtering
 */
export async function getVolunteersAction(filters: VolunteerFilter = {}) {
  await dbConnect();
  try {
    const query: any = { formType: "volunteer_register" };

    if (filters.program && filters.program !== "all") {
      query["data.program"] = filters.program;
    }

    if (filters.city && filters.city.trim() !== "") {
      query["data.city"] = { $regex: filters.city.trim(), $options: "i" };
    }

    if (filters.area && filters.area.trim() !== "") {
      query["data.area"] = { $regex: filters.area.trim(), $options: "i" };
    }

    if (filters.status && filters.status !== "all") {
      query.status = filters.status;
    }

    const submissions = await FormSubmission.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(submissions));
  } catch (error: any) {
    console.error("Error in getVolunteersAction:", error);
    throw new Error(error.message || "Failed to fetch volunteers");
  }
}

/**
 * Update a volunteer submission status (Approve / Reject)
 */
export async function updateVolunteerStatusAction(id: string, status: "approved" | "rejected" | "pending") {
  await dbConnect();
  try {
    const updated = await FormSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/volunteers");
    return JSON.parse(JSON.stringify(updated));
  } catch (error: any) {
    console.error("Error in updateVolunteerStatusAction:", error);
    throw new Error(error.message || "Failed to update volunteer status");
  }
}

/**
 * Retrieve dynamic volunteer and campaign statistics for dashboard overview
 */
export async function getVolunteerStatsAction() {
  await dbConnect();
  try {
    const approvedCount = await FormSubmission.countDocuments({
      formType: "volunteer_register",
      status: "approved",
    });

    const pendingCount = await FormSubmission.countDocuments({
      formType: "volunteer_register",
      status: "pending",
    });

    const totalProjects = await Project.countDocuments();

    return {
      activeVolunteers: 15400 + approvedCount,
      pendingApprovals: pendingCount,
      activeProjects: totalProjects,
    };
  } catch (error: any) {
    console.error("Error in getVolunteerStatsAction:", error);
    return {
      activeVolunteers: 15400,
      pendingApprovals: 0,
      activeProjects: 0,
    };
  }
}
