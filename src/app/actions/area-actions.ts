"use server";

import { dbConnect } from "@/lib/db";
import { Area } from "@/models/Area";
import { revalidatePath } from "next/cache";

/**
 * Fetch all areas sorted alphabetically by city, then by name
 */
export async function getAreasAction() {
  await dbConnect();
  try {
    const areas = await Area.find()
      .sort({ city: 1, name: 1 })
      .lean();
    return JSON.parse(JSON.stringify(areas));
  } catch (error: any) {
    console.error("Error in getAreasAction:", error);
    throw new Error(error.message || "Failed to fetch areas");
  }
}

/**
 * Save or update an area
 */
export async function saveAreaAction(areaData: { name: string; city: string; _id?: string }) {
  await dbConnect();
  try {
    const { name, city, _id } = areaData;
    if (!name || !city) {
      throw new Error("Both Muhalla/Village/Society name and City name are required.");
    }

    let savedArea;
    if (_id) {
      savedArea = await Area.findByIdAndUpdate(
        _id,
        { name, city },
        { new: true, runValidators: true }
      );
    } else {
      // Check if exact area already exists
      const existing = await Area.findOne({
        name: { $regex: `^${name.trim()}$`, $options: "i" },
        city: { $regex: `^${city.trim()}$`, $options: "i" }
      });
      if (existing) {
        throw new Error("This area and city configuration already exists.");
      }

      savedArea = await Area.create({
        name: name.trim(),
        city: city.trim()
      });
    }

    revalidatePath("/dashboard/areas");
    revalidatePath("/blood-donor");
    return JSON.parse(JSON.stringify(savedArea));
  } catch (error: any) {
    console.error("Error in saveAreaAction:", error);
    throw new Error(error.message || "Failed to save area");
  }
}

/**
 * Delete an area by id
 */
export async function deleteAreaAction(id: string) {
  await dbConnect();
  try {
    await Area.findByIdAndDelete(id);
    revalidatePath("/dashboard/areas");
    revalidatePath("/blood-donor");
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteAreaAction:", error);
    throw new Error(error.message || "Failed to delete area");
  }
}
