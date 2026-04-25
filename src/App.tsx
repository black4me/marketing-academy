import { useEffect, useMemo, useState, type ReactNode } from "react";
import { MODULES, TEMPLATES, CASE_STUDIES, searchAll, type Module, type Lesson, type Template, type SearchHit } from "./data";
import { Icon } from "./components/Icons";

// ───────────────────────── Types ─────────────────────────
type Route =
  | { name: "home" }
  | { name: "module"; moduleId: string }
  | { name: "templates" }
  | { name: "cases" };

// ───────────────────────── Progress hook ─────────────────────────
function useProgress() {
  const [done, setDone] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(localStorage.getItem("akademia_progress") || "{}");
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("akademia_progress", JSON.stringify(done));
    } catch {}
  }, [done]);
  const toggle = (id: string) => setDone((d) => ({ ...d, [id]: !d[id] }));
  const moduleProgress = (m: Module) => {
    if (m.lessons.length === 0) return 0;
    const c = m.lessons.filter((l) => done[l.id]).length;
    return Math.round((c / m.lessons.length) * 100);
  };
  const overall = useMemo(() => {
    const total = MODULES.reduce((s, m) => s + m.lessons.length, 0);
    const c = Object.values(done).filter(Boolean).length;
    return total ? Math.round((c / total) * 100) : 0;
  }, [done]);
  return { done, toggle, moduleProgress, overall };
}

