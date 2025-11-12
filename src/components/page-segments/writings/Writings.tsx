import type { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';
import Socials from '../../shared/socials/Socials';

const Writings: FunctionComponent<EmptyObject> = () => {
  return (
    <>
      {/* Navigation Header */}
      <div className="fixed md:fixed absolute top-6 md:top-7 left-8 z-50 flex items-center h-9">
        <Link type="internal" dest={INTERNAL_LINKS.HOME}>
          <span className="text-neutral-800 font-medium text-md select-none cursor-pointer hover:text-neutral-900 transition-colors">Benyam Ephrem</span>
        </Link>
      </div>

      {/* Top-right group: socials and navigation */}
      <div className="fixed md:fixed absolute md:top-6 top-6 right-8 z-50 flex flex-col items-end gap-2">
        <Socials compressed />
        <div className="flex md:hidden items-center gap-2">
          <Link type="internal" dest={INTERNAL_LINKS.HOME}>
            <span className="text-amber-600 hover:text-amber-700 text-sm transition-colors select-none cursor-pointer">Home</span>
          </Link>
          <span className="text-neutral-400 text-xs select-none">·</span>
          <Link type="internal" dest={INTERNAL_LINKS.WORK}>
            <span className="text-neutral-600 hover:text-neutral-800 text-sm transition-colors select-none cursor-pointer">Work</span>
          </Link>
        </div>
      </div>

      {/* Desktop centered navigation */}
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center h-9">
        <div className="flex items-center gap-2">
          <Link type="internal" dest={INTERNAL_LINKS.HOME}>
            <span className="text-amber-600 hover:text-amber-700 text-sm transition-colors select-none cursor-pointer">Home</span>
          </Link>
          <span className="text-neutral-400 text-xs select-none">·</span>
          <Link type="internal" dest={INTERNAL_LINKS.WORK}>
            <span className="text-neutral-600 hover:text-neutral-800 text-sm transition-colors select-none cursor-pointer">Work</span>
          </Link>
        </div>
      </div>

      <div className="min-h-svh w-full flex flex-col px-8 pt-24 md:pt-32 pb-16" style={{ backgroundColor: '#fafaf9' }}>
        <div className="w-full max-w-3xl mx-auto">
          {/* Page Title */}
          <div className="mb-16">
            <h1 className="text-neutral-800 text-3xl md:text-4xl font-serif italic leading-tight mb-2">Writing</h1>
            <p className="text-neutral-500 text-sm">Essays on film, craft, and storytelling</p>
          </div>

          {/* Writings List */}
          <div className="space-y-12">
            {/* Sinners Analysis */}
            <Link type="internal" dest="/sinners" className="group block">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-neutral-500 font-medium">Film Analysis</span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-400">June 20, 2025</span>
                </div>
                <div className="relative">
                  <h2 className="text-neutral-800 text-2xl md:text-3xl font-serif italic leading-tight group-hover:text-neutral-900 transition-colors">
                    Analyzing "Sinners" — By Ryan Coogler
                  </h2>
                  <div className="absolute left-0 w-full h-[1.5px] bg-neutral-300 bg-opacity-60 group-hover:bg-neutral-600 transition-colors" style={{ top: '100%', marginTop: '8px' }} />
                </div>
                <p className="text-neutral-600 text-base leading-relaxed mt-2">
                  A technical breakdown of the film’s story, structure, and meaning. Exploring how Ryan Coogler crafted a powerful narrative about community, culture, and the human spirit.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Writings;
