import { useEffect, useRef, useState } from "react";

// Keyframe animations and marker glow styles (adapted from SinnersPlotOverview)
const styles = `
@keyframes scanLine {
  0% { transform: translateX(-50%); left: 0; opacity: 0.15; }
  80% { transform: translateX(-50%); left: 100%; opacity: 0.15; }
  90% { transform: translateX(-50%); left: 105%; opacity: 0; }
  100% { transform: translateX(-50%); left: 105%; opacity: 0; }
}

@keyframes markerPulse {
  0%, 100% { 
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transform: scale(1);
  }
  50% { 
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.7));
    transform: scale(1.05);
  }
}

@keyframes markerGlowBuild {
  0% { 
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transform: scale(1);
  }
  100% { 
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)) brightness(1.2);
    transform: scale(1.15);
  }
}

@keyframes markerGlowFade {
  0% { 
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)) brightness(1.2);
    transform: scale(1.15);
  }
  100% { 
    filter: drop-shadow(0 0 0 rgba(255, 255, 255, 0));
    transform: scale(1);
  }
}

.timeline-scan-line {
  position: absolute;
  top: -100px;
  width: 1px;
  height: calc(100% + 120px);
  background: rgb(156,163,175);
  opacity: 0.15;
  animation: scanLine 10s linear infinite;
  pointer-events: none;
  z-index: 50;
  will-change: transform;
}

.marker-approaching {
  animation: markerPulse 2s ease-in-out infinite;
  will-change: transform, filter;
}

.marker-peak {
  animation: markerGlowBuild 0.3s ease-out forwards;
  will-change: transform, filter;
}

.marker-fading {
  animation: markerGlowFade 2s ease-out forwards;
  will-change: transform, filter;
}
`;

export interface PlotTimelineItem {
  id?: string;
  label?: string;
  atMinute: number;
  description?: string;
  color?: string;
  bump?: boolean;
  doublebump?: boolean;
  withLine?: boolean;
}

export interface PlotTimelineRow {
  label: string;
  subLabel?: string;
  items: PlotTimelineItem[];
}

export interface PlotTimelineProps {
  startMinute: number;
  endMinute: number;
  rows: PlotTimelineRow[];
  className?: string;
}

const DEFAULT_MARKER_COLOR = "rgb(82 82 82)";
const DEFAULT_MARKER_SIZE = 13;

