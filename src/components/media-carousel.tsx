'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

// ─── Media-type detection ─────────────────────────────────────────────────────

type MediaType = 'video' | 'image' | 'youtube' | 'vimeo' | 'none';

function detectType(url: string): MediaType {
  if (!url) return 'none';
  const u = url.toLowerCase();
  if (/\.(mp4|webm|mov)(\?|#|$)/.test(u)) return 'video';
  if (/\.(png|jpg|jpeg|gif|webp|avif|svg)(\?|#|$)/.test(u)) return 'image';
  if (/youtube\.com\/watch|youtu\.be\//.test(u)) return 'youtube';
  if (/vimeo\.com\/\d+/.test(u)) return 'vimeo';
  return 'image'; // fallback for bare paths without recognised extension
}

function toYouTubeEmbed(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  return m
    ? `https://www.youtube.com/embed/${m[1]}?autoplay=1&mute=1&playsinline=1&rel=0`
    : url;
}

function toVimeoEmbed(url: string): string {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m
    ? `https://player.vimeo.com/video/${m[1]}?autoplay=1&muted=1&playsinline=1`
    : url;
}

// ─── Reduced-motion hook ──────────────────────────────────────────────────────

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ─── "Walkthrough coming soon" fallback ──────────────────────────────────────

export function WalkthroughComingSoon({ note }: { note?: string }) {
  return (
    <div className="aspect-video w-full flex items-center justify-center rounded-card border border-dashed border-[var(--border-strong)] bg-[var(--surface)]">
      <div className="flex flex-col items-center gap-4 text-center px-6 py-8">
        <div className="w-[52px] h-[52px] rounded-btn border border-[var(--border)] flex items-center justify-center text-[var(--text-3)] bg-[var(--bg)]">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        </div>
        <p className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>
          Walkthrough coming soon
        </p>
        <p className="text-[13px] leading-[1.5] max-w-[300px]" style={{ color: 'var(--text-3)' }}>
          {note ?? 'A recorded demo for this project is on the way. The code and write-up are linked above.'}
        </p>
      </div>
    </div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

export interface Slide {
  /** File path or URL. Empty string → "coming soon" state for this slide. */
  url: string;
  /** Overlay label shown top-left in the frame. */
  label?: string;
}

export interface MediaCarouselProps {
  slides: Slide[];
  /** Fired every time the active index changes. */
  onIndexChange?: (index: number) => void;
}

const IMAGE_DURATION = 5000; // ms - for image & embed slides
const TICK = 60;             // ms - progress-bar resolution

export function MediaCarousel({ slides, onIndexChange }: MediaCarouselProps) {
  const regionId = useId();
  const reduced = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  // Refs so the interval callback always has fresh values without extra deps
  const playingRef = useRef(playing);
  const hoveredRef = useRef(hovered);
  useEffect(() => { playingRef.current = playing; }, [playing]);
  useEffect(() => { hoveredRef.current = hovered; }, [hovered]);

  const n = slides.length;
  const isEmpty = n === 0;

  // Derived for current slide
  const current = isEmpty ? null : slides[index];
  const type: MediaType = current?.url ? detectType(current.url) : 'none';
  const isVideo   = type === 'video';
  const isImage   = type === 'image';
  const isYoutube = type === 'youtube';
  const isVimeo   = type === 'vimeo';
  const isNone    = type === 'none';

  // ── Navigation ──────────────────────────────────────────────────────────────

  const goTo = useCallback(
    (i: number) => {
      if (n === 0) return;
      const next = ((i % n) + n) % n;
      setIndex(next);
      setProgress(0);
      onIndexChange?.(next);
    },
    [n, onIndexChange],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // ── Auto-advance (image / embed / none slides) ───────────────────────────────

  useEffect(() => {
    // Video advances via onEnded; reduced-motion users get no auto-advance.
    if (isVideo || reduced) return;

    const id = setInterval(() => {
      if (!playingRef.current || hoveredRef.current) return; // pause without restarting
      setProgress((p) => {
        const step = (TICK / IMAGE_DURATION) * 100;
        const next = p + step;
        if (next >= 100) {
          // Advance slide using functional updater to avoid stale closure on index
          setIndex((i) => {
            const nextI = (i + 1) % n;
            onIndexChange?.(nextI);
            return nextI;
          });
          return 0;
        }
        return next;
      });
    }, TICK);

    return () => clearInterval(id);
  // Restart when slide changes (index), so we get the correct type check
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, reduced, n, onIndexChange]);

  // Reset progress whenever slide changes via external goTo
  useEffect(() => {
    setProgress(0);
  }, [index]);

  // ── Video: play / pause in sync with playing+hovered state ───────────────────

  const shouldVideoPlay = playing && !hovered && !reduced;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isVideo) return;
    if (shouldVideoPlay) v.play().catch(() => {});
    else v.pause();
  }, [shouldVideoPlay, isVideo, index]);

  // ── Video: drive progress bar from timeupdate ─────────────────────────────────

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isVideo) return;
    const update = () => {
      if (v.duration) setProgress((v.currentTime / v.duration) * 100);
    };
    v.addEventListener('timeupdate', update);
    return () => v.removeEventListener('timeupdate', update);
  }, [isVideo, index]);

  const handleVideoEnded = useCallback(() => goTo(index + 1), [goTo, index]);

  // ── Keyboard navigation (arrows) ─────────────────────────────────────────────

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only handle when the carousel region (or a child) is focused
      const region = document.getElementById(regionId.replace(/:/g, '\\:'));
      if (!region) return;
      if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goPrev, goNext, regionId]);

  // ─────────────────────────────────────────────────────────────────────────────

  if (isEmpty) return <WalkthroughComingSoon />;

  const effectivePlaying = playing && !hovered && !reduced;

  return (
    <div
      id={regionId}
      role="region"
      aria-label="Media carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Frame ───────────────────────────────────────────────────────────── */}
      <div
        className="relative aspect-video w-full overflow-hidden rounded-card border border-[var(--border)] bg-[var(--surface)] outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  { e.preventDefault(); goPrev(); }
          if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
        }}
      >
        {/* Media */}
        {isVideo && current && (
          <video
            ref={videoRef}
            key={current.url}
            src={current.url}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}

        {isImage && current && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={current.url}
            src={current.url}
            alt={current.label ?? 'Project media'}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain"
          />
        )}

        {isYoutube && current && (
          <iframe
            key={current.url}
            src={toYouTubeEmbed(current.url)}
            title={current.label ?? 'YouTube embed'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        )}

        {isVimeo && current && (
          <iframe
            key={current.url}
            src={toVimeoEmbed(current.url)}
            title={current.label ?? 'Vimeo embed'}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 h-full w-full border-0"
          />
        )}

        {isNone && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg)]" style={{ color: 'var(--accent)' }}>
              <svg width="22" height="22" viewBox="0 0 12 14" fill="currentColor">
                <path d="M0 0l12 7-12 7z" />
              </svg>
            </div>
            <span className="font-mono text-[12px] tracking-[0.04em]" style={{ color: 'var(--text-3)' }}>
              walkthrough coming soon
            </span>
          </div>
        )}

        {/* Label overlay */}
        {current?.label && (
          <div
            className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-[7px] text-[13px] font-medium text-white"
            style={{
              background: 'rgba(20,20,22,0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maxWidth: 'calc(100% - 120px)',
            }}
          >
            <span className="font-mono text-[11px] opacity-70">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {current.label}
            </span>
          </div>
        )}

        {/* Play-state indicator */}
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={effectivePlaying ? 'Pause carousel' : 'Play carousel'}
          className="absolute right-4 top-4 flex cursor-pointer items-center gap-2 rounded-full border-0 px-3 py-[7px] text-[12.5px] font-medium text-white"
          style={{
            background: 'rgba(20,20,22,0.55)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {effectivePlaying ? (
            <>
              <span className="h-[7px] w-[7px] rounded-full bg-[#4ade80] animate-livepulse" />
              Playing
            </>
          ) : (
            <>
              <span className="h-[7px] w-[7px] rounded-full bg-[#fbbf24]" />
              Paused
            </>
          )}
        </button>

        {/* Prev arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="absolute left-[14px] top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 text-white transition-colors"
          style={{ background: 'rgba(20,20,22,0.45)', backdropFilter: 'blur(10px)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,20,22,0.72)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,20,22,0.45)')}
        >
          <ChevronLeftIcon />
        </button>

        {/* Next arrow */}
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="absolute right-[14px] top-1/2 flex h-[42px] w-[42px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-0 text-white transition-colors"
          style={{ background: 'rgba(20,20,22,0.45)', backdropFilter: 'blur(10px)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,20,22,0.72)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(20,20,22,0.45)')}
        >
          <ChevronRightIcon />
        </button>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[rgba(128,128,128,0.25)]">
          <div
            className="h-full bg-[var(--accent)]"
            style={{ width: `${progress}%`, transition: 'width 0.12s linear' }}
          />
        </div>
      </div>

      {/* ── Dot indicators ──────────────────────────────────────────────────── */}
      {n > 1 && (
        <div
          className="mt-5 flex items-center justify-center gap-[10px]"
          role="tablist"
          aria-label="Slides"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="h-2 cursor-pointer rounded-full border-0 p-0"
              style={{
                width: i === index ? 26 : 8,
                background: i === index ? 'var(--accent)' : 'var(--border-strong)',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* Screen-reader live announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${index + 1} of ${n}${current?.label ? ': ' + current.label : ''}`}
      </div>
    </div>
  );
}
