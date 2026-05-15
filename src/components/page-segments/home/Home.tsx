import NextLink from 'next/link';
import type { FunctionComponent } from 'react';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';
import CommercialTape from './CommercialTape';
import SeriesTape from './SeriesTape';

const MASTRA_BASE = '/commercial/2026/mastra-series-a';
const ARLAN_INTERVIEW_BASE = '/commercial/2025/interview-arlan-rakhmetzhanov';
const LOCALHOST_EP1_BASE = '/commercial/2026/localhost-ep-1';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <main className="flex min-h-svh w-full min-w-0 flex-col overflow-x-clip bg-[#fafafa] px-4 pb-3 pt-5 font-sans text-neutral-950 antialiased sm:px-6 sm:py-6">
      <div className="grid min-h-0 w-full min-w-0 max-w-full flex-1 grid-cols-1 content-start gap-y-5 pb-3 sm:pb-4 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:items-start lg:gap-x-8 lg:gap-y-5 lg:pb-4">
        <div className="mx-auto w-full max-w-md lg:mx-0 lg:col-start-1 lg:row-start-1">
          <div className="flex w-full items-baseline justify-between gap-3">
            <h1 className="text-sm font-medium leading-tight tracking-normal sm:text-base">
              Benyam Ephrem
            </h1>
            <p className="text-[0.75rem] font-normal leading-tight tracking-normal text-neutral-500 sm:text-[0.8125rem]">
              writer · director · producer
            </p>
          </div>
        </div>

        <div className="mx-auto aspect-[5/3] w-full max-w-md overflow-hidden lg:mx-0 lg:col-start-1 lg:row-start-2">
          <img
            src="/images/ben/arlan-context-week.jpg"
            alt="Benyam Ephrem on set"
            className="block h-full w-full object-cover object-center grayscale"
          />
        </div>

        <div className="mx-auto w-full max-w-md lg:mx-0 lg:col-start-1 lg:row-start-3">
          <p className="text-[0.8125rem] leading-[1.48] text-neutral-950 sm:text-[0.875rem]">
            Benyam Ephrem is an Ethiopian-American director and producer based in San Francisco. He wrote software for a
            decade. Now he produces film for startups.
          </p>
          <p className="mt-3 text-[0.8125rem] leading-[1.48] text-neutral-950 sm:text-[0.875rem]">
            He runs the{' '}
            <Link
              type="external"
              dest="https://x.com/bephrem/status/2023143256385863977?s=20"
              openInNewWindow
              className="!inline !text-blue-700 underline decoration-blue-600/70 underline-offset-2 hover:decoration-blue-700 hover:!text-blue-800"
            >
              <span>SF Film Club</span>
            </Link>{' '}
            and the{' '}
            <Link
              type="external"
              dest="http://svfilm.fund/"
              openInNewWindow
              className="!inline !text-blue-700 underline decoration-blue-600/70 underline-offset-2 hover:decoration-blue-700 hover:!text-blue-800"
            >
              <span>Silicon Valley Film Fund</span>
            </Link>
            . He is currently writing his first short film, shooting in 2026.
          </p>
        </div>

        <aside className="hidden min-w-0 w-full max-w-full overflow-x-clip lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:block lg:self-start">
          <div className="mb-4 flex shrink-0 items-center gap-2 sm:mb-5">
            <span className="h-px w-3 shrink-0 bg-neutral-300 sm:w-4" aria-hidden />
            <span className="shrink-0 text-[0.58rem] font-medium tracking-[0.08em] text-neutral-500 sm:text-[0.6rem]">
              personal
            </span>
            <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
          </div>

          <div className="flex w-full flex-col items-stretch gap-2 sm:gap-2.5">
            <div className="flex w-full flex-wrap items-baseline justify-end gap-x-2 gap-y-1 text-right text-[0.75rem] font-normal leading-snug text-neutral-600 sm:text-[0.8125rem]">
              <span className="shrink-0">Interview: Arlan Rakhmetzhanov</span>
              <span className="shrink-0 text-neutral-400" aria-hidden>
                ·
              </span>
              <span className="min-w-0">30m interview, 4 clips</span>
              <span className="shrink-0 text-neutral-400" aria-hidden>
                ·
              </span>
              <span className="min-w-0 shrink-0">
                250k+ reach <span className="text-neutral-500">(X, YT)</span>
              </span>
            </div>
            <div className="w-full min-w-0">
              <SeriesTape base={ARLAN_INTERVIEW_BASE} clipIds={[1, 2, 3, 4]} pack="end" />
            </div>
          </div>

          <div className="mb-4 mt-6 flex shrink-0 items-center gap-2 sm:mb-5 sm:mt-7">
            <span className="h-px w-3 shrink-0 bg-neutral-300 sm:w-4" aria-hidden />
            <span className="shrink-0 text-[0.58rem] font-medium tracking-[0.08em] text-neutral-500 sm:text-[0.6rem]">
              commercial
            </span>
            <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
          </div>

          <div className="flex w-full flex-col gap-6 sm:gap-7">
            <div className="flex w-full flex-col items-stretch gap-2 sm:gap-2.5">
              <div className="flex w-full flex-wrap items-baseline justify-end gap-x-2 gap-y-1 text-right text-[0.75rem] font-normal leading-snug text-neutral-600 sm:text-[0.8125rem]">
                <span className="shrink-0">Localhost (ep.1)</span>
                <span className="shrink-0 text-neutral-400" aria-hidden>
                  ·
                </span>
                <span className="min-w-0">Series (pilot)</span>
                <span className="shrink-0 text-neutral-400" aria-hidden>
                  ·
                </span>
                <span className="min-w-0 shrink-0 text-neutral-500">in post-production</span>
              </div>
              <div className="w-full min-w-0">
                <SeriesTape base={LOCALHOST_EP1_BASE} clipIds={[1, 2, 3, 4, 5, 6]} />
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch gap-2 sm:gap-2.5">
              <div className="flex w-full flex-wrap items-baseline justify-end gap-x-2 gap-y-1 text-right text-[0.75rem] font-normal leading-snug text-neutral-600 sm:text-[0.8125rem]">
                <span className="shrink-0">Nia Context Week</span>
                <span className="shrink-0 text-neutral-400" aria-hidden>
                  ·
                </span>
                <span className="min-w-0">6-part series</span>
                <span className="shrink-0 text-neutral-400" aria-hidden>
                  ·
                </span>
                <span className="min-w-0 shrink-0">
                  750k+ reach <span className="text-neutral-500">(X, LinkedIn)</span>
                </span>
              </div>
              <div className="w-full min-w-0">
                <CommercialTape />
              </div>
            </div>

            <div className="flex w-full flex-col items-stretch gap-2 sm:gap-2.5">
              <div className="flex w-full flex-wrap items-baseline justify-end gap-x-2 gap-y-1 text-right text-[0.75rem] font-normal leading-snug text-neutral-600 sm:text-[0.8125rem]">
                <span className="shrink-0">Mastra Series A</span>
                <span className="shrink-0 text-neutral-400" aria-hidden>
                  ·
                </span>
                <span className="min-w-0">Fundraise</span>
                <span className="shrink-0 text-neutral-400" aria-hidden>
                  ·
                </span>
                <span className="min-w-0 shrink-0">
                  300k+ reach <span className="text-neutral-500">(X, LinkedIn)</span>
                </span>
              </div>
              <div className="w-full min-w-0">
                <SeriesTape base={MASTRA_BASE} clipIds={[1, 2, 3]} pack="end" />
              </div>
            </div>
          </div>
        </aside>

        <div className="mx-auto flex min-h-0 w-full max-w-md flex-col gap-8 lg:mx-0 lg:col-start-1 lg:row-start-4 lg:gap-10">
          <section>
            <p className="text-[0.75rem] font-medium leading-tight text-neutral-600 sm:text-[0.8125rem]">Recent writing</p>

            <div className="mt-2 flex flex-col gap-1">
              <a
                href="https://x.com/bephrem/status/2042701095626248225?s=20"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-inherit"
              >
                <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                  <span className="block text-left tabular-nums text-neutral-600">
                    <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                      <span className="text-left">4</span>
                      <span>.</span>
                      <span className="text-right">10</span>
                      <span>.</span>
                      <span className="text-right">26</span>
                    </span>
                  </span>
                  <span className="min-w-0 truncate whitespace-nowrap">The Startup Content Studio: Everything You Need</span>
                  <span className="shrink-0 text-neutral-500">↗</span>
                </span>
              </a>
              <a
                href="https://x.com/bephrem/status/2031507677378212117?s=20"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-inherit"
              >
                <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                  <span className="block text-left tabular-nums text-neutral-600">
                    <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                      <span className="text-left">3</span>
                      <span>.</span>
                      <span className="text-right">10</span>
                      <span>.</span>
                      <span className="text-right">26</span>
                    </span>
                  </span>
                  <span className="min-w-0 truncate whitespace-nowrap">Announcing: The Silicon Valley Film Fund</span>
                  <span className="shrink-0 text-neutral-500">↗</span>
                </span>
              </a>

              <a
                href="https://writing.bephrem.com/p/why-silicon-valley-cant-tell-its-own-stories"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-inherit"
              >
                <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                  <span className="block text-left tabular-nums text-neutral-600">
                    <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                      <span className="text-left">12</span>
                      <span>.</span>
                      <span className="text-right">26</span>
                      <span>.</span>
                      <span className="text-right">25</span>
                    </span>
                  </span>
                  <span className="min-w-0 truncate whitespace-nowrap">Why Silicon Valley Can’t Tell Its Own Stories</span>
                  <span className="shrink-0 text-neutral-500">↗</span>
                </span>
              </a>

              <NextLink href="/sinners" target="_blank" rel="noopener noreferrer" className="block w-full text-inherit">
                <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                  <span className="block text-left tabular-nums text-neutral-600">
                    <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                      <span className="text-left">6</span>
                      <span>.</span>
                      <span className="text-right">22</span>
                      <span>.</span>
                      <span className="text-right">25</span>
                    </span>
                  </span>
                  <span className="min-w-0 truncate whitespace-nowrap">Analyzing &quot;Sinners&quot; — By Ryan Coogler</span>
                  <span className="shrink-0 text-neutral-500">↗</span>
                </span>
              </NextLink>
            </div>
          </section>

          <section>
            <p className="text-[0.75rem] font-medium leading-tight text-neutral-600 sm:text-[0.8125rem]">SF Film Club</p>

            <div className="mt-2 flex flex-col gap-1">
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

          <p className="mt-10 text-[0.8125rem] leading-snug text-neutral-700 sm:text-[0.875rem] lg:mt-0">ben@bephrem.studio</p>

          <footer className="max-w-md pt-10 text-neutral-500">
            <div className="flex flex-wrap items-center gap-x-2 text-[0.75rem] sm:text-[0.8125rem]">
              <Link type="external" dest="https://x.com/bephrem" openInNewWindow className="!text-neutral-500 hover:!text-neutral-700">
                <span>X</span>
              </Link>
              <span className="text-neutral-400">·</span>
              <Link
                type="external"
                dest="https://writing.bephrem.com/"
                openInNewWindow
                className="!text-neutral-500 hover:!text-neutral-700"
              >
                <span>Writing</span>
              </Link>
              <span className="text-neutral-400">·</span>
              <Link
                type="external"
                dest="https://www.instagram.com/bephrem_"
                openInNewWindow
                className="!text-neutral-500 hover:!text-neutral-700"
              >
                <span>Instagram</span>
              </Link>
              <span className="text-neutral-400">·</span>
              <Link
                type="external"
                dest="https://www.youtube.com/@bephrem"
                openInNewWindow
                className="!text-neutral-500 hover:!text-neutral-700"
              >
                <span>YouTube</span>
              </Link>
              <span className="text-neutral-400">·</span>
              <Link
                type="external"
                dest="https://letterboxd.com/bephrem/"
                openInNewWindow
                className="!text-neutral-500 hover:!text-neutral-700"
              >
                <span>Letterboxd</span>
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Home;
