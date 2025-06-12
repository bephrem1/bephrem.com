import { clsx } from "clsx";
import { formatDistanceToNow, isValid, parse, parseISO } from "date-fns";
import React from "react";
import { twMerge } from "tailwind-merge";
import SinnersPlotOverview from "../components/film-analysis/sinners/plots/SinnersPlotOverview";
import Image from "../components/shared/elements/Image";
import Link from "../components/shared/elements/Link";
import { isEmpty } from "../helpers/empty";
import { EXTERNAL_LINKS } from "../helpers/urls";
import QuoteIcon from "../icons/lib/QuoteIcon";

const SinnersFilmAnalysisPage = () => {
  return <div className="flex flex-col w-full min-h-svh items-center bg-neutral-50">
    <div className="flex w-full max-w-[1400px]">
      {/* Left fixed column */}
      <div className="hidden sm:block w-[250px] fixed top-16 left-4 p-2">
        <LeftColumnContents />
      </div>

      {/* Main content */}
      <div className="flex flex-col w-full sm:w-[700px] sm:ml-[330px] min-h-svh border-r border-r-neutral-300">
        <Contents />
      </div>
    </div>
  </div>;
};

const LeftColumnContents = () => {
  return (
    <div>
      <div>
        <Image
          path="/film-analysis/films/sinners/promo/sinners-poster"
          alt="Sinners movie poster"
          width="175"
          ext="jpg"
          style={{
            borderRadius: "4px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)"
          }}
          optimize={false}
          inspectable
        />
        <a href="https://www.imdb.com/title/tt31193180/fullcredits/" target="_blank" rel="noopener noreferrer" className="block mt-1.5">
          <p className="text-neutral-500 text-sm">full cast & crew <span className="text-neutral-400"> — IMDB</span></p>
        </a>
      </div>
    </div>
  )
}

