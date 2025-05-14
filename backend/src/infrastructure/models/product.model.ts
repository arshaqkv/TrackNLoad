import mongoose, { Document, Schema } from "mongoose";

interface IProduct extends Document {
  name: string;
  price: number;
  category: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