// ───────────────────────── Sidebar ─────────────────────────
function Sidebar({
  route,
  go,
  openSearch,
  progress,
  onClose,
}: {
  route: Route;
  go: (r: Route) => void;
  openSearch: () => void;
  progress: ReturnType<typeof useProgress>;
  onClose?: () => void;
}) {
  const isActive = (r: Route) =>
    r.name === route.name && (r.name !== "module" || (route.name === "module" && r.moduleId === route.moduleId));

  const NavItem = ({ r, label, icon, badge }: { r: Route; label: string; icon: string; badge?: string }) => (
    <button
      onClick={() => {
        go(r);
        onClose?.();
      }}
      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
        isActive(r)
          ? "bg-white/[0.06] text-white border border-white/10"
          : "text-zinc-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
      }`}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <span className={isActive(r) ? "text-white" : "text-zinc-500"}>
          <Icon name={icon} className="w-[18px] h-[18px]" />
        </span>
        <span className="truncate">{label}</span>
      </div>
      {badge != null && <span className="num text-[11px] text-zinc-500">{badge}</span>}
    </button>
  );

  return (
    <aside className="h-full flex flex-col bg-[#0b0d12] border-l border-white/5 w-full">
      {/* Brand */}
      <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 grid place-items-center text-black shadow-lg shadow-emerald-500/30">
            <Icon name="rocket" className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold text-white">أكاديمية التسويق</div>
            <div className="text-[11px] text-zinc-500">نظام تعليمي متكامل</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-zinc-400 hover:text-white p-1">
            <Icon name="x" />
          </button>
        )}
      </div>

      {/* Search trigger */}
      <div className="px-4 pb-4">
        <button
          onClick={openSearch}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/15 transition"
        >
          <span className="flex items-center gap-2 text-[13px]">
            <Icon name="search" className="w-4 h-4" />
            بحث سريع...
          </span>
          <span className="kbd num">⌘K</span>
        </button>
      </div>

      {/* Nav scroll */}
      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        <NavItem r={{ name: "home" }} label="الرئيسية" icon="home" />

        <div className="pt-4 pb-1.5 px-3 text-[11px] uppercase tracking-wider text-zinc-600">الوحدات التعليمية</div>
        {MODULES.map((m) => (
          <NavItem
            key={m.id}
            r={{ name: "module", moduleId: m.id }}
            label={m.title}
            icon={m.icon}
            badge={`${progress.moduleProgress(m)}%`}
          />
        ))}

        <div className="pt-4 pb-1.5 px-3 text-[11px] uppercase tracking-wider text-zinc-600">أدوات</div>
        <NavItem r={{ name: "templates" }} label="القوالب الجاهزة" icon="doc" />
        <NavItem r={{ name: "cases" }} label="دراسات حالة" icon="case" />
      </nav>

      {/* Overall progress */}
      <div className="px-5 py-4 border-t border-white/5">
        <div className="flex items-center justify-between mb-2 text-[12px]">
          <span className="text-zinc-500">التقدم الكلي</span>
          <span className="num text-emerald-400 font-semibold">{progress.overall}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all"
            style={{ width: `${progress.overall}%` }}
          />
        </div>
      </div>
    </aside>
  );
}

// ───────────────────────── Search Overlay ─────────────────────────
function SearchOverlay({ open, onClose, go }: { open: boolean; onClose: () => void; go: (r: Route) => void }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchAll(q), [q]);

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open, onClose]);

  if (!open) return null;

  const grouped = results.reduce<Record<string, SearchHit[]>>((acc, r) => {
    (acc[r.type] ||= []).push(r);
    return acc;
  }, {});

  const labels: Record<string, string> = {
    lesson: "📘 دروس",
    module: "🧩 وحدات",
    video: "🎬 فيديوهات",
    template: "📄 قوالب",
    tool: "🛠️ أدوات",
    case: "🏆 دراسات حالة",
  };

  const handleClick = (h: SearchHit) => {
    if (h.type === "module" || h.type === "lesson" || h.type === "video" || h.type === "template" || h.type === "tool") {
      if (h.moduleId) go({ name: "module", moduleId: h.moduleId });
    } else if (h.type === "case") {
      go({ name: "cases" });
    }
    if (h.type === "tool" && h.url) window.open(h.url, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4 fade-in" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#0d1016] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
          <Icon name="search" className="w-5 h-5 text-zinc-400" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن أي موضوع... مثل: التسويق بالمحتوى، الإعلانات، القمع التسويقي"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-zinc-600 text-[15px]"
          />
          <span className="kbd">Esc</span>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {!q && (
            <div className="p-6 text-center text-zinc-500 text-sm">
              اكتب كلمة للبدء — جرّب: <span className="text-zinc-300">"المحتوى"</span> أو <span className="text-zinc-300">"البريد"</span> أو <span className="text-zinc-300">"KPI"</span>
            </div>
          )}
          {q && results.length === 0 && (
            <div className="p-6 text-center text-zinc-500 text-sm">لا نتائج لـ "{q}"</div>
          )}
          {q && Object.keys(grouped).map((type) => (
            <div key={type} className="px-2 py-2">
              <div className="px-3 py-1.5 text-[11px] text-zinc-500 uppercase tracking-wider">{labels[type]}</div>
              {grouped[type].slice(0, 6).map((h) => (
                <button
                  key={`${h.type}-${h.id}`}
                  onClick={() => handleClick(h)}
                  className="w-full text-right px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition flex items-start justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-white text-sm font-medium truncate">{h.title}</div>
                    {h.subtitle && <div className="text-zinc-500 text-xs truncate mt-0.5">{h.subtitle}</div>}
                    {h.moduleTitle && h.type !== "module" && (
                      <div className="text-emerald-500/70 text-[10.5px] mt-1">في: {h.moduleTitle}</div>
                    )}
                  </div>
                  <Icon name="arrow" className="w-4 h-4 text-zinc-600 group-hover:text-white transition rotate-180" />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ───────────────────────── Funnel Visual ─────────────────────────
function FunnelVisual() {
  const stages = [
    { label: "TOFU — الوعي", desc: "محتوى عضوي + إعلانات ترويج", w: "100%", color: "from-sky-500/30 to-sky-500/10", text: "text-sky-300" },
    { label: "MOFU — الاهتمام", desc: "Lead Magnet + سلسلة بريدية", w: "75%", color: "from-violet-500/30 to-violet-500/10", text: "text-violet-300" },
    { label: "BOFU — القرار", desc: "عرض + Webinar + ضمان", w: "50%", color: "from-pink-500/30 to-pink-500/10", text: "text-pink-300" },
    { label: "العميل", desc: "Onboarding + Upsell", w: "30%", color: "from-emerald-500/30 to-emerald-500/10", text: "text-emerald-300" },
  ];
  return (
    <div className="space-y-2.5">
      {stages.map((s, i) => (
        <div key={i} className="flex justify-center">
          <div
            className={`relative rounded-xl bg-gradient-to-br ${s.color} border border-white/10 px-5 py-3 text-center transition hover:border-white/20`}
            style={{ width: s.w }}
          >
            <div className={`text-xs font-semibold ${s.text}`}>{s.label}</div>
            <div className="text-[11px] text-zinc-400 mt-0.5">{s.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ───────────────────────── Dashboard ─────────────────────────
function Dashboard({ go, openSearch, progress }: { go: (r: Route) => void; openSearch: () => void; progress: ReturnType<typeof useProgress> }) {
  const continueLearning = MODULES.filter((m) => progress.moduleProgress(m) > 0 && progress.moduleProgress(m) < 100).slice(0, 3);
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
            <button
              onClick={() => go({ name: "module", moduleId: MODULES[0].id })}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition shadow-lg shadow-emerald-500/20"
            >
              ابدأ التعلم
            </button>
            <button
              onClick={() => go({ name: "templates" })}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium transition"
            >
              استكشف القوالب
            </button>
          </div>
        </div>
      </div>

      {/* Big search */}
      <button
        onClick={openSearch}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] transition group"
      >
        <span className="flex items-center gap-3 text-zinc-400 group-hover:text-white text-[14px]">
          <Icon name="search" className="w-5 h-5" />
          ابحث عن أي موضوع... مثل: التسويق بالمحتوى، الإعلانات، القمع التسويقي
        </span>
        <span className="kbd num hidden sm:inline-flex">⌘K</span>
      </button>

      {/* Continue learning */}
      {continueLearning.length > 0 && (
        <section>
          <SectionHeader title="تابع التعلّم" subtitle="استكمل من حيث توقفت" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {continueLearning.map((m) => (
              <ModuleCard key={m.id} module={m} progressPct={progress.moduleProgress(m)} onClick={() => go({ name: "module", moduleId: m.id })} />
            ))}
          </div>
        </section>
      )}

      {/* Modules grid */}
      <section>
        <SectionHeader title="الوحدات التعليمية" subtitle="9 وحدات شاملة لبناء نظامك التسويقي" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES.map((m) => (
            <ModuleCard key={m.id} module={m} progressPct={progress.moduleProgress(m)} onClick={() => go({ name: "module", moduleId: m.id })} />
          ))}
        </div>
      </section>

      {/* Funnel + Featured */}
      <section className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-3xl border border-white/5 bg-white/[0.02] p-7">
          <SectionHeader title="القمع التسويقي" subtitle="رحلة العميل من الزائر إلى المُروِّج" inset />
          <div className="mt-2"><FunnelVisual /></div>
        </div>
        <div className="lg:col-span-2 rounded-3xl border border-white/5 bg-white/[0.02] p-7">
          <SectionHeader title="موارد سريعة" subtitle="أدوات وقوالب جاهزة" inset />
          <div className="space-y-2.5 mt-3">
            <QuickLink icon="doc" label="القوالب الجاهزة" desc={`${TEMPLATES.length} قوالب احترافية`} onClick={() => go({ name: "templates" })} />
            <QuickLink icon="case" label="دراسات الحالة" desc={`${CASE_STUDIES.length} حالات حقيقية`} onClick={() => go({ name: "cases" })} />
            <QuickLink icon="search" label="البحث الذكي" desc="ابحث في كل المنصة" onClick={openSearch} />
          </div>
        </div>
      </section>

      <FeaturedTopics modules={featured} go={go} />
    </div>
  );
}

function SectionHeader({ title, subtitle, inset }: { title: string; subtitle?: string; inset?: boolean }) {
  return (
    <div className={`mb-5 ${inset ? "" : "px-1"}`}>
      <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      {subtitle && <p className="text-zinc-500 text-sm mt-1">{subtitle}</p>}
    </div>
  );
}

function ModuleCard({ module: m, progressPct, onClick }: { module: Module; progressPct: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-right group relative overflow-hidden rounded-2xl border ${m.border} bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 card-hover w-full`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${m.bg} ${m.accent} grid place-items-center`}>
          <Icon name={m.icon} />
        </div>
        <span className="num text-[11px] text-zinc-500">{progressPct}%</span>
      </div>
      <div className="text-white font-semibold mb-1 text-[15px]">{m.title}</div>
      <div className="text-zinc-500 text-xs leading-relaxed mb-4">{m.subtitle}</div>
      <div className="flex items-center justify-between text-[11px] text-zinc-500">
        <span>{m.lessons.length} دروس</span>
        <div className="flex-1 mx-3 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className={`h-full bg-gradient-to-r from-white/40 to-white/20 rounded-full`} style={{ width: `${progressPct}%` }} />
        </div>
      </div>
    </button>
  );
}

function QuickLink({ icon, label, desc, onClick }: { icon: string; label: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
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
    </button>
  );
}

function FeaturedTopics({ modules, go }: { modules: Module[]; go: (r: Route) => void }) {
  return (
    <section>
      <SectionHeader title="مواضيع مميزة" subtitle="ابدأ بهذه الوحدات إذا كنت جديداً" />
      <div className="grid md:grid-cols-3 gap-4">
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => go({ name: "module", moduleId: m.id })}
            className="text-right group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] p-6 card-hover"
          >
            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full ${m.bg} ${m.accent} text-[11px] mb-3`}>
              <Icon name={m.icon} className="w-3.5 h-3.5" />
              {m.title}
            </div>
            <div className="text-white font-semibold text-base mb-1">{m.lessons[0]?.title || m.subtitle}</div>
            <div className="text-zinc-500 text-xs leading-relaxed">{m.lessons[0]?.summary || ""}</div>
          </button>
        ))}
      </div>
    </section>
  );
}

