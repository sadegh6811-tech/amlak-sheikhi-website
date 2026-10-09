import { db } from "@/db";
import { properties, blogPosts, siteSettings, auditLogs } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function seedDatabase() {
  try {
    // Create tables if not exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS properties (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        transaction_type TEXT NOT NULL,
        property_type TEXT NOT NULL,
        neighborhood TEXT NOT NULL,
        address TEXT NOT NULL,
        price_total TEXT NOT NULL,
        price_per_meter TEXT,
        rent_monthly TEXT,
        area INTEGER NOT NULL,
        bedrooms INTEGER DEFAULT 1 NOT NULL,
        bathrooms INTEGER DEFAULT 1 NOT NULL,
        floor INTEGER DEFAULT 1,
        total_floors INTEGER DEFAULT 1,
        built_year INTEGER DEFAULT 1400,
        parking BOOLEAN DEFAULT FALSE,
        elevator BOOLEAN DEFAULT FALSE,
        storage BOOLEAN DEFAULT FALSE,
        balcony BOOLEAN DEFAULT FALSE,
        document_type TEXT DEFAULT 'تک‌برگ عرصه و اعیان',
        heating_cooling TEXT DEFAULT 'پکیج و رادیاتور / کولر آبی',
        has_virtual_tour BOOLEAN DEFAULT FALSE,
        featured BOOLEAN DEFAULT FALSE,
        description TEXT NOT NULL,
        images JSONB NOT NULL,
        features JSONB DEFAULT '[]',
        lat TEXT DEFAULT '34.4842',
        lng TEXT DEFAULT '47.6881',
        advisor_name TEXT DEFAULT 'مهندس شیخی',
        advisor_phone TEXT DEFAULT '09183381234',
        views_count INTEGER DEFAULT 120,
        inquiry_count INTEGER DEFAULT 15,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS visit_requests (
        id SERIAL PRIMARY KEY,
        property_id INTEGER,
        property_title TEXT,
        full_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        preferred_date TEXT NOT NULL,
        preferred_time TEXT NOT NULL,
        note TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS property_submissions (
        id SERIAL PRIMARY KEY,
        owner_name TEXT NOT NULL,
        phone TEXT NOT NULL,
        transaction_type TEXT NOT NULL,
        property_type TEXT NOT NULL,
        neighborhood TEXT NOT NULL,
        address TEXT NOT NULL,
        area INTEGER NOT NULL,
        price_expected TEXT NOT NULL,
        description TEXT,
        has_parking BOOLEAN DEFAULT FALSE,
        has_elevator BOOLEAN DEFAULT FALSE,
        has_storage BOOLEAN DEFAULT FALSE,
        status TEXT DEFAULT 'under_review',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        summary TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        read_time TEXT DEFAULT '۵ دقیقه',
        author TEXT DEFAULT 'مهندس بهزاد شیخی',
        published_at TEXT DEFAULT '۱۴۰۳/۱۱/۲۰',
        featured BOOLEAN DEFAULT FALSE,
        keywords TEXT DEFAULT 'املاک صحنه، خرید خانه در صحنه کرمانشاه'
      );

      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS audit_logs (
        id SERIAL PRIMARY KEY,
        action TEXT NOT NULL,
        details TEXT NOT NULL,
        user_role TEXT DEFAULT 'مدیر ارشد',
        ip TEXT DEFAULT '192.168.1.1',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    // Check count of properties
    const res = await db.select({ count: sql<number>`count(*)` }).from(properties);
    const count = Number(res[0]?.count || 0);

    if (count === 0) {
      await db.insert(properties).values([
        {
          title: "آپارتمان نوساز کلید نخورده ۱۲۰ متری خیابان فردوسی صحنه",
          slug: "apartment-120m-ferdousi-sahneh",
          transactionType: "buy",
          propertyType: "apartment",
          neighborhood: "خیابان فردوسی",
          address: "شهرستان صحنه، خیابان فردوسی، نبش کوچه صبا، ساختمان آناهیتا",
          priceTotal: "۳٬۶۰۰٬۰۰۰٬۰۰۰ تومان",
          pricePerMeter: "۳۰٬۰۰۰٬۰۰۰ تومان",
          rentMonthly: "",
          area: 120,
          bedrooms: 2,
          bathrooms: 2,
          floor: 3,
          totalFloors: 5,
          builtYear: 1403,
          parking: true,
          elevator: true,
          storage: true,
          balcony: true,
          documentType: "سند تک‌برگ ۶ دانگ آماده انتقال",
          heatingCooling: "پکیج بوتان، اسپلیت و کولر آبی",
          hasVirtualTour: true,
          featured: true,
          description: "واحد لوکس غرق در نور، با ویو کوهستان و باغ‌های زیبای صحنه. متریال درجه یک شامل کابینت هایگلاس ترک، کف سرامیک ۸۰*۸۰ کالیبره، شیرآلات شودر، درب ضد سرقت ترک، تراس بزرگ قابل چیدمان و لابی ورودی شیک. موقعیت مکانی عالی نزدیک به مرکز شهر و امکانات رفاهی.",
          images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["نورگیر جنوبی", "آسانسور ۸ نفره تمام استیل", "پارکینگ سندی اختصاصی", "انباری ۵ متری", "دوربین مداربسته", "آیفون تصویری کارتی"],
          lat: "34.4855",
          lng: "47.6912",
          advisorName: "مهندس بهزاد شیخی",
          advisorPhone: "09183381234",
          viewsCount: 480,
          inquiryCount: 32,
          status: "active"
        },
        {
          title: "خانه ویلایی دوبلکس دربست ۲۰۰ متری در منطقه خوش آب‌وهوای دربند صحنه",
          slug: "villa-duplex-200m-darband-sahneh",
          transactionType: "buy",
          propertyType: "villa",
          neighborhood: "منطقه دربند و سراب صحنه",
          address: "شهرستان صحنه، جاده دربند، کوچه باغ بهارستان",
          priceTotal: "۵٬۲۰۰٬۰۰۰٬۰۰۰ تومان",
          pricePerMeter: "۲۶٬۰۰۰٬۰۰۰ تومان",
          rentMonthly: "",
          area: 200,
          bedrooms: 3,
          bathrooms: 2,
          floor: 1,
          totalFloors: 2,
          builtYear: 1401,
          parking: true,
          elevator: false,
          storage: true,
          balcony: true,
          documentType: "سند تک‌برگ ملکی عرصه و اعیان",
          heatingCooling: "گرمایش از کف و اسپلیت",
          hasVirtualTour: true,
          featured: true,
          description: "ویلای رویایی با چشم‌انداز خیره‌کننده به باغات سرسبز و کوهستان سراب صحنه. حیاط باصفا با درختان مثمر گردو، گیلاس و مو. باربیکیو سنگی، آلاچیق چوبی، آب و برق و گاز قانونی، استخر کوچک تابستانه و امنیت بسیار بالا. گزینه‌ای استثنایی برای سکونت و سرمایه‌گذاری ملکی.",
          images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["حیاط مشجر با درختان میوه", "آلاچیق چوبی", "سیستم آبیاری هوشمند", "درب ریموت‌دار", "سند تک برگ رسمی", "انشعابات مجزا"],
          lat: "34.4920",
          lng: "47.6980",
          advisorName: "مهندس بهزاد شیخی",
          advisorPhone: "09183381234",
          viewsCount: 620,
          inquiryCount: 45,
          status: "active"
        },
        {
          title: "رهن و اجاره آپارتمان ۹۵ متری تمیز در بلوار امام خمینی صحنه",
          slug: "rent-apartment-95m-emam-blvd-sahneh",
          transactionType: "rent",
          propertyType: "apartment",
          neighborhood: "بلوار امام خمینی",
          address: "شهرستان صحنه، بلوار امام خمینی، روبروی شهرداری صحنه",
          priceTotal: "۳۰۰٬۰۰۰٬۰۰۰ تومان ودیعه",
          pricePerMeter: "",
          rentMonthly: "۴٬۵۰۰٬۰۰۰ تومان اجاره ماهانه",
          area: 95,
          bedrooms: 2,
          bathrooms: 1,
          floor: 2,
          totalFloors: 4,
          builtYear: 1398,
          parking: true,
          elevator: true,
          storage: true,
          balcony: true,
          documentType: "سند رسمی ۶ دانگ",
          heatingCooling: "شوفاژ مرکزی و کولر آبی",
          hasVirtualTour: false,
          featured: true,
          description: "واحد بسیار تمیز، تازه نقاشی شده، کمد دیواری‌های جادار و بزرگ در هر دو خواب. کابینت MDF، هود لمسی، گاز صفحه‌ای، همسایگان بسیار محترم و آرام. دسترسی پیاده ۵ دقیقه‌ای به بازار، مدارس و مراکز درمانی صحنه.",
          images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["تخلیه فوری", "کمد دیواری عمیق", "آسانسور فعال", "پارکینگ بدون مزاحم", "کف سرامیک"],
          lat: "34.4830",
          lng: "47.6850",
          advisorName: "مشاور رستمی",
          advisorPhone: "09183381234",
          viewsCount: 310,
          inquiryCount: 28,
          status: "active"
        },
        {
          title: "زمین مسکونی ۲۵۰ متری موقعیت عالی در شهرک جانبازان صحنه",
          slug: "land-250m-janbazan-town-sahneh",
          transactionType: "buy",
          propertyType: "land",
          neighborhood: "شهرک جانبازان",
          address: "شهرستان صحنه، شهرک جانبازان، خیابان ایثار، قطعه ۴۲",
          priceTotal: "۲٬۷۵۰٬۰۰۰٬۰۰۰ تومان",
          pricePerMeter: "۱۱٬۰۰۰٬۰۰۰ تومان",
          rentMonthly: "",
          area: 250,
          bedrooms: 0,
          bathrooms: 0,
          floor: 0,
          totalFloors: 0,
          builtYear: 0,
          parking: false,
          elevator: false,
          storage: false,
          balcony: false,
          documentType: "سند تک‌برگ رسمی با نقشه UTM و پروانه ساخت",
          heatingCooling: "آماده برای انشعابات کامل",
          hasVirtualTour: false,
          featured: false,
          description: "زمین دو کله با بر ۱۰ متر در یکی از رو به رشدترین محله‌های شهر صحنه. مجوز ساخت ۴ طبقه روی پیلوت، دسترسی سریع به بلوار اصلی و ورودی شهر. آماده عقد قرارداد در دفتر املاک شیخی با استعلامات ثبتی روز.",
          images: [
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["دو بر", "سند ۶ دانگ آماده", "نقشه تفکیکی و UTM", "تراکم ساخت مجاز ۴ طبقه", "موقعیت سرمایه‌گذاری تضمینی"],
          lat: "34.4780",
          lng: "47.6940",
          advisorName: "مهندس بهزاد شیخی",
          advisorPhone: "09183381234",
          viewsCount: 220,
          inquiryCount: 19,
          status: "active"
        },
        {
          title: "باغ ویلای ۱۰۰۰ متری مثمر با سهمیه آب چاه در حومه صحنه",
          slug: "garden-villa-1000m-sahneh-suburb",
          transactionType: "buy",
          propertyType: "garden",
          neighborhood: "حومه صحنه (روستای سراب بیدسرخ)",
          address: "شهرستان صحنه، جاده قدیم، دشت سرسبز بیدسرخ",
          priceTotal: "۳٬۸۰۰٬۰۰۰٬۰۰۰ تومان",
          pricePerMeter: "۳٬۸۰۰٬۰۰۰ تومان",
          rentMonthly: "",
          area: 1000,
          bedrooms: 1,
          bathrooms: 1,
          floor: 1,
          totalFloors: 1,
          builtYear: 1400,
          parking: true,
          elevator: false,
          storage: true,
          balcony: true,
          documentType: "سند مادر مشاعی با قولنامه کد رهگیری‌دار و تایید دهیاری",
          heatingCooling: "شومینه و بخاری گازی",
          hasVirtualTour: true,
          featured: true,
          description: "باغ سرسبز با بیش از ۱۰۰ اصله درخت گردوی اصیل صحنه، سیب، زردآلو و گیلاس. بنای نقلی ۷۰ متری مبله با بالکن بزرگ رو به باغات، حقابه رسمی از چاه عمیق ۶ اینچ، استخر ذخیره آب و فنس‌کشی کامل با درب ماشین‌رو.",
          images: [
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["سهمیه آب کشاورزی منظم", "درختان گردو بارده چند ساله", "استخر اختصاصی", "برق مصرفی", "فنس‌کشی شده و امن"],
          lat: "34.4690",
          lng: "47.7120",
          advisorName: "مشاور کرمی",
          advisorPhone: "09183381234",
          viewsCount: 510,
          inquiryCount: 38,
          status: "active"
        },
        {
          title: "مغازه تجاری ۲۸ متری بر خیابان اصلی طالقانی صحنه",
          slug: "commercial-shop-28m-taleghani-sahneh",
          transactionType: "buy",
          propertyType: "commercial",
          neighborhood: "خیابان طالقانی",
          address: "شهرستان صحنه، خیابان طالقانی، جنب بانک سپه",
          priceTotal: "۴٬۲۰۰٬۰۰۰٬۰۰۰ تومان",
          pricePerMeter: "۱۵۰٬۰۰۰٬۰۰۰ تومان",
          rentMonthly: "",
          area: 28,
          bedrooms: 0,
          bathrooms: 1,
          floor: 1,
          totalFloors: 1,
          builtYear: 1395,
          parking: false,
          elevator: false,
          storage: false,
          balcony: false,
          documentType: "سند مالکیت و سرقفلی ۶ دانگ تجاری",
          heatingCooling: "اسپلیت گرما و سرما",
          hasVirtualTour: false,
          featured: false,
          description: "مغازه تجاری پاخور فوق‌العاده عالی در راسته اصلی بازار صحنه. بر ۴ متر، ارتفاع سقف ۴.۵ متر با امکان ایجاد بالکن نیم‌طبقه. دارای کرکره برقی، شیشه سکوریت، کنتورهای برق و آب تجاری مجزا و تلفن ثابت.",
          images: [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["کرکره برقی", "شیشه سکوریت", "امتیازات کامل تجاری", "پاخور بسیار بالا", "سند تجاری رسمی"],
          lat: "34.4848",
          lng: "47.6890",
          advisorName: "مهندس بهزاد شیخی",
          advisorPhone: "09183381234",
          viewsCount: 390,
          inquiryCount: 22,
          status: "active"
        },
        {
          title: "آپارتمان ۷۵ متری بازسازی شده فول در خیابان معلم صحنه",
          slug: "apartment-75m-moallem-sahneh",
          transactionType: "buy",
          propertyType: "apartment",
          neighborhood: "خیابان معلم",
          address: "شهرستان صحنه، خیابان معلم، کوچه شقایق ۳",
          priceTotal: "۱٬۸۵۰٬۰۰۰٬۰۰۰ تومان",
          pricePerMeter: "۲۴٬۶۰۰٬۰۰۰ تومان",
          rentMonthly: "",
          area: 75,
          bedrooms: 2,
          bathrooms: 1,
          floor: 1,
          totalFloors: 3,
          builtYear: 1392,
          parking: true,
          elevator: false,
          storage: true,
          balcony: true,
          documentType: "سند تک‌برگ با قابلیت دریافت وام مسکن",
          heatingCooling: "پکیج و کولر آبی",
          hasVirtualTour: false,
          featured: false,
          description: "واحد صفر تا صد بازسازی شده بسیار تمیز، کاغذ دیواری قابل شستشو، کابینت گلاس نو، کف پارکت لمینت، نقشه بدون پرتی و بسیار خوش‌چیدمان. قابلیت دریافت تا ۶۰۰ میلیون وام مسکن بانک مسکن صحنه.",
          images: [
            "https://images.unsplash.com/photo-1502005229762-ee1b2da97ba0?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["قابلیت دریافت وام", "پارکینگ اختصاصی", "کابینت نو", "کف لمینت", "همسایگان آرام"],
          lat: "34.4860",
          lng: "47.6840",
          advisorName: "مشاور رستمی",
          advisorPhone: "09183381234",
          viewsCount: 290,
          inquiryCount: 21,
          status: "active"
        },
        {
          title: "پیش‌فروش آپارتمان‌های لوکس ۱۳۵ متری برج مسکونی آریا صحنه",
          slug: "pre-sale-apartment-135m-aria-sahneh",
          transactionType: "pre-sale",
          propertyType: "apartment",
          neighborhood: "بلوار شهید بهشتی",
          address: "شهرستان صحنه، بلوار شهید بهشتی، جنب پارک معلم",
          priceTotal: "۴٬۱۰۰٬۰۰۰٬۰۰۰ تومان",
          pricePerMeter: "۳۰٬۳۰۰٬۰۰۰ تومان",
          rentMonthly: "",
          area: 135,
          bedrooms: 3,
          bathrooms: 2,
          floor: 4,
          totalFloors: 6,
          builtYear: 1404,
          parking: true,
          elevator: true,
          storage: true,
          balcony: true,
          documentType: "قرارداد رسمی پیش‌فروش با کد رهگیری و ثبت در دفترخانه",
          heatingCooling: "داکت اسپلیت مرکزی",
          hasVirtualTour: true,
          featured: true,
          description: "فرصت کم‌نظیر پیش‌خرید با شرایط پرداخت اقساطی شناور متناسب با پیشرفت پروژه. سازنده معتبر با رزومه درخشان در شهرستان صحنه و استان کرمانشاه. تحویل ۱۴ ماهه، مسترروم، لابی مجلل و دو لاین آسانسور.",
          images: [
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
          ],
          features: ["پرداخت اقساطی", "مستقیم از سازنده", "مستر روم", "آسانسور برانکاردبر", "تراس بزرگ باربیکیو"],
          lat: "34.4815",
          lng: "47.6895",
          advisorName: "مهندس بهزاد شیخی",
          advisorPhone: "09183381234",
          viewsCount: 740,
          inquiryCount: 52,
          status: "active"
        }
      ]);
    }

    // Check blog posts count
    const blogRes = await db.select({ count: sql<number>`count(*)` }).from(blogPosts);
    const blogCount = Number(blogRes[0]?.count || 0);

    if (blogCount === 0) {
      await db.insert(blogPosts).values([
        {
          title: "راهنمای جامع خرید خانه و آپارتمان در صحنه کرمانشاه (۱۴۰۳)",
          slug: "buy-house-sahneh-guide",
          summary: "نکات طلایی برای خریداران مسکن در شهرستان صحنه؛ از شناخت بهترین محله‌ها مانند دربند و فردوسی تا بررسی وضعیت اسناد ملکی و قیمت‌های روز.",
          content: `شهرستان صحنه به عنوان یکی از زیباترین، خوش‌آب‌وهواترین و امن‌ترین شهرستان‌های استان کرمانشاه و غرب کشور، مقصدی جذاب برای سکونت و سرمایه‌گذاری ملکی است. وجود سراب دیدنی صحنه، باغات سرسبز و چشمه‌های خروشان چهارفصل باعث شده تا تقاضا برای خرید ملک مسکونی و باغ ویلا در این شهر همواره در اوج باشد.

در خرید ملک در صحنه توجه به چند نکته ضروری است:
۱. وضعیت سند رسمی: همواره اولویت را به اسناد تک‌برگ ۶ دانگ بدهید. در شهرستان صحنه بخش عمده املاک شهری دارای اسناد رسمی معتبر هستند اما در برخی مناطق حاشیه‌ای ممکن است اسناد به صورت قولنامه‌ای یا وکالتی باشد که حتماً باید توسط مشاور حقوقی املاک شیخی استعلامات ثبتی آن چک شود.
۲. مناطق و محله‌های محبوب: خیابان فردوسی، بلوار امام، شهرک جانبازان و خیابان طالقانی از مراکز شهری درجه‌یک صحنه به شمار می‌روند. منطقه دربند و سراب صحنه نیز برای ویلا و خانه‌های باصفا بی‌رقیب است.
۳. استعلام تراکم شهرداری: پیش از خرید زمین یا خانه‌های کلنگی، از میزان تراکم مجاز ساخت و عقب‌نشینی‌های احتمالی طرح تفصیلی شهرداری صحنه آگاه شوید.
املاک شیخی با سابقه طولانی در بازار مسکن شهرستان صحنه، تمام فرآیند استعلام ثبتی، شهرداری و دارایی را به طور قانونی و شفاف برای شما انجام می‌دهد.`,
          category: "راهنمای خرید",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
          readTime: "۶ دقیقه",
          author: "مهندس بهزاد شیخی",
          publishedAt: "۱۴۰۳/۱۱/۱۵",
          featured: true,
          keywords: "خرید خانه در صحنه، قیمت آپارتمان صحنه، املاک شیخی صحنه، بهترین محله صحنه"
        },
        {
          title: "تحلیل روند قیمت مسکن و سرمایه‌گذاری باغ ویلا در صحنه",
          slug: "sahneh-real-estate-market-trends",
          summary: "بررسی رشد ارزش ملک در شهرستان صحنه در مقایسه با کرمانشاه و سایر شهرهای همجوار؛ چرا زمین و باغ در دربند صحنه گزینه‌ای پرسود است؟",
          content: `در سال‌های اخیر، روند مهاجرت معکوس از کلان‌شهرها به شهرهای خوش آب‌وهوا با طبیعت غنی شتاب گرفته است. صحنه به خاطر موقعیت جغرافیایی بی‌نظیر بین کرمانشاه و همدان و آب گوارا و فراوان، توجه ویژه سرمایه‌گذاران را به خود جلب کرده است.

باغ‌ویلاهای منطقه دربند، روستاهای بیدسرخ، بلوردی و حاشیه سراب صحنه به دلیل طبیعت کوهستانی و دسترسی عالی به جاده اصلی، بالاترین بازدهی سرمایه‌گذاری را ثبت کرده‌اند.
املاک شیخی به عنوان مرجع تخصصی معاملات ملکی در صحنه، فایل‌های اختصاصی بدون واسطه را با قیمت منصفانه و بررسی دقیق مدارک مالکیتی در اختیارتان قرار می‌دهد.`,
          category: "تحلیل بازار",
          image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
          readTime: "۴ دقیقه",
          author: "مشاور ارشد رستمی",
          publishedAt: "۱۴۰۳/۱۱/۰۸",
          featured: true,
          keywords: "سرمایه گذاری مسکن صحنه، باغ ویلا صحنه، دربند صحنه، املاک شیخی"
        },
        {
          title: "قوانین رهن و اجاره در سال جدید؛ حقوق مستأجر و موجر در صحنه",
          slug: "rental-laws-rights-sahneh",
          summary: "مهم‌ترین نکات حقوقی انعقاد قرارداد اجاره در املاک شیخی، نحوه تمدید قرارداد، مصوبات سقف افزایش اجاره‌بها و ثبت در سامانه کاتب و خودنویس.",
          content: `اجاره ملک یکی از حساس‌ترین روابط مالی و حقوقی میان شهروندان است. جهت جلوگیری از هرگونه اختلاف حقوقی و تضییع حقوق طرفین، عقد قرارداد در بنگاه‌های دارای مجوز رسمی و پروانه تخصصی الزامی است.

دفتر مشاور املاک شیخی مجهز به سامانه رسمی صدور کد رهگیری کشوری (کاتب و خودنویس) بوده و تمام قراردادها را بر اساس آخرین قوانین مدنی و روابط موجر و مستأجر سال ۱۳۷۶ و اصلاحات بعدی تنظیم می‌کند.
همواره قبل از پرداخت ودیعه، هویت مالک و سند ملک را مشاهده و صورت‌جلسه تحویل ملک با ذکر جزئیات تجهیزات را امضا نمایید.`,
          category: "حقوقی و قرارداد",
          image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
          readTime: "۵ دقیقه",
          author: "مهندس بهزاد شیخی",
          publishedAt: "۱۴۰۳/۱۰/۲۹",
          featured: false,
          keywords: "رهن و اجاره صحنه، حقوق مستاجر صحنه، قولنامه اجاره، املاک شیخی صحنه"
        }
      ]);
    }

    // Default site settings
    const settingsRes = await db.select({ count: sql<number>`count(*)` }).from(siteSettings);
    if (Number(settingsRes[0]?.count || 0) === 0) {
      await db.insert(siteSettings).values([
        { key: "site_title", value: "املاک شیخی صحنه | مرجع تخصصی خرید، فروش، رهن و اجاره در صحنه کرمانشاه" },
        { key: "site_description", value: "املاک شیخی در شهرستان صحنه؛ مرجع تخصصی خرید، فروش، رهن و اجاره آپارتمان، خانه و زمین در صحنه کرمانشاه. مشاوره رایگان." },
        { key: "phone_primary", value: "09183381234" },
        { key: "phone_secondary", value: "08383225566" },
        { key: "office_address", value: "کرمانشاه، شهرستان صحنه، خیابان فردوسی، نرسیده به میدان مولوی، پلاک ۴۲، املاک شیخی" },
        { key: "working_hours", value: "شنبه تا پنجشنبه: ۸:۳۰ صبح الی ۱۳:۳۰ و ۱۶:۰۰ الی ۲۱:۰۰" },
        { key: "primary_color", value: "#047857" }, // Emerald 700
        { key: "accent_gold", value: "#d97706" }, // Amber 600
        { key: "whatsapp_number", value: "989183381234" },
        { key: "telegram_handle", value: "amlak_sheikhi_sahneh" },
        { key: "instagram_handle", value: "amlak.sheikhi.sahneh" },
      ]);
    }

    // Audit logs
    const auditRes = await db.select({ count: sql<number>`count(*)` }).from(auditLogs);
    if (Number(auditRes[0]?.count || 0) === 0) {
      await db.insert(auditLogs).values([
        { action: "راه‌اندازی سامانه", details: "پایگاه داده و ماژول‌های املاک شیخی با موفقیت در صحنه کانفیگ شدند.", userRole: "مدیر کل سامانه" },
        { action: "فعال‌سازی سئو محلی", details: "اسکیما مارک‌آپ RealEstateAgent و متاتگ‌های صحنه ثبت شدند.", userRole: "سئو مستر" }
      ]);
    }

    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}
