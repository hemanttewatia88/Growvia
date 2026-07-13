import { EmailShell } from "@/lib/email/templates/EmailShell";

export function OtpEmail({ code, purpose }: { code: string; purpose: string }) {
  const action = purpose === "register" ? "verify your email" : "sign in";
  return (
    <EmailShell preheader={`Your GrowViaSphere verification code is ${code}`}>
      <p style={{ margin: "0 0 16px", color: "#101826", fontSize: 16 }}>
        Use this code to {action}:
      </p>
      <p
        style={{
          margin: "0 0 16px",
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#101826",
        }}
      >
        {code}
      </p>
      <p style={{ margin: 0, color: "#4a5361", fontSize: 14 }}>
        This code expires in 5 minutes. If you didn&apos;t request this, you can safely ignore this email.
      </p>
    </EmailShell>
  );
}
