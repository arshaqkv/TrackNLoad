import { User } from "../../domain/entities/user.entity";
import { IUserRepository } from "../../domain/interfaces/user.repository";
import { UserModel } from "../models/user.model";

export class MongoUserRepository implements IUserRepository {
  async createTruckDriver(user: User): Promise<User> {
    const newTD = new UserModel(user);
    await newTD.save();
    return newTD;
  }

  async findTDByMobile(mobile: string): Promise<User | null> {
    return await UserModel.findOne({ mobile });
  }

  async findTDById(id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }

  async editTruckDriver(id: string, data: Partial<User>): Promise<User | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findAllTD(): Promise<User[]> {
    return await UserModel.find({ role: "truck driver" }).select("-password");
  }

  async deleteTruckDriver(id: string): Promise<void> {
    await UserModel.findByIdAndDelete(id);
  }
}
