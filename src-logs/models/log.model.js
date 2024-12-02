import mongoose from "mongoose";

const logsSchema = new mongoose.Schema(
  {
    server_ip:{
        type:String,
        required:true,
    },
    requested_page:{
        type:String,
        required:true,
    }
  },
  {
    timestamps: true,
  }
);

export const Logs = mongoose.model("logs", logsSchema);
