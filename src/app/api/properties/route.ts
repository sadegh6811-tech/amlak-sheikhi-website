import { NextResponse } from "next/server";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq, ilike, and, or, sql } from "drizzle-orm";
import { seedDatabase } from "@/db/seed";

export async function GET(request: Request) {
  try {
    await seedDatabase();
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") || "";
    const type = searchParams.get("type"); // buy, rent, pre-sale
    const propertyType = searchParams.get("propertyType"); // apartment, villa, land, commercial, garden
    const neighborhood = searchParams.get("neighborhood");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");
    const parking = searchParams.get("parking");
    const elevator = searchParams.get("elevator");
    const featured = searchParams.get("featured");

    const conditions = [];

    if (q) {
      conditions.push(
        or(
          ilike(properties.title, `%${q}%`),
          ilike(properties.neighborhood, `%${q}%`),
          ilike(properties.description, `%${q}%`),
          ilike(properties.address, `%${q}%`)
        )
      );
    }

    if (type && type !== "all") {
      conditions.push(eq(properties.transactionType, type));
    }

    if (propertyType && propertyType !== "all") {
      conditions.push(eq(properties.propertyType, propertyType));
    }

    if (neighborhood && neighborhood !== "all") {
      conditions.push(ilike(properties.neighborhood, `%${neighborhood}%`));
    }

    if (bedrooms && bedrooms !== "all") {
      conditions.push(eq(properties.bedrooms, parseInt(bedrooms, 10)));
    }

    if (parking === "true") {
      conditions.push(eq(properties.parking, true));
    }

    if (elevator === "true") {
      conditions.push(eq(properties.elevator, true));
    }

    if (featured === "true") {
      conditions.push(eq(properties.featured, true));
    }

    const query = conditions.length > 0
      ? db.select().from(properties).where(and(...conditions)).orderBy(sql`${properties.createdAt} DESC`)
      : db.select().from(properties).orderBy(sql`${properties.createdAt} DESC`);

    const items = await query;
    return NextResponse.json({ success: true, data: items, count: items.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error fetching properties";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slug = body.slug || `property-${Date.now()}`;
    const newProperty = await db.insert(properties).values({
      title: body.title,
      slug,
      transactionType: body.transactionType || "buy",
      propertyType: body.propertyType || "apartment",
      neighborhood: body.neighborhood || "خیابان فردوسی صحنه",
      address: body.address || "شهرستان صحنه",
      priceTotal: body.priceTotal || "توافقی",
      pricePerMeter: body.pricePerMeter || "",
      rentMonthly: body.rentMonthly || "",
      area: Number(body.area) || 100,
      bedrooms: Number(body.bedrooms) || 2,
      bathrooms: Number(body.bathrooms) || 1,
      floor: Number(body.floor) || 1,
      totalFloors: Number(body.totalFloors) || 4,
      builtYear: Number(body.builtYear) || 1402,
      parking: Boolean(body.parking),
      elevator: Boolean(body.elevator),
      storage: Boolean(body.storage),
      balcony: Boolean(body.balcony),
      documentType: body.documentType || "تک‌برگ عرصه و اعیان",
      heatingCooling: body.heatingCooling || "پکیج و رادیاتور",
      hasVirtualTour: Boolean(body.hasVirtualTour),
      featured: Boolean(body.featured),
      description: body.description || "ملک با موقعیت عالی در شهرستان صحنه",
      images: body.images && body.images.length > 0 ? body.images : [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
      ],
      features: body.features || ["خوش نقشه", "دسترسی عالی به مرکز شهر صحنه"],
      lat: body.lat || "34.4842",
      lng: body.lng || "47.6881",
      advisorName: body.advisorName || "مهندس شیخی",
      advisorPhone: body.advisorPhone || "09183381234",
    }).returning();

    return NextResponse.json({ success: true, data: newProperty[0] }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error creating property";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
