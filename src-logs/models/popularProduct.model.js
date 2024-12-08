import mongoose from "mongoose";

const mostVisitedSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    calculatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const MostVisitedPage = mongoose.model("mostvisitedpages", mostVisitedSchema);
