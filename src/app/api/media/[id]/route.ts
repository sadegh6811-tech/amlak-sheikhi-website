import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { media } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";
import { unlink } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const mediaId = parseInt(id, 10);
    if (isNaN(mediaId)) {
      return NextResponse.json({ error: "شناسه نامعتبر" }, { status: 400 });
    }

    const [item] = await db
      .select()
      .from(media)
      .where(eq(media.id, mediaId))
      .limit(1);

    if (!item) {
      return NextResponse.json({ error: "فایل یافت نشد" }, { status: 404 });
    }

    try {
      const filePath = join(process.cwd(), "public", item.url);
      await unlink(filePath);
    } catch {
      // فایل فیزیکی نبود، ادامه بده
    }

    await db.delete(media).where(eq(media.id, mediaId));

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Media DELETE error:", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
