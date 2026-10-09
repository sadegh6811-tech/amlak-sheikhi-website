import { NextResponse } from "next/server";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq, or } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isNumeric = /^\d+$/.test(id);

    let result;
    if (isNumeric) {
      result = await db.select().from(properties).where(eq(properties.id, parseInt(id, 10)));
    } else {
      result = await db.select().from(properties).where(
        or(eq(properties.slug, id), eq(properties.title, id))
      );
    }

    if (!result || result.length === 0) {
      return NextResponse.json({ success: false, error: "ملک مورد نظر یافت نشد" }, { status: 404 });
    }

    // Increment views
    await db.update(properties)
      .set({ viewsCount: (result[0].viewsCount || 0) + 1 })
      .where(eq(properties.id, result[0].id));

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    const body = await request.json();

    const updated = await db.update(properties)
      .set({
        ...body,
      })
      .where(eq(properties.id, numericId))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error updating";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = parseInt(id, 10);
    await db.delete(properties).where(eq(properties.id, numericId));
    return NextResponse.json({ success: true, message: "با موفقیت حذف شد" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error deleting";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
