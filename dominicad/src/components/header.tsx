"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#recursos", label: "Recursos" },
  { href: "#seguranca", label: "Segurança" },
  { href: "#precos", label: "Planos" },
  { href: "/dashboard", label: "Dashboard Demo" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/caderneta");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-slate-950">
            DC
          </span>
          DominiCad
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-emerald-400">
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            className="rounded-full border border-emerald-500/70 px-5 py-2 text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
          >
            Entrar
          </Link>
        </nav>
        <button
          className="inline-flex items-center justify-center rounded-md border border-slate-800 p-2 text-slate-200 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Abrir menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && !isDashboard && (
        <div className="border-t border-slate-800/60 bg-slate-950/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm font-medium text-slate-200">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-emerald-400">
                {link.label}
              </a>
            ))}
            <Link
              href="/login"
              className="rounded-full border border-emerald-500/70 px-5 py-2 text-center text-emerald-300 transition hover:border-emerald-400 hover:text-emerald-200"
              onClick={() => setOpen(false)}
            >
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
