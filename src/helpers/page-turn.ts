import { useLayoutEffect } from 'react';

const STORAGE_KEY = 'page-turn';
const OUT_CLASS = 'script-page-out-forward';
const IN_CLASS = 'script-page-in-forward';
const TURN_MS = 680;

let turning = false;

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Fade the current page down, then open the next one so it can rise in. */
export function turnToPage(href: string, push: (href: string) => void) {
  if (turning) return;
  if (reducedMotion()) {
    push(href);
    return;
  }
  turning = true;
  document.documentElement.classList.add(OUT_CLASS);
  window.setTimeout(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode */
    }
    push(href);
  }, TURN_MS);
}

/** Play the rise-in if this page was opened by a turn. */
export function usePageTurnIn() {
  useLayoutEffect(() => {
    turning = false;
    let entered = false;
    try {
      entered = sessionStorage.getItem(STORAGE_KEY) === '1';
      if (entered) sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      entered = false;
    }
    const root = document.documentElement;
    root.classList.remove(OUT_CLASS);
    if (!entered || reducedMotion()) return;
    root.classList.add(IN_CLASS);
    const done = () => root.classList.remove(IN_CLASS);
    root.addEventListener('animationend', done, { once: true });
    return () => root.removeEventListener('animationend', done);
  }, []);
}