const Contents = () => {
  return (
    <div className="pt-16">
      <div className="px-4 sm:px-2 sm:pr-12">
        <Header className="mb-4 sm:mb-4" title="Sinners Film Analysis" date="2025-06-14" />

        <HiddenAside title="Personal Preface" defaultOpen>
          <p className="leading-5 text-neutral-500 text-justify mb-2">Sinners is a film that has <i>rocked my world</i>. As a filmmaker (not that I consider myself one yet), sometimes you watch things
            that move you so deeply, that you say "<i>That</i>. <b>That's it</b>. That's what this is all about."</p>
          <p className="leading-5 text-neutral-500 text-justify">
            Albeit, Sinners is a $90M blockbuster with hundreds of craftspeople involved, & working relationships spanning decades — and I make videos where the
            primary production expenses are $10 Uber rides. There is still an internal recognition when you're watching something <s className="mr-1">great</s>
            timeless. Something that has maximized the power of its <span className="text-neutral-400">(incredibly challenging)</span> medium.
          </p>
          <p className="leading-5 text-neutral-500 text-justify mt-2">Growing up I didn't watch many movies. When I did, I enjoyed them, but nothing deeply resonated within me. My sister
            would watch "Entertainment Tonight" downstairs and my eyes would glaze over as the latest star with lip surgery crossed the red carpet.
            "Why did they matter? Why were we idolizing regular and flawed people, just like us?" I saw movies as entertainment, and entertainment was
            a waste of time.</p>
          <p className="leading-5 text-neutral-500 text-justify mt-2">At 16 I was upstairs programming. Making apps for Android phones, then running them downstairs to show my parents.
            Programming and striving to be the best engineer was all I knew. It has constituted the past 10 years of my work. I've been loosely interested in video
            and visual art, but I've never looked into that interest very seriously.</p>
          <p className="leading-5 text-neutral-500 text-justify mt-2"> One day in early April, <a href="https://www.youtube.com/watch?v=78Ru62uFM0s" className="text-indigo-600 hover:text-indigo-700 visited:text-indigo-400" target="_blank" rel="noopener noreferrer">this video from Kodak</a> popped
            up in my YouTube feed. I watched it and decided to buy a ticket for the first IMAX showing (on April 18th). I would watch the film 2 more times that weekend.
            Then 2 times the next week. Then 3 the next.</p>
          <p className="leading-5 text-neutral-500 text-justify mt-2">This eventually gave way to an obsession. Any free evening I'd get, I would try to see the movie
            in 70mm at Grand Lake Theater in Oakland, CA <span className="text-neutral-400">(Ryan Coogler's hometown theater)</span>, or at AMC Metreon 16 in San Francisco, CA <span className="text-neutral-400">(the film inevitably returned to IMAX for a week)</span>.
          </p>
          <p className="leading-5 text-neutral-500 text-justify mt-2"> For a few weeks I was following <a href="https://www.usatoday.com/story/entertainment/movies/2025/05/01/clarksdale-mississippi-sinners-movie-theaters-cast-visit/83387768007/" className="text-indigo-600 hover:text-indigo-700 visited:text-indigo-400" target="_blank" rel="noopener noreferrer">the story</a> that
            they might be screening the film in the town of Clarksdale, Mississippi <span className="text-neutral-400">(where the film took place)</span>. The town has no local movie theater in operation, the closest theater being 1 1/2 hrs away in Memphis, TN.
            Later, when I saw it was <a href="https://www.mpbonline.org/blogs/news/ryan-coogler-is-bringing-sinners-home-to-clarksdale-for-a-series-of-screenings-qa/" className="text-indigo-600 hover:text-indigo-700 visited:text-indigo-400" target="_blank" rel="noopener noreferrer">confirmed</a>, I <i>had</i> to book a flight to Mississippi.
            To see where the film took place & understand how the story was constructed.
          </p>
          <p className="leading-5 text-neutral-500 text-justify mt-2">
            At the time of this writing I have watched the film ~20 times, I will probably watch it many more times in my lifetime, but at this point content-wise it is etched
            into my mind.
          </p>
          <p className="leading-5 text-neutral-500 text-justify mt-2">
            The following is a technical breakdown of the film, with a focus on story, structure, and meaning.
          </p>
        </HiddenAside>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <P>The following is a breakdown of the film “Sinners” by writer/director Ryan Coogler. This is not a review, but rather a technical analysis of the
          film — with a focus on story, structure, and meaning. Blocking of scenes, score & sound design, cinematography, & editing will be covered where appropriate.</P>
        <P>This is best read after watching the film, or during subsequent rewatches, as I will be referencing very specific moments in certain scenes (most of which I cannot display a still frame for, for copyright reasons).</P>
        <P>I will try my best with historical context, but I have not conducted the in-depth research to do justice the serious and lengthy history the film is based on. Most historical
          remarks will be from cursory Internet searches, and findings I personally found surprising.</P>
        <P>When referencing specific moments, I will write a timecode form the digital master like this: <span className="text-neutral-500">[52:00]</span> or <span className="text-neutral-500">[1:23:45]</span>. I will
          also describe the moment so we can quickly get on the same page.</P>
      </div>

      <SinnersPlotOverview />
    </div>
  )
}

/* formatting (cleanup with .mdx later) */

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-neutral-800 text-3xl font-semibold text-justify mb-2.5">{children}</h1>
}
const H2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-neutral-800 text-2xl font-semibold text-justify mb-2.5">{children}</h2>
}
const H3 = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-neutral-800 text-xl font-semibold text-justify mb-2.5">{children}</h3>
}
const H4 = ({ children }: { children: React.ReactNode }) => {
  return <h4 className="text-neutral-800 text-lg font-semibold text-justify mb-2.5">{children}</h4>
}
const H5 = ({ children }: { children: React.ReactNode }) => {
  return <h5 className="text-neutral-800 text-base font-semibold text-justify mb-2.5">{children}</h5>
}
const H6 = ({ children }: { children: React.ReactNode }) => {
  return <h6 className="text-neutral-800 text-base font-semibold text-justify mb-2.5">{children}</h6>
}
const P = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-neutral-950 text-justify mb-3 [&>sup]:text-neutral-400 [&>sup]:text-xs [&>sup]:relative">{children}</p>
}
const A = ({ children, href }: { children: React.ReactNode, href: string }) => {
  return <a
    className="text-amber-400 hover:text-amber-300 visited:text-amber-300"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
}

const UnorderedList = ({ children }: { children: React.ReactNode }) => {
  return <ul className="list-disc mb-3.5">{children}</ul>
}

const OrderedList = ({ children }: { children: React.ReactNode }) => {
  return <ol className="list-decimal mb-3.5">{children}</ol>
}

const ListItem = ({ children }: { children: React.ReactNode }) => {
  return <li className="ml-8 mt-2">{children}</li>
}

const HorizontalRule = () => {
  return <hr className="border-neutral-600 my-5" />
}

const BlockQuote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote
      className="border-l border-neutral-500 pl-4 mb-5"
      style={{ borderLeftWidth: "0.5px" }}
    >
      <div className="text-neutral-500 italic mb-1.5 [&>p]:text-neutral-500 [&>p]:italic [&>p]:mb-1.5">
        {children}
      </div>
    </blockquote>
  )
}

const Aside = ({ children }: { children: React.ReactNode }) => {
  return <aside
    className="border-l border-neutral-500 pl-4 mb-4"
    style={{ borderLeftWidth: "0.5px" }}
  >
    <div className="text-neutral-400 italic mb-1.5 [&>p]:text-neutral-500 [&>p]:italic [&>p]:mb-1.5">
      {children}
    </div>
  </aside>
}

const Quote = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex pb-4 rounded-lg">
    <QuoteIcon className="h-6 w-6 shrink-0 fill-neutral-100 mr-4" />
    <div className="text-neutral-200 mt-0.5 italic">{children}</div>
  </div>
}

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-neutral-900 bg-amber-300">{children}</span>
}

