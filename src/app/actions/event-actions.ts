"use server";

import { dbConnect } from "@/lib/db";
import { Event } from "@/models/Event";
import { revalidatePath } from "next/cache";

/**
 * Fetch all events sorted by date (upcoming first)
 */
export async function getEventsAction() {
  await dbConnect();
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .lean();
    return JSON.parse(JSON.stringify(events));
  } catch (error: any) {
    console.error("Error in getEventsAction:", error);
    throw new Error(error.message || "Failed to fetch events");
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
}) {
  await dbConnect();
  try {
    const { _id, title, description, date, time, location, image } = eventData;

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
      });
    }

    revalidatePath("/dashboard/events");
    revalidatePath("/events");
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
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteEventAction:", error);
    throw new Error(error.message || "Failed to delete event");
  }
}
