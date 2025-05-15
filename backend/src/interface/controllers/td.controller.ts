import { Request, Response, NextFunction } from "express";
import { TDDIContainer } from "../../infrastructure/DI/TruckDriverDIContainer";
import { HttpStatus } from "../../utils/httpStatus";

class TruckDriverController {
  async createTD(req: Request, res: Response, next: NextFunction) {
    try {
      const createTD = TDDIContainer.getCreateTDUseCase();
      await createTD.execute(req.body);
      res
        .status(HttpStatus.CREATED)
        .json({ success: true, message: "Truck driver added" });
    } catch (error) {
      next(error);
    }
  }

  async editTD(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const editTD = TDDIContainer.getEditTDUseCase();
      await editTD.execute(id, req.body);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Truck driver updated" });
    } catch (error) {
      next(error);
    }
  }

  async getTD(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getTD = TDDIContainer.getSingleTDUseCase();
      const truckDriver = await getTD.execute(id);
      res.status(HttpStatus.OK).json({ success: true, user: truckDriver });
    } catch (error) {
      next(error);
    }
  }

  async deleteTD(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deleteTD = TDDIContainer.getDeleteTDUseCase();
      await deleteTD.execute(id);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Truck driver deleted" });
    } catch (error) {
      next(error);
    }
  }

  async getAllTD(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllTD = TDDIContainer.getAllTDUseCase();
      const truckDrivers = await getAllTD.execute();
      res.status(HttpStatus.OK).json({ users: truckDrivers });
    } catch (error) {
      next(error);
    }
  }
}

const truckDriverController = new TruckDriverController();
export { truckDriverController };
