import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  mobile: string;
  password: string;
  address: string;
  role: string;
  dlNumber: string;
  profilePic: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "truck driver",
      enum: ["admin", "truck driver"],
    },
    dlNumber: {
      type: String,
      requied: true,
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", UserSchema);
