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
import geolib from "geolib";

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
      console.log(office, "inside service");
      const user: IAuth = await this.getUser(id);
      console.log(user);
      const user_coordinates = user?.location?.coordinates;
      console.log(user_coordinates);
      const distance = geolib.getDistance(office, user_coordinates);
      console.log(distance);
      return distance;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new UserServices();
