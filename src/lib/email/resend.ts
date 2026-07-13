import { Resend } from "resend";
import type { ReactElement } from "react";

// The SDK throws at construction time if given an empty string, so fall back to a
// placeholder — the dev-mode branch below (empty/placeholder key) never calls .send().
const resend = new Resend(process.env.RESEND_API_KEY || "re_dev_placeholder");

const FROM_ADDRESS = "GrowViaSphere <noreply@growviasphere.com>";
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL ?? "support@growviasphere.com";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  react: ReactElement;
}

// TODO(production): set a real RESEND_API_KEY in the environment. Until then,
// every email logs to the console instead of sending — see dev-mode branch below.
export async function sendEmail({ to, subject, react }: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_xxxxxxxxxxxx") {
    console.log("[email] DEV MODE — would send:", { to, subject });
    return { id: "dev-mock-id" };
  }

  const result = await resend.emails.send({
    from: FROM_ADDRESS,
    to: Array.isArray(to) ? to : [to],
    subject,
    react,
  });

  if (result.error) {
    console.error("[email] Resend error:", result.error);
    throw new Error(result.error.message);
  }

  return result.data;
}
