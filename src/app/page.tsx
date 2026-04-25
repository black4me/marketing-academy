import Link from "next/link";
import { MODULES, TEMPLATES, CASE_STUDIES } from "@/lib/data";
import { Icon } from "@/components/Icons";
import {
  ModuleCard,
  FunnelVisual,
  BigSearchTrigger,
  ContinueLearning,
} from "@/components/Cards";

export default function HomePage() {
  const featured = MODULES.slice(0, 3);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl gradient-mesh border border-white/5 p-8 md:p-12">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] mb-5">
            <Icon name="spark" className="w-3.5 h-3.5" />
            نظام تعليمي متكامل
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight tracking-tight">
            بدون تسويق، ثروتك المستقبلية في خطر
          </h1>
          <p className="mt-4 text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
            تعلَّم بناء نظام تسويق رقمي متكامل من الصفر — من جذب العملاء وحتى تحقيق المبيعات.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href={`/module/${MODULES[0].slug}`}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition shadow-lg shadow-emerald-500/20"
            >
              ابدأ التعلم
            </Link>
            <Link
              href="/templates"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition"
            >
              استكشف القوالب
            </Link>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <BigSearchTrigger />

      {/* Continue Learning (only if any) */}
      <ContinueLearning modules={MODULES} />

      {/* Modules grid */}
      <section>
        <div className="mb-5 px-1">
          <h2 className="text-xl md:text-2xl font-bold text-white">الوحدات التعليمية</h2>
          <p className="text-zinc-500 text-sm mt-1">9 وحدات شاملة لبناء نظامك التسويقي</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m) => <ModuleCard key={m.id} module={m} />)}
        </div>
      </section>

      {/* Funnel + Quick links */}
      <section className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-3xl border border-white/5 bg-white/[0.02] p-7">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-white">القمع التسويقي</h2>
            <p className="text-zinc-500 text-sm mt-1">رحلة العميل من الزائر إلى المُروِّج</p>
          </div>
          <FunnelVisual />
        </div>
        <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] p-7">
          <div className="mb-5">
            <h2 className="text-xl md:text-2xl font-bold text-white">موارد سريعة</h2>
            <p className="text-zinc-500 text-sm mt-1">أدوات وقوالب جاهزة</p>
          </div>
          <div className="space-y-2.5">
            <QuickLink href="/templates" icon="doc" label="القوالب الجاهزة" desc={`${TEMPLATES.length} قوالب احترافية`} />
            <QuickLink href="/cases" icon="case" label="دراسات الحالة" desc={`${CASE_STUDIES.length} حالات حقيقية`} />
          </div>
        </div>
      </section>

      {/* Featured topics */}
      <section>
        <div className="mb-5 px-1">
          <h2 className="text-xl md:text-2xl font-bold text-white">مواضيع مميزة</h2>
          <p className="text-zinc-500 text-sm mt-1">ابدأ بهذه الوحدات إذا كنت جديداً</p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((m) => (
            <Link
              key={m.id}
              href={`/module/${m.slug}`}
              className="text-right group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-6 card-hover block"
            >
              <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${m.bg} ${m.accent} text-[11px] mb-3`}>
                <Icon name={m.icon} className="w-3.5 h-3.5" />
                {m.title}
              </div>
              <div className="text-white font-semibold text-base mb-1">{m.lessons[0]?.title || m.subtitle}</div>
              <div className="text-zinc-500 text-xs leading-relaxed">{m.lessons[0]?.summary || ""}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function QuickLink({ href, icon, label, desc }: { href: string; icon: string; label: string; desc: string }) {
  return (
    <Link
      href={href}
      className="w-full text-right flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition"
    >
      <div className="w-10 h-10 rounded-lg bg-white/5 grid place-items-center text-zinc-300">
        <Icon name={icon} />
      </div>
      <div className="flex-1">
        <div className="text-white text-sm font-medium">{label}</div>
        <div className="text-zinc-500 text-xs">{desc}</div>
      </div>
      <Icon name="arrow" className="w-4 h-4 text-zinc-600 rotate-180" />
    </Link>
  );
}
