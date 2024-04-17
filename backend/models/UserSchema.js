import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  // phone: { type: Number },
  photo: { type: String },
  role: {
    type: String,
    enum: ["student", "tutor", "admin"],
    default: "student",
  },
  grade: {
    type: String,
    enum: ["9","10","11","12"],
  },
  appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

export default mongoose.model("User", UserSchema);
