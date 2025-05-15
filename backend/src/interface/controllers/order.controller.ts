import { NextFunction, Request, Response } from "express";
import { OrderDIContainer } from "../../infrastructure/DI/OrderDIContainer";
import { HttpStatus } from "../../utils/httpStatus";

class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const createOrder = OrderDIContainer.getCreateOrderUseCase();
      await createOrder.execute(id, req.body);
      res
        .status(HttpStatus.CREATED)
        .json({ message: "Order placed successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllOrders = OrderDIContainer.getOrdersUseCase();
      const orders = await getAllOrders.execute();
      res.status(HttpStatus.OK).json({ orders });
    } catch (error) {
      next(error);
    }
  }

  async getOrdersForTD(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const getOrdersForTD = OrderDIContainer.getOrderForTDUseCase();
      const orders = await getOrdersForTD.execute(id);
      res.status(HttpStatus.OK).json({ orders });
    } catch (error) {
      next(error);
    }
  }
}

const orderController = new OrderController();
export { orderController };
