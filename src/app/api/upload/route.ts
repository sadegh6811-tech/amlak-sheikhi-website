import { NextRequest, NextResponse } from "next/server";
import { saveUploadedFile } from "@/lib/upload";
import { getCurrentUser } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    // احراز هویت
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "برای آپلود باید وارد شوید" },
        { status: 401 }
      );
    }

    // بررسی نوع کاربری
    const allowedRoles = ["super_admin", "content_manager", "advisor"];
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: "شما دسترسی آپلود ندارید" },
        { status: 403 }
      );
    }

    // دریافت فایل‌ها
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];
    const folder = (formData.get("folder") as string) || "properties";

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "فایلی برای آپلود ارسال نشده" },
        { status: 400 }
      );
    }

    const results = [];
    for (const file of files) {
      if (!(file instanceof File) || file.size === 0) continue;

      const result = await saveUploadedFile(file, user.id, folder);
      results.push({
        success: result.success,
        url: result.url,
        filename: result.filename,
        mediaId: result.mediaId,
        error: result.error,
        originalName: file.name,
      });
    }

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return NextResponse.json({
      success: successful.length > 0,
      uploaded: successful,
      failed,
      totalUploaded: successful.length,
      totalFailed: failed.length,
    });
  } catch (err) {
    console.error("Upload route error:", err);
    return NextResponse.json(
      { error: "خطای سرور در آپلود" },
      { status: 500 }
    );
  }
}
