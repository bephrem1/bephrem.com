import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { EXTERNAL_LINKS, INTERNAL_LINKS } from '../../../helpers/urls';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';
import Socials from '../../shared/socials/Socials';

const COLLAPSED_HEIGHT = '60vh';
const EXPANDED_HEIGHT = '90vh';
const EXPAND_DELAY = 4000; // ms

const Home: FunctionComponent<EmptyObject> = () => {
  const [isClient, setIsClient] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Collapse video on mouse move, expand after delay
  useEffect(() => {
    if (!isClient) return;
    const handleMouseMove = () => {
      setCollapsed(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCollapsed(false), EXPAND_DELAY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isClient]);

  return (
    <>
      {/* Name in top-left */}
      <div className="fixed top-6 left-8 z-50 flex items-center h-9">
        <span className="text-neutral-200 font-medium text-md select-none">Benyam Ephrem</span>
      </div>
      {/* Writing and About links in top-center */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center h-9">
        <Link type="internal" dest={INTERNAL_LINKS.WRITING}>
          <span className="text-amber-400 hover:text-amber-300 text-sm transition-colors select-none cursor-pointer">Writing</span>
        </Link>
        <span className="mx-2 text-neutral-500 text-xs select-none">·</span>
        <Link type="internal" dest="/about">
          <span className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors select-none cursor-pointer">About</span>
        </Link>
      </div>
      {/* Socials in top-right */}
      <div className="fixed top-6 right-8 z-50 flex items-center h-9">
        <Socials compressed />
      </div>
      <div className="min-h-svh w-full flex justify-center bg-neutral-900 px-8 pt-20 pb-4">
        <div className="w-full h-full flex flex-col items-center">
          {isClient && (
            <a
              href={EXTERNAL_LINKS.SOCIAL.TWITTER}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
              tabIndex={0}
              aria-label="Go to Benyam's Twitter"
            >
              <div
                className="relative w-full max-w-full rounded-2xl overflow-hidden bg-black transition-all duration-700 ease-in-out cursor-pointer"
                style={{
                  height: collapsed ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT,
                  maxHeight: collapsed ? COLLAPSED_HEIGHT : EXPANDED_HEIGHT
                }}
              >
                <video
                  src="/video/homepage/reel-placeholder-compressed.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  style={{ pointerEvents: 'none' }}
                />
                {/* Overlay to darken the video */}
                <div className="absolute top-0 left-0 w-full h-full bg-black/20 pointer-events-none" />
              </div>
            </a>
          )}
          {collapsed && (
            <div className="w-full flex flex-col items-start mt-7 md:ml-2">
              <p><span className="text-neutral-400 text-sm font-medium select-none">Featured writing</span></p>
              <Link type="internal" dest="/sinners" openInNewWindow className="group mt-4">
                <div className="flex items-center relative">
                  <span className="text-neutral-200 text-2xl font-serif italic leading-none hover:text-neutral-100 transition-colors cursor-pointer">
                    Analyzing "Sinners" — By Ryan Coogler
                  </span>
                  <div className="absolute left-0 w-full h-[1.5px] bg-neutral-700 bg-opacity-60 group-hover:bg-neutral-400 transition-colors" style={{ top: '100%', marginTop: '8px' }} />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
