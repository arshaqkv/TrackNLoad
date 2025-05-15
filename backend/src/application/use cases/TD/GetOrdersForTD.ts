import { Order } from "../../../domain/entities/order.entity";
import { IOrderRepository } from "../../../domain/interfaces/order.repository";

export class GetOrdersForTD {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(id: string): Promise<Order[] | null> {
    return await this.orderRepository.getOrdersForTD(id);
  }
}
