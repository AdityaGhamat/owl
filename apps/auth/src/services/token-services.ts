import crypto from "crypto";
import userRepository from "../repository/user-repository.js";
class TokenServices {
  private user_id: string;
  private expiryDate: number;
  constructor(user_id?: string, customExpiryDate: number = 10) {
    this.user_id = user_id as string;
    this.expiryDate = customExpiryDate as number;
  }
  private getExpiryDate(): Date {
    return new Date(Date.now() + this.expiryDate * 60 * 1000);
  }
  async generateVerificationCode() {
    const code = crypto.randomInt(100000, 999999).toString();
    await userRepository.update(this.user_id, {
      verification_token: code,
      verification_token_expires_at: this.getExpiryDate(),
    });
    return code;
  }
  async generateRestToken(email: string) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    await userRepository.updateByEmail(email, {
      reset_password_token: resetToken,
      reset_password_expires_on: this.getExpiryDate(),
    });
    return resetToken;
  }
}
export default TokenServices;
