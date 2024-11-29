import logger from "../config/logger-config.js";
import userRepository from "../repository/user-repository.js";
import { userCreation } from "../types/auth.js";
import PasswordLib from "../lib/password.js";
import BadRequestException from "../errors/badRequestException.js";
import NotFoundException from "../errors/notAuthorizedException.js";
import ConflictException from "../errors/conflictExeption.js";
import {
  sendPasswordResetMail,
  sendVerificationMail,
} from "../lib/mail-producer.js";

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
      return { user_id: user?.user_id, email: user.email };
    } catch (error: any) {
      logger.error(error + "in services");
      throw error;
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
      throw error;
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
      throw error;
    }
  }

  async verifyEmail(id: string, verification_token: string) {
    try {
      const user_id = id;
      const userCheck = await userRepository.findUnique(user_id);
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
      const new_user = await userRepository.update(id, { isVerified: true });
      return { email: new_user.email };
    } catch (error: any) {
      logger.error(error + "in services");
      throw error;
    }
  }

  async resendVerificationEmail(user_id: string) {
    try {
      const user = await userRepository.findUnique(user_id);
      const email = user?.email;
      await sendVerificationMail(user_id, email!);
      return true;
    } catch (error) {
      logger.error(error + "in services resend verification");
      throw error;
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await userRepository.findFirst(email);
      if (!user) {
        throw new NotFoundException("Email not found");
      }
      await sendPasswordResetMail(email);
      return true;
    } catch (error) {
      logger.error(error + "in services forgot password");
      throw error;
    }
  }

  async resetPassword(password: string, reset_token: string) {
    try {
      const user_check =
        await userRepository.checkPasswordResetToken(reset_token);
      if (!user_check) {
        throw new NotFoundException("Reset token is not correct");
      }
      const current_time = new Date();
      const { reset_password_expires_on, user_id } = user_check;
      if (
        !reset_password_expires_on ||
        (reset_password_expires_on as Date) < current_time
      ) {
        throw new BadRequestException("reset password session is expired");
      }
      const encryptedPassword =
        await this.passwordLib.encryptPassword(password);
      const new_user = await userRepository.update(user_id!, {
        encryptedPassword: encryptedPassword,
      });
      return { email: new_user.email, user_id: new_user.email };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
export default new UserServices();
