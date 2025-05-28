import nodemailer from "nodemailer";
import { config } from "../config/index.js";

class NotificationsService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.SMTP_SERVER,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: config.BREVO_USERNAME,
        pass: config.BREVO_PASSWORD,
      },
    });
  }

  async sendAdmissionStatusEmail({ to, studentName, courseTitle, status }) {
    const subject = "Your Admission Status has been Updated";
    const text = `Hi ${studentName},Your admission status for the course "${courseTitle}" has been updated to: ${status.toUpperCase()}.

Thank you,
CTRL Admissions Team`;

    const mailOptions = {
      from: `"CTRL Admissions" <${config.BREVO_USERNAME}>`,
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error) {
      throw new Error("Could not send email.");
    }
  }
}

export default new NotificationsService();