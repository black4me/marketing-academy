import type { Metadata } from "next";
import Link from "next/link";
import { CASE_STUDIES } from "@/lib/data";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "دراسات حالة",
  description: "نتائج حقيقية من تطبيق استراتيجيات التسويق الرقمي: متاجر إلكترونية، مدرّبين، ومطاعم محلية.",
  alternates: { canonical: "/cases" },
};

export default function CasesPage() {
  return (
    <div className="space-y-7 fade-in">
      <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm">
        <Icon name="arrow" className="w-4 h-4" /> العودة
      </Link>
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-white">دراسات حالة</h1>
        <p className="text-zinc-400 mt-1 text-sm">نتائج حقيقية من تطبيق استراتيجيات التسويق الرقمي</p>
      </header>

      <div className="space-y-4">
        {CASE_STUDIES.map((cs) => (
          <div key={cs.id} className={`rounded-2xl border border-white/10 bg-gradient-to-br ${cs.color} p-6`}>
            <div className="text-white font-bold text-lg mb-4">{cs.title}</div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-rose-500/5 border border-rose-500/15 p-4">
                <div className="text-rose-400 text-[11px] font-semibold mb-1">قبل</div>
                <div className="text-white text-sm">{cs.before}</div>
              </div>
              <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                <div className="text-emerald-400 text-[11px] font-semibold mb-1">بعد</div>
                <div className="text-white text-sm">{cs.after}</div>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5"><Icon name="spark" className="w-3.5 h-3.5 text-emerald-400" />{cs.strategy}</span>
              <span className="text-zinc-600">•</span>
              <span>⏱ {cs.duration}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
