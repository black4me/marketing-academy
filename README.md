# أكاديمية التسويق — Marketing Academy

> منصّة تعليمية رقمية متكاملة للتسويق الرقمي باللغة العربية، مبنية بـ Next.js 15 (App Router) ومُحسَّنة للنشر على Vercel.

**العنوان:** بدون تسويق، ثروتك المستقبلية في خطر  
**الوصف:** تعلَّم بناء نظام تسويق رقمي متكامل من الصفر — من جذب العملاء وحتى تحقيق المبيعات. 9 وحدات تعليمية، فيديوهات، قوالب جاهزة، ودراسات حالة حقيقية.

---

## 🚀 المميزات

- **Next.js 15 (App Router)** + React 19 + TypeScript 5.7
- **Tailwind CSS 4** (PostCSS) — تصميم داكن premium
- **Static Generation** لكل الصفحات (أداء قصوى على Vercel CDN)
- **SEO عربي كامل**: metadata + Open Graph + sitemap.xml + robots.txt
- **RTL أصيل** على مستوى `<html dir="rtl" lang="ar">`
- **تتبّع التقدم** عبر `localStorage`
- **بحث ذكي** (⌘K) مع scoring في كل المحتوى
- **9 وحدات + 28 درس + 8 فيديوهات YouTube + 6 قوالب قابلة للتنزيل + 3 دراسات حالة**
- **Responsive كامل** (موبايل / تابلت / ديسكتوب)
- **Headers أمنية** (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- **WebP/AVIF** عبر Next/Image

---

## 📁 هيكل المشروع

```
nextjs-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← RTL + metadata + fonts
│   │   ├── globals.css             ← Tailwind v4 + theme
│   │   ├── page.tsx                ← الصفحة الرئيسية (Dashboard)
│   │   ├── not-found.tsx           ← صفحة 404
│   │   ├── sitemap.ts              ← /sitemap.xml ديناميكي
│   │   ├── robots.ts               ← /robots.txt
│   │   ├── module/[slug]/page.tsx  ← صفحة الوحدة
│   │   ├── lesson/[id]/page.tsx    ← صفحة الدرس
│   │   ├── templates/page.tsx      ← القوالب
│   │   └── cases/page.tsx          ← دراسات الحالة
│   ├── components/
│   │   ├── Shell.tsx               ← Sidebar + Search overlay + mobile nav
│   │   ├── ProgressProvider.tsx    ← Context لتتبّع التقدم
│   │   ├── Cards.tsx               ← ModuleCard, LessonCard, TemplateCard, FunnelVisual
│   │   └── Icons.tsx               ← مكتبة SVG icons
│   └── lib/
│       └── data.ts                 ← قاعدة بيانات الوحدات + Search index
├── package.json
├── next.config.mjs                 ← Headers أمنية + image optimization
├── postcss.config.mjs              ← Tailwind v4
├── tsconfig.json                   ← Path alias @/*
└── README.md
```

---

## 🧪 التشغيل المحلي

```bash
cd nextjs-app
npm install
npm run dev
# افتح http://localhost:3000
```

البناء للإنتاج:
```bash
npm run build
npm start
```

---

## 🌐 النشر على Vercel — خطوة بخطوة

### الطريقة الأولى: عبر GitHub (موصى بها)

1. **أنشئ مستودع على GitHub:**
   ```bash
   cd nextjs-app
   git init
   git add .
   git commit -m "Initial commit — Marketing Academy"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/marketing-academy.git
   git push -u origin main
   ```

2. **افتح Vercel:**
   - اذهب إلى https://vercel.com/new
   - اضغط **Import Git Repository**
   - اختر مستودعك (`marketing-academy`)

3. **إعدادات المشروع:**
   - **Project Name:** `marketing-academy`
   - **Framework Preset:** Next.js (تلقائي)
   - **Root Directory:** `./` (أو `nextjs-app` إذا رفعت المجلد الأب)
   - **Build Command:** `next build` (تلقائي)
   - **Output Directory:** `.next` (تلقائي)

4. **متغيرات البيئة (اختياري):**
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.vercel.app`
   (يُستخدم في sitemap و canonical URLs)

5. **اضغط Deploy** — انتظر 1-2 دقيقة. ستحصل على رابط مباشر.

---

### الطريقة الثانية: عبر Vercel CLI (الأسرع)

```bash
# تثبيت Vercel CLI
npm i -g vercel

# داخل مجلد nextjs-app
cd nextjs-app
vercel

# للنشر إلى production مباشرة:
vercel --prod
```

ستُسأل بضعة أسئلة:
- **Set up and deploy?** → Yes
- **Which scope?** → اختر حسابك (jasim-mohammeds-projects)
- **Link to existing project?** → No
- **Project name?** → `marketing-academy`
- **Directory?** → `./`

---

### الطريقة الثالثة: السحب والإفلات

1. ابنِ المشروع محلياً: `npm run build`
2. اذهب إلى https://vercel.com/new
3. اسحب مجلد `nextjs-app` كاملاً إلى المربع
4. Vercel ستلتقط الإعدادات تلقائياً

---

## 🔧 رابط النشر السريع لحسابك

استخدم هذا الرابط لاستيراد المشروع مباشرة بعد رفعه على GitHub:

```
https://vercel.com/new/jasim-mohammeds-projects?repository-url=https://github.com/YOUR_USERNAME/marketing-academy
```

استبدل `YOUR_USERNAME` باسم مستخدم GitHub.

---

## 🌍 ربط نطاق مخصص

بعد النشر، في لوحة Vercel:
1. افتح المشروع → **Settings** → **Domains**
2. أضف نطاقك (مثل `academy.example.com`)
3. اتبع تعليمات DNS (CNAME → `cname.vercel-dns.com`)
4. SSL يُفعَّل تلقائياً خلال دقائق

---

## 📊 SEO Metadata

- **Title:** بدون تسويق، ثروتك المستقبلية في خطر
- **Description:** تعلَّم بناء نظام تسويق رقمي متكامل من الصفر — من جذب العملاء وحتى تحقيق المبيعات. 9 وحدات تعليمية، فيديوهات، قوالب جاهزة، ودراسات حالة حقيقية.
- **Locale:** `ar_AR`
- **Sitemap:** `/sitemap.xml` (يولَّد ديناميكياً لكل وحدة ودرس)
- **Robots:** `/robots.txt` (يسمح للجميع)
- **Open Graph + Twitter Cards** على كل صفحة

---

## 🛡️ Headers أمنية مُفعَّلة

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
```

---

## 📝 الترخيص

MIT — استخدمه بحرية لمشروعك.
