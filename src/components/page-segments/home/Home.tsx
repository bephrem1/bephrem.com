import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { FunctionComponent, MouseEvent } from 'react';
import { turnToPage, usePageTurnIn } from '../../../helpers/page-turn';
import type { PrevisStill } from '../../../helpers/previs-stills';
import Link from '../../shared/elements/Link';
import SfFilmClub from '../sffilmclub/SfFilmClub';
import CommercialTape from './CommercialTape';
import PosterLightbox from './PosterLightbox';
import PrevisReel from './PrevisReel';
import ScriptBook, { PAGE_ASPECT } from './ScriptBook';
import SeriesTape from './SeriesTape';

const MASTRA_BASE = '/commercial/2026/mastra-series-a';
const ARLAN_INTERVIEW_BASE = '/commercial/2025/interview-arlan-rakhmetzhanov';
const LOCALHOST_EP1_BASE = '/commercial/2026/localhost-ep-1';

const WORK_SAMPLE_LINK_CLASS =
  'underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-400';

const NIA_X_LINKS = [
  'https://x.com/arlanr/status/2028530967351304231?s=20',
  'https://x.com/arlanr/status/2028924623664939493',
  'https://x.com/arlanr/status/2029331075097592089?s=46',
  'https://x.com/arlanr/status/2029694842281001411?s=20',
  'https://x.com/arlanr/status/2030061940039721191?s=20',
  'https://x.com/arlanr/status/2035096691297366462?s=20',
] as const;

const NIA_LINKEDIN_LINKS = [
  'https://www.linkedin.com/posts/arlan-rakhmetzhanov_introducing-nozomio-v1-the-best-search-and-activity-7434296824850612224-zhi-',
  'https://www.linkedin.com/posts/arlan-rakhmetzhanov_introducing-nozomio-index-api-our-mission-activity-7434690386729705472-ZPdZ/',
  'https://www.linkedin.com/posts/arlan-rakhmetzhanov_introducing-nozomio-search-our-mission-is-activity-7435096839940440064-zpLY',
  'https://www.linkedin.com/posts/arlan-rakhmetzhanov_introducing-nozomio-sync-one-of-the-biggest-activity-7435715870754091009-wv21',
  'https://www.linkedin.com/posts/arlan-rakhmetzhanov_we-built-a-40-better-pdf-search-today-activity-7436825204368105472-DmqR',
  'https://www.linkedin.com/posts/arlan-rakhmetzhanov_nozomio-labs-is-hiring-and-we-are-staying-activity-7440862342084554752-VUEH',
] as const;

const ARLAN_CLIP_LINKS = [
  'https://x.com/bephrem/status/1954920748381876691?s=20',
  'https://x.com/bephrem/status/1955290680391086237?s=20',
  'https://x.com/bephrem/status/1955660624807043510?s=20',
  'https://x.com/bephrem/status/1956015262937100439?s=20',
] as const;

type HomeProps = {
  previsStills: PrevisStill[];
  scriptPages: string[];
};