const Dots = () => {
  return <div className="flex flex-row gap-1 justify-center pt-4 pb-6">
    <div className="h-0.5 w-0.5 bg-neutral-500 rounded-full" />
    <div className="h-0.5 w-0.5 bg-neutral-500 rounded-full" />
    <div className="h-0.5 w-0.5 bg-neutral-500 rounded-full" />
  </div>
}

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  caption?: string;
}

const ImageWithCaption = ({ src, alt, width, height, caption }: ImageProps) => {
  const hasCaption = !isEmpty(caption);
  const hasCustomDimensions = width || height;

  const imageClassName = clsx({
    "w-full": !hasCustomDimensions,
    "mb-2": hasCaption,
    "rounded-sm": true,
  });

  return (
    <figure className="flex flex-col w-full items-center my-6">
      <div className={`w-full ${!hasCustomDimensions ? "sm:max-w-[450px]" : ""}`}>
        <img
          className={imageClassName}
          src={src}
          alt={alt}
          width={width}
          height={height}
          draggable="false"
        />
        {hasCaption && (
          <figcaption>
            <p className="text-neutral-400 text-sm">{caption}</p>
          </figcaption>
        )}
      </div>
    </figure>
  )
}

interface ImagePairProps {
  src1: string;
  src2: string;
  alt1: string;
  alt2: string;
  caption?: string;
}

const ImagePair = ({ src1, src2, alt1, alt2, caption }: ImagePairProps) => {
  const hasCaption = !isEmpty(caption);

  const imageClassName = clsx({
    "w-1/2 sm:w-[300px]": true,
    "aspect-square": true,
    "object-cover": true,
    "rounded-sm": true,
  });

  return (
    <figure className="flex flex-col items-center my-6">
      <div className="flex flex-row gap-2 w-full justify-center">
        <img
          className={imageClassName}
          src={src1}
          alt={alt1}
          draggable="false"
        />
        <img
          className={imageClassName}
          src={src2}
          alt={alt2}
          draggable="false"
        />
      </div>
      {hasCaption && (
        <figcaption className="mt-2 w-full text-center max-w-[450px]">
          <p className="text-neutral-400 text-sm">{caption}</p>
        </figcaption>
      )}
    </figure>
  )
}

const HiddenAside = ({
  title,
  children,
  defaultOpen = false
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="my-4 rounded-md bg-neutral-100 border border-neutral-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded-md"
        aria-expanded={isOpen}
        type="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <div
          className={`w-4 h-4 flex items-center justify-center text-neutral-500 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path
              d="M12 4v16m-8-8h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="text-sm text-neutral-600 font-medium">{title}</span>
      </button>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-200 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 pb-3 text-sm text-neutral-500">
          {children}
        </div>
      </div>
    </div>
  );
};

const Header = ({
  title,
  date,
  className,
}: { title: string; date: string; className?: string }) => {
  const relativeDate = formatDateToRelative({ date });

  return (
    <div className={twMerge("flex flex-col", className)}>
      <div className="mb-1 sm:mb-2">
        <p className="text-neutral-800 text-2xl font-semibold">{title}</p>
      </div>
      <div className="flex flex-row items-center">
        <Link
          type="external"
          dest={EXTERNAL_LINKS.SOCIAL.TWITTER}
          openInNewWindow
        >
          <p className="w-fit text-neutral-500 hover:text-neutral-400 hover:cursor text-sm sm:text-xs font-mono">
            @notbenyam
          </p>
        </Link>
        <div className="h-3 bg-neutral-500 mx-2" style={{ width: "0.5px" }} />
        <span className="leading-4">
          <p className="w-fit text-neutral-500 text-sm sm:text-xs font-mono inline">
            {date}{" "}
          </p>
          <p className="w-fit text-neutral-500 text-xs font-mono inline">
            ({relativeDate})
          </p>
        </span>
      </div>
    </div>
  );
};
const formatDateToRelative = ({ date: dateStr }: { date: string }) => {
  let date: Date;

  // try ISO8601 parsing first
  date = parseISO(dateStr);
  if (!isValid(date)) {
    // custom parsing logic for non-standard formats
    const formats = [
      "MMM yyyy", // e.g., "Jan 2022"
      "MMMM yyyy", // e.g., "January 2022"
      "MMM dd, yyyy", // e.g., "Jan 1, 2022"
      "MMMM dd, yyyy", // e.g., "January 1, 2022"
      "MM/dd/yyyy", // e.g., "01/01/2022"
    ];
    for (const format of formats) {
      date = parse(dateStr, format, new Date());
      if (isValid(date)) {
        break;
      }
    }
  }

  if (!isValid(date)) {
    throw new Error("Invalid date format");
  }

  // format the date to a relative time string
  const relativeTime = formatDistanceToNow(date);

  return `${relativeTime} ago`;
};

export default SinnersFilmAnalysisPage;
