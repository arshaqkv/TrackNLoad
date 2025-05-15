import { Order } from "../../../domain/entities/order.entity";
import { IOrderRepository } from "../../../domain/interfaces/order.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/httpStatus";

export class CreateOrder {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(id: string, data: Order): Promise<void> {
    const { vendor, products, totalAmount, collectedAmount } = data;

    if (!id) {
      throw new CustomError("Truck driver not found", HttpStatus.BAD_REQUEST);
    }

    if (!vendor || !products || products.length === 0) {
      throw new CustomError(
        "All fields including products are required",
        HttpStatus.BAD_REQUEST
      );
    }

    if (collectedAmount > totalAmount) {
      throw new CustomError(
        "Collected amount cannot exceed total amount",
        HttpStatus.BAD_REQUEST
      );
    }

    for (const product of products) {
      if (product.quantity < 1) {
        throw new CustomError(
          "Quantity must be at least 1",
          HttpStatus.BAD_REQUEST
        );
      }
    }

    const orderId = `TLOD_${Date.now()}`;

    const newOrder = new Order(
      orderId,
      id,
      vendor,
      products,
      totalAmount,
      collectedAmount
    );

    await this.orderRepository.createOrder(newOrder);
  }
}
