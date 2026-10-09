import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://amlak-sheikhi.ir";
const SITE_NAME = "املاک شیخی صحنه";

export function generateSeoMetadata({
  title, description, keywords, canonicalUrl, image = "/images/og-image.jpg",
}: {
  title?: string; description?: string; keywords?: string[]; canonicalUrl?: string; image?: string;
}): Metadata {
  const defaultTitle = "املاک شیخی صحنه | مرجع خرید، فروش، رهن و اجاره در شهرستان صحنه";
  const defaultDesc = "املاک شیخی در شهرستان صحنه، کرمانشاه؛ مرجع تخصصی خرید و فروش آپارتمان، خانه ویلایی، باغ و زمین در صحنه. مشاوره تخصصی ملکی و صدور کد رهگیری معتبر.";

  return {
    title: title ? `${title} | املاک شیخی صحنه` : defaultTitle,
    description: description || defaultDesc,
    keywords: keywords || [
      "املاک شیخی", "املاک شیخی صحنه", "خرید خانه در صحنه",
      "خرید آپارتمان در صحنه", "رهن و اجاره در صحنه",
      "قیمت خانه در صحنه کرمانشاه", "باغ ویلا دربند صحنه",
      "زمین در صحنه", "بنگاه املاک صحنه", "مشاور املاک صحنه کرمانشاه",
    ],
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: "مهندس بهزاد شیخی",
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: canonicalUrl || SITE_URL },
    openGraph: {
      type: "website", locale: "fa_IR",
      url: canonicalUrl || SITE_URL,
      title: title || defaultTitle,
      description: description || defaultDesc,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: "املاک شیخی شهرستان صحنه کرمانشاه" }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || defaultTitle,
      description: description || defaultDesc,
      images: [image],
    },
    robots: {
      index: true, follow: true,
      googleBot: {
        index: true, follow: true,
        "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1,
      },
    },
  };
}

export const realEstateBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "املاک شیخی صحنه",
  "image": `${SITE_URL}/logo.png`,
  "@id": SITE_URL,
  "url": SITE_URL,
  "telephone": "+989183381234",
  "priceRange": "۳۰۰ میلیون تا ۱۰ میلیارد تومان",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "خیابان فردوسی، نرسیده به میدان مولوی، پلاک ۴۲",
    "addressLocality": "صحنه",
    "addressRegion": "کرمانشاه",
    "postalCode": "6741712345",
    "addressCountry": "IR",
  },
  "geo": { "@type": "GeoCoordinates", "latitude": 34.4842, "longitude": 47.6881 },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
    "opens": "08:30",
    "closes": "21:00",
  }],
  "areaServed": { "@type": "City", "name": "صحنه" },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "87",
    "bestRating": "5",
  },
  "sameAs": [
    "https://instagram.com/amlak.sheikhi.sahneh",
    "https://t.me/amlak_sheikhi_sahneh",
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": SITE_NAME,
  "url": SITE_URL,
  "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png`, "width": 512, "height": 512 },
  "contactPoint": [{
    "@type": "ContactPoint",
    "telephone": "+989183381234",
    "contactType": "sales",
    "availableLanguage": ["Persian", "fa"],
  }],
  "sameAs": ["https://instagram.com/amlak.sheikhi.sahneh", "https://t.me/amlak_sheikhi_sahneh"],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": SITE_NAME,
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/properties?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
  "inLanguage": "fa-IR",
};

export function generatePropertySchema(p: {
  id: number;
  title: string;
  description: string;
  priceAmount?: number | null;
  area: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  neighborhood: string;
  address: string;
  lat: string | null;
  lng: string | null;
  transactionType: string;
  createdAt: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": p.title,
    "description": p.description,
    "url": `${SITE_URL}/property/${p.id}`,
    "image": p.images,
    "datePosted": p.createdAt.toISOString(),
    "numberOfRooms": p.bedrooms,
    "numberOfBathroomsTotal": p.bathrooms,
    "floorSize": { "@type": "QuantitativeValue", "value": p.area, "unitCode": "MTK" },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": p.address,
      "addressLocality": "صحنه",
      "addressRegion": "کرمانشاه",
      "addressCountry": "IR",
    },
    ...(p.lat && p.lng
      ? {
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": parseFloat(p.lat),
            "longitude": parseFloat(p.lng),
          },
        }
      : {}),
    "offers": {
      "@type": "Offer",
      "price": p.priceAmount || 0,
      "priceCurrency": "IRR",
      "availability": "https://schema.org/InStock",
    },
    "provider": { "@type": "RealEstateAgent", "name": SITE_NAME, "telephone": "+989183381234" },
  };
}

export function generateArticleSchema(post: {
  title: string;
  slug: string;
  summary: string;
  image: string;
  author: string;
  publishedAt: string;
  keywords?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.summary,
    "image": post.image,
    "author": { "@type": "Person", "name": post.author, "url": `${SITE_URL}/about` },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` },
    },
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "mainEntityOfPage": `${SITE_URL}/blog/${post.slug}`,
    "keywords": post.keywords || "املاک صحنه",
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer },
    })),
  };
}
