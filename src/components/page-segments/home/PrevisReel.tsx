import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FunctionComponent } from 'react';
import { CURSOR_LEFT_LIGHT, CURSOR_RIGHT_LIGHT } from '../../../helpers/edge-cursor';
import type { PrevisStill } from '../../../helpers/previs-stills';
import { Dialog, DialogClose, DialogPortal, DialogTitle } from '../../shared/shadcn/components/ui/dialog';

/** Same proportion as a 6-up 16:9 film strip filling this column. */
const FILM_STRIP_ASPECT = '32 / 3';
const FRAME_ASPECT = 1920 / 804;
const SPEED_PX_PER_SEC = 45;
const BUFFER_FRAMES = 4;
const SKIP_FRAMES = 10;
const SKIP_MS = 850;
const EDGE_FRACTION = 0.06;

type ReelZone = 'left' | 'right' | 'center';

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function wrapOffset(offset: number, loop: number) {
  if (loop <= 0) return 0;
  return ((offset % loop) + loop) % loop;
}

function frameWidthFor(stripHeight: number) {
  return Math.max(1, Math.round(stripHeight * FRAME_ASPECT));
}

type PrevisReelProps = {
  stills: readonly PrevisStill[];
};

function sameList(a: readonly number[], b: readonly number[]) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function frameX(index: number, offset: number, count: number, frameWidth: number) {
  const loop = frameWidth * count;
  let x = index * frameWidth - offset;
  if (x + frameWidth <= 0) x += loop;
  return x;
}

function visibleIndices(offset: number, viewport: number, count: number, frameWidth: number) {
  if (count === 0 || viewport <= 0 || frameWidth <= 0) return [];
  const bufferPx = BUFFER_FRAMES * frameWidth;
  const indices: number[] = [];
  for (let index = 0; index < count; index += 1) {
    const x = frameX(index, offset, count, frameWidth);
    if (x < viewport + bufferPx && x + frameWidth > -bufferPx) indices.push(index);
  }
  return indices;
}

function placeFrames(
  offset: number,
  viewport: number,
  frameWidth: number,
  stills: readonly PrevisStill[],
  nodes: Map<string, HTMLButtonElement>
) {
  const next = visibleIndices(offset, viewport, stills.length, frameWidth);
  for (const index of next) {
    const node = nodes.get(stills[index].id);
    if (!node) continue;
    node.style.width = `${frameWidth + 1}px`;
    node.style.transform = `translate3d(${frameX(index, offset, stills.length, frameWidth)}px,0,0)`;
  }
  return next;
}

