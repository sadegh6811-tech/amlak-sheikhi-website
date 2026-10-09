import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { seedDatabase } from "@/db/seed";

export async function GET() {
  try {
    await seedDatabase();
    await db.execute(sql`SELECT 1`);
    return NextResponse.json({
      status: "ok",
      brand: "املاک شیخی صحنه",
      db: "connected",
      pwa: "ready",
      domain: "https://amlak-sheikhi.ir",
      timestamp: new Date().toISOString()
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { status: "error", error: message },
      { status: 500 }
    );
  }
}
