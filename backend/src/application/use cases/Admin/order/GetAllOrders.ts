import { Order } from "../../../../domain/entities/order.entity";
import { IOrderRepository } from "../../../../domain/interfaces/order.repository";

export class GetAllOrders {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[] | null> {
    return await this.orderRepository.getOrders();
  }
}
