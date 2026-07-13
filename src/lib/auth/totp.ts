import { TOTP, Secret } from "otpauth";
import QRCode from "qrcode";

const ISSUER = "GrowViaSphere";

export function generateTotpSecret(email: string): { secretBase32: string; otpauthUri: string } {
  const secret = new Secret();
  const totp = new TOTP({ issuer: ISSUER, label: email, secret });
  return { secretBase32: secret.base32, otpauthUri: totp.toString() };
}

export function getQrCodeDataUrl(otpauthUri: string): Promise<string> {
  return QRCode.toDataURL(otpauthUri);
}

/** Validates a 6-digit TOTP code against a stored base32 secret, allowing 1 step of clock drift. */
export function verifyTotpCode(secretBase32: string, token: string): boolean {
  const totp = new TOTP({ issuer: ISSUER, secret: Secret.fromBase32(secretBase32) });
  return totp.validate({ token, window: 1 }) !== null;
}
