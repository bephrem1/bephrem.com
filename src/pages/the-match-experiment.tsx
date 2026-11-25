import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, type FunctionComponent, type MouseEvent } from 'react';
import PosterLightbox from '../components/page-segments/home/PosterLightbox';
import { turnToPage, usePageTurnIn } from '../helpers/page-turn';
import { useDocumentHeadComponents } from '../hooks/page-headers';
import type { EmptyObject } from '../types/empty';

/**
 * Credits and the film file live in this block.
 * Leave a string empty until the file exists.
 *
 * A credit with a blank name is skipped. For cast, the role can be the
 * character ("June") or just "Cast".
 */

type Credit = {
  role: string;
  name: string;
};

const film = {
  title: 'The Match Experiment',
  filmed: 'November 2026',
  premiere: 'March 2027',
  logline: '',
  src: '',
  poster: ''
};

const written: Credit[] = [
  { role: 'Written and Directed by', name: 'Benyam Ephrem' },
  { role: 'Produced by', name: 'Benyam Ephrem' }
];

const cast: Credit[] = [
  { role: 'Neil', name: 'Will McMahan' },
  { role: 'Sophia', name: 'Katrien Van Riel' },
  { role: 'Grace', name: 'Red Hong' },
  { role: 'Marc', name: 'Christopher Glenn Cannon' },
  { role: 'Elizabeth', name: 'Katie McClanan' },
  { role: 'Dan', name: 'Jeremy Zieba' }
];

const crew: Credit[] = [
  { role: 'Director of Photography', name: 'Steven Zeng' },
  { role: '1st Assistant Director / UPM', name: 'Francisco Alvarez' },
  { role: 'Associate Producer / 2nd AD', name: 'Dylan Burns' },
  { role: 'Script Supervisor', name: 'Paris Hernandez' },
  { role: '1st Assistant Camera', name: 'Leonard Caoili' },
  { role: '1st Assistant Camera (Day 3)', name: 'Omar Matias' },
  { role: 'Gaffer', name: 'Will Khuu' },
  { role: 'Key Grip / Swing', name: 'Calvin Stearns-Ayster' },
  { role: 'Sound Mixer', name: 'Miguel Nieves' },
  { role: 'Sound Mixer (Day 1)', name: 'Kelly Duong' },
  { role: 'Sound Mixer (Day 3)', name: 'Patrick Ta' },
  { role: 'Boom Operator', name: 'Marco Guzman' },
  { role: 'Hair & Makeup', name: 'Carla Grace Fajardo' },
  { role: 'Hair & Makeup Assistant', name: 'Nova Simcoe' },
  { role: 'Production Assistant', name: 'Brandon Chen' },
  { role: 'Casting Director (Neil)', name: 'Taylor Lambert' },
  { role: 'BTS Stills', name: 'Aziz Kadyrbekov' },
  { role: 'BTS Video (Day 1–3)', name: 'Oliver Wang' },
  { role: 'BTS Video (Day 4–5)', name: 'Brandon Hresko' }
];

const post: Credit[] = [
  { role: 'Editor', name: 'Mito' },
  { role: 'Colorist', name: 'George Kamenov' },
  { role: 'Composer', name: 'Momo Ward' },
];

const background = [
  'Akila Rajesh',
  'Alizza Danika',
  'Ananya Yogi',
  'Anjali Tripathi',
  'Daniel Chan-Artiga',
  'Dominique Buford',
  'George',
  'Hannah Hansen',
  'Jacqueline Quale',
  'Jason Dewri',
  'Jennifer Nguyen',
  'Jenny Yip',
  'Joey',
  'Jorge Oliva',
  'Kunal Varkekar',
  'Leo Rodriguez',
  'Rachel Rio',
  'Robert Hess',
  'Rory Wiedemann',
  'Ryan Choi',
  'Ryan Lan',
  'Salome Gitau',
  'Sandra Zalas',
  'Sherelie Lum'
];

const WRAP_STILL = '/narrative/the-match-experiment/bts/stills/TME_Wrap_2026-11-15.jpg';

const labelClass = 'text-[0.75rem] font-medium leading-tight text-neutral-600 sm:text-[0.8125rem]';

