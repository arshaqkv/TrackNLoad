import { User } from "../entities/user.entity";

export interface IUserRepository {
  createTruckDriver(user: User): Promise<User>;
  findTDByMobile(mobile: string): Promise<User | null>;
  findTDById(id: string): Promise<User | null>;
  editTruckDriver(id: string, data: Partial<User>): Promise<User | null>;
  findAllTD(): Promise<User[]>;
  deleteTruckDriver(id: string): Promise<void>;
}
