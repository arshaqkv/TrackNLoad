import { Vendor } from "../../../../domain/entities/vendor.entity";
import { IVendorRepository } from "../../../../domain/interfaces/vendor.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class GetVendor {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findVendorById(id);

    if (!vendor) {
      throw new CustomError("Vendor not found", HttpStatus.NOT_FOUND);
    }

    return vendor;
  }
}
