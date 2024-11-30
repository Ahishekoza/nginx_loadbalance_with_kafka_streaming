import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("inventory", inventorySchema);
