import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  className?: string;
  primaryColor?: string; // Tailwind color class, e.g. 'text-amber-400' or 'text-neutral-800'
}

const TableOfContents = ({ className, primaryColor = "text-neutral-800" }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeHeadings, setActiveHeadings] = useState<Set<string>>(new Set());
  const [showTopButton, setShowTopButton] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  // Scroll active heading into view
  useEffect(() => {
    if (activeHeadings.size === 0) return;
    const firstActive = Array.from(activeHeadings)[0]; // Get first (top) active heading
    const activeElement = tocRef.current?.querySelector(`[data-heading-id="${firstActive}"]`);
    if (activeElement && tocRef.current) {
      const container = tocRef.current;
      const elementTop = (activeElement as HTMLElement).offsetTop;
      const containerHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const elementHeight = (activeElement as HTMLElement).clientHeight;

      // Check if element is not fully visible
      const isAboveView = elementTop < scrollTop;
      const isBelowView = (elementTop + elementHeight) > (scrollTop + containerHeight);

      if (isAboveView || isBelowView) {
        container.scrollTo({
          top: elementTop - containerHeight / 3, // Position element 1/3 from the top
          behavior: 'smooth'
        });
      }
    }
  }, [activeHeadings]);

  // Handle shadow visibility
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const isScrollable = target.scrollHeight > target.clientHeight;
    const isAtBottom = Math.abs(target.scrollHeight - target.clientHeight - target.scrollTop) < 1;
    setShowShadow(isScrollable && !isAtBottom);
  };

  // Get headings from the document
  useEffect(() => {
    const headingElements = document.querySelectorAll('h1, h2, h3, h4');
    const headingData: HeadingData[] = Array.from(headingElements)
      .filter(heading => heading.textContent !== 'References')  // Filter out "References" heading
      .map((heading) => ({
        id: heading.id,
        text: heading.textContent || '',
        level: Number(heading.tagName[1])
      }));
    setHeadings(headingData);
  }, []);

  // Track active headings
  useEffect(() => {
    const elements = document.querySelectorAll('h1, h2, h3, h4');
    const observers: IntersectionObserver[] = [];

    for (const heading of elements) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const headingId = entry.target.getAttribute('id');
            if (!headingId) return;
            setActiveHeadings((prev) => {
              const newSet = new Set(prev);
              if (entry.isIntersecting) {
                newSet.add(headingId);
              } else {
                newSet.delete(headingId);
              }
              return newSet;
            });
          }
        },
        {
          rootMargin: "0px",
          threshold: 0.1
        }
      );
      observer.observe(heading);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) observer.disconnect();
    };
  }, []);

  // Track window scroll position for up/down arrow and fade visibility
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setShowTopButton(scrollTop > 10);
      setShowBottomButton(scrollTop + windowHeight < docHeight - 10);
      setShowTopFade(scrollTop > 10);
      setShowBottomFade(scrollTop + windowHeight < docHeight - 10);
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className={twMerge("hidden lg:block w-64 shrink-0 sticky top-24", className)}>
      <div className="relative h-full">
        {/* Right border line (was left, now right) */}
        <div className="absolute right-0 top-0 w-[2px] h-full bg-neutral-200" />

        <div
          ref={tocRef}
          onScroll={handleScroll}
          className="relative max-h-[80vh] overflow-y-auto scrollbar-hide"
        >
          <ul className="relative">
            {headings.map((heading) => {
              // Remove trailing hash if present (from anchor icon in heading)
              let cleanText = heading.text;
              if (cleanText.endsWith('#')) {
                cleanText = cleanText.slice(0, -1).trim();
              }
              const isAct = cleanText.startsWith('Act ');
              return (
                <li
                  key={heading.id}
                  data-heading-id={heading.id}
                  className={twMerge(
                    "relative group",
                    "after:absolute after:right-0 after:top-0 after:w-[2px] after:h-full after:bg-[var(--toc-accent)] after:transition-opacity after:duration-150",
                    activeHeadings.has(heading.id)
                      ? "after:opacity-100"
                      : "after:opacity-0"
                  )}
                  style={{
                    paddingLeft: `${(heading.level - 1) * 12}px`,
                    '--toc-accent': activeHeadings.has(heading.id) ? primaryColor : 'transparent',
                  } as React.CSSProperties}
                >
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={twMerge(
                      "text-left transition-colors duration-150 w-full py-1 pl-1.5 pr-4 leading-tight font-normal flex items-center gap-1.5",
                      activeHeadings.has(heading.id)
                        ? ""
                        : "text-neutral-500 hover:text-neutral-600"
                    )}
                    style={activeHeadings.has(heading.id) ? { color: primaryColor } : undefined}
                    type="button"
                  >
                    {isAct && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                        <title>Bookmark for Act</title>
                        <path d="M3.5 2.5A1 1 0 0 1 4.5 1.5h5a1 1 0 0 1 1 1v9.086a.5.5 0 0 1-.832.374L7 9.207l-2.668 2.753A.5.5 0 0 1 3.5 11.586V2.5Z" fill="#B0B0B0" />
                      </svg>
                    )}
                    <span className="text-sm">{cleanText}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bottom fade shadow */}
        <div
          className={twMerge(
            "absolute bottom-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-t from-neutral-50 to-transparent transition-opacity duration-200",
            showBottomFade ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Top fade shadow */}
        <div
          className={twMerge(
            "absolute top-0 left-0 right-0 h-12 pointer-events-none bg-gradient-to-b from-neutral-50 to-transparent transition-opacity duration-200",
            showTopFade ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Up and Down arrow buttons (bottom right, always occupy space) */}
        <div className={twMerge(
          "absolute right-0 bottom-[-2.6rem] flex gap-2 justify-end"
        )}>
          {showTopButton && (
            <button
              onClick={scrollToTop}
              className={twMerge(
                "w-6 h-6 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-300 transition-colors duration-150"
              )}
              type="button"
            >
              <span className="text-sm">↑</span>
            </button>
          )}
          {showBottomButton && (
            <button
              onClick={scrollToBottom}
              className={twMerge(
                "w-6 h-6 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-300 transition-colors duration-150"
              )}
              type="button"
            >
              <span className="text-sm">↓</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TableOfContents;
