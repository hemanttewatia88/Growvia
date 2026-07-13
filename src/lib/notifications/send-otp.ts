import { sendEmail } from "@/lib/email/resend";
import { OtpEmail } from "@/lib/email/templates/OtpEmail";
import { sendSms } from "@/lib/sms/console";
import type { OtpChannel, OtpPurpose } from "@/types/auth";

export async function sendOtpNotification({
  destination,
  channel,
  code,
  purpose,
}: {
  destination: string;
  channel: OtpChannel;
  code: string;
  purpose: OtpPurpose;
}) {
  // Always logged in dev regardless of transport, so the code is easy to find while testing.
  if (process.env.NODE_ENV !== "production") {
    console.log(`[otp] ${channel} code for ${destination} (${purpose}): ${code}`);
  }

  if (channel === "email") {
    await sendEmail({
      to: destination,
      subject: "Your GrowViaSphere verification code",
      react: OtpEmail({ code, purpose }),
    });
  } else {
    await sendSms({ to: destination, body: `Your GrowViaSphere verification code is ${code}. It expires in 5 minutes.` });
  }
}
