import React from "react";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq, or } from "drizzle-orm";
import PropertyDetailClient from "./client";
import { generateSeoMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNumeric = /^\d+$/.test(id);

  let prop;
  if (isNumeric) {
    const res = await db.select().from(properties).where(eq(properties.id, parseInt(id, 10)));
    prop = res[0];
  } else {
    const res = await db.select().from(properties).where(
      or(eq(properties.slug, id), eq(properties.title, id))
    );
    prop = res[0];
  }

  if (!prop) {
    return { title: "ملک یافت نشد | املاک شیخی صحنه" };
  }

  return generateSeoMetadata({
    title: `${prop.title} | املاک شیخی صحنه`,
    description: prop.description.slice(0, 160),
    canonicalUrl: `https://amlak-sheikhi.ir/property/${prop.id}`,
    image: prop.images && prop.images.length > 0 ? prop.images[0] : undefined,
  });
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNumeric = /^\d+$/.test(id);

  let prop;
  if (isNumeric) {
    const res = await db.select().from(properties).where(eq(properties.id, parseInt(id, 10)));
    prop = res[0];
  } else {
    const res = await db.select().from(properties).where(
      or(eq(properties.slug, id), eq(properties.title, id))
    );
    prop = res[0];
  }

  if (!prop) {
    notFound();
  }

  return <PropertyDetailClient property={prop} />;
}
