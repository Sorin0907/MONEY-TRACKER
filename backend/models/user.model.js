import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      maxLenght: 125,
    },
    name: {
      type: String,
      required: true,
      maxLenght: 125,
    },
    password: {
      type: String,
      required: true,
      minLenght: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
