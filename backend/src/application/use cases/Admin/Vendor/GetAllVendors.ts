import { Vendor } from "../../../../domain/entities/vendor.entity";
import { IVendorRepository } from "../../../../domain/interfaces/vendor.repository";

export class GetAllVendors {
  constructor(private vendorRepository: IVendorRepository) {}

  async execute(): Promise<Vendor[]> {
    return await this.vendorRepository.findAllVendor();
  }
}
