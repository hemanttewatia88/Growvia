interface SessionMeta {
  userAgent?: string;
  ipAddress?: string;
}

/** Extracts session audit metadata from a request, omitting keys that aren't present. */
export function getSessionMeta(request: Request): SessionMeta {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const userAgent = request.headers.get("user-agent");
  return {
    ...(ip ? { ipAddress: ip } : {}),
    ...(userAgent ? { userAgent } : {}),
  };
}
