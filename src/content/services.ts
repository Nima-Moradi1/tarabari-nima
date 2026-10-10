export const services = [
  { id: "air", title: "حمل هوایی", number: "۰۱", description: "هماهنگی مسیرهای هوایی برای محموله‌هایی که زمان در آن‌ها اهمیت دارد.", glyph: "✈" },
  { id: "sea", title: "حمل دریایی", number: "۰۲", description: "برنامه‌ریزی کانتینری و خرده‌بار با توجه به مسیر و ظرفیت بندری.", glyph: "◈" },
  { id: "customs", title: "امور گمرکی", number: "۰۳", description: "آشنایی با اسناد، طبقه‌بندی کالا و مراحل تشریفات گمرکی.", glyph: "▧" },
  { id: "warehousing", title: "انبارداری و لجستیک", number: "۰۴", description: "از دریافت و تفکیک تا بسته‌بندی و هماهنگی توزیع.", glyph: "▤" },
  { id: "project", title: "محموله‌های پروژه‌ای", number: "۰۵", description: "مسیرسنجی و هماهنگی حمل بارهای سنگین و غیرمتعارف.", glyph: "◇" },
  { id: "road", title: "حمل جاده‌ای", number: "۰۶", description: "ارتباط میان شهرها، پایانه‌ها و بنادر در یک مسیر برنامه‌ریزی‌شده.", glyph: "↗" },
] as const;
export const solutions = [
  { id: "consolidation", title: "تجمیع محموله‌ها", description: "ترکیب بارهای سازگار برای استفاده بهتر از ظرفیت مسیر." },
  { id: "crossdock", title: "کراس‌داک و انتقال مستقیم", description: "کاهش توقف انبار با برنامه‌ریزی جابه‌جایی میان وسیله‌ها." },
  { id: "compliance", title: "مشاوره اسناد و انطباق", description: "مرور مدارک مورد نیاز متناسب با نوع کالا و مسیر." },
  { id: "optimization", title: "بهینه‌سازی زنجیره تأمین", description: "مقایسه گزینه‌های حمل و نقاط انتقال در مسیر." },
  { id: "review", title: "گزارش دوره‌ای", description: "الگوی پیشنهادی برای مرور وضعیت و تصمیم‌های مسیر." },
  { id: "insurance", title: "بیمه محموله (صرفاً معرفی)", description: "آشنایی با موضوع پوشش ریسک؛ شرایط واقعی نیازمند بررسی است." },
] as const;
