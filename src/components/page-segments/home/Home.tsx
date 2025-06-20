import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { EXTERNAL_LINKS, INTERNAL_LINKS } from '../../../helpers/urls';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';
import Socials from '../../shared/socials/Socials';

const EXPAND_DELAY = 4000; // ms
const EMAIL = "ben@bephrem.studio";

const Home: FunctionComponent<EmptyObject> = () => {
  const [isClient, setIsClient] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Collapse video on mouse move, expand after delay
  useEffect(() => {
    if (!isClient) return;

    // Only enable collapse/expand on desktop
    const handleMouseMove = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setCollapsed(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setCollapsed(false), EXPAND_DELAY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isClient]);

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
      <div className="fixed md:fixed absolute md:top-6 top-6 left-8 z-50 flex items-center h-9">
        <span className="text-neutral-200 font-medium text-md select-none">Benyam Ephrem</span>
      </div>
      {/* Top-right group: socials and navigation */}
      <div className="fixed md:fixed absolute md:top-6 top-6 right-8 z-50 flex flex-col items-end gap-2">
        <Socials compressed />
        <div className="flex md:hidden items-center gap-2">
          <Link type="internal" dest={INTERNAL_LINKS.WRITING}>
            <span className="text-amber-400 hover:text-amber-300 text-sm transition-colors select-none cursor-pointer">Writing</span>
          </Link>
          <span className="text-neutral-500 text-xs select-none">·</span>
          <Link type="internal" dest="/about">
            <span className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors select-none cursor-pointer">About</span>
          </Link>
        </div>
      </div>
      {/* Desktop centered navigation */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center h-9">
        <div className="flex items-center gap-2">
          <Link type="internal" dest={INTERNAL_LINKS.WRITING}>
            <span className="text-amber-400 hover:text-amber-300 text-sm transition-colors select-none cursor-pointer">Writing</span>
          </Link>
          <span className="text-neutral-500 text-xs select-none">·</span>
          <Link type="internal" dest="/about">
            <span className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors select-none cursor-pointer">About</span>
          </Link>
        </div>
      </div>
      <div className="min-h-svh w-full flex flex-col md:flex-col justify-end md:justify-start bg-neutral-900 px-8 pt-16 md:pt-20 pb-8">
        <div className="w-full h-full flex flex-col items-center order-2 md:order-1">
          {/* Mobile compact info above video */}
          <div className="md:hidden absolute top-28 left-8 right-8 z-40 mb-4">
            <div className="flex flex-col gap-3">
              {/* About - moved to top, no heading */}
              <div>
                <p className="text-neutral-200 text-base  mb-3">
                  Hi, my name is Benyam Ephrem. I'm an Ethiopian-American software engineer and filmmaker.
                </p>
                <p className="text-neutral-200 text-base mb-5">
                  After 10 years writing software & creating Internet products, I'm now exploring storytelling through film.
                </p>
                <div className="flex items-center gap-2">
                  <Link type="internal" dest="/about" openInNewWindow>
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all">
                      <span className="text-neutral-300 text-xs">More about me</span>
                      <span className="text-neutral-400 text-xs">↗</span>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-neutral-400 text-[10px] w-3 h-3"
                    />
                    <span className="text-neutral-300 text-xs">
                      {emailCopied ? "copied!" : "email"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Recent writing */}
              <div className='mt-5'>
                <p className="text-neutral-500 text-sm font-medium select-none mb-1">Recent writing</p>
                <Link type="internal" dest="/sinners" openInNewWindow className="group">
                  <div className="flex items-center relative">
                    <span className="text-neutral-200 text-lg font-serif italic leading-tight hover:text-neutral-100 transition-colors cursor-pointer">
                      Analyzing "Sinners" — By Ryan Coogler
                    </span>
                    <div className="absolute left-0 w-full h-[1px] bg-neutral-700 bg-opacity-60 group-hover:bg-neutral-400 transition-colors" style={{ top: '100%', marginTop: '2px' }} />
                  </div>
                </Link>
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
              >
                <div
                  className={`relative w-full max-w-full rounded-2xl overflow-hidden bg-black transition-all duration-700 ease-in-out cursor-pointer ${collapsed
                    ? 'h-[40vh] md:h-[60vh]'
                    : 'h-[35vh] md:h-[90vh]'
                    }`}
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

              {/* Mobile: non-clickable video */}
              <div className="md:hidden w-full">
                <div
                  className="relative w-full max-w-full rounded-2xl overflow-hidden bg-black h-[28vh]"
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
              </div>
            </>
          )}
          {collapsed && (
            <div className="w-full flex flex-row items-start mt-7 md:ml-2">
              <div className="flex flex-col items-start">
                <p><span className="text-neutral-400 text-sm font-medium select-none">Recent writing</span></p>
                <Link type="internal" dest="/sinners" openInNewWindow className="group mt-4">
                  <div className="flex items-center relative">
                    <span className="text-neutral-200 text-2xl font-serif italic leading-none hover:text-neutral-100 transition-colors cursor-pointer">
                      Analyzing "Sinners" — By Ryan Coogler
                    </span>
                    <div className="absolute left-0 w-full h-[1.5px] bg-neutral-700 bg-opacity-60 group-hover:bg-neutral-400 transition-colors" style={{ top: '100%', marginTop: '8px' }} />
                  </div>
                </Link>
              </div>
              <div className="hidden md:block ml-16">
                <p><span className="text-neutral-400 text-sm font-medium select-none">About</span></p>
                <div className="mt-4 max-w-sm">
                  <p className="text-neutral-200 text-opacity-95 text-sm leading-relaxed mb-2">
                    Hi, my name is Benyam Ephrem. I'm an Ethiopian-American software engineer and filmmaker.
                  </p>
                  <p className="text-neutral-200 text-opacity-95 text-sm leading-relaxed mb-3">
                    After 10 years writing software & creating Internet products, I'm now exploring storytelling through film.
                  </p>
                  <Link type="internal" dest="/about" openInNewWindow>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all">
                      <span className="text-neutral-300 text-xs">More about me</span>
                      <span className="text-neutral-400 text-xs">↗</span>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 mt-2 ml-2 bg-neutral-700 bg-opacity-50 hover:bg-opacity-70 rounded-full transition-all cursor-pointer"
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-neutral-400 text-[10px] w-3 h-3"
                    />
                    <span className="text-neutral-300 text-xs">
                      {emailCopied ? "copied email!" : "drop me a line"}
                    </span>
                  </button>
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
