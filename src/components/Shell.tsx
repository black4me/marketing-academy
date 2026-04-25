"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MODULES, searchAll, type SearchHit, type Module } from "@/lib/data";
import { Icon } from "./Icons";
import { ProgressProvider, useProgress } from "./ProgressProvider";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <ProgressProvider>
      <ShellInner>{children}</ShellInner>
    </ProgressProvider>
  );
}

function ShellInner({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const pathname = usePathname();

  // close mobile nav on route change
  useEffect(() => {
    setMobileNav(false);
  }, [pathname]);

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

  return (
    <div className="min-h-screen flex bg-[#08090c] text-zinc-200">
      {/* Sidebar desktop */}
      <div className="hidden lg:block w-[300px] xl:w-[320px] shrink-0 sticky top-0 h-screen">
        <Sidebar pathname={pathname} openSearch={() => setSearchOpen(true)} />
      </div>

      {/* Sidebar mobile */}
      {mobileNav && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/60" onClick={() => setMobileNav(false)} />
          <div className="w-[300px] max-w-[85vw] h-full">
            <Sidebar pathname={pathname} openSearch={() => setSearchOpen(true)} onClose={() => setMobileNav(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between gap-3 px-4 py-3 bg-[#08090c]/90 backdrop-blur border-b border-white/5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 grid place-items-center text-black">
              <Icon name="rocket" className="w-4 h-4" />
            </div>
            <div className="text-white text-sm font-bold">أكاديمية التسويق</div>
          </Link>
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(true)} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-zinc-300">
              <Icon name="search" className="w-4 h-4" />
            </button>
            <button onClick={() => setMobileNav(true)} className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 grid place-items-center text-zinc-300">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-12">{children}</div>

        <footer className="border-t border-white/5 mt-16">
          <div className="max-w-5xl mx-auto px-5 md:px-8 py-8 text-center text-zinc-600 text-xs">
            أكاديمية التسويق © 2026 — مبني للمسوّقين العرب الجادّين.
          </div>
        </footer>
      </main>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

// ───────────── Sidebar ─────────────
function Sidebar({ pathname, openSearch, onClose }: { pathname: string; openSearch: () => void; onClose?: () => void }) {
  const { moduleProgress, overall } = useProgress();

  const NavItem = ({ href, label, icon, active, badge }: { href: string; label: string; icon: string; active: boolean; badge?: string }) => (
    <Link
      href={href}
      onClick={onClose}
      className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm transition-all ${
        active
          ? "bg-white/[0.06] text-white border border-white/10"
          : "text-zinc-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
      }`}
    >
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <span className={active ? "text-white" : "text-zinc-500"}>
          <Icon name={icon} className="w-[18px] h-[18px]" />
        </span>
        <span className="truncate">{label}</span>
      </div>
      {badge != null && <span className="num text-[11px] text-zinc-500">{badge}</span>}
    </Link>
  );

  return (
    <aside className="h-full flex flex-col bg-[#0b0d12] border-l border-white/5 w-full">
      <div className="flex items-center justify-between gap-3 px-5 pt-5 pb-4">
        <Link href="/" onClick={onClose} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 grid place-items-center text-black shadow-lg shadow-emerald-500/30">
            <Icon name="rocket" className="w-5 h-5" />
          </div>
          <div className="leading-tight">
            <div className="text-[15px] font-bold text-white">أكاديمية التسويق</div>
            <div className="text-[11px] text-zinc-500">نظام تعليمي متكامل</div>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-zinc-400 hover:text-white p-1">
            <Icon name="x" />
          </button>
        )}
      </div>

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

      <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
        <NavItem href="/" label="الرئيسية" icon="home" active={pathname === "/"} />

        <div className="pt-4 pb-1.5 px-3 text-[11px] uppercase tracking-wider text-zinc-600">الوحدات التعليمية</div>
        {MODULES.map((m) => (
          <NavItem
            key={m.id}
            href={`/module/${m.slug}`}
            label={m.title}
            icon={m.icon}
            active={pathname === `/module/${m.slug}`}
            badge={`${moduleProgress(m)}%`}
          />
        ))}

        <div className="pt-4 pb-1.5 px-3 text-[11px] uppercase tracking-wider text-zinc-600">أدوات</div>
        <NavItem href="/templates" label="القوالب الجاهزة" icon="doc" active={pathname === "/templates"} />
        <NavItem href="/cases" label="دراسات حالة" icon="case" active={pathname === "/cases"} />
      </nav>

      <div className="px-5 py-4 border-t border-white/5">
        <div className="flex items-center justify-between mb-2 text-[12px]">
          <span className="text-zinc-500">التقدم الكلي</span>
          <span className="num text-emerald-400 font-semibold">{overall}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all" style={{ width: `${overall}%` }} />
        </div>
      </div>
    </aside>
  );
}

// ───────────── Search overlay ─────────────
function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => searchAll(q), [q]);

  useEffect(() => { if (!open) setQ(""); }, [open]);

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
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
    if (h.type === "tool" && h.url) {
      window.open(h.url, "_blank");
    } else if (h.type === "lesson") {
      router.push(`/lesson/${h.id}`);
    } else if (h.type === "case") {
      router.push("/cases");
    } else if (h.type === "template") {
      router.push("/templates");
    } else if (h.moduleSlug) {
      router.push(`/module/${h.moduleSlug}`);
    }
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
            <div className="p-6 text-center text-zinc-500 text-sm">لا نتائج لـ &ldquo;{q}&rdquo;</div>
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

// Helper exports for pages
export { MODULES };
export type { Module };
