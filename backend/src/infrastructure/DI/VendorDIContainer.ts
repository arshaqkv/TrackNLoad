import { CreateVendor } from "../../application/use cases/Admin/Vendor/CreateVendor";
import { DeleteVendor } from "../../application/use cases/Admin/Vendor/DeleteVendor";
import { EditVendor } from "../../application/use cases/Admin/Vendor/EditVendor";
import { GetAllVendors } from "../../application/use cases/Admin/Vendor/GetAllVendors";
import { GetVendor } from "../../application/use cases/Admin/Vendor/GetVendor";
import { MongoVendorRepository } from "../repositories/mongo.vendor.repository";

class VendorDIContainer {
  static getVendorRepository() {
    return new MongoVendorRepository();
  }

  static getCreateVendorUseCase() {
    return new CreateVendor(this.getVendorRepository());
  }

  static getEditVendorUseCase() {
    return new EditVendor(this.getVendorRepository());
  }

  static getDeleteVendorUseCase() {
    return new DeleteVendor(this.getVendorRepository());
  }

  static getSingleVendorUseCase() {
    return new GetVendor(this.getVendorRepository());
  }

  static getAllVendorUseCase() {
    return new GetAllVendors(this.getVendorRepository());
  }
}

export { VendorDIContainer };
