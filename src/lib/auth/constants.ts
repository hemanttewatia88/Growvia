export const OTP_EXPIRY_MS = 5 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000;

// The session cookie itself is long-lived in the browser; the DB row's `expiresAt` is the
// actual authority and slides forward on every authenticated request (see getCurrentUser /
// getCurrentAdmin). This gives a 5-minute idle timeout: activity keeps the session alive
// indefinitely, and it only lapses after IDLE_SESSION_TIMEOUT_MS of no requests.
export const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;
export const IDLE_SESSION_TIMEOUT_MS = 5 * 60 * 1000;
export const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "gvs_session";

export const PASSWORD_RESET_EXPIRY_MS = 60 * 60 * 1000;
