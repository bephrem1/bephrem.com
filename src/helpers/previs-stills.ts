const STILLS_BASE = '/narrative/the-match-experiment/previs/stills';
const STRIP_BASE = '/narrative/the-match-experiment/previs/strip';

const STILL_NAME = /^(\d+)([A-Za-z]+)(?:_(\d+))?\.png$/i;

export type PrevisStill = {
  id: string;
  full: string;
  strip: string;
  alt: string;
};

type StillKey = {
  scene: number;
  letter: string;
  frame: number;
};

function stillKey(filename: string): StillKey {
  const match = STILL_NAME.exec(filename);
  if (!match) {
    return { scene: Number.MAX_SAFE_INTEGER, letter: filename.toUpperCase(), frame: 0 };
  }
  return {
    scene: Number(match[1]),
    letter: match[2].toUpperCase(),
    frame: match[3] ? Number(match[3]) : 0,
  };
}

/** Story order: scene number, setup letter, then frame. Names without `_XX` are a single frame. */
export function comparePrevisFilenames(a: string, b: string): number {
  const ka = stillKey(a);
  const kb = stillKey(b);
  if (ka.scene !== kb.scene) return ka.scene - kb.scene;
  if (ka.letter !== kb.letter) return ka.letter < kb.letter ? -1 : 1;
  if (ka.frame !== kb.frame) return ka.frame - kb.frame;
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function toPrevisStill(filename: string): PrevisStill {
  const id = filename.replace(/\.png$/i, '');
  return {
    id,
    full: `${STILLS_BASE}/${encodeURIComponent(filename)}`,
    strip: `${STRIP_BASE}/${encodeURIComponent(id)}.jpg`,
    alt: `The Match Experiment previs ${id}`,
  };
}
