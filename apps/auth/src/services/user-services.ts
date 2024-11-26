import logger from "../config/logger-config.js";
import userRepository from "../repository/user-repository.js";
import ErrorHandler from "../errors/error.js";
import { StatusCodes } from "http-status-codes";
import { editUser, userCreation } from "../types/auth.js";
import PasswordLib from "../lib/password.js";
import { BadRequestError } from "../errors/error-classes.js";
class UserServices {
  private passwordLib: PasswordLib;
  constructor() {
    this.passwordLib = new PasswordLib();
  }
  async createUser(data: userCreation) {
    try {
      const userCheck = await userRepository.findFirst(data.email);
      if (userCheck) {
        throw new BadRequestError("User already exists", {
          details: "Email already taken",
        });
      }
      const new_password = await this.passwordLib.encryptPassword(
        data.encryptedPassword
      );
      const user = await userRepository.create({
        ...data,
        encryptedPassword: new_password,
      });
      if (!user) {
        throw new ErrorHandler("User is not created", 400, {});
      }
      return user;
    } catch (error: any) {
      logger.error(error + "in services");
      throw new ErrorHandler(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }

  async login(email: string, password: string) {
    try {
    } catch (error) {}
  }

  async getUser(id: string) {
    try {
      const user = await userRepository.findUnique(id);
      if (!user) {
        throw new ErrorHandler("User not found", StatusCodes.NOT_FOUND);
      }
      return user;
    } catch (error: any) {
      logger.error(error);
      throw new ErrorHandler(
        error.message,
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
  async editUser(id: string, data: editUser) {
    try {
      const user = await userRepository.update(id, data);
      if (!user) {
        throw new ErrorHandler(
          "Error whlie creatingn errors",
          StatusCodes.BAD_REQUEST
        );
      }
    } catch (error: any) {
      throw new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
export default new UserServices();
