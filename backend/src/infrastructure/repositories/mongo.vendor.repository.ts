import { Vendor } from "../../domain/entities/vendor.entity";
import { IVendorRepository } from "../../domain/interfaces/vendor.repository";
import { VendorModel } from "../models/vendor.model";

export class MongoVendorRepository implements IVendorRepository {
  async createVendor(user: Vendor): Promise<Vendor> {
    const newVendor = new VendorModel(user);
    await newVendor.save();
    return newVendor;
  }

  async findVendorByEmail(email: string): Promise<Vendor | null> {
    return await VendorModel.findOne({ email });
  }

  async findVendorById(id: string): Promise<Vendor | null> {
    return await VendorModel.findById(id);
  }

  async editVendor(id: string, data: Partial<Vendor>): Promise<Vendor | null> {
    return await VendorModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findAllVendor(): Promise<Vendor[]> {
    return await VendorModel.find();
  }

  async deleteVendor(id: string): Promise<void> {
    await VendorModel.findByIdAndDelete(id);
  }
}