const PlotTimeline = ({ startMinute, endMinute, rows, className }: PlotTimelineProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [approachingMarkers, setApproachingMarkers] = useState<Set<string>>(new Set());
  const [peakMarkers, setPeakMarkers] = useState<Set<string>>(new Set());
  const [fadingMarkers, setFadingMarkers] = useState<Set<string>>(new Set());

  // Helper to get a unique marker id
  const getMarkerId = (rowIdx: number, item: PlotTimelineItem, itemIdx: number) =>
    item.id || `${rowIdx}-${itemIdx}`;

  useEffect(() => {
    let animationFrameId: number;
    const markerPositions = new Map<string, number>();

    const updateMarkerPositions = () => {
      const container = containerRef.current;
      if (!container) return;
      const markers = container.querySelectorAll('[data-marker-id]');
      for (const marker of markers) {
        const id = marker.getAttribute('data-marker-id');
        if (id) {
          const rect = marker.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const markerCenter = rect.left + (rect.width / 2);
          const relativeLeft = (markerCenter - containerRect.left) / containerRect.width;
          markerPositions.set(id, relativeLeft);
        }
      }
    };

    const animate = () => {
      const container = containerRef.current;
      const scanLine = container?.querySelector('.timeline-scan-line');
      if (!container || !scanLine) return;
      const scanLineRect = scanLine.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scanLineCenter = scanLineRect.left + (scanLineRect.width / 2);
      const scanLinePosition = (scanLineCenter - containerRect.left) / containerRect.width;

      const newApproaching = new Set<string>();
      const newPeak = new Set<string>();
      const newFading = new Set<string>();

      for (const [id, position] of markerPositions) {
        const distance = position - scanLinePosition;
        if (Math.abs(distance) < 0.02) {
          newPeak.add(id);
          setTimeout(() => {
            setPeakMarkers(prev => {
              const updated = new Set(prev);
              updated.delete(id);
              return updated;
            });
            setFadingMarkers(prev => {
              const updated = new Set(prev);
              updated.add(id);
              return updated;
            });
            setTimeout(() => {
              setFadingMarkers(prev => {
                const updated = new Set(prev);
                updated.delete(id);
                return updated;
              });
            }, 1000);
          }, 300);
        } else if (distance > 0 && distance < 0.1) {
          newApproaching.add(id);
        }
      }
      setApproachingMarkers(newApproaching);
      setPeakMarkers(newPeak);
      animationFrameId = requestAnimationFrame(animate);
    };

    updateMarkerPositions();
    animate();
    window.addEventListener('resize', updateMarkerPositions);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', updateMarkerPositions);
    };
  }, []);

  const getMarkerClassName = (markerId: string) => {
    if (peakMarkers.has(markerId)) return 'marker-peak';
    if (fadingMarkers.has(markerId)) return 'marker-fading';
    if (approachingMarkers.has(markerId)) return 'marker-approaching';
    return '';
  };

  // Calculate left % for a given minute
  const getLeftPercent = (minute: number) => {
    const clamped = Math.max(startMinute, Math.min(minute, endMinute));
    const percent = ((clamped - startMinute) / (endMinute - startMinute)) * 100;
    return `${percent}%`;
  };

  return (
    <div className={`w-full py-4 ${className || ''}`}>
      <style>{styles}</style>
      <div className="relative w-full space-y-20" ref={containerRef}>
        <div className="timeline-scan-line" />
        {rows.map((row, rowIdx) => (
          <div className="flex" key={row.label + (row.subLabel || "")}>
            {/* Row label */}
            <div className="w-48 flex flex-col items-end pr-6 -ml-48 -mt-3 select-none">
              <span className={`font-semibold ${rowIdx === 0 ? 'text-neutral-800' : 'text-neutral-600'} whitespace-nowrap`}>{row.label}</span>
              {row.subLabel && <span className="text-neutral-600 text-sm whitespace-nowrap">{row.subLabel}</span>}
            </div>
            {/* Timeline */}
            <div className="flex-1 relative">
              <div className="w-full h-[2px] bg-[length:8px_2px] bg-[linear-gradient(to_right,#d4d4d4_2px,transparent_2px)] [background-position:2px_0] relative">
                {row.items.map((item, itemIdx) => {
                  const markerId = getMarkerId(rowIdx, item, itemIdx);
                  const color = item.color || DEFAULT_MARKER_COLOR;
                  // Robust vertical line logic using refs
                  const markerRef = useRef<HTMLDivElement>(null);
                  const textRef = useRef<HTMLDivElement>(null);
                  const [lineHeight, setLineHeight] = useState<number | null>(null);

                  useEffect(() => {
                    if (!item.withLine) return;
                    function updateLineHeight() {
                      if (markerRef.current && textRef.current) {
                        const markerRect = markerRef.current.getBoundingClientRect();
                        const textRect = textRef.current.getBoundingClientRect();
                        // Distance from bottom of marker to bottom of text container
                        const height = markerRect.top - textRect.bottom;
                        setLineHeight(Math.abs(height));
                      }
                    }
                    updateLineHeight();
                    window.addEventListener('resize', updateLineHeight);
                    return () => window.removeEventListener('resize', updateLineHeight);
                  }, [item.withLine]);

                  // Calculate top offset for the text container
                  let textTop = '';
                  if (item.label && item.description) {
                    textTop = item.doublebump ? '-top-[115px]' : item.bump ? '-top-[98px]' : '-top-20';
                  } else if (item.label) {
                    textTop = item.doublebump ? '-top-[99px]' : item.bump ? '-top-[82px]' : '-top-16';
                  } else if (item.description) {
                    textTop = item.doublebump ? '-top-[79px]' : item.bump ? '-top-[62px]' : '-top-[52px]';
                  }

                  return (
                    <div
                      key={item.id || item.label || item.atMinute}
                      className="absolute -translate-x-1/2"
                      style={{ left: getLeftPercent(item.atMinute) }}
                    >
                      {/* Text container: label and description stacked, ref for line measurement */}
                      {(item.label || item.description) && (
                        <div
                          ref={item.withLine ? textRef : undefined}
                          className={`absolute ${textTop} left-1/2 -translate-x-1/2 whitespace-nowrap select-none flex flex-col items-center`}
                        >
                          {item.label && (
                            <span className="text-sm text-neutral-600 leading-tight">{item.label}</span>
                          )}
                          {item.description && (
                            <span className="text-xs text-neutral-400 leading-tight mt-0.5">{item.description}</span>
                          )}
                        </div>
                      )}
                      <div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]"
                        ref={item.withLine ? markerRef : undefined}
                      >
                        <svg
                          width={DEFAULT_MARKER_SIZE}
                          height={24}
                          viewBox={`0 0 ${DEFAULT_MARKER_SIZE} 24`}
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          data-marker-id={markerId}
                          className={getMarkerClassName(markerId)}
                        >
                          <title>Timeline marker for {item.label || item.atMinute}</title>
                          <path d="M0 0H13V18L6.5 24L0 18V0Z" fill={color} />
                        </svg>
                      </div>
                      {/* Robust vertical line from caret to text, if withLine is true */}
                      {item.withLine && lineHeight && lineHeight > 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '24px', // bottom of marker
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '1px',
                            height: `${lineHeight}px`,
                            background: color,
                            zIndex: 1,
                          }}
                        />
                      )}
                      <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">
                        {item.atMinute}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlotTimeline;
