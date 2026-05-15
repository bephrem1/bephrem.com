import NextLink from 'next/link';
import type { FunctionComponent } from 'react';
import { useCallback, useRef } from 'react';

const BASE = '/commercial/2026/nia-context-week';
const DETAIL_HREF = '/work/nia-context-week';
const CLIP_IDS = [1, 2, 3, 4, 5, 6] as const;

/** One frame; one column of the 6-col strip. */
const TapeCell: FunctionComponent<{ id: (typeof CLIP_IDS)[number] }> = ({ id }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => {
      /* autoplay / buffer */
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, []);

  return (
    <NextLink
      href={DETAIL_HREF}
      className="relative block min-h-0 min-w-0 h-full overflow-hidden border-0 bg-neutral-950 outline-none ring-0 ring-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      <video
        ref={videoRef}
        src={`${BASE}/preview/1080p/${id}.mp4`}
        poster={`${BASE}/thumbnail/${id}.jpg`}
        muted
        playsInline
        loop
        preload="metadata"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />
    </NextLink>
  );
};

const stripBase =
  'grid w-full min-w-0 grid-cols-6 gap-0 overflow-x-clip overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

/** Fixed strip height when not filling a parent (e.g. standalone). */
const STRIP_ROW_FIXED = `${stripBase} h-[min(9.75rem,calc((100svh-12rem)*0.75))] snap-x snap-mandatory sm:h-[min(10.5rem,calc((100svh-11rem)*0.75))] sm:snap-none sm:overflow-x-auto lg:h-[min(11.625rem,calc((100svh-10rem)*0.75))]`;

type CommercialTapeProps = {
  /** Parent sets height (e.g. match photo); strip fills remaining space. */
  fillHeight?: boolean;
  className?: string;
};

const CommercialTape: FunctionComponent<CommercialTapeProps> = ({ fillHeight = false, className }) => {
  const stripClass = fillHeight ? `${stripBase} h-full min-h-0` : STRIP_ROW_FIXED;

  return (
    <div
      className={`flex min-h-0 w-full min-w-0 max-w-full flex-col overflow-x-clip ${fillHeight ? 'h-full' : ''} ${className ?? ''}`.trim()}
    >
      <div className={stripClass}>
        {CLIP_IDS.map((id) => (
          <TapeCell key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default CommercialTape;
