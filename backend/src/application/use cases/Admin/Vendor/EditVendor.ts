import { Vendor } from "../../../../domain/entities/vendor.entity";
import { IVendorRepository } from "../../../../domain/interfaces/vendor.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class EditVendor {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(id: string, data: Partial<Vendor>): Promise<void> {
    const vendor = await this.vendorRepository.findVendorById(id);

    if (!vendor) {
      throw new CustomError("Vendor not found", HttpStatus.NOT_FOUND);
    }

    await this.vendorRepository.editVendor(id, data);
  }
}
