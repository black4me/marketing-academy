"use client";

import { useState } from "react";
import Link from "next/link";
import { type Module, type Lesson, type Template } from "@/lib/data";
import { Icon } from "./Icons";
import { useProgress } from "./ProgressProvider";

// ───────────── ModuleCard ─────────────
export function ModuleCard({ module: m }: { module: Module }) {
  const { moduleProgress } = useProgress();
  const pct = moduleProgress(m);
  return (
    <Link
      href={`/module/${m.slug}`}
      className={`text-right group relative overflow-hidden rounded-2xl border ${m.border} bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 card-hover w-full block`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl ${m.bg} ${m.accent} grid place-items-center`}>
          <Icon name={m.icon} />
        </div>
        <span className="num text-[11px] text-zinc-500">{pct}%</span>
      </div>
      <div className="text-white font-semibold mb-1 text-[15px]">{m.title}</div>
      <div className="text-zinc-500 text-xs leading-relaxed mb-4">{m.subtitle}</div>
      <div className="flex items-center justify-between text-[11px] text-zinc-500">
        <span>{m.lessons.length} دروس</span>
        <div className="flex-1 mx-3 h-1 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-white/40 to-white/20 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </Link>
  );
}

// ───────────── LessonCard ─────────────
export function LessonCard({ lesson, accent }: { lesson: Lesson; accent: string }) {
  const [open, setOpen] = useState(false);
  const { done, toggle } = useProgress();
  const isDone = !!done[lesson.id];
  return (
    <div className={`rounded-2xl border transition ${open ? "border-white/15 bg-white/[0.04]" : "border-white/5 bg-white/[0.02] hover:border-white/10"}`}>
      <div className="flex items-center gap-3 p-5">
        <button
          onClick={() => toggle(lesson.id)}
          aria-label="mark complete"
          className={`w-6 h-6 rounded-full border-2 grid place-items-center transition shrink-0 ${
            isDone ? "bg-emerald-500 border-emerald-500 text-black" : "border-white/15 hover:border-white/30 text-transparent"
          }`}
        >
          <Icon name="check" className="w-3.5 h-3.5" />
        </button>
        <button onClick={() => setOpen((o) => !o)} className="flex-1 text-right">
          <div className={`text-white font-semibold ${isDone ? "line-through text-zinc-500" : ""}`}>{lesson.title}</div>
          <div className="text-zinc-500 text-xs mt-1">{lesson.summary}</div>
        </button>
        <button onClick={() => setOpen((o) => !o)} className="text-zinc-500 hover:text-white transition shrink-0">
          <Icon name="arrow" className={`w-4 h-4 transition ${open ? "rotate-90" : "-rotate-90"}`} />
        </button>
      </div>
      {open && (
        <div className="px-5 pb-5 pt-1 fade-in">
          <div className="h-px w-full bg-white/5 mb-5" />
          <div className="prose-ar space-y-1">
            {lesson.sections.map((s, i) => (
              <div key={i} className="mb-5">
                <h4 className={accent}>{s.heading}</h4>
                {s.body && <RichBody body={s.body} />}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-2">
                    {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
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

function RichBody({ body }: { body: string }) {
  const lines = body.split("\n").filter(Boolean);
  const isTable = lines.length > 1 && lines[0].includes("|") && lines[1].includes("---");
  if (isTable) {
    const rows = lines.filter((l) => !l.includes("---"));
    const head = rows[0].split("|").map((c) => c.trim()).filter(Boolean);
    const bodyRows = rows.slice(1).map((r) => r.split("|").map((c) => c.trim()).filter(Boolean));
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
            {bodyRows.map((r, i) => (
              <tr key={i} className="border-t border-white/5">
                {r.map((c, j) => <td key={j} className="text-zinc-400 px-4 py-2.5 text-xs">{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  return <p>{body}</p>;
}

// ───────────── TemplateCard ─────────────
export function TemplateCard({ t, expanded }: { t: Template; expanded?: boolean }) {
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

// ───────────── FunnelVisual ─────────────
export function FunnelVisual() {
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

// ───────────── ModuleTabs (used by module page) ─────────────
export function ModuleTabs({ module: m }: { module: Module }) {
  const [tab, setTab] = useState<"lessons" | "videos" | "tools">("lessons");
  const tabs = [
    { id: "lessons" as const, label: "المحتوى", icon: "book" },
    { id: "videos" as const, label: "الفيديو", icon: "play" },
    { id: "tools" as const, label: "الأدوات والقوالب", icon: "wrench" },
  ];
  return (
    <>
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

      <div className="mt-7">
        {tab === "lessons" && (
          <div className="space-y-3">
            {m.lessons.length === 0 && <EmptyHint text="لا توجد دروس متاحة في هذه الوحدة بعد." />}
            {m.lessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} accent={m.accent} />)}
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
                    loading="lazy"
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
                  {m.templates.map((t) => <TemplateCard key={t.id} t={t} />)}
                </div>
              </div>
            )}
            {m.tools.length > 0 && (
              <div>
                <div className="text-zinc-400 text-sm mb-3 px-1">أدوات وموارد خارجية</div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {m.tools.map((tool) => (
                    <a key={tool.url} href={tool.url} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/5 hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.04] p-4 transition flex items-start gap-3">
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
    </>
  );
}

// ───────────── ModuleHeader (uses progress) ─────────────
export function ModuleHeader({ module: m }: { module: Module }) {
  const { moduleProgress } = useProgress();
  const pct = moduleProgress(m);
  return (
    <header className="flex items-start gap-4">
      <div className={`w-14 h-14 rounded-2xl ${m.bg} ${m.accent} grid place-items-center shrink-0`}>
        <Icon name={m.icon} className="w-6 h-6" />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white">{m.title}</h1>
        <p className="text-zinc-400 mt-1 text-sm">{m.subtitle} — {m.lessons.length} دروس</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden max-w-md">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
          </div>
          <span className="num text-xs text-emerald-400 font-semibold">{pct}%</span>
        </div>
      </div>
    </header>
  );
}

function EmptyHint({ text }: { text: string }) {
  return <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.01] p-8 text-center text-zinc-500 text-sm">{text}</div>;
}

// ───────────── BigSearchTrigger (homepage) ─────────────
export function BigSearchTrigger() {
  // Triggers the same ⌘K event programmatically
  const open = () => {
    const e = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
    window.dispatchEvent(e);
  };
  return (
    <button
      onClick={open}
      className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05] transition group"
    >
      <span className="flex items-center gap-3 text-zinc-400 group-hover:text-white text-[14px]">
        <Icon name="search" className="w-5 h-5" />
        ابحث عن أي موضوع... مثل: التسويق بالمحتوى، الإعلانات، القمع التسويقي
      </span>
      <span className="kbd num hidden sm:inline-flex">⌘K</span>
    </button>
  );
}

// ───────────── ContinueLearning (uses progress) ─────────────
export function ContinueLearning({ modules }: { modules: Module[] }) {
  const { moduleProgress } = useProgress();
  const cont = modules.filter((m) => {
    const p = moduleProgress(m);
    return p > 0 && p < 100;
  }).slice(0, 3);
  if (cont.length === 0) return null;
  return (
    <section>
      <div className="mb-5 px-1">
        <h2 className="text-xl md:text-2xl font-bold text-white">تابع التعلّم</h2>
        <p className="text-zinc-500 text-sm mt-1">استكمل من حيث توقفت</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cont.map((m) => <ModuleCard key={m.id} module={m} />)}
      </div>
    </section>
  );
}
