"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", label: "Hoy", icon: SunIcon },
  { href: "/habitos", label: "Hábitos", icon: RepeatIcon },
  { href: "/rutinas", label: "Rutinas", icon: BoltIcon, prefix: "/rutinas" },
  { href: "/nutricion", label: "Comida", icon: BowlIcon },
  { href: "/progreso", label: "Progreso", icon: BarsIcon },
  { href: "/perfil", label: "Perfil", icon: UserIcon },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="z-30 border-t border-white/10 bg-ink/95 px-1 pt-2 backdrop-blur-xl"
      style={{ paddingBottom: "calc(0.6rem + env(safe-area-inset-bottom))" }}
      aria-label="Principal"
    >
      <ul className="grid grid-cols-6">
        {ITEMS.map((item) => {
          const current = (pathname ?? "/").replace(/\/$/, "") || "/";
          const target = item.href.replace(/\/$/, "") || "/";
          const active =
            "prefix" in item && item.prefix
              ? current === item.prefix || current.startsWith(`${item.prefix}/`)
              : current === target;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-semibold tracking-wide ${
                  active ? "text-gold" : "text-paper-muted"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <item.icon active={active} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function SunIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth={active ? 2.4 : 1.8} />
      <path
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

function RepeatIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M7 8h9a3 3 0 0 1 3 3v1M17 16H8a3 3 0 0 1-3-3v-1"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.7}
        strokeLinecap="round"
      />
      <path
        d="m14 5 3 3-3 3M10 19l-3-3 3-3"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BoltIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M13 3 5.5 13.5H12l-1 7.5L18.5 10H12l1-7Z"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.7}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BowlIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M4 11h16c0 5-3.2 8-8 8s-8-3-8-8Z"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.7}
        strokeLinejoin="round"
      />
      <path
        d="M7 11V9.5A5 5 0 0 1 17 9.5V11"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}

function BarsIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path
        d="M6 17V10M12 17V7M18 17v-4"
        stroke="currentColor"
        strokeWidth={active ? 2.4 : 1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <circle cx="12" cy="8.5" r="3.2" stroke="currentColor" strokeWidth={active ? 2.2 : 1.7} />
      <path
        d="M5.5 19c1.2-3 3.4-4.5 6.5-4.5s5.3 1.5 6.5 4.5"
        stroke="currentColor"
        strokeWidth={active ? 2.2 : 1.7}
        strokeLinecap="round"
      />
    </svg>
  );
}
