import { CreateTD } from "../../application/use cases/Admin/Truck Driver/CreateTD";
import { DeleteTD } from "../../application/use cases/Admin/Truck Driver/DeleteTD";
import { EditTD } from "../../application/use cases/Admin/Truck Driver/EditTD";
import { GetAllTD } from "../../application/use cases/Admin/Truck Driver/GetAllTD";
import { GetTD } from "../../application/use cases/Admin/Truck Driver/GetTD";
import { MongoUserRepository } from "../repositories/mongo.user.repository";

class TDDIContainer {
  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getCreateTDUseCase() {
    return new CreateTD(this.getUserRepository());
  }

  static getEditTDUseCase() {
    return new EditTD(this.getUserRepository());
  }

  static getDeleteTDUseCase() {
    return new DeleteTD(this.getUserRepository());
  }

  static getSingleTDUseCase() {
    return new GetTD(this.getUserRepository());
  }

  static getAllTDUseCase() {
    return new GetAllTD(this.getUserRepository());
  }
}

export { TDDIContainer };
