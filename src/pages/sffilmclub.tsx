import fs from 'fs';
import path from 'path';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, FunctionComponent, MouseEvent } from 'react';
import SfFilmClub from '../components/page-segments/sffilmclub/SfFilmClub';
import { Dialog, DialogClose, DialogPortal, DialogTitle } from '../components/shared/shadcn/components/ui/dialog';
import { turnToPage, usePageTurnIn } from '../helpers/page-turn';
import { useDocumentHeadComponents } from '../hooks/page-headers';

const LUMA_URL = 'https://luma.com/sffilmclub';

/** width / height */
const STILL_ASPECT: Record<number, number> = {
  1: 4096 / 2731,
  2: 4096 / 2731,
  3: 4096 / 2731,
  4: 4096 / 2731,
  5: 2731 / 4096,
  6: 2731 / 4096,
  7: 4096 / 2731,
  8: 2731 / 4096,
  9: 3248 / 2138,
  10: 3232 / 2174,
  11: 1414 / 2176,
  12: 1382 / 2124,
  13: 4096 / 2730,
  14: 2731 / 4096,
  15: 4096 / 2731,
  16: 4096 / 2731
};

/** Exact 3:2 frames, in the order they should sit against the text. */
const BAND_LANDSCAPES = [1, 7, 15, 16, 2, 3, 4, 13];
/** Everything else, nearest the text first. */
const ROW_ORDER = [15, 16, 14, 11, 2, 3, 4, 8, 9, 10, 12, 13, 1, 7];

const WALL_MIN_WIDTH = 1180;

type Props = {
  stills: string[];
};

type Item = {
  src: string;
  n: number;
  aspect: number;
};

