import type { FunctionComponent } from "react";
import { useLayoutEffect, useRef, useState } from "react";

interface Props {
  startTimecode?: string;
  turningPointTimecode?: string | string[];
  endTimecode?: string;
  className?: string;
}

// Helper to parse timecode (e.g., "1:35" or "3:18") to seconds
function parseTimecodeToSeconds(tc?: string): number | null {
  if (!tc) return null;
  const parts = tc.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return null;
}

const FilmTimecode = ({ timecode }: { timecode: string }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm whitespace-nowrap">
      <div className="w-4 h-4 rounded-full bg-neutral-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Film</title>
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
      </div>
      {timecode}
    </span>
  );
};

const TurningPointTimecode = ({ timecode }: { timecode: string }) => {
  const pillContent = (
    <>
      <div className="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Turning Point</title>
          <path d="M12 2L8 6h3v4H5l-3 3 3 3h6v4h3l4-4h-3v-4h6l3-3-3-3h-6V6h3L12 2z" />
        </svg>
      </div>
      {timecode}
    </>
  );
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-sm whitespace-nowrap">
      {pillContent}
    </span>
  );
};

const PILL_WIDTH = 96; // px, rough width of a pill
const PILL_HEIGHT = 32; // px, rough height of a pill
const PILL_MIN_GAP = 2; // px, minimum gap between pills

const SceneTimeline: FunctionComponent<Props> = ({
  startTimecode,
  turningPointTimecode,
  endTimecode,
  className,
}) => {
  // Timeline logic
  const startSec = parseTimecodeToSeconds(startTimecode);
  const endSec = parseTimecodeToSeconds(endTimecode);

  // Convert turningPointTimecode to array if it's a single string
  const turningPointTimecodes = Array.isArray(turningPointTimecode)
    ? turningPointTimecode
    : turningPointTimecode
      ? [turningPointTimecode]
      : [];

  // Calculate turning point percentages
  const turningPointPercentages = turningPointTimecodes.map(tc => {
    const turningSec = parseTimecodeToSeconds(tc);
    if (startSec !== null && turningSec !== null && endSec !== null && endSec > startSec) {
      const percent = ((turningSec - startSec) / (endSec - startSec)) * 100;
      return Math.max(0, Math.min(100, percent));
    }
    return 0;
  });

  // --- Responsive container width ---
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000); // default fallback
  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  // --- Overlap detection and row assignment ---
  // We'll keep track of the rightmost edge of each row (in px)
  const rows: number[] = [];
  const pillPositions = turningPointPercentages.map((percent, i) => {
    const leftPx = (percent / 100) * containerWidth;
    let row = 0;
    while (true) {
      if (!rows[row] || leftPx - rows[row] > PILL_WIDTH + PILL_MIN_GAP) {
        rows[row] = leftPx;
        break;
      }
      row++;
    }
    return { percent, row, leftPx };
  });
  const maxRow = Math.max(0, ...pillPositions.map(p => p.row));

  return (
    <div className={className}>
      {startTimecode && endTimecode ? (
        <div ref={containerRef} className="relative w-full flex items-center" style={{ minHeight: 40 + maxRow * (PILL_HEIGHT + PILL_MIN_GAP) }}>
          {/* Line */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-neutral-200 rounded-full" style={{ zIndex: 1, transform: 'translateY(-50%)' }} />
          {/* Start pill */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <FilmTimecode timecode={startTimecode} />
          </div>
          {/* End pill (only if not duplicated by a turning point) */}
          {!(turningPointTimecodes.includes(endTimecode ?? "")) && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
              <FilmTimecode timecode={endTimecode} />
            </div>
          )}
          {/* Turning point pills */}
          {turningPointTimecodes.map((timecode, index) => {
            const isAtEnd = timecode === endTimecode;
            const { percent, row, leftPx } = pillPositions[index];
            // Edge overflow handling
            const pillHalfWidthPercent = (PILL_WIDTH / 2) / containerWidth * 100;
            let leftStyle: React.CSSProperties;
            if (percent <= pillHalfWidthPercent) {
              leftStyle = { left: 0 };
            } else if (percent >= 100 - pillHalfWidthPercent) {
              leftStyle = { right: 0 };
            } else {
              leftStyle = { left: `calc(${percent}% - 48px * ${percent / 100})` };
            }
            // Vertical position
            const verticalOffset = row * (PILL_HEIGHT + PILL_MIN_GAP); // px
            const topStyle = row === 0
              ? { top: '50%', transform: 'translateY(-50%)' }
              : { top: `calc(50% - ${verticalOffset}px)`, transform: 'translateY(-50%)' };
            // For connector line
            const showConnector = row > 0;
            // Calculate the exact pixel position for the connector line
            // The pill's center is at leftPx, the timeline is at the same leftPx, verticalOffset is the distance
            return (
              <>
                {showConnector && verticalOffset > 0 && (
                  <svg
                    key={`line-${timecode}-${row}`}
                    width={2}
                    height={verticalOffset}
                    style={{
                      position: 'absolute',
                      left: isAtEnd ? undefined : `calc(${percent}% - 1px)`,
                      right: isAtEnd ? 0 : undefined,
                      top: `calc(50% - ${verticalOffset}px)`,
                      zIndex: 0,
                      transform: isAtEnd ? undefined : 'translateX(-50%)',
                      pointerEvents: 'none',
                    }}
                    aria-hidden="true"
                  >
                    <line
                      x1="1"
                      y1={0}
                      x2="1"
                      y2={verticalOffset}
                      stroke="#FDBA74"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  </svg>
                )}
                <div
                  key={`${timecode}-${row}`}
                  className="absolute z-10"
                  style={{ ...leftStyle, ...topStyle }}
                >
                  <TurningPointTimecode timecode={timecode} />
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <span className="text-neutral-400 text-xs">No timeline data</span>
      )}
    </div>
  );
};

export default SceneTimeline; 