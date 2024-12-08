import crypto from "crypto";
import authRepository from "../repository/auth-repository.js";
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
    await authRepository.findByIdAndUpdate(
      this.user_id,
      {
        verification_token: code,
        verification_token_expires_at: this.getExpiryDate(),
      },
      { new: true }
    );
    return code;
  }
  async generateRestToken(email: string) {
    const resetToken = crypto.randomBytes(32).toString("hex");
    await authRepository.updateByEmail(email, {
      reset_password_token: resetToken,
      reset_password_expires_on: this.getExpiryDate(),
    });
    return resetToken;
  }
}
export default TokenServices;
