import Link from 'next/link';
import { projects, person, experiences, about, stack } from '@/content';
import { ProjectCard } from '@/components/project-card';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons';

export default function LandingPage() {
  return (
    <>
      {/* ─── Hero ────────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1080px] px-6">
        <div className="max-w-[760px] pb-[clamp(56px,9vw,104px)] pt-[clamp(56px,9vw,104px)]">
          <p
            className="mb-6 text-[13px] font-medium uppercase tracking-[0.08em]"
            style={{ color: 'var(--accent)' }}
          >
            {person.role}
          </p>

          <h1
            className="m-0 font-medium leading-[1.07] tracking-[-0.03em]"
            style={{
              fontSize: 'clamp(2.4rem, 5.6vw, 4rem)',
              color: 'var(--text)',
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            {person.headline}
          </h1>

          <p
            className="mt-7 leading-[1.6]"
            style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
              color: 'var(--text-2)',
              maxWidth: 620,
            }}
          >
            {person.subline}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-[14px]">
            {/* Primary CTA */}
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-btn border-0 px-[22px] py-[13px] text-[15px] font-medium no-underline transition-[filter] hover:brightness-110"
              style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              View projects <ArrowRightIcon size={15} />
            </Link>

            {/* Ghost links */}
            <div className="flex items-center gap-1">
              <GhostLink href={person.github} external>GitHub</GhostLink>
              <GhostLink href={person.linkedin} external>LinkedIn</GhostLink>
              <GhostLink href={person.resume}>Résumé</GhostLink>
            </div>
          </div>
        </div>
        <div className="h-px" style={{ background: 'var(--border)' }} />
      </section>

      {/* ─── Selected work ────────────────────────────────────────────────────── */}
      <section
        id="work-section"
        className="mx-auto max-w-[1080px] px-6 py-[clamp(56px,9vw,104px)]"
      >
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <p
              className="mb-3 text-[12.5px] font-medium uppercase tracking-[0.09em]"
              style={{ color: 'var(--text-3)' }}
            >
              Selected work
            </p>
            <h2
              className="m-0 font-medium leading-[1.15] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(1.6rem, 3.4vw, 2rem)',
                color: 'var(--text)',
              }}
            >
              Three systems I&apos;m proud of.
            </h2>
          </div>
          <Link
            href="/work"
            className="inline-flex items-center gap-[6px] text-[14px] font-medium no-underline transition-[gap] hover:gap-[9px] whitespace-nowrap"
            style={{ color: 'var(--accent)' }}
          >
            Watch the reel <ArrowRightIcon size={14} />
          </Link>
        </div>

        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))' }}
        >
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      {/* ─── Experience ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1080px] px-6">
        <div className="h-px" style={{ background: 'var(--border)' }} />
        <div className="py-[clamp(56px,9vw,104px)]">
          <p
            className="mb-9 text-[12.5px] font-medium uppercase tracking-[0.09em]"
            style={{ color: 'var(--text-3)' }}
          >
            Experience
          </p>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="grid gap-x-14 gap-y-7"
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}
              >
                {/* Left column: meta */}
                <div>
                  <h3
                    className="m-0 text-[1.3rem] font-medium tracking-[-0.01em]"
                    style={{ color: 'var(--text)' }}
                  >
                    {exp.company}
                  </h3>
                  <p className="mt-[6px] text-[14px]" style={{ color: 'var(--text-3)' }}>
                    {exp.location}
                  </p>
                  <p className="mt-[18px] text-[15px] font-medium" style={{ color: 'var(--text)' }}>
                    {exp.title}
                  </p>
                  <p className="mt-1 text-[14px]" style={{ color: 'var(--text-2)' }}>
                    {exp.period}
                  </p>
                  {exp.domain && (
                    <p className="mt-1 text-[13px]" style={{ color: 'var(--text-3)' }}>
                      {exp.domain}
                    </p>
                  )}
                </div>

                {/* Right column: bullets */}
                <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
                  <ul className="m-0 flex list-none flex-col gap-4 p-0">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex gap-[14px] text-[15.5px] leading-[1.6]" style={{ color: 'var(--text-2)' }}>
                        <span
                          className="mt-[9px] h-[5px] w-[5px] flex-none rounded-full"
                          style={{ background: 'var(--accent)' }}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-px" style={{ background: 'var(--border)' }} />
      </section>

      {/* ─── About ───────────────────────────────────────────────────────────── */}
      <section id="about-section" className="mx-auto max-w-[1080px] px-6">
        <div
          className="grid gap-x-14 gap-y-7 py-[clamp(56px,9vw,104px)]"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}
        >
          <p
            className="text-[12.5px] font-medium uppercase tracking-[0.09em]"
            style={{ color: 'var(--text-3)' }}
          >
            About
          </p>
          <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
            <p
              className="m-0 leading-[1.55] tracking-[-0.01em]"
              style={{
                fontSize: 'clamp(1.15rem, 2.2vw, 1.4rem)',
                color: 'var(--text)',
                textWrap: 'pretty',
              } as React.CSSProperties}
            >
              {about.lead}
            </p>
            <p
              className="mt-6 text-[1.05rem] leading-[1.65]"
              style={{ color: 'var(--text-2)', textWrap: 'pretty' } as React.CSSProperties}
            >
              {about.body}
            </p>
          </div>
        </div>
        <div className="h-px" style={{ background: 'var(--border)' }} />
      </section>

      {/* ─── Stack ───────────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1080px] px-6">
        <div
          className="grid gap-x-14 gap-y-7 py-[clamp(56px,9vw,104px)]"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}
        >
          <p
            className="text-[12.5px] font-medium uppercase tracking-[0.09em]"
            style={{ color: 'var(--text-3)' }}
          >
            Stack
          </p>
          <div className="flex flex-wrap gap-[10px]" style={{ gridColumn: 'span 2', minWidth: 0 }}>
            {stack.map((s) => (
              <span
                key={s}
                className="inline-flex rounded-pill border px-[13px] py-[7px] text-[13.5px]"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text)',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="h-px" style={{ background: 'var(--border)' }} />
      </section>

      {/* ─── Contact ─────────────────────────────────────────────────────────── */}
      <section
        id="contact-section"
        className="mx-auto max-w-[1080px] px-6"
      >
        <div className="py-[clamp(72px,12vw,128px)] text-center">
          <h2
            className="mx-auto m-0 font-medium leading-[1.1] tracking-[-0.025em]"
            style={{
              fontSize: 'clamp(1.9rem, 4.4vw, 2.8rem)',
              color: 'var(--text)',
              maxWidth: 600,
              textWrap: 'balance',
            } as React.CSSProperties}
          >
            Building something that needs to stay up? Let&apos;s talk.
          </h2>
          <div className="mt-9 flex flex-wrap justify-center gap-[14px]">
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border-0 px-[22px] py-[13px] text-[15px] font-medium no-underline transition-[filter] hover:brightness-110"
              style={{ background: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              Get in touch <ArrowUpRightIcon size={15} />
            </a>
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border px-[20px] py-[13px] text-[15px] no-underline transition-colors hover:bg-[var(--surface)] hover:border-[var(--border-strong)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              GitHub
            </a>
            <a
              href={person.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-btn border px-[20px] py-[13px] text-[15px] no-underline transition-colors hover:bg-[var(--surface)] hover:border-[var(--border-strong)]"
              style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
            >
              Résumé
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function GhostLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="ghost-link inline-flex items-center gap-[7px] rounded-btn px-[14px] py-[13px] text-[15px] no-underline transition-colors"
      style={{ color: 'var(--text-2)' }}
    >
      {children}
    </a>
  );
}
