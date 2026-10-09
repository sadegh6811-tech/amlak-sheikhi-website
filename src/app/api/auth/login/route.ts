import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, loginAttempts, auditLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth";
import { createHash } from "crypto";

function hashPassword(password: string): string {
  return createHash("sha256")
    .update(password + (process.env.SESSION_SECRET || ""))
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const ua = request.headers.get("user-agent") || "unknown";

    if (!email || !password) {
      return NextResponse.json({ error: "ایمیل و رمز عبور الزامی است" }, { status: 400 });
    }

    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const passwordHash = hashPassword(password);
    const success = !!user && user.passwordHash === passwordHash && user.isActive;

    await db.insert(loginAttempts).values({ email, ipAddress: ip, success });

    if (!success) {
      if (user) {
        await db
          .update(users)
          .set({ failedLoginAttempts: user.failedLoginAttempts + 1 })
          .where(eq(users.id, user.id));
      }
      return NextResponse.json({ error: "ایمیل یا رمز عبور اشتباه است" }, { status: 401 });
    }

    await db
      .update(users)
      .set({ lastLoginAt: new Date(), lastLoginIp: ip, failedLoginAttempts: 0 })
      .where(eq(users.id, user.id));

    await db.insert(auditLogs).values({
      userId: user.id,
      action: "ورود موفق",
      details: `ورود کاربر ${user.email}`,
      userRole: user.role,
      ip,
      userAgent: ua,
    });

    await createSession(user.id, ip, ua);
    return NextResponse.json({
      success: true,
      user: { id: user.id, fullName: user.fullName, role: user.role },
    });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
