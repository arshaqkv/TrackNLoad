import { IVendorRepository } from "../../../../domain/interfaces/vendor.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class DeleteVendor {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(id: string): Promise<void> {
    const vendor = await this.vendorRepository.findVendorById(id);

    if (!vendor) {
      throw new CustomError("Vendor not found", HttpStatus.NOT_FOUND);
    }

    await this.vendorRepository.deleteVendor(id);
  }
}
