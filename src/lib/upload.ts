import "server-only";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { nanoid } from "nanoid";
import { db } from "@/db";
import { media } from "@/db/schema";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads", "properties");

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/gif",
];

const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;   // ۵ مگابایت
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;  // ۵۰ مگابایت

export interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
  mediaId?: number;
}

function getExtension(filename: string): string {
  const parts = filename.split(".");
  return parts.length > 1 ? `.${parts[parts.length - 1]!.toLowerCase()}` : "";
}

function isImageType(type: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(type);
}

function isVideoType(type: string): boolean {
  return ALLOWED_VIDEO_TYPES.includes(type);
}

export async function saveUploadedFile(
  file: File,
  uploadedBy?: number,
  folder: string = "properties"
): Promise<UploadResult> {
  try {
    // اعتبارسنجی نوع فایل
    const isImage = isImageType(file.type);
    const isVideo = isVideoType(file.type);

    if (!isImage && !isVideo) {
      return { success: false, error: "فرمت فایل مجاز نیست (فقط عکس یا ویدیو)" };
    }

    // اعتبارسنجی حجم
    const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
    if (file.size > maxSize) {
      const maxMB = maxSize / (1024 * 1024);
      return { success: false, error: `حجم فایل بیش از ${maxMB} مگابایت است` };
    }

    // ساخت نام فایل یکتا
    const ext = getExtension(file.name);
    const filename = `${nanoid(16)}${ext}`;
    const uploadPath = join(UPLOAD_DIR, filename);

    // اطمینان از وجود پوشه
    await mkdir(UPLOAD_DIR, { recursive: true });

    // ذخیره فایل روی دیسک
    const bytes = await file.arrayBuffer();
    await writeFile(uploadPath, Buffer.from(bytes));

    // URL عمومی
    const publicUrl = `/uploads/properties/${filename}`;

    // ذخیره در دیتابیس
    const [record] = await db
      .insert(media)
      .values({
        filename,
        originalName: file.name,
        url: publicUrl,
        mimeType: file.type,
        size: file.size,
        alt: file.name.replace(ext, ""),
        folder,
        uploadedBy: uploadedBy ?? null,
      })
      .returning({ id: media.id });

    return {
      success: true,
      url: publicUrl,
      filename,
      mediaId: record?.id,
    };
  } catch (err) {
    console.error("Upload error:", err);
    return { success: false, error: "خطا در ذخیره فایل" };
  }
}
