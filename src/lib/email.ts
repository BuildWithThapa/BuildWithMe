import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD) {
    return null; // Email is optional in local/dev — callers should no-op gracefully.
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD }
  });

  return transporter;
}

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Sends a transactional email over SMTP. Never throws — logs and returns
 * false on failure so callers (e.g. the contact form) don't fail the whole
 * request just because a notification email couldn't be delivered.
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailInput): Promise<boolean> {
  const client = getTransporter();
  if (!client) {
    console.warn("SMTP not configured — skipping email send.");
    return false;
  }

  try {
    await client.sendMail({
      from: process.env.SMTP_FROM_EMAIL ?? process.env.SMTP_USER,
      to,
      subject,
      html,
      replyTo
    });
    return true;
  } catch (err) {
    console.error("Failed to send email:", err);
    return false;
  }
}

export function contactNotificationHtml(input: {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}): string {
  return `
    <div style="font-family: sans-serif; max-width: 480px;">
      <h2>New contact form submission</h2>
      <p><strong>Name:</strong> ${input.name}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      ${input.subject ? `<p><strong>Subject:</strong> ${input.subject}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line;">${input.message}</p>
    </div>
  `;
}

export function welcomeEmailHtml(fullName: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 480px;">
      <h2>Welcome to BuildWithThapa, ${fullName}!</h2>
      <p>Your account is ready. Log in to start building your free CV or explore the dashboard.</p>
    </div>
  `;
}
