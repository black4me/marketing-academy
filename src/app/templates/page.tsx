import type { Metadata } from "next";
import { TEMPLATES } from "@/lib/data";
import { TemplateCard } from "@/components/Cards";

export const metadata: Metadata = {
  title: "القوالب الجاهزة",
  description: "قوالب احترافية جاهزة للاستخدام في حملاتك التسويقية: صفحة هبوط، تقويم محتوى، سلاسل بريدية، إعلانات Meta، تحليل منافسين، وخطة شهرية.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <div className="space-y-7 fade-in">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-white">القوالب الجاهزة</h1>
        <p className="text-zinc-400 mt-1 text-sm">قوالب احترافية جاهزة للاستخدام في حملاتك التسويقية</p>
      </header>
      <div className="space-y-3">
        {TEMPLATES.map((t) => <TemplateCard key={t.id} t={t} expanded />)}
      </div>
    </div>
  );
}
