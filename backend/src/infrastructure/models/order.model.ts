import mongoose, { Document, Schema } from "mongoose";

interface IOrderProduct {
  productId: string; // reference to Product
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder extends Document {
  orderId: string;
  truckDriver: string;
  vendor: string;
  products: IOrderProduct[];
  totalAmount: number;
  collectedAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    truckDriver: {
      type: Schema.Types.ObjectId,
      ref: "User", // assuming User is truck driver
      required: true,
    },
    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    collectedAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
