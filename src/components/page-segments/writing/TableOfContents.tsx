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
    const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
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
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const observers: IntersectionObserver[] = [];

    elements.forEach((heading) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
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
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.1
        }
      );
      observer.observe(heading);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Track window scroll position for up/down arrow visibility
  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setShowTopButton(scrollTop > 10);
      setShowBottomButton(scrollTop + windowHeight < docHeight - 10);
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
                      "text-left transition-colors duration-150 w-full py-1 pl-1.5 leading-tight font-medium",
                      activeHeadings.has(heading.id)
                        ? ""
                        : "text-neutral-500 hover:text-neutral-600"
                    )}
                    style={activeHeadings.has(heading.id) ? { color: primaryColor } : undefined}
                    type="button"
                  >
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
            "absolute bottom-0 left-0 right-0 h-12 pointer-events-none",
            "bg-gradient-to-t from-white to-transparent",
            "transition-opacity duration-200",
            showShadow ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Up and Down arrow buttons (bottom right, always occupy space) */}
        <div className="absolute right-0 bottom-[-2.6rem] flex gap-2">
          <button
            onClick={scrollToTop}
            className={twMerge(
              "w-6 h-6 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-300 transition-colors duration-150",
              showTopButton ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            type="button"
          >
            <span className="text-sm">↑</span>
          </button>
          <button
            onClick={scrollToBottom}
            className={twMerge(
              "w-6 h-6 rounded-full bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-300 transition-colors duration-150",
              showBottomButton ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
            type="button"
          >
            <span className="text-sm">↓</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TableOfContents;
