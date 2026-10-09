import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, auditLogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { createHash } from "crypto";

function hashPassword(password: string): string {
  return createHash("sha256")
    .update(password + (process.env.SESSION_SECRET || ""))
    .digest("hex");
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "لطفاً وارد شوید" }, { status: 401 });
    }

    const { currentPassword, newPassword, confirmPassword } = await request.json();

    // اعتبارسنجی
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ error: "همه فیلدها الزامی است" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "رمز جدید باید حداقل ۸ کاراکتر باشد" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "رمز جدید و تکرار آن یکسان نیستند" },
        { status: 400 }
      );
    }

    // بررسی رمز فعلی
    const [dbUser] = await db.select().from(users).where(eq(users.id, user.id)).limit(1);

    if (!dbUser) {
      return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
    }

    const currentHash = hashPassword(currentPassword);
    if (dbUser.passwordHash !== currentHash) {
      return NextResponse.json({ error: "رمز فعلی اشتباه است" }, { status: 401 });
    }

    // ذخیره رمز جدید
    const newHash = hashPassword(newPassword);
    await db
      .update(users)
      .set({ passwordHash: newHash, updatedAt: new Date() })
      .where(eq(users.id, user.id));

    // ثبت لاگ
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const ua = request.headers.get("user-agent") || "unknown";

    await db.insert(auditLogs).values({
      userId: user.id,
      action: "تغییر رمز عبور",
      details: `کاربر ${user.email} رمز عبور خود را تغییر داد`,
      userRole: user.role,
      ip,
      userAgent: ua,
    });

    return NextResponse.json({
      success: true,
      message: "رمز عبور با موفقیت تغییر کرد",
    });
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
