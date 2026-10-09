import { NextResponse } from "next/server";
import { db } from "@/db";
import { visitRequests, propertySubmissions, blogPosts, siteSettings, auditLogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { seedDatabase } from "@/db/seed";

export async function GET(request: Request) {
  try {
    await seedDatabase();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    if (type === "visits") {
      const data = await db.select().from(visitRequests).orderBy(desc(visitRequests.createdAt));
      return NextResponse.json({ success: true, data });
    }

    if (type === "submissions") {
      const data = await db.select().from(propertySubmissions).orderBy(desc(propertySubmissions.createdAt));
      return NextResponse.json({ success: true, data });
    }

    if (type === "blogs") {
      const data = await db.select().from(blogPosts).orderBy(desc(blogPosts.id));
      return NextResponse.json({ success: true, data });
    }

    if (type === "settings") {
      const data = await db.select().from(siteSettings);
      return NextResponse.json({ success: true, data });
    }

    if (type === "logs") {
      const data = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(50);
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const body = await request.json();

    if (type === "visit") {
      const res = await db.insert(visitRequests).values({
        propertyId: body.propertyId || null,
        propertyTitle: body.propertyTitle || "مشاوره عمومی",
        fullName: body.fullName,
        phone: body.phone,
        preferredDate: body.preferredDate || "امروز",
        preferredTime: body.preferredTime || "عصر ۱۷:۰۰",
        note: body.note || "",
      }).returning();

      await db.insert(auditLogs).values({
        action: "درخواست بازدید جدید",
        details: `درخواست بازدید توسط ${body.fullName} برای ملک ${body.propertyTitle || 'مشاوره'} ثبت شد.`,
        userRole: "مشتری / کاربر سایت",
      });

      return NextResponse.json({ success: true, data: res[0] });
    }

    if (type === "submission") {
      const res = await db.insert(propertySubmissions).values({
        ownerName: body.ownerName,
        phone: body.phone,
        transactionType: body.transactionType,
        propertyType: body.propertyType,
        neighborhood: body.neighborhood,
        address: body.address,
        area: Number(body.area) || 80,
        priceExpected: body.priceExpected,
        description: body.description || "",
        hasParking: Boolean(body.hasParking),
        hasElevator: Boolean(body.hasElevator),
        hasStorage: Boolean(body.hasStorage),
      }).returning();

      await db.insert(auditLogs).values({
        action: "ثبت ملک توسط مالک",
        details: `ملک جدید توسط ${body.ownerName} با شماره ${body.phone} در محله ${body.neighborhood} ثبت گردید.`,
        userRole: "مالک صحنه",
      });

      return NextResponse.json({ success: true, data: res[0] });
    }

    if (type === "settings_update") {
      // update key/value
      for (const [key, val] of Object.entries(body)) {
        await db.insert(siteSettings).values({ key, value: String(val) })
          .onConflictDoUpdate({
            target: siteSettings.key,
            set: { value: String(val), updatedAt: new Date() }
          });
      }
      return NextResponse.json({ success: true, message: "تنظیمات ذخیره شد" });
    }

    return NextResponse.json({ success: false, error: "Action not supported" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