// ───────────────────────── Module Page ─────────────────────────
function ModulePage({
  module: m,
  progress,
  go,
}: {
  module: Module;
  progress: ReturnType<typeof useProgress>;
  go: (r: Route) => void;
}) {
  const [tab, setTab] = useState<"lessons" | "videos" | "tools">("lessons");
  const pct = progress.moduleProgress(m);

  const tabs = [
    { id: "lessons" as const, label: "المحتوى", icon: "book" },
    { id: "videos" as const, label: "الفيديو", icon: "play" },
    { id: "tools" as const, label: "الأدوات والقوالب", icon: "wrench" },
  ];

  return (
    <div className="space-y-7 fade-in">
      <button
        onClick={() => go({ name: "home" })}
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition"
      >
        <Icon name="arrow" className="w-4 h-4" />
        العودة للرئيسية
      </button>

      <header className="flex items-start gap-4">
        <div className={`w-14 h-14 rounded-2xl ${m.bg} ${m.accent} grid place-items-center shrink-0`}>
          <Icon name={m.icon} className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">{m.title}</h1>
          <p className="text-zinc-400 mt-1 text-sm">{m.subtitle} — {m.lessons.length} دروس</p>
          <div className="mt-3 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden max-w-md">
              <div className={`h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all`} style={{ width: `${pct}%` }} />
            </div>
            <span className="num text-xs text-emerald-400 font-semibold">{pct}%</span>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/5">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
              tab === t.id ? "bg-white/[0.07] text-white border border-white/10" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Icon name={t.icon} className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "lessons" && (
        <div className="space-y-3">
          {m.lessons.length === 0 && <EmptyHint text="لا توجد دروس متاحة في هذه الوحدة بعد." />}
          {m.lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} accent={m.accent} done={!!progress.done[lesson.id]} onToggle={() => progress.toggle(lesson.id)} />
          ))}
        </div>
      )}

      {tab === "videos" && (
        <div className="space-y-4">
          {m.videos.length === 0 && <EmptyHint text="لا توجد فيديوهات متاحة في هذه الوحدة." />}
          {m.videos.map((v) => (
            <div key={v.id} className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
              <div className="aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-5">
                <div className="text-white font-semibold">{v.title}</div>
                <div className="text-zinc-500 text-sm mt-1 leading-relaxed">{v.summary}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "tools" && (
        <div className="space-y-6">
          {m.templates.length > 0 && (
            <div>
              <div className="text-zinc-400 text-sm mb-3 px-1">قوالب جاهزة</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {m.templates.map((t) => (
                  <TemplateCard key={t.id} t={t} />
                ))}
              </div>
            </div>
          )}
          {m.tools.length > 0 && (
            <div>
              <div className="text-zinc-400 text-sm mb-3 px-1">أدوات وموارد خارجية</div>
              <div className="grid sm:grid-cols-2 gap-3">
                {m.tools.map((tool) => (
                  <a
                    key={tool.url}
                    href={tool.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-2xl border border-white/5 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/5 grid place-items-center text-zinc-300 shrink-0">
                      <Icon name="wrench" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-semibold text-sm flex items-center gap-2">
                        {tool.name}
                        <Icon name="external" className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition" />
                      </div>
                      <div className="text-zinc-500 text-xs mt-1 leading-relaxed">{tool.desc}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {m.templates.length === 0 && m.tools.length === 0 && <EmptyHint text="لا توجد أدوات إضافية لهذه الوحدة." />}
        </div>
      )}
    </div>
  );
}

function EmptyHint({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center text-zinc-500 text-sm">{text}</div>
  );
}

function LessonCard({ lesson, accent, done, onToggle }: { lesson: Lesson; accent: string; done: boolean; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-2xl border transition ${open ? "border-white/15 bg-white/[0.04]" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}>
      <div className="flex items-center gap-3 p-5">
        <button
          onClick={onToggle}
          aria-label="mark complete"
          className={`w-6 h-6 rounded-full border-2 grid place-items-center transition shrink-0 ${
            done ? "bg-emerald-500 border-emerald-500 text-black" : "border-white/15 hover:border-white/30 text-transparent"
          }`}
        >
          <Icon name="check" className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setOpen((o) => !o)} className="flex-1 text-right">
          <div className={`text-white font-semibold ${done ? "line-through text-zinc-500" : ""}`}>{lesson.title}</div>
          <div className="text-zinc-500 text-xs mt-1">{lesson.summary}</div>
        </button>
        <button onClick={() => setOpen((o) => !o)} className="text-zinc-500 hover:text-white transition shrink-0">
          <Icon name="arrow" className={`w-4 h-4 transition ${open ? "rotate-90" : "-rotate-90"}`} />
        </button>
      </div>
      {open && (
        <div className="px-5 pb-5 pt-1 fade-in">
          <div className={`h-px w-full bg-white/5 mb-5`} />
          <div className="prose-ar space-y-1">
            {lesson.sections.map((s, i) => (
              <div key={i} className="mb-5">
                <h4 className={accent}>{s.heading}</h4>
                {s.body && <RichBody body={s.body} />}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-2">
                    {s.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {lesson.apply && (
            <div className="mt-5 rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-300 grid place-items-center shrink-0">
                <Icon name="spark" className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="text-emerald-300 text-xs font-semibold mb-1">طبّق الآن</div>
                <div className="text-zinc-300 text-sm leading-relaxed">{lesson.apply}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// عرض جدول Markdown البسيط أو فقرة عادية
function RichBody({ body }: { body: string }) {
  const lines = body.split("\n").filter(Boolean);
  const isTable = lines.length > 1 && lines[0].includes("|") && lines[1].includes("---");
  if (isTable) {
    const rows = lines.filter((l) => !l.includes("---"));
    const head = rows[0].split("|").map((c) => c.trim()).filter(Boolean);
    const body = rows.slice(1).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
    return (
      <div className="mt-3 overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.04]">
            <tr>
              {head.map((h, i) => (
                <th key={i} className="text-right text-zinc-300 font-semibold px-4 py-2.5 text-xs whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((r, i) => (
              <tr key={i} className="border-t border-white/5">
                {r.map((c, j) => (
                  <td key={j} className="text-zinc-400 px-4 py-2.5 text-xs">{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p>{body}</p>;
}

// ───────────────────────── Templates Page ─────────────────────────
function TemplatesPage() {
  return (
    <div className="space-y-7 fade-in">
      <header>
        <h1 className="text-2xl md:text-3xl font-bold text-white">القوالب الجاهزة</h1>
        <p className="text-zinc-400 mt-1 text-sm">قوالب احترافية جاهزة للاستخدام في حملاتك التسويقية</p>
      </header>
      <div className="space-y-3">
        {TEMPLATES.map((t) => (
          <TemplateCard key={t.id} t={t} expanded />
        ))}
      </div>
    </div>
  );
}

function TemplateCard({ t, expanded }: { t: Template; expanded?: boolean }) {
  const [open, setOpen] = useState(false);

  const download = () => {
    const blob = new Blob([t.body], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${t.title}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition overflow-hidden">
      <div className="p-5 flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-300 grid place-items-center shrink-0">
          <Icon name={categoryIcon(t.category)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5">{t.category}</span>
            <h3 className="text-white font-semibold">{t.title}</h3>
          </div>
          <p className="text-zinc-500 text-sm">{t.desc}</p>
          <div className="mt-3 flex items-center gap-2">
            {expanded && (
              <button
                onClick={() => setOpen((o) => !o)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white text-xs flex items-center gap-1.5 transition"
              >
                <Icon name="book" className="w-3.5 h-3.5" />
                {open ? "إخفاء" : "معاينة"}
              </button>
            )}
            <button
              onClick={download}
              className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-1.5 transition"
            >
              <Icon name="download" className="w-3.5 h-3.5" />
              تحميل القالب
            </button>
          </div>
        </div>
      </div>
      {open && expanded && (
        <div className="px-5 pb-5">
          <pre className="text-zinc-300 text-xs leading-relaxed whitespace-pre-wrap bg-black/30 rounded-xl p-4 border border-white/5 max-h-96 overflow-auto" dir="rtl">
            {t.body}
          </pre>
        </div>
      )}
    </div>
  );
}

function categoryIcon(c: string) {
  switch (c) {
    case "صفحات": return "home";
    case "محتوى": return "pen";
    case "بريد": return "mail";
    case "إعلانات": return "megaphone";
    case "تحليل": return "search";
    case "استراتيجية": return "target";
    default: return "doc";
  }
}

// ───────────────────────── Cases Page ─────────────────────────
function CasesPage({ go }: { go: (r: Route) => void }) {
  return (
    <div className="space-y-7 fade-in">
      <button onClick={() => go({ name: "home" })} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm">
        <Icon name="arrow" className="w-4 h-4" /> العودة
      </button>
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

// ───────────────────────── App Shell ─────────────────────────
export default function App() {
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const progress = useProgress();

  const go = (r: Route) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ⌘K shortcut
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  let content: ReactNode;
  if (route.name === "home") content = <Dashboard go={go} openSearch={() => setSearchOpen(true)} progress={progress} />;
  else if (route.name === "templates") content = <TemplatesPage />;
  else if (route.name === "cases") content = <CasesPage go={go} />;
  else {
    const m = MODULES.find((x) => x.id === route.moduleId)!;
    content = <ModulePage module={m} progress={progress} go={go} />;
  }

  return (
    <div className="min-h-screen flex bg-[#08090c] text-zinc-200" dir="ltr">
      {/* Sidebar desktop */}
      <div className="hidden lg:block w-[300px] xl:w-[320px] shrink-0 sticky top-0 h-screen">
        <Sidebar route={route} go={go} openSearch={() => setSearchOpen(true)} progress={progress} />
      </div>

      {/* Sidebar mobile */}
      {mobileNav && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/60" onClick={() => setMobileNav(false)} />
          <div className="w-[300px] max-w-[85vw] h-full">
            <Sidebar route={route} go={go} openSearch={() => setSearchOpen(true)} progress={progress} onClose={() => setMobileNav(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0" dir="rtl">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 bg-[#08090c]/90 backdrop-blur border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 grid place-items-center text-black">
              <Icon name="rocket" className="w-4 h-4" />
            </div>
            <div className="text-white text-sm font-bold">أكاديمية التسويق</div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-zinc-300">
              <Icon name="search" className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileNav(true)} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-zinc-300">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-12">{content}</div>

        <footer className="border-t border-white/5 mt-16">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 text-center text-zinc-600 text-xs">
            أكاديمية التسويق © 2026 — مبني للمسوّقين العرب الجادّين.
          </div>
        </footer>
      </main>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} go={go} />
    </div>
  );
}
