import { useLayoutEffect, useRef, useState } from "react";

interface DramaticIntensityPoint {
  timecode: string;
  intensity: number; // 0-100
  label: string;
  description?: string;
}

interface DramaticIntensityPlotProps {
  points: DramaticIntensityPoint[];
  className?: string;
  yAxisLabel?: string;
  title?: string;
}

const PLOT_PADDING = 32; // px (top and bottom)
const PLOT_HEIGHT = 192; // px (h-48)
const PLOT_LABEL_HEIGHT = 32; // px for x-axis labels
const MIN_LABEL_SPACING = 40; // px between label centers
const LABEL_STAGGER_Y = 16; // px vertical offset for staggered labels
const TOOLTIP_MARGIN = 8; // px between modal and dot
const TOOLTIP_HEIGHT = 64; // px estimated for clamping

const DramaticIntensityPlot = ({ points, className, yAxisLabel = "Intensity", title }: DramaticIntensityPlotProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600); // default width
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Convert timecode to minutes for x-axis positioning
  const timecodeToMinutes = (timecode: string) => {
    const [h, m, s] = timecode.split(":").map(Number);
    return h * 60 + m + (s || 0) / 60;
  };

  // Get the min and max minutes for scaling
  const minMinutes = Math.min(...points.map(p => timecodeToMinutes(p.timecode)));
  const maxMinutes = Math.max(...points.map(p => timecodeToMinutes(p.timecode)));

  // Responsive width
  useLayoutEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Map data to SVG coordinates
  const plotW = width - 2 * PLOT_PADDING;
  const plotH = PLOT_HEIGHT;
  const getX = (idx: number) => {
    if (points.length === 1) return plotW / 2 + PLOT_PADDING;
    const minutes = timecodeToMinutes(points[idx].timecode);
    return PLOT_PADDING + ((minutes - minMinutes) / (maxMinutes - minMinutes)) * plotW;
  };
  const getY = (intensity: number) =>
    PLOT_PADDING + (1 - intensity / 100) * (PLOT_HEIGHT - 2 * PLOT_PADDING);

  // Find min/max intensity in the data
  const minIntensity = Math.min(...points.map(p => p.intensity));
  const maxIntensity = Math.max(...points.map(p => p.intensity));
  const minY = getY(minIntensity);
  const maxY = getY(maxIntensity);

  // SVG path for the line
  const linePath = points.map((pt, i) => `${i === 0 ? "M" : "L"} ${getX(i)},${getY(pt.intensity)}`).join(" ");

  // Y axis ticks
  const yTicks = [0, 25, 50, 75, 100];

  // Calculate label positions with collision avoidance
  const labelPositions: { x: number; y: number; stagger: boolean }[] = [];
  for (let i = 0; i < points.length; ++i) {
    const x = getX(i);
    let stagger = false;
    if (i > 0) {
      const prev = labelPositions[i - 1];
      if (Math.abs(x - prev.x) < MIN_LABEL_SPACING) {
        // If too close to previous, stagger this one
        stagger = !prev.stagger; // alternate staggering
      }
    }
    labelPositions.push({ x, y: 0, stagger });
  }

  // Tooltip positioning logic (always above the dot, offset so modal is TOOLTIP_MARGIN above dot, no caret)
  let tooltipStyle: React.CSSProperties = {};
  if (hoveredIdx !== null) {
    const x = getX(hoveredIdx);
    const y = getY(points[hoveredIdx].intensity);
    // Modal bottom should be TOOLTIP_MARGIN above the dot
    let unclampedTop = y - TOOLTIP_MARGIN - TOOLTIP_HEIGHT;
    let top = unclampedTop;
    if (top < 0) {
      top = 0;
    }
    tooltipStyle = {
      left: x,
      top,
      transform: "translateX(-50%)",
      pointerEvents: "none",
      opacity: hoveredIdx !== null ? 1 : 0,
      transition: 'opacity 0.18s cubic-bezier(0.4,0,0.2,1), transform 0.18s cubic-bezier(0.4,0,0.2,1)',
      transformOrigin: 'bottom center',
      willChange: 'opacity, transform',
      zIndex: 20,
      ...(hoveredIdx !== null ? { transform: 'translateX(-50%) translateY(-8px) scale(1)' } : { transform: 'translateX(-50%) scale(0.98)' })
    };
  }

  // Only draw grid lines within the orange region (minY to maxY)
  const regionTicks = yTicks.filter(t => t >= minIntensity && t <= maxIntensity);

  return (
    <div className={`w-full ${className || ''}`} ref={containerRef}>
      {title && (
        <div className="text-neutral-400 text-center text-sm">{title}</div>
      )}
      <div className="relative w-full" style={{ height: PLOT_HEIGHT + PLOT_LABEL_HEIGHT + LABEL_STAGGER_Y }}>
        {/* Orange region for data range */}
        <svg width={width} height={PLOT_HEIGHT} className="block absolute left-0 top-0 pointer-events-none" style={{ zIndex: 0 }}>
          <rect
            x={PLOT_PADDING}
            y={maxY}
            width={plotW}
            height={minY - maxY}
            fill="#f97316"
            opacity={0.04}
            rx={8}
          />
          {/* Grid lines only within region */}
          {regionTicks.map((tick) => {
            const y = getY(tick);
            return (
              <line
                key={tick}
                x1={PLOT_PADDING}
                x2={width - PLOT_PADDING}
                y1={y}
                y2={y}
                stroke="#fbbf24"
                strokeDasharray="4 4"
                strokeWidth={tick === minIntensity || tick === maxIntensity ? 1.5 : 1}
                opacity={tick === minIntensity || tick === maxIntensity ? 0.25 : 0.12}
              />
            );
          })}
          {/* Y axis only from maxY to minY */}
          <line
            x1={PLOT_PADDING}
            x2={PLOT_PADDING}
            y1={maxY}
            y2={minY}
            stroke="#f97316"
            strokeWidth={2}
          />
        </svg>
        {/* SVG for line and dots (above region) */}
        <svg width={width} height={PLOT_HEIGHT} className="block relative z-10">
          {/* Line connecting dots */}
          <path
            d={linePath}
            fill="none"
            stroke="#f97316"
            strokeWidth={3}
            style={{ pointerEvents: "none" }}
          />
          {/* Dots and vertical lines */}
          {points.map((pt, i) => (
            <g key={pt.timecode}>
              {/* Vertical line to bottom of orange region (minY) */}
              <line
                x1={getX(i)}
                x2={getX(i)}
                y1={getY(pt.intensity)}
                y2={minY}
                stroke="#f97316"
                strokeWidth={2}
                opacity={0.18}
              />
              {/* Dot */}
              <circle
                cx={getX(i)}
                cy={getY(pt.intensity)}
                r={hoveredIdx === i ? 9 : 7}
                fill="#f97316"
                stroke="#f59e42"
                strokeWidth={hoveredIdx === i ? 3 : 2}
                style={{ cursor: "pointer", transition: "all 0.15s" }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              />
            </g>
          ))}
        </svg>
        {/* Y axis labels (aligned with getY) */}
        <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
          {yTicks.map((tick) => (
            <div
              key={tick}
              style={{
                position: 'absolute',
                left: 0,
                top: getY(tick) - 8,
                width: PLOT_PADDING - 4,
                textAlign: 'right',
                fontSize: '0.75rem',
                color: '#a3a3a3',
                lineHeight: 1,
              }}
            >
              {tick}%
            </div>
          ))}
        </div>
        {/* Y axis title */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-neutral-600 whitespace-nowrap" style={{ left: -36 }}>{yAxisLabel}</div>
        {/* X axis timecode labels with collision avoidance */}
        <div className="absolute left-0 w-full" style={{ top: PLOT_HEIGHT - PLOT_PADDING + 8 }}>
          <div className="relative w-full" style={{ height: PLOT_LABEL_HEIGHT + LABEL_STAGGER_Y }}>
            {points.map((pt, i) => (
              <div
                key={pt.timecode}
                className="absolute text-xs text-neutral-600 whitespace-nowrap"
                style={{
                  left: `${labelPositions[i].x - 18}px`,
                  top: labelPositions[i].stagger ? LABEL_STAGGER_Y : 0,
                  transition: 'top 0.2s',
                }}
              >
                {pt.timecode}
              </div>
            ))}
          </div>
        </div>
        {/* Tooltip */}
        {hoveredIdx !== null && (
          <div
            className="absolute z-20 bg-white shadow-xl rounded-lg px-4 py-3 min-w-[200px] max-w-[260px] text-left"
            style={tooltipStyle}
          >
            <div className="text-sm font-semibold text-neutral-900 mb-0.5">{points[hoveredIdx].label}</div>
            {points[hoveredIdx].description && (
              <div className="text-xs text-neutral-500 mb-1.5 leading-snug">{points[hoveredIdx].description}</div>
            )}
            <div className="text-xs text-neutral-400">{points[hoveredIdx].timecode}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DramaticIntensityPlot; 