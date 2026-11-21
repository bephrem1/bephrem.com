import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { FunctionComponent, MouseEvent } from 'react';
import { turnToPage } from '../../../helpers/page-turn';

type SfFilmClubProps = {
  /** When set, the heading opens this page. */
  titleHref?: string;
};

const SfFilmClub: FunctionComponent<SfFilmClubProps> = ({ titleHref }) => {
  const router = useRouter();

  const openTitle = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!titleHref) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    turnToPage(titleHref, (href) => router.push(href));
  };

  const titleClass = 'text-[0.75rem] font-medium leading-tight text-neutral-600 sm:text-[0.8125rem]';

  return (
    <section className="min-w-0">
      {titleHref ? (
        <NextLink href={titleHref} onClick={openTitle} className={`${titleClass} hover:text-neutral-950`}>
          SF Film Club
        </NextLink>
      ) : (
        <p className={titleClass}>SF Film Club</p>
      )}

      <div className="mt-2 flex flex-col gap-1">
        <div className="flex w-full items-baseline gap-x-3 text-[0.8125rem] leading-snug text-neutral-800 sm:text-[0.875rem]">
          <span className="w-[4.75rem] shrink-0 text-left tabular-nums text-neutral-600">8.20.26</span>
          <span className="min-w-0 flex-1 truncate whitespace-nowrap">#5: Producing</span>
          <span className="relative left-[9px] ml-auto grid w-[5.1rem] shrink-0 grid-cols-[1.3rem_1.3rem_1.9rem] justify-items-start text-neutral-500">
            <a
              href="https://x.com/bephrem/status/2094945747548672257?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              x
            </a>
            <a
              href="https://www.youtube.com/watch?v=R3MKJrUvMPY"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              yt
            </a>
            <a
              href="https://x.com/bephrem/status/2092286245158457558?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-right hover:text-neutral-700"
            >
              stills
            </a>
          </span>
        </div>

        <div className="flex w-full items-baseline gap-x-3 text-[0.8125rem] leading-snug text-neutral-800 sm:text-[0.875rem]">
          <span className="w-[4.75rem] shrink-0 text-left tabular-nums text-neutral-600">6.25.26</span>
          <span className="min-w-0 flex-1 truncate whitespace-nowrap">#4: Writing</span>
          <span className="relative left-[9px] ml-auto grid w-[5.1rem] shrink-0 grid-cols-[1.3rem_1.3rem_1.9rem] justify-items-start text-neutral-500">
            <a
              href="https://x.com/bephrem/status/2074203604387504628?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              x
            </a>
            <a
              href="https://www.youtube.com/watch?v=yXlpm5MHC2U"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              yt
            </a>
            <a
              href="https://x.com/bephrem/status/2072431284048331106?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-right hover:text-neutral-700"
            >
              stills
            </a>
          </span>
        </div>

        <div className="flex w-full items-baseline gap-x-3 text-[0.8125rem] leading-snug text-neutral-800 sm:text-[0.875rem]">
          <span className="w-[4.75rem] shrink-0 text-left tabular-nums text-neutral-600">4.24.26</span>
          <span className="min-w-0 flex-1 truncate whitespace-nowrap">#3: Production Design &amp; Performance</span>
          <span className="relative left-[9px] ml-auto grid w-[5.1rem] shrink-0 grid-cols-[1.3rem_1.3rem_1.9rem] justify-items-start text-neutral-500">
            <a
              href="https://x.com/bephrem/status/2051404058347671934?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              x
            </a>
            <a
              href="https://www.youtube.com/watch?v=yaFBTCiYweA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              yt
            </a>
            <a
              href="https://x.com/bephrem/status/2049557330745020503?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-right hover:text-neutral-700"
            >
              stills
            </a>
          </span>
        </div>

        <div className="flex w-full items-baseline gap-x-3 text-[0.8125rem] leading-snug text-neutral-800 sm:text-[0.875rem]">
          <span className="w-[4.75rem] shrink-0 text-left tabular-nums text-neutral-600">3.19.26</span>
          <span className="min-w-0 flex-1 truncate whitespace-nowrap">#2: Second Screening</span>
          <span className="relative left-[9px] ml-auto grid w-[5.1rem] shrink-0 grid-cols-[1.3rem_1.3rem_1.9rem] justify-items-start text-neutral-500">
            <a
              href="https://x.com/bephrem/status/2039404935805382769?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              x
            </a>
            <a
              href="https://www.youtube.com/watch?v=bC2pyOxujyU"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              yt
            </a>
            <span className="invisible block w-full text-right">stills</span>
          </span>
        </div>

        <div className="flex w-full items-baseline gap-x-3 text-[0.8125rem] leading-snug text-neutral-800 sm:text-[0.875rem]">
          <span className="w-[4.75rem] shrink-0 text-left tabular-nums text-neutral-600">2.12.26</span>
          <span className="min-w-0 flex-1 truncate whitespace-nowrap">#1: First Screening</span>
          <span className="relative left-[9px] ml-auto grid w-[5.1rem] shrink-0 grid-cols-[1.3rem_1.3rem_1.9rem] justify-items-start text-neutral-500">
            <a
              href="https://x.com/bephrem/status/2023143256385863977?s=20"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              x
            </a>
            <a
              href="https://www.youtube.com/watch?v=DKPHYjGyu4U"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left hover:text-neutral-700"
            >
              yt
            </a>
            <span className="invisible block w-full text-right">stills</span>
          </span>
        </div>
      </div>
    </section>
  );
};

export default SfFilmClub;
