"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { MODULES, type Module } from "@/lib/data";

type ProgressCtx = {
  done: Record<string, boolean>;
  toggle: (id: string) => void;
  moduleProgress: (m: Module) => number;
  overall: number;
};

const Ctx = createContext<ProgressCtx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("akademia_progress");
      if (raw) setDone(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("akademia_progress", JSON.stringify(done));
    } catch {}
  }, [done, hydrated]);

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

  return <Ctx.Provider value={{ done, toggle, moduleProgress, overall }}>{children}</Ctx.Provider>;
}

export function useProgress() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useProgress must be inside ProgressProvider");
  return v;
}
