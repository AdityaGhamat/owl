export type mailType = "verification_mail" | "reset_password_mail";
export type verificationMailType = {
  email: string;
  verification_token: string;
};
export type resetPasswordMailType = {
  email: string;
  reset_password_token: string;
};
