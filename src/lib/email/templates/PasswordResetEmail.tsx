import { EmailShell } from "@/lib/email/templates/EmailShell";

export function PasswordResetEmail({ resetUrl }: { resetUrl: string }) {
  return (
    <EmailShell preheader="Reset your GrowViaSphere password">
      <p style={{ margin: "0 0 16px", color: "#101826", fontSize: 16 }}>
        We received a request to reset your GrowViaSphere password.
      </p>
      <a
        href={resetUrl}
        style={{
          display: "inline-block",
          margin: "0 0 16px",
          padding: "12px 24px",
          borderRadius: 999,
          background: "#c6963e",
          color: "#101826",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Reset password
      </a>
      <p style={{ margin: 0, color: "#4a5361", fontSize: 14 }}>
        This link expires in 1 hour. If you didn&apos;t request this, you can safely ignore this email —
        your password won&apos;t change.
      </p>
    </EmailShell>
  );
}
