"use client";

import { usePathname } from "next/navigation";
import { BottomNav } from "./BottomNav";
import { Onboarding } from "./Onboarding";
import { useStore } from "@/lib/store";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { ready, state } = useStore();
  const pathname = usePathname();

  return (
    <div className="noise min-h-dvh bg-ink">
      <div className="relative mx-auto min-h-dvh max-w-phone overflow-hidden bg-ink shadow-card">
        <div className="pointer-events-none absolute -left-16 top-[-80px] h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 top-40 h-40 w-40 rounded-full bg-ember/10 blur-3xl" />

        {!ready ? (
          <Splash />
        ) : !state.profile ? (
          <Onboarding />
        ) : (
          <>
            <main
              className="relative px-5 pt-[max(1.25rem,env(safe-area-inset-top))]"
              style={{ paddingBottom: "calc(6.2rem + env(safe-area-inset-bottom))" }}
            >
              {children}
            </main>
            {pathname ? <BottomNav /> : null}
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
