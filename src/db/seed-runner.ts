import "dotenv/config";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function main() {
  const { seedDatabase } = await import("./seed");
  const { logger } = await import("@/lib/logger");

  try {
    logger.info("🌱 شروع seed کردن دیتابیس...");
    await seedDatabase();
    logger.info("✅ Seed با موفقیت انجام شد");
    process.exit(0);
  } catch (err) {
    logger.error({ err }, "❌ خطا در seed");
    process.exit(1);
  }
}

main();
