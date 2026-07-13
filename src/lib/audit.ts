import { db } from "@/lib/db";

export type AuditAction =
  | "admin_login"
  | "admin_invited"
  | "password_reset_sent"
  | "message_replied"
  | "message_resolved"
  | "message_assigned"
  | "booking_status_changed"
  | "content_created"
  | "content_updated"
  | "content_deleted"
  | "report_generated";

interface LogAuditArgs {
  adminId: string;
  action: AuditAction;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, unknown>;
}

export async function logAudit({ adminId, action, targetType, targetId, metadata }: LogAuditArgs): Promise<void> {
  await db.auditLog.create({
    data: {
      adminId,
      action,
      ...(targetType ? { targetType } : {}),
      ...(targetId ? { targetId } : {}),
      ...(metadata ? { metadata: JSON.stringify(metadata) } : {}),
    },
  });
}