const PrevisReel: FunctionComponent<PrevisReelProps> = ({ stills }) => {
  const rootRef = useRef<HTMLElement>(null);
  const nodesRef = useRef(new Map<string, HTMLButtonElement>());
  const offsetRef = useRef(0);
  const visibleRef = useRef<number[]>([]);
  const pausedRef = useRef(false);
  const activeRef = useRef<PrevisStill | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const frameWidthRef = useRef(0);
  const skipRef = useRef<{ from: number; to: number; start: number } | null>(null);
  const cursorZoneRef = useRef<ReelZone>('center');
  const [frameWidth, setFrameWidth] = useState(0);
  const [visible, setVisible] = useState<number[]>([]);
  const [active, setActive] = useState<PrevisStill | null>(null);
  const count = stills.length;

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointerRef.current = { x: event.clientX, y: event.clientY };
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || stills.length === 0) return;
    const nextWidth = frameWidthFor(root.clientHeight);
    frameWidthRef.current = nextWidth;
    offsetRef.current = Math.random() * nextWidth * stills.length;
    const next = visibleIndices(offsetRef.current, root.clientWidth, stills.length, nextWidth);
    visibleRef.current = next;
    setFrameWidth(nextWidth);
    setVisible(next);
  }, [stills]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || stills.length === 0) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let last = performance.now();

    const syncFrameWidth = () => {
      const nextWidth = frameWidthFor(root.clientHeight);
      const prevWidth = frameWidthRef.current;
      if (prevWidth > 0 && nextWidth !== prevWidth) {
        const progress = offsetRef.current / (prevWidth * stills.length);
        offsetRef.current = progress * nextWidth * stills.length;
        frameWidthRef.current = nextWidth;
        setFrameWidth(nextWidth);
      }
      return frameWidthRef.current;
    };

    const commitVisible = (viewport: number) => {
      const width = syncFrameWidth();
      const next = placeFrames(offsetRef.current, viewport, width, stills, nodesRef.current);
      if (!sameList(visibleRef.current, next)) {
        visibleRef.current = next;
        setVisible(next);
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      const width = frameWidthRef.current;
      const loop = width * stills.length;
      const skip = skipRef.current;
      if (skip && loop > 0) {
        if (reduceMotion.matches) {
          offsetRef.current = wrapOffset(skip.to, loop);
          skipRef.current = null;
        } else {
          const t = Math.min(1, (now - skip.start) / SKIP_MS);
          const at = skip.from + (skip.to - skip.from) * easeOutCubic(t);
          offsetRef.current = wrapOffset(at, loop);
          if (t >= 1) skipRef.current = null;
        }
      } else if (!pausedRef.current && !reduceMotion.matches && loop > 0) {
        offsetRef.current += (SPEED_PX_PER_SEC * dt) / 1000;
        if (offsetRef.current >= loop) offsetRef.current -= loop;
      }
      commitVisible(root.clientWidth);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const observer = new ResizeObserver(() => commitVisible(root.clientWidth));
    observer.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [stills]);

  const applyCursor = (zone: ReelZone) => {
    cursorZoneRef.current = zone;
    const cursor = zone === 'left' ? CURSOR_LEFT_LIGHT : zone === 'right' ? CURSOR_RIGHT_LIGHT : 'pointer';
    const root = rootRef.current;
    if (!root) return;
    root.style.cursor = cursor;
    for (const node of nodesRef.current.values()) node.style.cursor = cursor;
  };

  const zoneAt = (clientX: number): ReelZone => {
    const root = rootRef.current;
    if (!root) return 'center';
    const rect = root.getBoundingClientRect();
    if (rect.width <= 0) return 'center';
    const x = clientX - rect.left;
    const edge = rect.width * EDGE_FRACTION;
    if (x < edge) return 'left';
    if (x > rect.width - edge) return 'right';
    return 'center';
  };

  const skipBy = (direction: -1 | 1) => {
    const width = frameWidthRef.current;
    if (width <= 0 || stills.length === 0) return;
    const distance = direction * SKIP_FRAMES * width;
    const now = performance.now();
    const active = skipRef.current;
    if (active) {
      const t = Math.min(1, (now - active.start) / SKIP_MS);
      const at = active.from + (active.to - active.from) * easeOutCubic(t);
      skipRef.current = { from: at, to: active.to + distance, start: now };
      return;
    }
    skipRef.current = { from: offsetRef.current, to: offsetRef.current + distance, start: now };
  };

  const openStill = (still: PrevisStill) => {
    activeRef.current = still;
    pausedRef.current = true;
    setActive(still);
  };

  const pointerIsOverReel = () => {
    const root = rootRef.current;
    const pointer = pointerRef.current;
    if (!root || !pointer) return false;
    const hit = document.elementFromPoint(pointer.x, pointer.y);
    return !!hit && (hit === root || root.contains(hit));
  };

  const closeStill = () => {
    activeRef.current = null;
    setActive(null);
    requestAnimationFrame(() => {
      pausedRef.current = pointerIsOverReel();
    });
  };

  if (count === 0) return null;

  return (
    <section
      ref={rootRef}
      aria-label="The Match Experiment previs"
      className="relative w-full shrink-0 cursor-pointer overflow-hidden bg-neutral-950"
      style={{ aspectRatio: FILM_STRIP_ASPECT }}
      onMouseEnter={(event) => {
        pausedRef.current = true;
        applyCursor(zoneAt(event.clientX));
      }}
      onMouseLeave={() => {
        if (activeRef.current === null) pausedRef.current = false;
        applyCursor('center');
      }}
      onPointerMove={(event) => {
        const zone = zoneAt(event.clientX);
        if (zone === cursorZoneRef.current) return;
        applyCursor(zone);
      }}
    >
      {frameWidth > 0 &&
        visible.map((index) => {
        const still = stills[index];
        return (
          <button
            key={still.id}
            ref={(node) => {
              if (node) {
                nodesRef.current.set(still.id, node);
                const zone = cursorZoneRef.current;
                node.style.cursor = zone === 'left' ? CURSOR_LEFT_LIGHT : zone === 'right' ? CURSOR_RIGHT_LIGHT : 'pointer';
              } else nodesRef.current.delete(still.id);
            }}
            type="button"
            className="absolute left-0 top-0 h-full overflow-hidden"
            style={{
              width: frameWidth + 1,
              transform: `translate3d(${frameX(index, offsetRef.current, count, frameWidth)}px,0,0)`,
            }}
            aria-label={`Open ${still.alt}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={(event) => {
              const spot = zoneAt(event.clientX);
              if (spot === 'left') {
                skipBy(-1);
                return;
              }
              if (spot === 'right') {
                skipBy(1);
                return;
              }
              openStill(still);
            }}
          >
            <img
              src={still.strip}
              alt=""
              draggable={false}
              className="pointer-events-none h-full w-full select-none object-cover"
            />
          </button>
        );
      })}

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) closeStill();
        }}
      >
        <DialogPortal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[1000] bg-black/55 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4 sm:p-8">
            <DialogPrimitive.Content className="relative flex max-h-[94vh] max-w-[94vw] items-center justify-center outline-none">
              <DialogTitle className="sr-only">{active?.alt ?? 'Previs still'}</DialogTitle>
              <DialogClose className="fixed left-6 top-6 z-[1020] rounded-full bg-white/15 p-2.5 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/30">
                <Cross2Icon className="h-5 w-5 text-white" />
                <span className="sr-only">Close</span>
              </DialogClose>
              {active ? (
                <img
                  src={active.full}
                  alt={active.alt}
                  className="max-h-[94vh] w-auto max-w-[94vw] object-contain"
                  draggable={false}
                />
              ) : null}
            </DialogPrimitive.Content>
          </div>
        </DialogPortal>
      </Dialog>
    </section>
  );
};

export default PrevisReel;
