import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  transactionType: text("transaction_type").notNull(), // 'buy' (فروش), 'rent' (رهن و اجاره), 'pre-sale' (پیش‌فروش)
  propertyType: text("property_type").notNull(), // 'apartment' (آپارتمان), 'villa' (ویلایی/خانه), 'land' (زمین/کلنگی), 'commercial' (تجاری/مغازه), 'garden' (باغ و ویلا)
  neighborhood: text("neighborhood").notNull(), // محله در صحنه مانند 'خیابان فردوسی', 'بلوار امام خمینی', 'محله آرامگاه', 'شهرک جانبازان', 'دربند صحنه', 'خیابان طالقانی'
  address: text("address").notNull(),
  priceTotal: text("price_total").notNull(), // قیمت کل یا رهن به تومان
  pricePerMeter: text("price_per_meter"), // قیمت هر متر
  rentMonthly: text("rent_monthly"), // اجاره ماهانه (در صورت رهن و اجاره)
  area: integer("area").notNull(), // متراژ متر مربع
  bedrooms: integer("bedrooms").notNull().default(1),
  bathrooms: integer("bathrooms").notNull().default(1),
  floor: integer("floor").default(1),
  totalFloors: integer("total_floors").default(1),
  builtYear: integer("built_year").default(1400),
  parking: boolean("parking").default(false),
  elevator: boolean("elevator").default(false),
  storage: boolean("storage").default(false),
  balcony: boolean("balcony").default(false),
  documentType: text("document_type").default("تک‌برگ عرصه و اعیان"), // سند تک برگ، اوقاف، قولنامه‌ای معتبر
  heatingCooling: text("heating_cooling").default("پکیج و رادیاتور / کولر آبی"),
  hasVirtualTour: boolean("has_virtual_tour").default(false),
  featured: boolean("featured").default(false),
  description: text("description").notNull(),
  images: jsonb("images").$type<string[]>().notNull(),
  features: jsonb("features").$type<string[]>().default([]),
  lat: text("lat").default("34.4842"), // Sahneh latitude
  lng: text("lng").default("47.6881"), // Sahneh longitude
  advisorName: text("advisor_name").default("مهندس شیخی"),
  advisorPhone: text("advisor_phone").default("09183381234"),
  viewsCount: integer("views_count").default(120),
  inquiryCount: integer("inquiry_count").default(15),
  status: text("status").default("active"), // 'active', 'reserved', 'sold'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const visitRequests = pgTable("visit_requests", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id"),
  propertyTitle: text("property_title"),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  note: text("note"),
  status: text("status").default("pending"), // 'pending', 'confirmed', 'completed', 'canceled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const propertySubmissions = pgTable("property_submissions", {
  id: serial("id").primaryKey(),
  ownerName: text("owner_name").notNull(),
  phone: text("phone").notNull(),
  transactionType: text("transaction_type").notNull(),
  propertyType: text("property_type").notNull(),
  neighborhood: text("neighborhood").notNull(),
  address: text("address").notNull(),
  area: integer("area").notNull(),
  priceExpected: text("price_expected").notNull(),
  description: text("description"),
  hasParking: boolean("has_parking").default(false),
  hasElevator: boolean("has_elevator").default(false),
  hasStorage: boolean("has_storage").default(false),
  status: text("status").default("under_review"), // 'under_review', 'approved', 'rejected'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  readTime: text("read_time").default("۵ دقیقه"),
  author: text("author").default("مهندس بهزاد شیخی"),
  publishedAt: text("published_at").default("۱۴۰۳/۱۱/۲۰"),
  featured: boolean("featured").default(false),
  keywords: text("keywords").default("املاک صحنه، خرید خانه در صحنه کرمانشاه"),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  details: text("details").notNull(),
  userRole: text("user_role"),
  ip: text("ip"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ═══ AUTH TABLES ═══
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("advisor"),
  twoFactorSecret: text("two_factor_secret"),
  twoFactorEnabled: boolean("two_factor_enabled").default(false),
  lastLoginAt: timestamp("last_login_at"),
  lastLoginIp: text("last_login_ip"),
  failedLoginAttempts: integer("failed_login_attempts").default(0).notNull(),
  lockedUntil: timestamp("locked_until"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const loginAttempts = pgTable("login_attempts", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  ipAddress: text("ip_address").notNull(),
  success: boolean("success").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const neighborhoods = pgTable("neighborhoods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  latitude: text("latitude"),
  longitude: text("longitude"),
  image: text("image"),
  propertyCount: integer("property_count").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull().references(() => blogPosts.id, { onDelete: "cascade" }),
  authorName: text("author_name").notNull(),
  authorEmail: text("author_email").notNull(),
  content: text("content").notNull(),
  status: text("status").default("pending").notNull(),
  parentId: integer("parent_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status").default("unread").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  url: text("url").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  width: integer("width"),
  height: integer("height"),
  alt: text("alt"),
  folder: text("folder").default("general"),
  uploadedBy: integer("uploaded_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageViews = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  propertyId: integer("property_id"),
  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
