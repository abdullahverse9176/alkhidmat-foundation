import mongoose, { Schema } from "mongoose";

const AreaSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Muhalla, society, or village name is required"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "City name is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Area = mongoose.models.Area || mongoose.model("Area", AreaSchema);
