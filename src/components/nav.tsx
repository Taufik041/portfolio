'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './icons';
import { person } from '@/content';

export function Nav() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <nav
      className="sticky top-0 z-[60] border-b"
      style={{
        background: 'var(--nav)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="mx-auto flex h-[60px] max-w-[1080px] items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-[19px] font-medium tracking-[-0.01em] no-underline whitespace-nowrap"
          style={{ color: 'var(--text)' }}
        >
          {person.name}
        </Link>

        {/* Links + toggle */}
        <div className="flex items-center gap-[clamp(10px,2.4vw,26px)]">
          <NavLink href="/work">Work</NavLink>
          <NavLink href="/work">Projects</NavLink>
          <NavLink href="/#about-section">About</NavLink>
          <NavLink href="/#contact-section">Contact</NavLink>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            aria-label="Toggle theme"
            className="ghost-link flex h-9 w-9 flex-none cursor-pointer items-center justify-center rounded-full border transition-colors"
            style={{
              borderColor: 'var(--border)',
              background: 'none',
              color: 'var(--text-2)',
            }}
          >
            {mounted ? (isDark ? <SunIcon /> : <MoonIcon />) : <span className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="ghost-link whitespace-nowrap rounded-btn px-[14px] py-[13px] text-[14px] no-underline transition-colors"
      style={{ color: 'var(--text-2)' }}
    >
      {children}
    </Link>
  );
}
