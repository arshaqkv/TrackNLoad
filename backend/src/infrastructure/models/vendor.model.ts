import mongoose, { Document, Schema } from "mongoose";

interface IVendor extends Document {
  name: string;
  email: string;
  phone: string;
  location: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const VendorSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
  },
  { timestamps: true }
);

export const VendorModel = mongoose.model<IVendor>("Vendor", VendorSchema);
