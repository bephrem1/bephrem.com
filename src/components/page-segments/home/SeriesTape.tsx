import type { FunctionComponent } from 'react';
import { useCallback, useRef } from 'react';

export type SeriesTapeAssetLayout = 'nested1080' | 'flatRoot' | 'folder1080';

function clipUrls(layout: SeriesTapeAssetLayout, base: string, id: number): { poster: string; src: string } {
  if (layout === 'flatRoot') {
    return { src: `${base}/${id}.mp4`, poster: `${base}/${id}.jpg` };
  }
  if (layout === 'folder1080') {
    return { src: `${base}/1080p/${id}.mp4`, poster: `${base}/thumbnail/${id}.jpg` };
  }
  return {
    src: `${base}/preview/1080p/${id}.mp4`,
    poster: `${base}/thumbnail/${id}.jpg`,
  };
}

type TapeCellProps = { poster: string; src: string };

const TapeCell: FunctionComponent<TapeCellProps> = ({ poster, src }) => {
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
        src={src}
        poster={poster}
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

const stripFrame =
  'grid w-full min-w-0 gap-0 overflow-x-clip overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

export type SeriesTapeProps = {
  /** e.g. `/commercial/2026/nia-context-week` or `/mastra-series-a` (under `public/`) */
  base: string;
  /** Clip indices; paths depend on `assetLayout`. */
  clipIds: readonly number[];
  /** `nested1080`: `{base}/preview/1080p/{id}.mp4` + `{base}/thumbnail/{id}.jpg`. `flatRoot`: `{id}.mp4` + `{id}.jpg` in `base`. `folder1080`: `{base}/1080p/{id}.mp4` + `{base}/thumbnail/{id}.jpg` (e.g. `public/mastra-series-apreview/…`). */
  assetLayout?: SeriesTapeAssetLayout;
  /**
   * `end`: right-align the strip; each cell stays **1/6 of the row width** (same as a 6-up reel),
   * so fewer clips don’t grow wider than Nia’s frames. Ignored when `clipIds.length >= 6`.
   */
  pack?: 'full' | 'end';
  className?: string;
};

const SeriesTape: FunctionComponent<SeriesTapeProps> = ({
  assetLayout = 'nested1080',
  base,
  clipIds,
  className,
  pack = 'full',
}) => {
  const gridStyle = { gridTemplateColumns: `repeat(${clipIds.length}, minmax(0, 1fr))` } as const;

  const strip = (
    <div className={stripFrame} style={gridStyle}>
      {clipIds.map((id) => {
        const { poster, src } = clipUrls(assetLayout, base, id);
        return <TapeCell key={id} poster={poster} src={src} />;
      })}
    </div>
  );

  const packEnd = pack === 'end' && clipIds.length > 0 && clipIds.length < 6;
  const stripWidthPct = Math.min((clipIds.length / 6) * 100, 100);

  return (
    <div className={`w-full min-w-0 max-w-full overflow-x-clip ${className ?? ''}`.trim()}>
      {packEnd ? (
        <div className="flex w-full justify-end">
          <div className="min-w-0" style={{ width: `${stripWidthPct}%` }}>
            {strip}
          </div>
        </div>
      ) : (
        strip
      )}
    </div>
  );
};

export default SeriesTape;
