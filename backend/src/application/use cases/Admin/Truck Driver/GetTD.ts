import { User } from "../../../../domain/entities/user.entity";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class GetTD {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findTDById(id);

    if (!user) {
      throw new CustomError("User not found", HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
