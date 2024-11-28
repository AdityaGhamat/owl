import { transport } from "../config/mail-config.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "../lib/template.js";
import serverConfig from "../config/server-config.js";
class MailServices {
  private sender: string;
  constructor(sender: string) {
    this.sender = sender;
  }
  public async sendVerification_Mail(
    email: string,
    verificationToken: string
  ): Promise<Boolean> {
    const recipient = email;
    try {
      const response = await transport.sendMail({
        from: this.sender,
        to: recipient,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace(
          "{verificationCode}",
          verificationToken
        ),
      });
      console.log(`email send successfully, ${response.messageId}`);
      return true;
    } catch (error) {
      throw new Error("Failed to send mail for verification");
    }
  }

  public async sendPassword_Rest_Mail(
    email: string,
    resetToken: string
  ): Promise<Boolean> {
    const recipient = email;
    try {
      const response = await transport.sendMail({
        from: this.sender,
        to: recipient,
        subject: "Reset your password",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
          "{resetURL}",
          `${serverConfig.CLIENT_URL}/auth/reset-password/${resetToken}`
        ),
      });
      console.log(`Email sent successfully: ${response.messageId}`);
      return true;
    } catch (error) {
      throw new Error("Failed to send mail for reset password");
    }
  }
}
export default MailServices;
