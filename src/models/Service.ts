import mongoose, { Schema } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    iconName: { type: String, required: true },
    image: { type: String, required: true },
    features: { type: [String], default: [] },
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    packages: [
      {
        name: { type: String, required: true },
        cost: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    gallery: { type: [String], default: [] },
  },
  { timestamps: true }
);

const ProjectSchema = new Schema(
  {
    serviceSlug: { type: String, required: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    shortDescription: { type: String, required: true },
    longDescription: { type: String, required: true },
    location: { type: String, required: true },
    province: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, default: "Completed" },
    beneficiaries: { type: String, required: true },
    projectHead: {
      name: { type: String, required: true },
      role: { type: String, required: true },
      avatarUrl: { type: String, required: true },
      message: { type: String },
    },
    cooperators: { type: [String], default: [] },
    costBreakdown: [
      {
        label: { type: String, required: true },
        amount: { type: String, required: true },
      },
    ],
    totalCost: { type: String, required: true },
    featuredImage: { type: String, required: true },
    gallery: { type: [String], default: [] },
    goal: { type: Number, default: 0 },
    raised: { type: Number, default: 0 },
    techSpecs: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model("Service", ServiceSchema);
export const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
