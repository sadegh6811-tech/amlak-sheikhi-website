import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { media } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get("folder");

    const query = db.select().from(media);
    const items = folder
      ? await query.where(eq(media.folder, folder)).orderBy(desc(media.id)).limit(100)
      : await query.orderBy(desc(media.id)).limit(100);

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Media GET error:", err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
