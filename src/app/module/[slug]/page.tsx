import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES, getModuleBySlug } from "@/lib/data";
import { Icon } from "@/components/Icons";
import { ModuleHeader, ModuleTabs } from "@/components/Cards";

// Static generation for all module slugs (best for Vercel SEO)
export function generateStaticParams() {
  return MODULES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const m = getModuleBySlug(slug);
  if (!m) return { title: "الوحدة غير موجودة" };
  return {
    title: m.title,
    description: m.subtitle,
    openGraph: { title: m.title, description: m.subtitle, type: "article" },
    alternates: { canonical: `/module/${m.slug}` },
  };
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const m = getModuleBySlug(slug);
  if (!m) notFound();

  return (
    <div className="space-y-7 fade-in">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition">
        <Icon name="arrow" className="w-4 h-4" />
        العودة للرئيسية
      </Link>

      <ModuleHeader module={m} />
      <ModuleTabs module={m} />
    </div>
  );
}
