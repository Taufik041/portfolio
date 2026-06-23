import Link from 'next/link';
import type { Project } from '@/content';
import { ProjectIcon } from './icons';

export function ProjectCard({ project }: { project: Project }) {
  const hasMedia = project.media.length > 0;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="project-card group block rounded-card border border-[var(--border)] bg-[var(--bg)] p-[26px] no-underline"
      style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
    >
      {/* Top row: icon + play affordance */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-[44px] w-[44px] items-center justify-center rounded-btn"
          style={{ background: 'var(--accent-weak)', color: 'var(--accent)' }}
        >
          <ProjectIcon icon={project.icon} size={22} />
        </div>

        {hasMedia && (
          <span
            className="flex items-center gap-[6px] text-[12.5px]"
            style={{ color: 'var(--text-3)' }}
          >
            <span
              className="flex h-[24px] w-[24px] items-center justify-center rounded-full border"
              style={{ borderColor: 'var(--border)', color: 'var(--text-2)' }}
            >
              <svg width="9" height="9" viewBox="0 0 10 12" fill="currentColor">
                <path d="M0 0l10 6-10 6z" />
              </svg>
            </span>
            demo
          </span>
        )}
      </div>

      {/* Title + description */}
      <div>
        <h3
          className="mb-2 text-[1.2rem] font-medium leading-snug tracking-[-0.01em]"
          style={{ color: 'var(--text)' }}
        >
          {project.title}
        </h3>
        <p className="m-0 text-[15px] leading-[1.55]" style={{ color: 'var(--text-2)' }}>
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
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
    </Link>
  );
}