const Home: FunctionComponent<HomeProps> = ({ previsStills, scriptPages }) => {
  const router = useRouter();
  usePageTurnIn();

  const openInternal = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    turnToPage(href, (next) => router.push(next));
  };

  return (
    <main className="flex min-h-svh w-full min-w-0 flex-col overflow-x-clip bg-[#fafafa] px-4 pb-3 pt-5 font-sans text-neutral-950 antialiased sm:px-6 sm:py-6">
      <div className="grid min-h-0 w-full min-w-0 max-w-full flex-1 grid-cols-1 content-start gap-y-5 pb-3 sm:pb-4 lg:grid-cols-[minmax(0,28rem)_minmax(0,1fr)] lg:items-start lg:gap-x-8 lg:gap-y-0 lg:pb-4">
        <div className="contents lg:col-start-1 lg:row-start-1 lg:flex lg:min-w-0 lg:max-w-md lg:flex-col lg:gap-y-5 lg:self-start">
          <div className="mx-auto w-full max-w-md lg:mx-0">
            <div className="flex w-full items-baseline justify-between gap-3">
              <h1 className="text-sm font-medium leading-tight tracking-normal sm:text-base">
                Benyam Ephrem
              </h1>
              <p className="text-[0.75rem] font-normal leading-tight tracking-normal text-neutral-500 sm:text-[0.8125rem]">
                writer · director
              </p>
            </div>
          </div>

          <div className="mx-auto aspect-[5/3] w-full max-w-md overflow-hidden lg:mx-0">
            <PosterLightbox
              src="/images/ben/site-hero.jpg"
              alt="Benyam Ephrem on set"
              imgClassName="grayscale"
              desktopOnly
            />
          </div>

          <div className="mx-auto w-full max-w-md lg:mx-0">
            <p className="text-[0.8125rem] leading-[1.48] text-neutral-950 sm:text-[0.875rem]">
              Benyam Ephrem is an Ethiopian-American writer, director, and producer based in San Francisco. He wrote software for a
              decade. Now he creates films on the tech industry.
            </p>
            <p className="mt-3 text-[0.8125rem] leading-[1.48] text-neutral-950 sm:text-[0.875rem]">
              He runs the{' '}
              <NextLink
                href="/sffilmclub"
                onClick={openInternal('/sffilmclub')}
                className="text-blue-700 underline decoration-blue-600/70 underline-offset-2 hover:text-blue-800 hover:decoration-blue-700"
              >
                SF Film Club
              </NextLink>{' '}
              and the{' '}
              <Link
                type="external"
                dest="http://svfilm.fund/"
                openInNewWindow
                className="!inline !text-blue-700 underline decoration-blue-600/70 underline-offset-2 hover:decoration-blue-700 hover:!text-blue-800"
              >
                <span>Silicon Valley Film Fund</span>
              </Link>
              . He is currently in post-production on his first short film{' '}
              <NextLink
                href="/narrative/the-match-experiment"
                onClick={openInternal('/narrative/the-match-experiment')}
                className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-400"
              >
                The Match Experiment
              </NextLink>
              , premiering March ’27.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-col gap-8 lg:mx-0 lg:gap-10">
            <div className="mt-1 flex flex-col gap-6">
              <ul className="grid grid-cols-[minmax(0,calc((100%-0.375rem)/3+2ch))_minmax(0,1fr)] gap-x-1.5 gap-y-1 text-[0.75rem] leading-snug">
                <li className="col-span-2 grid grid-cols-subgrid items-center text-neutral-800">
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <NextLink
                      href="/narrative/the-match-experiment"
                      onClick={openInternal('/narrative/the-match-experiment')}
                      className="shrink-0 underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-400"
                    >
                      The Match Experiment
                    </NextLink>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                  </span>
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <span className="shrink-0 text-neutral-600">writer-director</span>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                    <span className="shrink-0 text-neutral-500">post-production</span>
                  </span>
                </li>
                <li className="col-span-2 grid grid-cols-subgrid items-center text-neutral-800">
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <span className="shrink-0">Digital Silence</span>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                  </span>
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <span className="shrink-0 text-neutral-600">executive producer</span>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                    <span className="shrink-0 text-neutral-500">post-production</span>
                  </span>
                </li>
                <li className="col-span-2 grid grid-cols-subgrid items-center text-neutral-500">
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <span className="shrink-0">(unannounced)</span>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                  </span>
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <span className="shrink-0">executive producer</span>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                    <span className="shrink-0">Spring ’27</span>
                  </span>
                </li>
                <li className="col-span-2 grid grid-cols-subgrid items-center text-neutral-500">
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <span className="shrink-0">(unannounced)</span>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                  </span>
                  <span className="flex min-w-0 items-center gap-x-1.5">
                    <span className="shrink-0">executive producer</span>
                    <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                    <span className="shrink-0">Spring ’27</span>
                  </span>
                </li>
              </ul>

              <section>
                <p className="text-[0.75rem] font-medium leading-tight text-neutral-600 sm:text-[0.8125rem]">Recent writing</p>

                <div className="mt-2 flex flex-col gap-1">
                  <a
                    href="https://x.com/bephrem/status/2085516034107469882?s=20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-inherit"
                  >
                    <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                      <span className="block text-left tabular-nums text-neutral-600">
                        <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                          <span className="text-left">8</span>
                          <span>.</span>
                          <span className="text-right">6</span>
                          <span>.</span>
                          <span className="text-right">26</span>
                        </span>
                      </span>
                      <span className="min-w-0 truncate whitespace-nowrap">The Tech Filmmaking Scene (August 2026)</span>
                      <span className="shrink-0 text-neutral-500">↗</span>
                    </span>
                  </a>
                  <a
                    href="https://writing.bephrem.com/p/svff-cycle-1-room-tone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-inherit"
                  >
                    <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                      <span className="block text-left tabular-nums text-neutral-600">
                        <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                          <span className="text-left">7</span>
                          <span>.</span>
                          <span className="text-right">10</span>
                          <span>.</span>
                          <span className="text-right">26</span>
                        </span>
                      </span>
                      <span className="min-w-0 truncate whitespace-nowrap">SVFF Cycle 1: Room Tone</span>
                      <span className="shrink-0 text-neutral-500">↗</span>
                    </span>
                  </a>
                  <a
                    href="https://writing.bephrem.com/p/production-design-series-b-office"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-inherit"
                  >
                    <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                      <span className="block text-left tabular-nums text-neutral-600">
                        <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                          <span className="text-left">7</span>
                          <span>.</span>
                          <span className="text-right">7</span>
                          <span>.</span>
                          <span className="text-right">26</span>
                        </span>
                      </span>
                      <span className="min-w-0 truncate whitespace-nowrap">Production Design: Series B Office</span>
                      <span className="shrink-0 text-neutral-500">↗</span>
                    </span>
                  </a>
                  <a
                    href="https://x.com/bephrem/status/2066618376466931940"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-inherit"
                  >
                    <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                      <span className="block text-left tabular-nums text-neutral-600">
                        <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                          <span className="text-left">6</span>
                          <span>.</span>
                          <span className="text-right">15</span>
                          <span>.</span>
                          <span className="text-right">26</span>
                        </span>
                      </span>
                      <span className="min-w-0 truncate whitespace-nowrap">14 Things I Look for in a Script</span>
                      <span className="shrink-0 text-neutral-500">↗</span>
                    </span>
                  </a>
                  <a
                    href="https://x.com/bephrem/status/2059343773965172956?s=20"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-inherit"
                  >
                    <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
                      <span className="block text-left tabular-nums text-neutral-600">
                        <span className="inline-grid grid-cols-[2ch_auto_2ch_auto_2ch]">
                          <span className="text-left">5</span>
                          <span>.</span>
                          <span className="text-right">26</span>
                          <span>.</span>
                          <span className="text-right">26</span>
                        </span>
                      </span>
                      <span className="min-w-0 truncate whitespace-nowrap">The Tech Filmmaking Scene (May 2026)</span>
                      <span className="shrink-0 text-neutral-500">↗</span>
                    </span>
                  </a>
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

              <SfFilmClub titleHref="/sffilmclub" />
            </div>

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
                  dest="https://letterboxd.com/bephrem/"
                  openInNewWindow
                  className="!text-neutral-500 hover:!text-neutral-700"
                >
                  <span>Letterboxd</span>
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
                  dest="https://www.imdb.com/name/nm18722821/"
                  openInNewWindow
                  className="!text-neutral-500 hover:!text-neutral-700"
                >
                  <span>IMDb</span>
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
              </div>
            </footer>
          </div>
        </div>

        <aside className="hidden w-full min-w-0 max-w-full lg:sticky lg:top-6 lg:col-start-2 lg:row-start-1 lg:block lg:self-start lg:[container-type:inline-size]">
          <div className="flex flex-col">
            <div className="mb-4 shrink-0 sm:mb-5">
              <PrevisReel stills={previsStills} />
            </div>

            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className="w-auto shrink-0"
                style={{
                  height: 'calc(100svh - 3rem - (100cqi * 3 / 32) - 1.25rem)',
                  aspectRatio: PAGE_ASPECT,
                }}
              >
                <ScriptBook pages={scriptPages} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-4 flex shrink-0 items-center gap-2 sm:mb-5">
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
                      <span className="min-w-0 shrink-0 text-neutral-400">in post-production</span>
                    </div>
                    <div className="w-full min-w-0">
                      <SeriesTape base={LOCALHOST_EP1_BASE} clipIds={[1, 2, 3, 4, 5, 6]} columns={3} />
                    </div>
                  </div>

                  <div className="flex w-full flex-col items-stretch gap-2 sm:gap-2.5">
                    <div className="flex w-full flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[0.75rem] font-normal leading-snug text-neutral-600 sm:text-[0.8125rem]">
                      <span className="shrink-0 text-neutral-500">
                        X (
                        {NIA_X_LINKS.map((href, i) => (
                          <span key={href}>
                            {i > 0 ? ', ' : null}
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={WORK_SAMPLE_LINK_CLASS}
                            >
                              {i + 1}
                            </a>
                          </span>
                        ))}
                        )
                        {'\u00A0\u00A0\u00A0'}
                        LinkedIn (
                        {NIA_LINKEDIN_LINKS.map((href, i) => (
                          <span key={href}>
                            {i > 0 ? ', ' : null}
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={WORK_SAMPLE_LINK_CLASS}
                            >
                              {i + 1}
                            </a>
                          </span>
                        ))}
                        )
                      </span>
                      <div className="flex min-w-0 flex-wrap items-baseline justify-end gap-x-2 gap-y-1 text-right">
                        <span className="shrink-0">Nia Context Week</span>
                        <span className="shrink-0 text-neutral-400" aria-hidden>
                          ·
                        </span>
                        <span className="min-w-0">6-part series</span>
                        <span className="shrink-0 text-neutral-400" aria-hidden>
                          ·
                        </span>
                        <span className="min-w-0 shrink-0">750k+ reach</span>
                      </div>
                    </div>
                    <div className="w-full min-w-0">
                      <CommercialTape />
                    </div>
                  </div>

                  <div className="flex w-full flex-col items-stretch gap-2 sm:gap-2.5">
                    <div className="flex w-full flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[0.75rem] font-normal leading-snug text-neutral-600 sm:text-[0.8125rem]">
                      <span className="shrink-0 text-neutral-500">
                        <a
                          href="https://x.com/calcsam/status/2042287957974139245"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={WORK_SAMPLE_LINK_CLASS}
                        >
                          X
                        </a>
                        {'\u00A0\u00A0\u00A0'}
                        <a
                          href="https://www.linkedin.com/feed/update/urn:li:activity:7448063240703635456/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={WORK_SAMPLE_LINK_CLASS}
                        >
                          LinkedIn
                        </a>
                        {'\u00A0\u00A0\u00A0'}
                        <a
                          href="https://www.youtube.com/watch?v=snj7V0tFh6g"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={WORK_SAMPLE_LINK_CLASS}
                        >
                          YouTube
                        </a>
                      </span>
                      <div className="flex min-w-0 flex-wrap items-baseline justify-end gap-x-2 gap-y-1 text-right">
                        <span className="shrink-0">Mastra Series A</span>
                        <span className="shrink-0 text-neutral-400" aria-hidden>
                          ·
                        </span>
                        <span className="min-w-0">Fundraise</span>
                        <span className="shrink-0 text-neutral-400" aria-hidden>
                          ·
                        </span>
                        <span className="min-w-0 shrink-0">300k+ reach</span>
                      </div>
                    </div>
                    <div className="w-full min-w-0">
                      <SeriesTape base={MASTRA_BASE} clipIds={[1, 2, 3]} />
                    </div>
                  </div>
                </div>

                <div className="mb-4 mt-6 flex shrink-0 items-center gap-2 sm:mb-5 sm:mt-7">
                  <span className="h-px w-3 shrink-0 bg-neutral-300 sm:w-4" aria-hidden />
                  <span className="shrink-0 text-[0.58rem] font-medium tracking-[0.08em] text-neutral-500 sm:text-[0.6rem]">
                    personal
                  </span>
                  <span className="h-px min-w-0 flex-1 bg-neutral-300" aria-hidden />
                </div>

                <div className="flex w-full flex-col items-stretch gap-2 sm:gap-2.5">
                  <div className="flex w-full flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[0.75rem] font-normal leading-snug text-neutral-600 sm:text-[0.8125rem]">
                    <span className="shrink-0 text-neutral-500">
                      <a
                        href="https://x.com/bephrem/status/1960735147952889961?s=20"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={WORK_SAMPLE_LINK_CLASS}
                      >
                        X
                      </a>
                      {'\u00A0\u00A0\u00A0'}
                      clips (
                      {ARLAN_CLIP_LINKS.map((href, i) => (
                        <span key={href}>
                          {i > 0 ? ', ' : null}
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={WORK_SAMPLE_LINK_CLASS}
                          >
                            {i + 1}
                          </a>
                        </span>
                      ))}
                      )
                      {'\u00A0\u00A0\u00A0'}
                      <a
                        href="https://youtu.be/7hukPKD4Bhs?si=P1NvuyMhiCJ_rgwY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={WORK_SAMPLE_LINK_CLASS}
                      >
                        YouTube
                      </a>
                    </span>
                    <div className="flex min-w-0 flex-wrap items-baseline justify-end gap-x-2 gap-y-1 text-right">
                      <span className="shrink-0">Interview: Arlan Rakhmetzhanov</span>
                      <span className="shrink-0 text-neutral-400" aria-hidden>
                        ·
                      </span>
                      <span className="min-w-0">30m interview, 4 clips</span>
                      <span className="shrink-0 text-neutral-400" aria-hidden>
                        ·
                      </span>
                      <span className="min-w-0 shrink-0">250k+ reach</span>
                    </div>
                  </div>
                  <div className="w-full min-w-0">
                    <SeriesTape base={ARLAN_INTERVIEW_BASE} clipIds={[1, 2, 3, 4]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Home;
