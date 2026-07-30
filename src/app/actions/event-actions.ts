"use server";

import { dbConnect } from "@/lib/db";
import { Event } from "@/models/Event";
import { revalidatePath } from "next/cache";

/**
 * Fetch all events sorted by date (upcoming first)
 */
export async function getEventsAction() {
  try {
    await dbConnect();
    const events = await Event.find()
      .sort({ date: 1 })
      .lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error: any) {
    console.error("Error in getEventsAction:", error);
    return [];
  }
}

/**
 * Create or update an event
 */
export async function saveEventAction(eventData: {
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image?: string;
  status?: "upcoming" | "past";
  featured?: boolean;
}) {
  await dbConnect();
  try {
    const { _id, title, description, date, time, location, image, featured } = eventData;

    if (!title || !description || !date || !time || !location) {
      throw new Error("Required fields: Title, Description, Date, Time, Location.");
    }

    // Automatically set status based on date
    const eventDate = new Date(date);
    const today = new Date();
    // Compare dates ignoring times
    today.setHours(0, 0, 0, 0);
    const calculatedStatus = eventDate < today ? "past" : "upcoming";

    let savedEvent;
    if (_id) {
      savedEvent = await Event.findByIdAndUpdate(
        _id,
        {
          title: title.trim(),
          description: description.trim(),
          date: eventDate,
          time: time.trim(),
          location: location.trim(),
          image: image?.trim(),
          status: calculatedStatus,
          featured: Boolean(featured),
        },
        { new: true, runValidators: true }
      );
    } else {
      savedEvent = await Event.create({
        title: title.trim(),
        description: description.trim(),
        date: eventDate,
        time: time.trim(),
        location: location.trim(),
        image: image?.trim(),
        status: calculatedStatus,
        featured: Boolean(featured),
      });
    }

    revalidatePath("/dashboard/events");
    revalidatePath("/events");
    revalidatePath("/");
    return JSON.parse(JSON.stringify(savedEvent));
  } catch (error: any) {
    console.error("Error in saveEventAction:", error);
    throw new Error(error.message || "Failed to save event");
  }
}

/**
 * Delete an event
 */
export async function deleteEventAction(id: string) {
  await dbConnect();
  try {
    await Event.findByIdAndDelete(id);
    revalidatePath("/dashboard/events");
    revalidatePath("/events");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteEventAction:", error);
    throw new Error(error.message || "Failed to delete event");
  }
}

/**
 * Fetch only featured events for homepage display
 */
export async function getFeaturedEventsAction() {
  try {
    await dbConnect();
    const events = await Event.find({ featured: true })
      .sort({ date: 1 })
      .lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error: any) {
    console.error("Error in getFeaturedEventsAction:", error);
    return [];
  }
}
