import { generateAccessToken } from "../../../config/generateToken";
import { User } from "../../../domain/entities/user.entity";
import { IUserRepository } from "../../../domain/interfaces/user.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import bcryptjs from "bcryptjs";
import { HttpStatus } from "../../../utils/httpStatus";

export class LoginAdmin {
  constructor(private userRepository: IUserRepository) {}

  async execute({
    mobile,
    password,
  }: {
    mobile: string;
    password: string;
  }): Promise<{ accessToken: string; user: User }> {
    const user = await this.userRepository.findTDByMobile(mobile);

    if (!user) {
      throw new CustomError("Invalid Crendentials", HttpStatus.BAD_REQUEST);
    }

    if (!mobile || !password) {
      throw new CustomError("All Fields are Required", HttpStatus.BAD_REQUEST);
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new CustomError("Invalid Credentials", HttpStatus.BAD_REQUEST);
    }

    if (user.role !== "admin") {
      throw new CustomError("You are not an admin", HttpStatus.BAD_REQUEST);
    }

    const accessToken = generateAccessToken({ id: user._id, role: user.role });

    return {
      accessToken,
      user,
    };
  }
}
