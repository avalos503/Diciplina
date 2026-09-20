"use client";

import { BottomNav } from "./BottomNav";
import { Onboarding } from "./Onboarding";
import { useStore } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { ready, state } = useStore();

  return (
    <div className="noise min-h-dvh bg-ink">
      <div className="relative mx-auto flex min-h-dvh max-w-phone flex-col overflow-hidden bg-ink shadow-card">
        <div className="pointer-events-none absolute -left-16 top-[-80px] h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-40 h-40 w-40 rounded-full bg-ember/10 blur-3xl" />

        {!ready ? (
          <Splash />
        ) : !state.profile ? (
          <Onboarding />
        ) : (
          <>
            <main className="relative flex-1 overflow-y-auto px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
              {children}
            </main>
            <BottomNav />
          </>
        )}
      </div>
    </div>
  );
}

function Splash() {
  return (
    <div className="grid min-h-dvh place-items-center px-8">
      <div className="text-center">
        <p className="font-display text-5xl uppercase tracking-[0.18em] text-gold">Diciplina</p>
        <p className="mt-3 text-sm text-paper-muted">Cargando tu día…</p>
      </div>
    </div>
  );
}
