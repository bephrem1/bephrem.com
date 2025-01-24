import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = ({ className }: { className?: string }) => {
  const [headings, setHeadings] = useState<HeadingData[]>([]);
  const [activeHeadings, setActiveHeadings] = useState<Set<string>>(new Set());
  const [showTopButton, setShowTopButton] = useState(false);
  const [showShadow, setShowShadow] = useState(false);
  const tocRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

    // Create section observers
    elements.forEach((heading, index) => {
      // Calculate section bounds
      const nextHeading = elements[index + 1];

      // Create a wrapper div for the section
      const sectionWrapper = document.createElement('div');
      sectionWrapper.setAttribute('data-heading-id', heading.id);

      // Insert wrapper right after the heading
      heading.parentNode?.insertBefore(sectionWrapper, heading.nextSibling);

      // Move all nodes between this heading and the next into the wrapper
      let currentNode = sectionWrapper.nextSibling;
      while (currentNode && currentNode !== nextHeading) {
        const nextNode = currentNode.nextSibling;
        sectionWrapper.appendChild(currentNode);
        currentNode = nextNode;
      }

      // Observe the section wrapper
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const headingId = entry.target.getAttribute('data-heading-id');
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
          threshold: 0.1 // Consider section visible when 10% is in view
        }
      );

      observer.observe(sectionWrapper);
    });

    // Cleanup function
    return () => {
      // Remove all section wrappers
      document.querySelectorAll('div[data-heading-id]').forEach(wrapper => {
        // Move all children back before removing wrapper
        while (wrapper.firstChild) {
          wrapper.parentNode?.insertBefore(wrapper.firstChild, wrapper);
        }
        wrapper.remove();
      });
    };
  }, []);

  // Track scroll position for top button
  useEffect(() => {
    const handleWindowScroll = () => {
      setShowTopButton(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleWindowScroll);
    return () => window.removeEventListener('scroll', handleWindowScroll);
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
        {/* Left border line */}
        <div className="absolute left-0 top-0 w-[1px] h-full bg-neutral-600" />

        <div
          ref={tocRef}
          onScroll={handleScroll}
          className="relative max-h-[80vh] overflow-y-auto scrollbar-hide"
        >
          <ul className="relative">
            {headings.map((heading) => (
              <li
                key={heading.id}
                data-heading-id={heading.id}
                className={twMerge(
                  "relative group",
                  "after:absolute after:left-0 after:top-0 after:w-[1px] after:h-full after:bg-amber-400 after:opacity-0 after:transition-opacity after:duration-150",
                  "hover:after:opacity-100",
                  activeHeadings.has(heading.id) && "after:opacity-100"
                )}
                style={{
                  paddingLeft: `${(heading.level - 1) * 12}px`,
                }}
              >
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={twMerge(
                    "text-left hover:text-amber-400 transition-colors duration-150 w-full py-1 pl-1.5",
                    activeHeadings.has(heading.id)
                      ? "text-amber-400 font-medium"
                      : "text-neutral-200"
                  )}
                >
                  <span className="text-sm">{heading.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom fade shadow */}
        <div
          className={twMerge(
            "absolute bottom-0 left-0 right-0 h-12 pointer-events-none",
            "bg-gradient-to-t from-neutral-900 to-transparent",
            "transition-opacity duration-200",
            showShadow ? "opacity-100" : "opacity-0"
          )}
        />

        <button
          onClick={scrollToTop}
          className={twMerge(
            "absolute left-[-.7rem] bottom-[-2.6rem] w-6 h-6 rounded-full bg-neutral-800",
            "flex items-center justify-center",
            "text-neutral-400 hover:text-amber-400 hover:bg-neutral-700",
            "opacity-0 pointer-events-none",
            "transition-[opacity]",
            showTopButton
              ? "opacity-100 pointer-events-auto duration-300"
              : "opacity-0 pointer-events-none duration-200"
          )}
        >
          <span className="text-sm">↑</span>
        </button>
      </div>
    </nav>
  );
};

export default TableOfContents;