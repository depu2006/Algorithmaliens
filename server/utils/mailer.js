import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_ADDRESS = process.env.MAIL_FROM || `no-reply@${process.env.DOMAIN || 'localhost'}`;

let transporter = null;
if (SMTP_HOST && SMTP_PORT) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT, 10),
    secure: SMTP_PORT == 465, // true for 465, false for other ports
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined
  });
}

export async function sendMail(to, subject, text, html) {
  if (!transporter) {
    console.warn('[Mailer] SMTP not configured, skipping sendMail');
    return;
  }
  return transporter.sendMail({ from: FROM_ADDRESS, to, subject, text, html });
}

export async function sendResetEmail(to, token, opts = {}) {
  const resetUrl = opts.resetUrl || `${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin`;
  const subject = 'Password reset token';
  const text = `Use this token to reset your password: ${token}\n\nVisit ${resetUrl} and enter the token in the Reset form.`;
  const html = `<p>Use this token to reset your password:</p><pre>${token}</pre><p>Visit <a href="${resetUrl}">${resetUrl}</a> and enter the token in the Reset form.</p>`;
  return sendMail(to, subject, text, html);
}

export default { sendMail, sendResetEmail };
