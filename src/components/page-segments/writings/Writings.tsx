import type { FunctionComponent } from 'react';
import { WritingInfo, WritingItems } from '../../../fixtures/writing';
import { INTERNAL_LINKS } from '../../../helpers/urls';
import type { EmptyObject } from '../../../types/empty';
import Link from '../../shared/elements/Link';
import Socials from '../../shared/socials/Socials';

const Writings: FunctionComponent<EmptyObject> = () => {
  return (
    <div className="min-h-svh bg-neutral-900">
      {/* Navigation Header */}
      <div className="fixed top-6 left-8 z-50 flex items-center h-9">
        <span className="text-neutral-200 font-medium text-md select-none">Benyam Ephrem</span>
      </div>

      {/* Top-right group: socials and navigation */}
      <div className="fixed top-6 right-8 z-50 flex flex-col items-end gap-2">
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
      <div className="hidden md:flex fixed top-6 left-1/2 -translate-x-1/2 z-50 items-center h-9">
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
      <div className="pt-20 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          {/* Featured Writings Section */}
          <div className="mb-16">
            <h1 className="text-neutral-200 text-4xl md:text-5xl font-serif italic mb-12">Featured Writings</h1>

            {/* Main Featured - Sinners */}
            <div className="mb-12">
              <Link type="internal" dest="/sinners" className="group block">
                <div className="bg-neutral-800/30 rounded-lg p-8 hover:bg-neutral-800/50 transition-all duration-300">
                  <div className="mb-4">
                    <span className="text-neutral-400 text-sm font-medium">Film Analysis</span>
                  </div>
                  <h2 className="text-neutral-100 text-3xl md:text-4xl font-serif italic leading-tight group-hover:text-neutral-50 transition-colors mb-3">
                    Analyzing "Sinners" — By Ryan Coogler
                  </h2>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    A technical breakdown of the film's story, structure, and meaning.
                    Exploring how Ryan Coogler crafted this powerful narrative about
                    community, culture, and the human spirit.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-neutral-400 text-sm">June 2025</span>
                    <span className="text-neutral-600">·</span>
                    <span className="text-neutral-400 text-sm">Film Analysis</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Other Writings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {WritingItems.map((item: WritingInfo, index) => (
                <Link key={index} type="internal" dest={item.path} className="group block">
                  <div className="bg-neutral-800/20 rounded-lg p-6 hover:bg-neutral-800/40 transition-all duration-300 h-full">
                    <div className="mb-3">
                      <span className="text-neutral-400 text-xs font-medium uppercase tracking-wide">
                        {item.path === '/dating' ? 'Technology' : 'Health & Fitness'}
                      </span>
                    </div>
                    <h3 className="text-neutral-100 text-xl md:text-2xl font-serif italic leading-tight group-hover:text-neutral-50 transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                      {item.path === '/dating'
                        ? 'Exploring how technology is reshaping human connection and the future of relationships.'
                        : 'A comprehensive guide to understanding and optimizing body composition through science-based approaches.'
                      }
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 text-xs">{item.date}</span>
                      <span className="text-neutral-600">·</span>
                      <span className="text-neutral-400 text-xs">
                        {item.path === '/dating' ? 'Technology' : 'Health'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Writings;
