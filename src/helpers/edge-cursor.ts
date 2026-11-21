function cursor(shaft: string, head: string, color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="${shaft} ${head}" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 16 16, pointer`;
}

const LEFT = 'M24 16H9';
const LEFT_HEAD = 'M13.6 12.7 8 16l5.6 3.3';
const RIGHT = 'M8 16h15';
const RIGHT_HEAD = 'M18.4 12.7 24 16l-5.6 3.3';

/** Plain arrow. Hotspot is the center of the mark. */
export const CURSOR_LEFT = cursor(LEFT, LEFT_HEAD, '#000');
export const CURSOR_RIGHT = cursor(RIGHT, RIGHT_HEAD, '#000');
export const CURSOR_LEFT_LIGHT = cursor(LEFT, LEFT_HEAD, '#fff');
export const CURSOR_RIGHT_LIGHT = cursor(RIGHT, RIGHT_HEAD, '#fff');
