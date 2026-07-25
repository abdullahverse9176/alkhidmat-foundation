"use server";

import { dbConnect } from "@/lib/db";
import { Leader } from "@/models/Leader";
import { revalidatePath } from "next/cache";

interface LeaderData {
  _id?: string;
  name: string;
  designation: string;
  bio: string;
  image?: string;
  order?: number;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

/**
 * Fetch all leaders sorted by order (asc) and creation date
 */
export async function getLeadersAction() {
  await dbConnect();
  try {
    const leaders = await Leader.find()
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return JSON.parse(JSON.stringify(leaders));
  } catch (error: any) {
    console.error("Error in getLeadersAction:", error);
    throw new Error(error.message || "Failed to fetch leaders");
  }
}

/**
 * Create or update a Leader record
 */
export async function saveLeaderAction(data: LeaderData) {
  await dbConnect();
  try {
    const { _id, name, designation, bio, image, order, facebook, twitter, linkedin } = data;

    if (!name || !name.trim() || !designation || !designation.trim() || !bio || !bio.trim()) {
      throw new Error("Name, Designation, and Bio are required fields.");
    }

    let savedLeader;
    const payload = {
      name: name.trim(),
      designation: designation.trim(),
      bio: bio.trim(),
      image: image?.trim(),
      order: order !== undefined ? Number(order) : 0,
      facebook: facebook?.trim(),
      twitter: twitter?.trim(),
      linkedin: linkedin?.trim(),
    };

    if (_id) {
      savedLeader = await Leader.findByIdAndUpdate(_id, payload, { new: true, runValidators: true });
    } else {
      savedLeader = await Leader.create(payload);
    }

    revalidatePath("/dashboard/leadership");
    revalidatePath("/leadership");
    return JSON.parse(JSON.stringify(savedLeader));
  } catch (error: any) {
    console.error("Error in saveLeaderAction:", error);
    throw new Error(error.message || "Failed to save leader profile");
  }
}

/**
 * Delete a leader record
 */
export async function deleteLeaderAction(id: string) {
  await dbConnect();
  try {
    await Leader.findByIdAndDelete(id);
    revalidatePath("/dashboard/leadership");
    revalidatePath("/leadership");
    return { success: true };
  } catch (error: any) {
    console.error("Error in deleteLeaderAction:", error);
    throw new Error(error.message || "Failed to delete leader profile");
  }
}
