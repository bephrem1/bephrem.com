import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { EXTERNAL_LINKS, INTERNAL_LINKS } from '../../../helpers/urls';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';
import Socials from '../../shared/socials/Socials';

const EXPAND_DELAY = 4000; // ms
const EMAIL = "ben@bephrem.studio";

const RECENT_WORK_ITEMS = [
  {
    title: 'Analysis: "Keep Thinking"',
    url: 'https://x.com/bephrem/status/1987937022120783964',
    type: 'external' as const,
  },
  {
    title: 'Interview: Arlan',
    url: 'https://youtu.be/7hukPKD4Bhs?si=omds06dHoFgcqzKf',
    type: 'external' as const,
  },
  {
    title: 'Documentary: Juxta',
    url: 'https://youtu.be/VsERidFUBZs?si=jiqUdwNHF8lPJ57v',
    type: 'external' as const,
  },
];

const Home: FunctionComponent<EmptyObject> = () => {
  const [isClient, setIsClient] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Collapse video on hover, expand after delay
  const handleVideoHover = () => {
    if (window.innerWidth >= 768) { // md breakpoint
      setCollapsed(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCollapsed(false), EXPAND_DELAY);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(EMAIL);
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
        return;
      }

      // Fallback for older browsers or mobile
      const textArea = document.createElement('textarea');
      textArea.value = EMAIL;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (successful) {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        throw new Error('Copy command failed');
      }
    } catch (err) {
      console.error('Failed to copy email:', err);
      // As a final fallback, you could show an alert with the email
      alert(`Please copy this email: ${EMAIL}`);
    }
  };

  return (
    <>
      {/* Name in top-left */}
      <div className="fixed md:fixed absolute top-6 md:top-7 left-8 z-50 flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2">
        <span className="text-neutral-800 font-medium text-md select-none">Benyam Ephrem</span>
        <span className="text-neutral-400 text-xs select-none">director, producer</span>
      </div>
      {/* Top-right group: socials and navigation */}
      <div className="fixed md:fixed absolute md:top-6 top-6 right-8 z-50 flex flex-col items-end gap-2">
        <Socials compressed />
        <div className="flex md:hidden items-center gap-2">
          <Link type="internal" dest={INTERNAL_LINKS.WRITING}>
            <span className="text-amber-600 hover:text-amber-700 text-sm transition-colors select-none cursor-pointer">Writing</span>
          </Link>
          <span className="text-neutral-400 text-xs select-none">·</span>
          <Link type="internal" dest={INTERNAL_LINKS.WORK}>
            <span className="text-neutral-600 hover:text-neutral-800 text-sm transition-colors select-none cursor-pointer">Work</span>
          </Link>
        </div>
      </div>
      {/* Desktop centered navigation */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center h-9">
        <div className="flex items-center gap-2">
          <Link type="internal" dest={INTERNAL_LINKS.WRITING}>
            <span className="text-amber-600 hover:text-amber-700 text-sm transition-colors select-none cursor-pointer">Writing</span>
          </Link>
          <span className="text-neutral-400 text-xs select-none">·</span>
          <Link type="internal" dest={INTERNAL_LINKS.WORK}>
            <span className="text-neutral-600 hover:text-neutral-800 text-sm transition-colors select-none cursor-pointer">Work</span>
          </Link>
        </div>
      </div>
      <div className="min-h-svh w-full flex flex-col md:flex-col justify-end md:justify-start px-8 pt-16 md:pt-20 pb-8" style={{ backgroundColor: '#fafaf9' }}>
        <div className="w-full h-full flex flex-col items-center order-2 md:order-1">
          {/* Mobile compact info above video */}
          <div className="md:hidden absolute top-28 left-8 right-8 z-40 mb-4">
            <div className="flex flex-col gap-3">
              {/* About - moved to top, no heading */}
              <div>
                <p className="text-neutral-800 text-base  mb-3">
                  My name is Benyam Ephrem. I'm an Ethiopian-American director & producer.
                </p>
                <p className="text-neutral-800 text-base mb-5">
                  After a decade building software & Internet products, I'm now making films.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center px-3 py-1.5 backdrop-blur-sm bg-neutral-100 hover:bg-neutral-200 border border-dashed border-neutral-300 hover:border-neutral-400 rounded-full transition-all cursor-pointer"
                  >
                    <span className="text-neutral-800 text-[0.675rem] font-mono">
                      {emailCopied ? "copied!" : EMAIL}
                    </span>
                  </button>
                </div>
              </div>

              {/* Recent writing */}
              <div className='mt-5'>
                <p className="text-neutral-500 text-sm font-medium select-none mb-1">Recent writing</p>
                <Link type="internal" dest="/sinners" openInNewWindow className="group">
                  <div className="flex items-center relative">
                    <span className="text-neutral-800 text-lg font-serif italic leading-tight hover:text-neutral-900 transition-colors cursor-pointer">
                      Analyzing "Sinners" — By Ryan Coogler
                    </span>
                    <div className="absolute left-0 w-full h-[1px] bg-neutral-300 bg-opacity-60 group-hover:bg-neutral-600 transition-colors" style={{ top: '100%', marginTop: '2px' }} />
                  </div>
                </Link>
              </div>

              {/* Recent work */}
              <div className='mt-4'>
                <p className="text-neutral-500 text-sm font-medium select-none mb-2">Recent work</p>
                <div className="grid gap-y-4" style={{ gridTemplateColumns: 'max-content max-content', columnGap: '1rem' }}>
                  {RECENT_WORK_ITEMS.map((item) => (
                    <Link key={item.title} type={item.type} dest={item.url} openInNewWindow className="group">
                      <div className="flex items-center relative">
                        <span className="text-neutral-800 text-sm font-serif italic leading-tight hover:text-neutral-900 transition-colors cursor-pointer whitespace-nowrap">
                          {item.title}
                        </span>
                        <div className="absolute left-0 w-full h-[1px] bg-neutral-300 bg-opacity-60 group-hover:bg-neutral-600 transition-colors" style={{ top: '100%', marginTop: '2px' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {isClient && (
            <>
              {/* Desktop: clickable link to Twitter */}
              <a
                href={EXTERNAL_LINKS.SOCIAL.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block w-full"
                tabIndex={0}
                aria-label="Go to Benyam's Twitter"
                onMouseEnter={handleVideoHover}
              >
                <div
                  className={`relative w-full max-w-full rounded-2xl overflow-hidden bg-black transition-all duration-700 ease-in-out cursor-pointer ${collapsed
                    ? 'h-[40vh] md:h-[60vh]'
                    : 'h-[35vh] md:h-[90vh]'
                    }`}
                >
                  <video
                    src="/video/homepage/mini-reel.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover md:object-[center_35%]"
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* Overlay to darken the video */}
                  <div className="absolute top-0 left-0 w-full h-full bg-black/10 pointer-events-none" />
                </div>
              </a>

              {/* Mobile: clickable link to Twitter */}
              <a
                href={EXTERNAL_LINKS.SOCIAL.TWITTER}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden w-full"
                tabIndex={0}
                aria-label="Go to Benyam's Twitter"
              >
                <div
                  className="relative w-full max-w-full rounded-2xl overflow-hidden bg-black h-[28vh] cursor-pointer"
                >
                  <video
                    src="/video/homepage/mini-reel.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ pointerEvents: 'none' }}
                  />
                  {/* Overlay to darken the video */}
                  <div className="absolute top-0 left-0 w-full h-full bg-black/10 pointer-events-none" />
                </div>
              </a>
            </>
          )}
          {collapsed && (
            <div className="w-full flex flex-row items-start mt-7 md:ml-2">
              <div className="flex flex-col items-start">
                <p><span className="text-neutral-600 text-sm font-medium select-none">Recent writing</span></p>
                <Link type="internal" dest="/sinners" openInNewWindow className="group mt-4">
                  <div className="flex items-center relative">
                    <span className="text-neutral-800 text-2xl font-serif italic leading-none hover:text-neutral-900 transition-colors cursor-pointer">
                      Analyzing "Sinners" — By Ryan Coogler
                    </span>
                    <div className="absolute left-0 w-full h-[1.5px] bg-neutral-300 bg-opacity-60 group-hover:bg-neutral-600 transition-colors" style={{ top: '100%', marginTop: '8px' }} />
                  </div>
                </Link>
              </div>
              <div className="hidden md:block ml-16">
                <p><span className="text-neutral-600 text-sm font-medium select-none">About</span></p>
                <div className="mt-4 max-w-sm">
                  <p className="text-neutral-800 text-opacity-95 text-sm leading-relaxed mb-2">
                    My name is Benyam Ephrem. I'm an Ethiopian-American director & producer.
                  </p>
                  <p className="text-neutral-800 text-opacity-95 text-sm leading-relaxed mb-3">
                    After a decade building software & Internet products, I'm now making films.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center px-3 py-1.5 mt-2 backdrop-blur-sm bg-neutral-100 hover:bg-neutral-200 border border-dashed border-neutral-300 hover:border-neutral-400 rounded-full transition-all cursor-pointer"
                  >
                    <span className="text-neutral-800 text-[0.675rem] font-mono">
                      {emailCopied ? "copied email!" : EMAIL}
                    </span>
                  </button>
                </div>
              </div>
              <div className="hidden md:block ml-16">
                <p><span className="text-neutral-600 text-sm font-medium select-none">Recent work</span></p>
                <div className="mt-4 max-w-sm flex flex-col gap-6">
                  {RECENT_WORK_ITEMS.map((item) => (
                    <Link key={item.title} type={item.type} dest={item.url} openInNewWindow className="group">
                      <div className="flex items-center relative py-0.5">
                        <span className="text-neutral-800 text-2xl font-serif italic leading-none hover:text-neutral-900 transition-colors cursor-pointer">
                          {item.title}
                        </span>
                        <div className="absolute left-0 w-full h-[1.5px] bg-neutral-300 bg-opacity-60 group-hover:bg-neutral-600 transition-colors" style={{ top: '100%', marginTop: '8px' }} />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
