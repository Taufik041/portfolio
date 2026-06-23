import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/content';
import { ProjectIcon, ArrowUpRightIcon } from '@/components/icons';
import { MediaCarousel, WalkthroughComingSoon, type Slide } from '@/components/media-carousel';

// Pre-generate all project pages at build time
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);
  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const num = String(projectIndex + 1).padStart(2, '0');

  const slides: Slide[] = project.media.map((url) => ({ url }));

  return (
    <div
      className="mx-auto px-6 pb-[clamp(64px,9vw,104px)] pt-[clamp(28px,5vw,52px)]"
      style={{ maxWidth: 920 }}
    >
      {/* Back link */}
      <Link
        href="/work"
        className="mb-9 inline-flex items-center gap-[7px] text-[14px] no-underline transition-colors hover:text-[var(--text)]"
        style={{ color: 'var(--text-2)' }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back to the reel
      </Link>

      {/* Icon + number */}
      <div className="mb-5 flex items-center gap-4">
        <div
          className="flex h-[48px] w-[48px] flex-none items-center justify-center rounded-btn"
          style={{ background: 'var(--accent-weak)', color: 'var(--accent)' }}
        >
          <ProjectIcon icon={project.icon} size={24} />
        </div>
        <span className="font-mono text-[13px]" style={{ color: 'var(--text-3)' }}>
          {num}
        </span>
      </div>

      {/* Title */}
      <h1
        className="m-0 font-medium leading-[1.1] tracking-[-0.025em]"
        style={{
          fontSize: 'clamp(1.9rem, 4.4vw, 2.7rem)',
          color: 'var(--text)',
          textWrap: 'balance',
        } as React.CSSProperties}
      >
        {project.title}
      </h1>

      {/* Description */}
      <p
        className="mt-[18px] leading-[1.6]"
        style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.2rem)',
          color: 'var(--text-2)',
          maxWidth: 640,
          textWrap: 'pretty',
        } as React.CSSProperties}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
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

      {/* Links */}
      {(project.repo || project.demo) && (
        <div className="mt-7 mb-10 flex flex-wrap gap-3">
          {project.repo && (
            <ExtLink href={project.repo}>GitHub</ExtLink>
          )}
          {project.demo && (
            <ExtLink href={project.demo}>Live demo</ExtLink>
          )}
        </div>
      )}

      {/* Walkthrough */}
      <p
        className="mb-4 text-[12.5px] font-medium uppercase tracking-[0.09em]"
        style={{ color: 'var(--text-3)' }}
      >
        Walkthrough
      </p>

      {slides.length > 0 ? (
        <MediaCarousel slides={slides} />
      ) : (
        <WalkthroughComingSoon />
      )}

      {/* Next project */}
      <div
        className="mt-12 flex items-center justify-between gap-4 border-t pt-7"
        style={{ borderColor: 'var(--border)' }}
      >
        <span className="text-[13.5px]" style={{ color: 'var(--text-3)' }}>
          Next project
        </span>
        <Link
          href={`/projects/${nextProject.slug}`}
          className="inline-flex items-center gap-[9px] text-[15px] font-medium no-underline text-right transition-colors hover:text-[var(--accent)]"
          style={{ color: 'var(--text)' }}
        >
          {nextProject.title}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-btn border px-[18px] py-[11px] text-[14.5px] no-underline transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface)]"
      style={{ borderColor: 'var(--border)', color: 'var(--text)' }}
    >
      {children} <ArrowUpRightIcon size={14} />
    </a>
  );
}
