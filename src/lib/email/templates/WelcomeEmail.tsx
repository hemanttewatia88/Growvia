import { EmailShell } from "@/lib/email/templates/EmailShell";

export function WelcomeEmail({ name }: { name: string }) {
  return (
    <EmailShell preheader="Welcome to GrowViaSphere">
      <p style={{ margin: "0 0 16px", color: "#101826", fontSize: 16 }}>Hi {name},</p>
      <p style={{ margin: "0 0 16px", color: "#101826", fontSize: 16 }}>
        Your GrowViaSphere account is verified and ready — fitness, co-working, café, and meeting
        rooms are all one login away.
      </p>
      <p style={{ margin: 0, color: "#4a5361", fontSize: 14 }}>
        Sign in any time from growviasphere.com/login.
      </p>
    </EmailShell>
  );
}
