import { LoginAdmin } from "../../application/use cases/Admin/LoginAdmin";
import { LoginTD } from "../../application/use cases/TD/LoginTD";
import { MongoUserRepository } from "../repositories/mongo.user.repository";

class AuthDIContainer {
  static getUserRepository() {
    return new MongoUserRepository();
  }

  static getLoginTDUseCase() {
    return new LoginTD(this.getUserRepository());
  }

  static getLoginAdminUseCase() {
    return new LoginAdmin(this.getUserRepository());
  }
}

export { AuthDIContainer };
