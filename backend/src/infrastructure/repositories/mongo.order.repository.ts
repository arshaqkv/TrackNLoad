import { Order } from "../../domain/entities/order.entity";
import { IOrderRepository } from "../../domain/interfaces/order.repository";
import { OrderModel } from "../models/order.model";

export class MongoOrderRepository implements IOrderRepository {
  async createOrder(order: Order): Promise<void> {
    const newOrder = new OrderModel(order);
    await newOrder.save();
  }

  async getOrders(): Promise<Order[] | null> {
    return await OrderModel.find()
      .populate({ path: "truckDriver", select: "name" })
      .populate({ path: "vendor", select: "name" }).sort({createdAt: -1})
  }

  async getOrdersForTD(id: string): Promise<Order[] | null> {
    return await OrderModel.find({ truckDriver: id }).populate({
      path: "vendor",
      select: "name",
    }).sort({createdAt: -1})
  }
}
