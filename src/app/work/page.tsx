'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MediaCarousel, type Slide } from '@/components/media-carousel';
import { projects } from '@/content';
import { ArrowRightIcon, ArrowUpRightIcon } from '@/components/icons';

export default function WorkPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = projects[activeIndex];

  // One slide per project - first media item (or empty string → "coming soon")
  const slides: Slide[] = projects.map((p) => ({
    url: p.media[0] ?? '',
    label: p.title,
  }));

  return (
    <div
      className="mx-auto px-6 pb-[clamp(64px,9vw,104px)] pt-[clamp(32px,6vw,64px)]"
      style={{ maxWidth: 1000 }}
    >
      {/* Page header */}
      <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p
            className="mb-[10px] text-[12.5px] font-medium uppercase tracking-[0.09em]"
            style={{ color: 'var(--text-3)' }}
          >
            The reel
          </p>
          <h1
            className="m-0 font-medium leading-[1.12] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(1.7rem, 3.6vw, 2.2rem)',
              color: 'var(--text)',
            }}
          >
            Work, playing itself.
          </h1>
        </div>
        <span className="text-[14px]" style={{ color: 'var(--text-3)' }}>
          {activeIndex + 1} / {projects.length}
        </span>
      </div>

      {/* Carousel */}
      <MediaCarousel slides={slides} onIndexChange={setActiveIndex} />

      {/* Synced details */}
      <div
        className="mt-9 grid gap-x-12 gap-y-7"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}
      >
        {/* Title + description + tags */}
        <div style={{ minWidth: 0 }}>
          <h2
            className="m-0 font-medium leading-[1.15] tracking-[-0.02em]"
            style={{
              fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
              color: 'var(--text)',
            }}
          >
            {active.title}
          </h2>
          <p
            className="mt-4 text-[1.02rem] leading-[1.65]"
            style={{ color: 'var(--text-2)', textWrap: 'pretty' } as React.CSSProperties}
          >
            {active.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {active.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex rounded-pill border px-[11px] py-[5px] text-[12.5px] font-medium"
                style={{
                  borderColor: 'var(--border)',
                  background: 'var(--surface)',
                  color: 'var(--text-2)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-[10px]" style={{ minWidth: 0 }}>
          {active.repo && (
            <ExternalRow href={active.repo} label="GitHub" />
          )}
          {active.demo && (
            <ExternalRow href={active.demo} label="Live demo" />
          )}
          <Link
            href={`/projects/${active.slug}`}
            className="inline-flex items-center justify-between gap-[10px] rounded-btn border px-4 py-[14px] text-[14.5px] font-medium no-underline transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
            style={{
              borderColor: 'var(--border)',
              color: 'var(--accent)',
            }}
          >
            Open project page <ArrowRightIcon size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ExternalRow({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-between gap-[10px] rounded-btn border px-4 py-[14px] text-[14.5px] no-underline transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
    >
      {label} <ArrowUpRightIcon size={15} />
    </a>
  );
}
