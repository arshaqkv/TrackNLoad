import { Request, Response, NextFunction } from "express";
import { VendorDIContainer } from "../../infrastructure/DI/VendorDIContainer";
import { HttpStatus } from "../../utils/httpStatus";

class VendorController {
  async createVendor(req: Request, res: Response, next: NextFunction) {
    try {
      const createVendor = VendorDIContainer.getCreateVendorUseCase();
      await createVendor.execute(req.body);
      res
        .status(HttpStatus.CREATED)
        .json({ success: true, message: "Vendor added" });
    } catch (error) {
      next(error);
    }
  }

  async editVendor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const editVendor = VendorDIContainer.getEditVendorUseCase();
      await editVendor.execute(id, req.body);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Vendor updated" });
    } catch (error) {
      next(error);
    }
  }

  async getVendor(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const getVendor = VendorDIContainer.getSingleVendorUseCase();
      const vendor = await getVendor.execute(id);
      res.status(HttpStatus.OK).json({ success: true, vendor });
    } catch (error) {
      next(error);
    }
  }

  async deleteVendor(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const deleteVendor = VendorDIContainer.getDeleteVendorUseCase();
      await deleteVendor.execute(id);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Vendor deleted" });
    } catch (error) {
      next(error);
    }
  }

  async getAllVendors(req: Request, res: Response, next: NextFunction) {
    try {
      const getAllVendors = VendorDIContainer.getAllVendorUseCase();
      const vendors = await getAllVendors.execute();
      res.status(HttpStatus.OK).json({ vendors });
    } catch (error) {
      next(error);
    }
  }
}

const vendorController = new VendorController();
export { vendorController };
