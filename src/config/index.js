import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 9090,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  SMTP_SERVER: process.env.SMTP_SERVER,
  SMTP_PORT: process.env.SMTP_PORT,
  BREVO_USERNAME: process.env.BREVO_USERNAME,
  BREVO_PASSWORD: process.env.BREVO_PASSWORD,
};
