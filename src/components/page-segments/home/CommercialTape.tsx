import type { FunctionComponent } from 'react';
import { useCallback, useRef } from 'react';

const BASE = '/commercial/2026/nia-context-week';
const CLIP_IDS = [1, 2, 3, 4, 5, 6] as const;

/** One frame; one column — box is strict 16:9; height follows column width. */
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
    <div
      className="relative min-w-0 aspect-video cursor-default overflow-hidden bg-neutral-950 hover:cursor-pointer"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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
    </div>
  );
};

const stripClass =
  'grid w-full min-w-0 grid-cols-6 gap-0 overflow-x-clip overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

type CommercialTapeProps = {
  className?: string;
};

const CommercialTape: FunctionComponent<CommercialTapeProps> = ({ className }) => {
  return (
    <div className={`w-full min-w-0 max-w-full overflow-x-clip ${className ?? ''}`.trim()}>
      <div className={stripClass}>
        {CLIP_IDS.map((id) => (
          <TapeCell key={id} id={id} />
        ))}
      </div>
    </div>
  );
};

export default CommercialTape;
