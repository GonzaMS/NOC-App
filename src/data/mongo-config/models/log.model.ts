import mongoose from "mongoose";

/*
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
*/

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ["info", "warn", "error"],
    required: true,
    default: "info",
  },

  message: {
    type: String,
    required: true,
  },

  origin: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LogModel = mongoose.model("Log", logSchema);
