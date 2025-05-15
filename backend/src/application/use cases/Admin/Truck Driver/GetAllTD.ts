import { User } from "../../../../domain/entities/user.entity";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";

export class GetAllTD {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.findAllTD();
  }
}
