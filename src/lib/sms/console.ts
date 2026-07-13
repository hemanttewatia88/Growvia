// TODO(twilio): wire real SMS delivery once TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN /
// TWILIO_FROM_NUMBER are set (no Twilio account provisioned yet). Until then every
// SMS logs to the console instead of sending, mirroring the email dev-mode fallback.
export async function sendSms({ to, body }: { to: string; body: string }): Promise<{ id: string }> {
  const hasTwilioConfig =
    process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_FROM_NUMBER;

  if (!hasTwilioConfig) {
    console.log("[sms] DEV MODE — would send:", { to, body });
    return { id: "dev-mock-id" };
  }

  throw new Error("[sms] TWILIO_* env vars are set but the Twilio client isn't wired up yet.");
}
