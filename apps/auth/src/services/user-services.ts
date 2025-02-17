import logger from "../config/logger-config.js";
import authRepository from "../repository/auth-repository.js"; // Import authRepository
import { userCreation } from "../types/auth.js";
import PasswordLib from "../lib/password.js";
import BadRequestException from "../errors/badRequestException.js";
import NotFoundException from "../errors/notAuthorizedException.js";
import ConflictException from "../errors/conflictExeption.js";
import {
  sendPasswordResetMail,
  sendVerificationMail,
} from "../lib/mail-producer.js";
import officeServices from "./office-services.js";
import type { IAuth, location } from "@repo/types/src/database.js";
import axios from "axios";
import serverConfig from "../config/server-config.js";
import server from "../server.js";
import { userCover } from "@repo/lib/cover";

class UserServices {
  private passwordLib: PasswordLib;
  constructor() {
    this.passwordLib = new PasswordLib();
  }

  async createUser(data: userCreation) {
    try {
      const userCheck = await authRepository.findOne({ email: data.email });
      if (userCheck) {
        throw new ConflictException("User already exists");
      }
      const new_password = await this.passwordLib.encryptPassword(
        data.encryptedPassword
      );
      const user = await authRepository.create({
        ...data,
        encryptedPassword: new_password,
      });
      if (!user) {
        throw new BadRequestException("User was not created");
      }
      return { user_id: user._id, email: user.email };
    } catch (error: any) {
      logger.error(error + " in services");
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const userCheck = await authRepository.findOne({ email });
      if (!userCheck) {
        throw new NotFoundException("User not found", {});
      }

      const passCheck = await this.passwordLib.verifyPassword(
        password,
        userCheck.encryptedPassword
      );

      if (!passCheck) {
        throw new BadRequestException("Password is incorrect", {});
      }

      return { user_id: userCheck._id };
    } catch (error) {
      logger.error(error + " in services");
      throw error;
    }
  }

  async getUser(id: string) {
    try {
      const user = await authRepository.findById(id);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      return user;
    } catch (error: any) {
      logger.error(error + " in services");
      throw error;
    }
  }

  async verifyEmail(id: string, verification_token: string) {
    try {
      const userCheck = await authRepository.findById(id);
      if (!userCheck) {
        throw new NotFoundException("User not found");
      }
      const isVerified = userCheck.isVerified;
      if (isVerified) {
        throw new ConflictException("Email is already verified");
      }
      const currentDate = new Date();
      const {
        verification_token: users_verification_token,
        verification_token_expires_at: users_verification_token_expires,
      } = userCheck;
      if (users_verification_token !== verification_token) {
        throw new BadRequestException("Verification token is incorrect");
      }
      if (
        !users_verification_token_expires ||
        new Date(users_verification_token_expires) < currentDate
      ) {
        throw new BadRequestException("Verification token is expired");
      }
      const new_user = await authRepository.findByIdAndUpdate(
        id,
        {
          isVerified: true,
        },
        { new: true }
      );
      return { email: new_user?.email };
    } catch (error: any) {
      logger.error(error + " in services");
      throw error;
    }
  }

  async resendVerificationEmail(user_id: string) {
    try {
      const user = await authRepository.findById(user_id);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const email = user.email;
      await sendVerificationMail(user_id, email);
      return true;
    } catch (error) {
      logger.error(error + " in services resend verification");
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await authRepository.findOne({ email });
      if (!user) {
        throw new NotFoundException("Email not found");
      }
      await sendPasswordResetMail(email);
      return true;
    } catch (error) {
      logger.error(error + " in services forgot password");
      throw error;
    }
  }

  async resetPassword(password: string, reset_token: string) {
    try {
      const user_check =
        await authRepository.checkPasswordResetToken(reset_token);
      if (!user_check) {
        throw new NotFoundException("Reset token is not correct");
      }
      const current_time = new Date();
      const { reset_password_expires_on, _id } = user_check;
      if (
        !reset_password_expires_on ||
        (reset_password_expires_on as Date) < current_time
      ) {
        throw new BadRequestException("Reset password session is expired");
      }
      const encryptedPassword =
        await this.passwordLib.encryptPassword(password);
      const new_user = await authRepository.findByIdAndUpdate(
        _id!,
        {
          encryptedPassword: encryptedPassword,
        },
        { new: true }
      );
      return { email: new_user?.email, user_id: new_user?._id };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async showDistanceFromOffice(office_id: string, id: string) {
    try {
      const office: [number, number] =
        await officeServices.co_ordinatesOfOffice(office_id);
      const user: IAuth = await this.getUser(id);
      const user_coordinates = user?.location?.coordinates;
      const response = await axios.get<{ data: number }>(
        `${serverConfig.GEOFENCE_SERVICE}/api/v1/geofence/distance?user_lat=${user_coordinates[0]}&user_lng=${user_coordinates[1]}&office_lat=${office[0]}&office_lng=${office[1]}`
      );
      const distance = response?.data?.data;
      console.log(distance);
      return distance;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getUserLocation(id: string) {
    try {
      const user: IAuth = await this.getUser(id);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const user_coordinates = user?.location?.coordinates;
      if (!user_coordinates) {
        throw new NotFoundException("User coordinates not found");
      }
      return user_coordinates;
    } catch (error) {
      throw error;
    }
  }

  async updateLocation(id: string, data: IAuth["location"]) {
    try {
      const user: IAuth = await this.getUser(id);
      if (!user) {
        throw new NotFoundException("User not found");
      }
      const new_user = await authRepository.findByIdAndUpdate(
        id,
        {
          location: data,
        },
        { new: true }
      );
      if (!new_user) {
        throw new BadRequestException("Failed to update location");
      }
      return { id: user._id };
    } catch (error) {
      throw error;
    }
  }

  async getEmployeesDetails(employee: [string]) {
    console.log(employee);
    try {
      const all_employee = employee.map(async (id) => await this.getUser(id));

      const userList = await Promise.all(all_employee);
      const users = userList.map((user) => userCover(user));

      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default new UserServices();
