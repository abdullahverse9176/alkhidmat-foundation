"use server";

import { dbConnect } from "@/lib/db";
import { FormSubmission } from "@/models/FormSubmission";
import { revalidatePath } from "next/cache";

interface EventVolunteerFilter {
  eventId?: string;
  city?: string;
  area?: string;
  status?: string;
}

/**
 * Fetch event volunteer submissions from MongoDB with filtering
 */
export async function getEventVolunteersAction(filters: EventVolunteerFilter = {}) {
  await dbConnect();
  try {
    const query: any = { formType: "event_volunteer" };

    if (filters.eventId && filters.eventId !== "all") {
      query["data.eventId"] = filters.eventId;
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
    console.error("Error in getEventVolunteersAction:", error);
    throw new Error(error.message || "Failed to fetch event volunteers");
  }
}

/**
 * Update event volunteer application status
 */
export async function updateEventVolunteerStatusAction(id: string, newStatus: "approved" | "rejected") {
  await dbConnect();
  try {
    const updated = await FormSubmission.findByIdAndUpdate(
      id,
      { status: newStatus },
      { new: true }
    );
    
    revalidatePath("/dashboard/event-volunteers");
    return JSON.parse(JSON.stringify(updated));
  } catch (error: any) {
    console.error("Error in updateEventVolunteerStatusAction:", error);
    throw new Error(error.message || "Failed to update volunteer status");
  }
}
