import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Shell } from "@/components/Shell";

const SITE_TITLE = "بدون تسويق، ثروتك المستقبلية في خطر";
const SITE_DESCRIPTION =
  "تعلَّم بناء نظام تسويق رقمي متكامل من الصفر — من جذب العملاء وحتى تحقيق المبيعات. 9 وحدات تعليمية، فيديوهات، قوالب جاهزة، ودراسات حالة حقيقية.";

export const metadata: Metadata = {
  metadataBase: new URL("https://marketing-academy.vercel.app"),
  title: {
    default: SITE_TITLE,
    template: `%s | أكاديمية التسويق`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "تسويق رقمي",
    "تسويق إلكتروني",
    "كورس تسويق",
    "أكاديمية التسويق",
    "Lead Generation",
    "Content Marketing",
    "Email Marketing",
    "Paid Ads",
    "Personal Branding",
    "KPIs",
    "تحليل المنافسين",
    "صفحات الهبوط",
    "العلامة الشخصية",
  ],
  authors: [{ name: "أكاديمية التسويق" }],
  creator: "أكاديمية التسويق",
  publisher: "أكاديمية التسويق",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "/",
    siteName: "أكاديمية التسويق",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%2310b981'/%3E%3Cpath d='M58 22c16 0 24 8 24 24-12 2-20 8-28 20l-12-12c12-8 18-16 16-32z' fill='%23000'/%3E%3C/svg%3E",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#08090c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