type Tile = {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

type TextBox = {
  x: number;
  y: number;
  w: number;
  h: number;
};

type Wall = {
  height: number;
  text: TextBox;
  tiles: Tile[];
};

function stillNumber(src: string) {
  const name = src.split('/').pop() ?? '';
  const n = Number.parseInt(name, 10);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

function aspectOf(n: number) {
  return STILL_ASPECT[n] ?? 3 / 2;
}

function byNumber(stills: string[]) {
  const map = new Map<number, Item>();
  for (const src of stills) {
    const n = stillNumber(src);
    map.set(n, { src, n, aspect: aspectOf(n) });
  }
  return map;
}

/** Integer widths that sum to `w`, closest to each image's share of the row. */
function placeRow(items: Item[], x: number, y: number, w: number, h: number): Tile[] {
  const sumA = items.reduce((sum, item) => sum + item.aspect, 0);
  const widths = items.map((item) => (w * item.aspect) / sumA);
  const floors = widths.map((value) => Math.floor(value));
  let leftover = w - floors.reduce((sum, value) => sum + value, 0);
  const order = widths
    .map((value, index) => ({ index, frac: value - Math.floor(value) }))
    .sort((a, b) => b.frac - a.frac);
  for (let i = 0; i < leftover; i += 1) floors[order[i % order.length].index] += 1;
  leftover = 0;

  let cursor = x;
  return items.map((item, index) => {
    const tile = { src: item.src, x: cursor, y, w: floors[index], h };
    cursor += floors[index];
    return tile;
  });
}

function packRows(items: Item[], width: number, y: number): { tiles: Tile[]; height: number } {
  const targetSum = width / 300;
  const rows: Item[][] = [];
  let current: Item[] = [];
  let sum = 0;
  for (const item of items) {
    const nextSum = sum + item.aspect;
    if (current.length > 0 && (nextSum > targetSum * 1.2 || current.length >= 4)) {
      rows.push(current);
      current = [];
      sum = 0;
    }
    current.push(item);
    sum += item.aspect;
  }
  if (current.length) rows.push(current);

  const tiles: Tile[] = [];
  let cursorY = y;
  for (const row of rows) {
    const sumA = row.reduce((total, item) => total + item.aspect, 0);
    const h = Math.max(1, Math.round(width / sumA));
    tiles.push(...placeRow(row, 0, cursorY, width, h));
    cursorY += h;
  }
  return { tiles, height: cursorY };
}

/**
 * Two equal portraits flank a centered text block. One band of photos sits
 * directly above the text and one directly below, and their heights are the
 * portrait height, so every edge meets.
 */
function buildWall(width: number, textH: number, viewportH: number, items: Map<number, Item>): Wall | null {
  const left = items.get(6);
  const right = items.get(5);
  if (!left || !right || textH <= 0) return null;

  const landscapes = BAND_LANDSCAPES.map((n) => items.get(n)).filter((item): item is Item => Boolean(item));
  let best: { count: number; score: number } | null = null;

  for (const count of [1, 2, 3]) {
    if (landscapes.length < count * 2) continue;
    const aspectSum = landscapes.slice(0, count).reduce((sum, item) => sum + item.aspect, 0);
    const flankAspect = (left.aspect + right.aspect) / 2;
    const heroH = (2 * width / aspectSum + textH) / (1 + (2 * flankAspect * 2) / aspectSum);
    const flankW = heroH * flankAspect;
    const textW = width - flankW * 2;
    if (textW < 380 || textW > 640 || heroH < textH + 80) continue;
    const score = Math.abs(heroH - viewportH) + Math.abs(textW - 470) * 0.35;
    if (!best || score < best.score) best = { count, score };
  }

  const count = best?.count ?? 1;
  if (landscapes.length < count * 2) return null;

  const top = landscapes.slice(0, count);
  const bottom = landscapes.slice(count, count * 2);
  const aspectSum = top.reduce((sum, item) => sum + item.aspect, 0);
  const flankAspect = (left.aspect + right.aspect) / 2;
  const heroH = (2 * width / aspectSum + textH) / (1 + (4 * flankAspect) / aspectSum);
  let flankW = Math.round(heroH * flankAspect);
  let textW = width - flankW * 2;
  if (textW < 320) return null;

  // Keep the copy from hitting the photos, and keep the long meeting title intact.
  const minTextW = 500;
  if (textW < minTextW && width - minTextW >= 360) {
    flankW = Math.floor((width - minTextW) / 2);
    textW = width - flankW * 2;
  }

  const aboveH = Math.max(1, Math.round(textW / aspectSum));
  const belowH = Math.max(1, Math.round(textW / bottom.reduce((sum, item) => sum + item.aspect, 0)));
  const heroHeight = aboveH + textH + belowH;

  const tiles: Tile[] = [
    { src: left.src, x: 0, y: 0, w: flankW, h: heroHeight },
    { src: right.src, x: flankW + textW, y: 0, w: flankW, h: heroHeight },
    ...placeRow(top, flankW, 0, textW, aboveH),
    ...placeRow(bottom, flankW, aboveH + textH, textW, belowH)
  ];

  const used = new Set([left.n, right.n, ...top.map((item) => item.n), ...bottom.map((item) => item.n)]);
  const rest = ROW_ORDER.map((n) => items.get(n)).filter((item): item is Item => Boolean(item) && !used.has(item.n));
  const packed = packRows(rest, width, heroHeight);
  tiles.push(...packed.tiles);

  return {
    height: packed.height,
    text: { x: flankW, y: aboveH, w: textW, h: textH },
    tiles
  };
}

function buildStack(width: number, items: Map<number, Item>): Wall {
  const order = [5, 1, 6, 7, 11, 14, 15, 16, 2, 3, 4, 8, 9, 10, 12, 13];
  const list = order.map((n) => items.get(n)).filter((item): item is Item => Boolean(item));
  const packed = packRows(list, width, 0);
  return { height: packed.height, text: { x: 0, y: 0, w: width, h: 0 }, tiles: packed.tiles };
}

const SfFilmClubPage: FunctionComponent<Props> = ({ stills }) => {
  const router = useRouter();
  usePageTurnIn();
  const items = useMemo(() => byNumber(stills), [stills]);
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [wall, setWall] = useState<Wall | null>(null);
  const [stacked, setStacked] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const { SEOTags } = useDocumentHeadComponents({
    title: 'SF Film Club',
    description: 'SF Film Club meets once every 2 months in San Francisco.'
  });

  const sequence = useMemo(() => {
    if (!wall) return stills;
    return [...wall.tiles].sort((a, b) => a.y + a.h / 2 - (b.y + b.h / 2) || a.x - b.x).map((tile) => tile.src);
  }, [wall, stills]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const text = textRef.current;
    if (!root || !text) return;

    const measure = () => {
      const width = root.clientWidth;
      if (width <= 0) return;
      const viewportH = window.innerHeight || 900;

      if (width < WALL_MIN_WIDTH) {
        text.style.width = '';
        text.style.height = '';
        setStacked(true);
        setWall(buildStack(width, items));
        return;
      }

      text.style.height = 'auto';
      let textH = text.offsetHeight;
      let next = buildWall(width, textH, viewportH, items);
      for (let pass = 0; pass < 3 && next; pass += 1) {
        text.style.width = `${next.text.w}px`;
        const measured = text.offsetHeight;
        if (measured === textH) break;
        textH = measured;
        next = buildWall(width, textH, viewportH, items);
      }

      if (!next) {
        text.style.width = '';
        text.style.height = '';
        setStacked(true);
        setWall(buildStack(width, items));
        return;
      }

      setStacked(false);
      setWall(next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [items]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      setActive((current) => {
        if (current === null || sequence.length === 0) return current;
        return (current + direction + sequence.length) % sequence.length;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, sequence.length]);

  const goHome = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    turnToPage('/', (href) => router.push(href));
  };

  const open = active !== null ? sequence[active] : null;
  const openName = open ? String(stillNumber(open)) : '';
  const textStyle: CSSProperties | undefined =
    wall && !stacked
      ? { left: wall.text.x, top: wall.text.y, width: wall.text.w, height: wall.text.h }
      : undefined;

  return (
    <>
      <Head>{SEOTags}</Head>
      <main className="min-h-svh w-full overflow-x-clip bg-[#fafafa] font-sans text-neutral-950 antialiased">
        <div
          ref={rootRef}
          className="relative w-full overflow-hidden"
          style={wall && !stacked ? { height: wall.height } : undefined}
        >
          <div
            ref={textRef}
            className={
              stacked
                ? 'relative z-10 box-border w-full bg-[#fafafa] px-6 py-8 sm:px-8 sm:py-10'
                : 'absolute z-10 box-border flex flex-col justify-center bg-[#fafafa] px-7 py-6'
            }
            style={textStyle}
          >
            <p className="text-[0.8125rem] leading-snug text-neutral-950 sm:text-[0.875rem]">
              Meeting once every 2 months, {' '}
              <a
                href={LUMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 underline decoration-blue-600/70 underline-offset-2 hover:text-blue-800 hover:decoration-blue-700"
              >join on Luma</a>.
            </p>

            <div className="mt-5">
              <SfFilmClub />
            </div>

            <p className="mt-6 text-[0.8125rem] leading-snug sm:text-[0.875rem]">
              <NextLink
                href="/"
                onClick={goHome}
                className="text-neutral-500 underline decoration-neutral-300 underline-offset-2 hover:text-neutral-950 hover:decoration-neutral-500"
              >
                go home
              </NextLink>
            </p>
          </div>

          {wall ? (
            <div className={stacked ? 'relative w-full' : undefined} style={stacked ? { height: wall.height } : undefined}>
              {wall.tiles.map((tile) => (
                <StillButton
                  key={tile.src}
                  src={tile.src}
                  style={{
                    position: 'absolute',
                    left: tile.x,
                    top: tile.y,
                    width: tile.w + 1,
                    height: tile.h + 1
                  }}
                  onClick={() => setActive(sequence.indexOf(tile.src))}
                />
              ))}
            </div>
          ) : null}
        </div>
      </main>

      <Dialog
        open={open !== null}
        onOpenChange={(next) => {
          if (!next) setActive(null);
        }}
      >
        <DialogPortal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[1000] bg-black/55 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4 sm:p-8">
            <DialogPrimitive.Content className="relative flex max-h-[94vh] max-w-[94vw] items-center justify-center outline-none">
              <DialogTitle className="sr-only">{open ? `SF Film Club still ${openName}` : 'SF Film Club still'}</DialogTitle>
              <DialogClose className="fixed left-6 top-6 z-[1020] rounded-full bg-white/15 p-2.5 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/30">
                <Cross2Icon className="h-5 w-5 text-white" />
                <span className="sr-only">Close</span>
              </DialogClose>
              {open ? (
                <img
                  src={open}
                  alt={`SF Film Club still ${openName}`}
                  className="max-h-[94vh] w-auto max-w-[94vw] object-contain"
                  draggable={false}
                />
              ) : null}
            </DialogPrimitive.Content>
          </div>
        </DialogPortal>
      </Dialog>
    </>
  );
};

const StillButton: FunctionComponent<{
  src: string;
  onClick: () => void;
  style?: CSSProperties;
}> = ({ src, onClick, style }) => {
  const name = String(stillNumber(src));
  return (
    <button
      type="button"
      style={style}
      className="block cursor-zoom-in overflow-hidden"
      aria-label={`View enlarged SF Film Club still ${name}`}
      onClick={onClick}
    >
      <img src={src} alt="" className="block h-full w-full object-cover" draggable={false} />
    </button>
  );
};

function fileOrder(name: string) {
  const n = Number.parseInt(name, 10);
  return Number.isFinite(n) ? n : Number.MAX_SAFE_INTEGER;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dir = path.join(process.cwd(), 'public/sffilmclub/1-6collage');
  let stills: string[] = [];
  try {
    stills = fs
      .readdirSync(dir)
      .filter((name) => /\.(jpe?g|png|webp)$/i.test(name))
      .sort((a, b) => fileOrder(a) - fileOrder(b) || a.localeCompare(b))
      .map((name) => `/sffilmclub/1-6collage/${name}`);
  } catch {
    stills = [];
  }

  return { props: { stills } };
};

export default SfFilmClubPage;
