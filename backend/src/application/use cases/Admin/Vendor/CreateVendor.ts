import { Vendor } from "../../../../domain/entities/vendor.entity";
import { IVendorRepository } from "../../../../domain/interfaces/vendor.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class CreateVendor {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(data: Vendor): Promise<void> {
    const { name, email, phone, location } = data;

    if (!name || !email || !phone || !location) {
      throw new CustomError("All Fields Required", HttpStatus.BAD_REQUEST);
    }

    const vendor = await this.vendorRepository.findVendorByEmail(email);

    if (vendor) {
      throw new CustomError("Vendor already exists", HttpStatus.BAD_REQUEST);
    }

    const newVendor = new Vendor(name, email, phone, location);

    await this.vendorRepository.createVendor(newVendor);
  }
}
