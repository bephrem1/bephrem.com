import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { FunctionComponent, MouseEvent } from 'react';
import { CURSOR_LEFT, CURSOR_RIGHT } from '../../../helpers/edge-cursor';
import { Dialog, DialogClose, DialogPortal, DialogTitle } from '../../shared/shadcn/components/ui/dialog';

/** Media box of the shooting script, width / height. */
export const PAGE_ASPECT = 794.88 / 1026.72;
const EDGE_FRACTION = 0.12;
const TURN_MS = 680;
const AUTO_TURN_MS = 6700;

type ScriptBookProps = {
  pages: readonly string[];
};

type TurnDirection = 1 | -1;

function pageLabel(index: number, count: number) {
  return `The Match Experiment script, page ${index + 1} of ${count}`;
}

const ScriptBook: FunctionComponent<ScriptBookProps> = ({ pages }) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(0);
  const turningRef = useRef(false);
  const turnTimer = useRef<number | null>(null);
  const warmedRef = useRef<HTMLImageElement[]>([]);
  const cursorZoneRef = useRef<'left' | 'right' | 'center'>('center');
  const [box, setBox] = useState({ width: 0, height: 0 });
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [direction, setDirection] = useState<TurnDirection>(1);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const count = pages.length;

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const rect = frame.getBoundingClientRect();
      let height = rect.height;
      let width = height * PAGE_ASPECT;
      if (width > rect.width) {
        width = rect.width;
        height = width / PAGE_ASPECT;
      }
      setBox((current) =>
        current.width === width && current.height === height ? current : { width, height }
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const turn = useCallback(
    (dir: TurnDirection, snap = false) => {
      if (count < 2) return;
      if (!snap && turningRef.current) return;
      const from = indexRef.current;
      const next = (from + dir + count) % count;
      indexRef.current = next;
      if (snap) {
        if (turnTimer.current) window.clearTimeout(turnTimer.current);
        turnTimer.current = null;
        turningRef.current = false;
        setLeaving(null);
        setIndex(next);
        return;
      }
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      turningRef.current = true;
      setDirection(dir);
      setLeaving(from);
      setIndex(next);
      if (turnTimer.current) window.clearTimeout(turnTimer.current);
      turnTimer.current = window.setTimeout(() => {
        turningRef.current = false;
        setLeaving(null);
        turnTimer.current = null;
      }, reduce ? 0 : TURN_MS);
    },
    [count]
  );

  useEffect(() => {
    return () => {
      if (turnTimer.current) window.clearTimeout(turnTimer.current);
    };
  }, []);

  useEffect(() => {
    if (paused || open || count < 2) return;
    const id = window.setInterval(() => turn(1), AUTO_TURN_MS);
    return () => window.clearInterval(id);
  }, [paused, open, count, index, turn]);

  useEffect(() => {
    if (count === 0) return;
    let cancelled = false;
    const images = pages.map((src) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = src;
      return img;
    });
    warmedRef.current = images;
    let cursor = 0;
    const step = () => {
      if (cancelled || cursor >= images.length) return;
      const img = images[cursor];
      cursor += 1;
      const done = () => {
        if (!cancelled) window.setTimeout(step, 0);
      };
      if (typeof img.decode === 'function') img.decode().then(done, done);
      else done();
    };
    const start = window.setTimeout(step, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
      warmedRef.current = [];
    };
  }, [count, pages]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        turn(1, true);
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        turn(-1, true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, turn]);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const zone = cursorZoneRef.current;
    page.style.cursor = zone === 'left' ? CURSOR_LEFT : zone === 'right' ? CURSOR_RIGHT : 'pointer';
  });

  if (count === 0) return null;

  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = (kind: 'in' | 'out') => {
    if (reduceMotion || leaving === null) return '';
    if (kind === 'out') return direction === 1 ? 'script-page-out-forward' : 'script-page-out-back';
    return direction === 1 ? 'script-page-in-forward' : 'script-page-in-back';
  };

  const applyCursor = (zone: 'left' | 'right' | 'center') => {
    cursorZoneRef.current = zone;
    const page = pageRef.current;
    if (!page) return;
    page.style.cursor = zone === 'left' ? CURSOR_LEFT : zone === 'right' ? CURSOR_RIGHT : 'pointer';
  };

  const onPageClick = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const edge = rect.width * EDGE_FRACTION;
    if (x < edge) {
      turn(-1);
      return;
    }
    if (x > rect.width - edge) {
      turn(1);
      return;
    }
    setOpen(true);
  };

  return (
    <div ref={frameRef} className="relative h-full min-h-0 w-full">
      {box.width > 0 && (
        <button
          ref={pageRef}
          type="button"
          className="absolute left-0 top-1/2 block -translate-y-1/2 overflow-hidden bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]"
          style={{ width: box.width, height: box.height }}
          aria-label={pageLabel(index, count)}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            applyCursor('center');
          }}
          onPointerMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const edge = rect.width * EDGE_FRACTION;
            const zone = x < edge ? 'left' : x > rect.width - edge ? 'right' : 'center';
            if (zone !== cursorZoneRef.current) applyCursor(zone);
          }}
          onMouseDown={(event) => event.preventDefault()}
          onClick={onPageClick}
        >
          <img
            src={pages[index]}
            alt={pageLabel(index, count)}
            draggable={false}
            decoding="async"
            className={`absolute inset-0 h-full w-full select-none object-fill ${motion('in')}`}
          />
          {leaving !== null && (
            <img
              src={pages[leaving]}
              alt=""
              draggable={false}
              className={`pointer-events-none absolute inset-0 h-full w-full select-none object-fill ${motion('out')}`}
            />
          )}
        </button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[1000] bg-black/55 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4 sm:p-8">
            <DialogPrimitive.Content className="relative flex max-h-[94vh] max-w-[94vw] items-center justify-center outline-none">
              <DialogTitle className="sr-only">{pageLabel(index, count)}</DialogTitle>
              <DialogClose className="fixed left-6 top-6 z-[1020] rounded-full bg-white/15 p-2.5 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/30">
                <Cross2Icon className="h-5 w-5 text-white" />
                <span className="sr-only">Close</span>
              </DialogClose>
              <img
                src={pages[index]}
                alt={pageLabel(index, count)}
                draggable={false}
                decoding="async"
                className="max-h-[94vh] w-auto max-w-[94vw] bg-white object-contain shadow-[0_8px_30px_rgba(0,0,0,0.28)]"
              />
            </DialogPrimitive.Content>
          </div>
        </DialogPortal>
      </Dialog>
    </div>
  );
};

export default ScriptBook;
