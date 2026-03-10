import type { FunctionComponent } from 'react';
import ArrowUpRightIcon from '../../../icons/lib/ArrowUpRightIcon';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';

const Home: FunctionComponent<EmptyObject> = () => {
  return (
    <div
      className="min-h-svh w-full flex items-start justify-start px-6 py-8"
      style={{ backgroundColor: '#fafaf9' }}
    >
      {/* Main content */}
      <div className="w-full max-w-xl flex flex-col items-start gap-4 text-left">
        <div
          aria-label="Benyam Ephrem"
          className="w-full max-w-md h-52 md:max-w-xl md:h-72 bg-center bg-cover"
          style={{ backgroundImage: "url('/images/ben/arlan-context-week.jpg')" }}
        />
        <div className="space-y-2">
          <p className="text-neutral-800 text-sm">
            Benyam Ephrem is an Ethiopian-American director and producer based in San Francisco. He wrote
            software for a decade, and now produces film for startups.
          </p>
          <p className="text-neutral-800 text-sm">
            He runs the{' '}
            <Link
              type="internal"
              dest="https://x.com/bephrem/status/2023143256385863977?s=20"
              openInNewWindow
            >
              <span className="text-blue-600 underline">SF Film Club</span>
            </Link>{' '}
            and the{' '}
            <Link type="internal" dest="https://svfilm.fund/" openInNewWindow>
              <span className="text-blue-600 underline">Silicon Valley Film Fund</span>
            </Link>
            . In his free time he enjoys studying cinema, reading scripts, reading about film, and asking Claude
            about film.
          </p>
        </div>
        <div className="space-y-1 mt-4">
          <p className="text-neutral-600 text-sm">
            Recent writing
          </p>
          <div className="flex flex-col gap-0.5 w-full">
            <Link
              type="internal"
              dest="https://svfilm.fund/"
              openInNewWindow
            >
              <span className="flex w-full items-center justify-between gap-2 text-neutral-700 text-sm">
                <span>Announcing: The Silicon Valley Film Fund</span>
                <ArrowUpRightIcon className="w-3 h-3 text-neutral-400" />
              </span>
            </Link>
            <Link
              type="internal"
              dest="https://writing.bephrem.com/p/why-silicon-valley-cant-tell-its-own-stories"
              openInNewWindow
            >
              <span className="flex w-full items-center justify-between gap-2 text-neutral-700 text-sm">
                <span>Why Silicon Valley Can&apos;t Tell Its Own Stories</span>
                <ArrowUpRightIcon className="w-3 h-3 text-neutral-400" />
              </span>
            </Link>
            <Link
              type="internal"
              dest="/sinners"
              openInNewWindow
            >
              <span className="flex w-full items-center justify-between gap-2 text-neutral-700 text-sm">
                <span>Analyzing &quot;Sinners&quot; — By Ryan Coogler</span>
                <ArrowUpRightIcon className="w-3 h-3 text-neutral-400" />
              </span>
            </Link>
          </div>
        </div>
        <div className="pt-2">
          <p className="text-neutral-600 text-sm">ben@bephrem.studio</p>
        </div>
        <div className="pt-4 space-y-1">
          <p className="text-neutral-500 text-xs">
            This site is a temporary page while I rebuild everything.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <Link
              type="internal"
              dest="https://x.com/bephrem"
              openInNewWindow
              className="text-neutral-500 hover:text-neutral-600 visited:text-neutral-500"
            >
              <span>X</span>
            </Link>
            <span>·</span>
            <Link
              type="internal"
              dest="https://www.linkedin.com/in/bephrem/"
              openInNewWindow
              className="text-neutral-500 hover:text-neutral-600 visited:text-neutral-500"
            >
              <span>LinkedIn</span>
            </Link>
            <span>·</span>
            <Link
              type="internal"
              dest="https://writing.bephrem.com/"
              openInNewWindow
              className="text-neutral-500 hover:text-neutral-600 visited:text-neutral-500"
            >
              <span>Writing</span>
            </Link>
            <span>·</span>
            <Link
              type="internal"
              dest="https://letterboxd.com/bephrem/"
              openInNewWindow
              className="text-neutral-500 hover:text-neutral-600 visited:text-neutral-500"
            >
              <span>Letterboxd</span>
            </Link>
          </div>
        </div>
      </div>
      {/* Reel - desktop / tablet */}
      <div className="hidden md:block fixed top-6 right-4 lg:right-6 w-[780px] lg:w-[1040px] overflow-hidden bg-black rounded-lg">
        <video
          src="/video/homepage/mini-reel.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        />
      </div>
      {/* Reel - mobile mini bottom-right */}
      <div className="md:hidden fixed bottom-4 right-4 w-32 overflow-hidden bg-black rounded-lg shadow-md">
        <video
          src="/video/homepage/mini-reel.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Home;
