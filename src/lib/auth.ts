import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { db } from "@/db";
import { users, sessions } from "@/db/schema";
import { eq, and, gt } from "drizzle-orm";
import { nanoid } from "nanoid";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-change-me-in-production-min-32-chars"
);

const COOKIE_NAME = "sheikhi_session";
const SESSION_DURATION = 1000 * 60 * 60 * 24 * 7;

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

export async function createSession(userId: number, ip?: string, ua?: string) {
  const sessionId = nanoid(32);
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    ipAddress: ip,
    userAgent: ua,
    expiresAt,
  });

  const token = await new SignJWT({ sid: sessionId, uid: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .sign(SECRET);

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });

  return { sessionId, token };
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const store = await cookies();
    const token = store.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, SECRET);
    const userId = payload.uid as number;
    const sessionId = payload.sid as string;

    const [session] = await db
      .select()
      .from(sessions)
      .where(and(eq(sessions.id, sessionId), gt(sessions.expiresAt, new Date())))
      .limit(1);

    if (!session) return null;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!user || !user.isActive) return null;
    return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
  } catch {
    return null;
  }
}

export async function destroySession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, SECRET);
      const sessionId = payload.sid as string;
      await db.delete(sessions).where(eq(sessions.id, sessionId));
    } catch {}
  }
  store.delete(COOKIE_NAME);
}

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: ["*"],
  content_manager: ["content:*", "properties:*", "blog:*", "media:*"],
  advisor: ["properties:own", "leads:own"],
  author: ["blog:*"],
  viewer: ["reports:view"],
};

export function hasPermission(role: string, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return (
    perms.includes("*") ||
    perms.includes(permission) ||
    perms.some((p) => p.endsWith(":*") && permission.startsWith(p.slice(0, -1)))
  );
}
