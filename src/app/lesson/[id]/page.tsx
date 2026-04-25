import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MODULES, getLessonById } from "@/lib/data";
import { Icon } from "@/components/Icons";
import { LessonCard } from "@/components/Cards";

export function generateStaticParams() {
  return MODULES.flatMap((m) => m.lessons.map((l) => ({ id: l.id })));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const r = getLessonById(id);
  if (!r) return { title: "الدرس غير موجود" };
  return {
    title: r.lesson.title,
    description: r.lesson.summary,
    openGraph: { title: r.lesson.title, description: r.lesson.summary, type: "article" },
    alternates: { canonical: `/lesson/${id}` },
  };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const r = getLessonById(id);
  if (!r) notFound();
  const { module: m, lesson } = r;

  // Find prev / next within module
  const idx = m.lessons.findIndex((l) => l.id === lesson.id);
  const prev = idx > 0 ? m.lessons[idx - 1] : null;
  const next = idx < m.lessons.length - 1 ? m.lessons[idx + 1] : null;

  return (
    <div className="space-y-7 fade-in">
      <div className="flex items-center justify-between gap-4">
        <Link href={`/module/${m.slug}`} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition">
          <Icon name="arrow" className="w-4 h-4" />
          العودة لوحدة: {m.title}
        </Link>
      </div>

      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl ${m.bg} ${m.accent} grid place-items-center shrink-0`}>
          <Icon name={m.icon} className="w-5 h-5" />
        </div>
        <div>
          <div className="text-zinc-500 text-xs mb-1">{m.title}</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{lesson.title}</h1>
          <p className="text-zinc-400 mt-1 text-sm">{lesson.summary}</p>
        </div>
      </div>

      {/* Single open lesson */}
      <div className="space-y-3">
        <LessonCard lesson={lesson} accent={m.accent} />
      </div>

      {/* Prev / Next */}
      <div className="grid sm:grid-cols-2 gap-3 pt-4">
        {prev ? (
          <Link href={`/lesson/${prev.id}`} className="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-4 card-hover">
            <div className="text-zinc-500 text-[11px] mb-1">الدرس السابق</div>
            <div className="text-white text-sm font-semibold">← {prev.title}</div>
          </Link>
        ) : <div />}
        {next ? (
          <Link href={`/lesson/${next.id}`} className="rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-4 card-hover text-left">
            <div className="text-zinc-500 text-[11px] mb-1">الدرس التالي</div>
            <div className="text-white text-sm font-semibold">{next.title} →</div>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
