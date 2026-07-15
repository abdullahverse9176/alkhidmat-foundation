import mongoose, { Schema } from "mongoose";

const FormSubmissionSchema = new Schema(
  {
    formType: {
      type: String,
      required: [true, "Form type is required"],
      trim: true,
    },
    data: {
      type: Schema.Types.Mixed,
      required: [true, "Form data is required"],
    },
    utm: {
      source: { type: String, default: "" },
      medium: { type: String, default: "" },
      campaign: { type: String, default: "" },
      term: { type: String, default: "" },
      content: { type: String, default: "" },
    },
    recaptchaScore: {
      type: Number,
      default: 0,
    },
    ip: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const FormSubmission =
  mongoose.models.FormSubmission ||
  mongoose.model("FormSubmission", FormSubmissionSchema);
