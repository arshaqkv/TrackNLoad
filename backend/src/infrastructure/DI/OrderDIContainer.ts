import { GetAllOrders } from "../../application/use cases/Admin/order/GetAllOrders";
import { CreateOrder } from "../../application/use cases/TD/CreateOrder";
import { GetOrdersForTD } from "../../application/use cases/TD/GetOrdersForTD";
import { MongoOrderRepository } from "../repositories/mongo.order.repository";

class OrderDIContainer {
  static getOrderRepository() {
    return new MongoOrderRepository();
  }

  static getCreateOrderUseCase() {
    return new CreateOrder(this.getOrderRepository());
  }

  static getOrdersUseCase() {
    return new GetAllOrders(this.getOrderRepository());
  }

  static getOrderForTDUseCase() {
    return new GetOrdersForTD(this.getOrderRepository());
  }
}

export { OrderDIContainer };
