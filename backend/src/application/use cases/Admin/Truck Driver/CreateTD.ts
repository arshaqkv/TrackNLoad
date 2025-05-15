import { User } from "../../../../domain/entities/user.entity";
import { IUserRepository } from "../../../../domain/interfaces/user.repository";
import { CustomError } from "../../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../../utils/httpStatus";
import bcryptjs from "bcryptjs";

export class CreateTD {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: User): Promise<void> {
    const { name, mobile, password, address, dlNumber } = data;

    if (!name || !mobile || !password || !address || !dlNumber) {
      throw new CustomError("All Fields Required", HttpStatus.BAD_REQUEST);
    }

    const existingTD = await this.userRepository.findTDByMobile(mobile);

    if (existingTD) {
      throw new CustomError("User already exists", HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newTD = new User(name, mobile, hashedPassword, address, dlNumber);
    await this.userRepository.createTruckDriver(newTD);
  }
}
