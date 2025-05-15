import { Order } from "../entities/order.entity";

export interface IOrderRepository {
  createOrder(order: Order): Promise<void>;
  getOrders(): Promise<Order[] | null>;
  getOrdersForTD(id: string): Promise<Order[] | null>;
}
