import { Vendor } from "../entities/vendor.entity";

export interface IVendorRepository {
  createVendor(user: Vendor): Promise<Vendor>;
  findVendorByEmail(email: string): Promise<Vendor | null>;
  findVendorById(id: string): Promise<Vendor | null>;
  editVendor(id: string, data: Partial<Vendor>): Promise<Vendor | null>;
  findAllVendor(): Promise<Vendor[]>;
  deleteVendor(id: string): Promise<void>;
}
