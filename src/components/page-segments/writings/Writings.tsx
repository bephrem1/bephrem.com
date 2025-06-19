import type { FunctionComponent } from 'react';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';
import Socials from '../../shared/socials/Socials';

const Writings: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="min-h-svh bg-neutral-900">
      <div className="w-full max-w-7xl mx-auto px-8">
        {/* Navigation Header */}
        <div className="absolute top-6 left-8 z-50 flex items-center h-9">
          <Link type="internal" dest={INTERNAL_LINKS.HOME}>
            <span className="text-neutral-200 font-medium text-md select-none cursor-pointer hover:text-neutral-100 transition-colors">Benyam Ephrem</span>
          </Link>
        </div>

        {/* Top-right group: socials and navigation */}
        <div className="absolute top-6 right-8 z-50 flex flex-col items-end gap-2">
          <Socials compressed />
          <div className="flex md:hidden items-center gap-2">
            <Link type="internal" dest={INTERNAL_LINKS.HOME}>
              <span className="text-amber-400 hover:text-amber-300 text-sm transition-colors select-none cursor-pointer">Home</span>
            </Link>
            <span className="text-neutral-500 text-xs select-none">·</span>
            <Link type="internal" dest="/about">
              <span className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors select-none cursor-pointer">About</span>
            </Link>
          </div>
        </div>

        {/* Desktop centered navigation */}
        <div className="hidden md:flex absolute top-6 left-1/2 -translate-x-1/2 z-50 items-center h-9">
          <div className="flex items-center gap-2">
            <Link type="internal" dest={INTERNAL_LINKS.HOME}>
              <span className="text-amber-400 hover:text-amber-300 text-sm transition-colors select-none cursor-pointer">Home</span>
            </Link>
            <span className="text-neutral-500 text-xs select-none">·</span>
            <Link type="internal" dest="/about">
              <span className="text-neutral-400 hover:text-neutral-200 text-sm transition-colors select-none cursor-pointer">About</span>
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Featured Writings Section */}
            <div className="mb-16">
              <h2 className="text-neutral-200 text-2xl font-serif italic mb-6 md:mb-8">Featured</h2>

              {/* Main Featured - Sinners */}
              <div className="mb-16">
                <Link type="internal" dest="/sinners" className="group block">
                  <div className="bg-neutral-800/30 rounded-lg overflow-hidden">
                    <div className="w-full h-64 md:aspect-[3/1] relative">
                      <img
                        src="/images/film-analysis/films/sinners/og-image/sinners-og-image.jpg"
                        alt="Sinners Film Analysis"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8">
                      <div className="mb-4">
                        <span className="text-neutral-400 text-sm font-medium">Film Analysis</span>
                        <span className="text-neutral-600 mx-2">·</span>
                        <span className="text-neutral-400 text-sm">June 20, 2025</span>
                      </div>
                      <h2 className="text-neutral-100 text-2xl md:text-3xl lg:text-4xl font-serif italic leading-tight group-hover:text-neutral-50 transition-colors mb-3">
                        Analyzing "Sinners" — By Ryan Coogler
                      </h2>
                      <p className="text-neutral-400 text-base md:text-lg leading-[1.4] mb-4">
                        A technical breakdown of the film's story, structure, and meaning.
                        Exploring how Ryan Coogler crafted this powerful narrative about
                        community, culture, and the human spirit.
                      </p>
                      <div className="flex items-center justify-end">
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Other Writings Section */}
              <div>
                <h2 className="text-neutral-400 text-xl font-serif italic mb-6">Other Writings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hardcoded posts */}
                  <Link type="internal" dest="/body-composition" className="group block">
                    <div className="bg-neutral-800/10 rounded-lg p-6 hover:bg-neutral-800/30 transition-all duration-300 h-full">
                      <div className="mb-3">
                        <span className="text-neutral-500 text-xs font-medium uppercase tracking-wide">
                          Health & Fitness
                        </span>
                      </div>
                      <h3 className="text-neutral-200 text-lg md:text-xl font-serif italic leading-tight group-hover:text-neutral-50 transition-colors mb-3">
                        Mastering Body Composition
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        A simple guide to understanding and optimizing body composition through science-based approaches.
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500 text-xs">June 20, 2025</span>
                        <span className="text-neutral-600">·</span>
                        <span className="text-neutral-500 text-xs">
                          Health & Fitness
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writings;
