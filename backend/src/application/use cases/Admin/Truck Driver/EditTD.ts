import { User } from "../../../../domain/entities/user.entity";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";

export class EditTD {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, data: Partial<User>): Promise<void> {
    const user = await this.userRepository.findTDById(id);

    if (!user) {
      throw new CustomError("User not found", HttpStatus.NOT_FOUND);
    }

    await this.userRepository.editTruckDriver(id, data);
  }
}
