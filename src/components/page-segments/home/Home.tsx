import type { FunctionComponent } from 'react';
import NextLink from 'next/link';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <main className="flex min-h-svh w-full flex-col bg-[#fafafa] px-4 py-3 font-sans text-neutral-950 antialiased sm:px-6 sm:py-6">
      <div className="flex w-full max-w-md items-baseline justify-start gap-3">
        <h1 className="text-sm font-medium leading-tight tracking-normal sm:text-base">
          Benyam Ephrem
        </h1>
        <p className="text-[0.75rem] font-normal leading-tight tracking-normal text-neutral-500 sm:text-[0.8125rem]">
          writer · director · producer
        </p>
      </div>
      <div className="mt-5 h-52 w-full max-w-md overflow-hidden sm:h-60">
        <img
          src="/images/ben/arlan-context-week.jpg"
          alt="Benyam Ephrem on set"
          className="block h-full w-full object-cover grayscale"
        />
      </div>
      <p className="mt-4 max-w-md text-[0.8125rem] leading-[1.48] text-neutral-950 sm:text-[0.875rem]">
        Benyam Ephrem is an Ethiopian-American director and producer based in San Francisco. He wrote software for a
        decade. Now he produces film for startups.
      </p>
      <p className="mt-3 max-w-md text-[0.8125rem] leading-[1.48] text-neutral-950 sm:text-[0.875rem]">
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
          dest="https://x.com/bephrem/status/2031507677378212117?s=20"
          openInNewWindow
          className="!inline !text-blue-700 underline decoration-blue-600/70 underline-offset-2 hover:decoration-blue-700 hover:!text-blue-800"
        >
          <span>Silicon Valley Film Fund</span>
        </Link>
        . He is currently writing his first short film, shooting in 2026.
      </p>

      <section className="mt-10 max-w-md">
        <p className="text-[0.75rem] font-medium leading-tight text-neutral-600 sm:text-[0.8125rem]">Recent writing</p>

        <div className="mt-2 -ml-2 flex flex-col gap-1 sm:-ml-3">
          <a
            href="https://x.com/bephrem/status/2042701095626248225?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-inherit"
          >
            <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
              <span className="block text-right tabular-nums text-neutral-600">4.10.26</span>
              <span className="min-w-0">The Startup Content Studio: Everything You Need</span>
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
              <span className="block text-right tabular-nums text-neutral-600">3.10.26</span>
              <span className="min-w-0">Announcing: The Silicon Valley Film Fund</span>
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
              <span className="block text-right tabular-nums text-neutral-600">12.26.25</span>
              <span className="min-w-0">Why Silicon Valley Can’t Tell Its Own Stories</span>
              <span className="shrink-0 text-neutral-500">↗</span>
            </span>
          </a>

          <NextLink href="/sinners" target="_blank" rel="noopener noreferrer" className="block w-full text-inherit">
            <span className="grid w-full grid-cols-[4.75rem_1fr_auto] items-baseline gap-x-6 text-[0.8125rem] leading-snug text-neutral-800 hover:text-neutral-950 sm:text-[0.875rem]">
              <span className="block text-right tabular-nums text-neutral-600">6.22.25</span>
              <span className="min-w-0">Analyzing &quot;Sinners&quot; — By Ryan Coogler</span>
              <span className="shrink-0 text-neutral-500">↗</span>
            </span>
          </NextLink>
        </div>
      </section>

      <p className="mt-10 max-w-md text-[0.8125rem] leading-snug text-neutral-700 sm:text-[0.875rem]">
        ben@bephrem.studio
      </p>

      <footer className="mt-auto max-w-md pt-10 text-neutral-500">
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
    </main>
  );
};

export default Home;