const MatchExperimentPage: FunctionComponent<EmptyObject> = () => {
  const router = useRouter();
  usePageTurnIn();

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    turnToPage('/', (href) => router.push(href));
  };

  const { SEOTags } = useDocumentHeadComponents({
    title: 'The Match Experiment',
    description: 'A short film by Benyam Ephrem. In post-production. Premieres March 2027.'
  });

  return (
    <>
      <Head>{SEOTags}</Head>
      <main className="min-h-svh bg-[#fafafa] px-4 py-5 font-sans text-neutral-950 antialiased sm:px-6 sm:py-6">
        <div className="mx-auto w-full max-w-5xl pb-24">
          <NextLink
            href="/"
            onClick={goHome}
            className="text-[0.8125rem] leading-tight text-neutral-500 hover:text-neutral-950 sm:text-[0.875rem]"
          >
            Benyam Ephrem
          </NextLink>

          <FilmFrame />

          <div className="mt-4">
            <h1 className="!text-[0.9375rem] !font-medium !leading-tight tracking-normal sm:!text-base">
              {film.title}
            </h1>
            <p className="mt-1 !text-[0.8125rem] !leading-snug text-neutral-600 sm:!text-[0.875rem]">
              Short film · Filmed <span className="whitespace-nowrap">{film.filmed}</span> ·{' '}
              <span className="whitespace-nowrap">Premieres {film.premiere}</span>
            </p>
            {film.logline ? (
              <p className="mt-3 max-w-xl !text-[0.8125rem] !leading-[1.5] text-neutral-950 sm:!text-[0.875rem]">
                {film.logline}
              </p>
            ) : null}
          </div>

          <section className="mt-10 max-w-xl">
            <h2 className={`${labelClass} !text-[0.75rem] !font-medium !leading-tight sm:!text-[0.8125rem]`}>Credits</h2>
            <dl className="mt-3 grid w-max max-w-full grid-cols-[max-content_auto] items-baseline gap-x-[calc(1.5rem+2ch)] gap-y-1">
              <CreditRows lines={written} />
              <CreditHeading>Cast</CreditHeading>
              <CreditRows lines={cast} />
              <CreditHeading>Crew</CreditHeading>
              <CreditRows lines={crew} />
              <CreditHeading>Post-Production</CreditHeading>
              <CreditRows lines={post} />
            </dl>
            <div className="mt-6">
              <h3 className="text-[0.75rem] font-medium leading-tight text-neutral-500 sm:text-[0.8125rem]">Background</h3>
              <ul className="mt-2 flex flex-col gap-1">
                {background.map((name) => (
                  <li key={name} className="text-[0.8125rem] leading-snug sm:text-[0.875rem]">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <h3 className="text-[0.75rem] font-medium leading-tight text-neutral-500 sm:text-[0.8125rem]">
                Executive producers
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-snug text-neutral-500 sm:text-[0.875rem]">(to be announced)</p>
            </div>
            <p className="mt-6 text-[0.8125rem] leading-snug text-neutral-600 sm:text-[0.875rem]">
              Filmed at{' '}
              <a
                href="https://maps.app.goo.gl/21m2BvwKcwgkSueP8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-300 underline-offset-2 hover:decoration-neutral-500"
              >
                The Nook
              </a>
              , San Francisco
            </p>
          </section>

          <div className="mt-16">
            <PosterLightbox
              src={WRAP_STILL}
              alt="The Match Experiment wrap"
              className="h-auto w-full"
              imgClassName="h-auto w-full object-contain"
            />
          </div>

          <p className="mt-16 text-[0.8125rem] leading-snug text-neutral-500 sm:text-[0.875rem] lg:text-center">
            <button
              type="button"
              onClick={() => {
                const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
              }}
              className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-950 hover:decoration-neutral-500"
            >
              back to top
            </button>
            <span className="mx-2 text-neutral-400" aria-hidden>
              ·
            </span>
            <NextLink
              href="/"
              onClick={goHome}
              className="underline decoration-neutral-300 underline-offset-2 hover:text-neutral-950 hover:decoration-neutral-500"
            >
              go home
            </NextLink>
          </p>
        </div>
      </main>
    </>
  );
};

const creditLineClass = 'text-[0.8125rem] leading-snug sm:text-[0.875rem]';

const CreditRows: FunctionComponent<{ lines: Credit[] }> = ({ lines }) => (
  <>
    {lines.map((credit) => (
      <Fragment key={`${credit.role}-${credit.name}`}>
        <dt className={`text-neutral-500 ${creditLineClass}`}>{credit.role}</dt>
        <dd className={creditLineClass}>{credit.name}</dd>
      </Fragment>
    ))}
  </>
);

const CreditHeading: FunctionComponent<{ children: string }> = ({ children }) => (
  <div className="col-span-2 mb-2 mt-5">
    <h3 className="text-[0.75rem] font-medium leading-tight text-neutral-500 sm:text-[0.8125rem]">{children}</h3>
  </div>
);

const FilmFrame: FunctionComponent<EmptyObject> = () => {
  if (film.src) {
    return (
      <video
        className="mt-5 block w-full bg-black"
        src={film.src}
        poster={film.poster || undefined}
        controls
        playsInline
        preload="metadata"
      />
    );
  }

  if (film.poster) {
    return (
      <div className="relative mt-5 aspect-[1.85/1] w-full bg-black">
        <img src={film.poster} alt="" className="h-full w-full object-cover" />
        <p className="absolute bottom-3 left-3 !text-[0.75rem] !leading-tight text-white/80 sm:!text-[0.8125rem]">in post-production</p>
      </div>
    );
  }

  return (
    <div className="relative mt-5 aspect-[1.85/1] w-full bg-black">
      <p className="absolute bottom-3 left-3 !text-[0.75rem] !leading-tight text-neutral-400 sm:bottom-4 sm:left-4 sm:!text-[0.8125rem]">
        in post-production
      </p>
    </div>
  );
};

export default MatchExperimentPage;
