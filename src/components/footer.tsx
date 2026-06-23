import Link from 'next/link';
import { person } from '@/content';

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--border)' }}>
      <div className="mx-auto flex max-w-[1080px] flex-wrap items-center justify-between gap-4 px-6 py-8">
        <span className="text-[13.5px]" style={{ color: 'var(--text-3)' }}>
          © {new Date().getFullYear()} {person.name}
        </span>
        <div className="flex gap-5">
          <FooterLink href={person.github}>GitHub</FooterLink>
          <FooterLink href={person.linkedin}>LinkedIn</FooterLink>
          <FooterLink href={person.resume}>Résumé</FooterLink>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith('http');
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="text-[13.5px] no-underline transition-colors hover:text-[var(--text)]"
      style={{ color: 'var(--text-2)' }}
    >
      {children}
    </Link>
  );
}
