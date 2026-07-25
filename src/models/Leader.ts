import mongoose, { Schema } from "mongoose";

const LeaderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Leader name is required"],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, "Bio is required"],
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    facebook: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Leader = mongoose.models.Leader || mongoose.model("Leader", LeaderSchema);
