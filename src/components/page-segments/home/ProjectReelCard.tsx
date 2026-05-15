import NextLink from 'next/link';
import type { FunctionComponent } from 'react';
import { useCallback, useRef } from 'react';

type ReelBase = {
  href: string;
  title: string;
  line1: string;
  line2: string;
};

export type ProjectReelCardProps =
  | (ReelBase & { imageSrc: string; imageAlt?: string })
  | (ReelBase & { videoSrc: string; posterSrc: string });

const mediaClassName =
  'pointer-events-none h-full w-full object-cover transition-[transform] duration-700 ease-out will-change-transform group-hover:scale-[1.07] group-hover:-translate-y-[3%]';

const ProjectReelCard: FunctionComponent<ProjectReelCardProps> = (props) => {
  const { href, title, line1, line2 } = props;
  const useVideo = 'videoSrc' in props;
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = useCallback(() => {
    if (!useVideo) return;
    const el = videoRef.current;
    if (!el) return;
    void el.play().catch(() => {
      /* autoplay policies / empty buffer */
    });
  }, [useVideo]);

  const handleLeave = useCallback(() => {
    if (!useVideo) return;
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, [useVideo]);

  const hoverHandlers = useVideo
    ? {
        onMouseEnter: handleEnter,
        onMouseLeave: handleLeave,
        onFocus: handleEnter,
        onBlur: handleLeave
      }
    : {};

  return (
    <NextLink
      href={href}
      className="group block max-w-md outline-none ring-offset-2 ring-offset-[#fafafa] focus-visible:ring-2 focus-visible:ring-neutral-400"
      {...hoverHandlers}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
        {useVideo ? (
          <video
            ref={videoRef}
            src={props.videoSrc}
            poster={props.posterSrc}
            muted
            playsInline
            loop
            preload="metadata"
            className={mediaClassName}
            aria-hidden
          />
        ) : (
          <img src={props.imageSrc} alt={props.imageAlt ?? ''} className={mediaClassName} />
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h2 className="text-sm font-medium text-neutral-950 decoration-neutral-400 decoration-1 underline-offset-4 group-hover:underline">
          {title}
        </h2>
        <p className="text-[0.75rem] leading-snug text-neutral-500">{line1}</p>
        <p className="text-[0.75rem] leading-snug text-neutral-500">{line2}</p>
      </div>
    </NextLink>
  );
};

export default ProjectReelCard;
