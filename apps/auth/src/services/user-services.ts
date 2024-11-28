import logger from "../config/logger-config.js";
import userRepository from "../repository/user-repository.js";
import { userCreation } from "../types/auth.js";
import PasswordLib from "../lib/password.js";
import BadRequestException from "../errors/badRequestException.js";
import NotFoundException from "../errors/notAuthorizedException.js";
import ConflictException from "../errors/conflictExeption.js";

class UserServices {
  private passwordLib: PasswordLib;
  constructor() {
    this.passwordLib = new PasswordLib();
  }
  async createUser(data: userCreation) {
    try {
      const userCheck = await userRepository.findFirst(data.email);
      if (userCheck) {
        throw new ConflictException("User is already exists");
      }
      const new_password = await this.passwordLib.encryptPassword(
        data.encryptedPassword
      );
      const user = await userRepository.create({
        ...data,
        encryptedPassword: new_password,
      });
      if (!user) {
        throw new BadRequestException("User is not created");
      }
      return { user_id: user?.user_id };
    } catch (error: any) {
      logger.error(error + "in services");
    }
  }

  async login(email: string, password: string) {
    try {
      const userCheck = await userRepository.findFirst(email);

      if (!userCheck) {
        throw new NotFoundException("user not found", {});
      }

      const passCheck = await this.passwordLib.verifyPassword(
        password,
        userCheck.encryptedPassword
      );

      if (!passCheck) {
        throw new BadRequestException("Password is incorrect", {});
      }

      return { user_id: userCheck.user_id };
    } catch (error) {
      logger.error(error + " in services");
    }
  }

  async getUser(id: string) {
    try {
      const user = await userRepository.findUnique(id);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      return user;
    } catch (error: any) {
      logger.error(error + "in services");
    }
  }
}
export default new UserServices();
