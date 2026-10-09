import { NextResponse } from "next/server";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { count, sum, sql } from "drizzle-orm";

export async function GET() {
  try {
    const totalProps = await db.select({ count: count() }).from(properties);
    const totalViews = await db.select({ total: sum(properties.viewsCount) }).from(properties);
    const totalInquiries = await db.select({ total: sum(properties.inquiryCount) }).from(properties);

    // Group by transactionType
    const byType = await db.execute(sql`
      SELECT transaction_type, count(*) as count 
      FROM properties 
      GROUP BY transaction_type
    `);

    // Group by neighborhood
    const byNeighborhood = await db.execute(sql`
      SELECT neighborhood, count(*) as count 
      FROM properties 
      GROUP BY neighborhood
      ORDER BY count DESC
      LIMIT 6
    `);

    return NextResponse.json({
      success: true,
      stats: {
        totalProperties: Number(totalProps[0]?.count || 0),
        totalViews: Number(totalViews[0]?.total || 0),
        totalInquiries: Number(totalInquiries[0]?.total || 0),
        activeDeals: 18,
        advisorsCount: 4,
        avgPriceM2: "۲۸٬۵۰۰٬۰۰۰ تومان",
        customerSatisfaction: "۹۸.۶٪",
        byType: byType.rows,
        byNeighborhood: byNeighborhood.rows
      }
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
