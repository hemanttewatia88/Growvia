import type { ReactNode } from "react";

export function EmailShell({ preheader, children }: { preheader: string; children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "#fafaf7", padding: "32px 16px", fontFamily: "Arial, sans-serif" }}>
      <span style={{ display: "none", opacity: 0, height: 0, overflow: "hidden" }}>{preheader}</span>
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid #e6e4de",
        }}
      >
        <div style={{ backgroundColor: "#101826", padding: "24px 32px" }}>
          <span style={{ color: "#f3f1eb", fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>
            GrowViaSphere
          </span>
        </div>
        <div style={{ padding: "32px" }}>{children}</div>
        <div style={{ padding: "0 32px 24px", color: "#737b87", fontSize: 12 }}>
          GrowViaSphere · Sector 44, Gurugram, Haryana
        </div>
      </div>
    </div>
  );
}
