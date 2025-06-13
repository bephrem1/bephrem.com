import { clsx } from "clsx";
import { formatDistanceToNow, isValid, parse, parseISO } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SinnersCast } from "../components/film-analysis/sinners";
import SinnersPlotOverview from "../components/film-analysis/sinners/plots/SinnersPlotOverview";
import Image from "../components/shared/elements/Image";
import Link from "../components/shared/elements/Link";
import CastMembers from "../components/shared/film-analysis/cast/CastMembers";
import { isEmpty } from "../helpers/empty";
import { EXTERNAL_LINKS } from "../helpers/urls";
import ArrowUpRightIcon from "../icons/lib/ArrowUpRightIcon";
import QuoteIcon from "../icons/lib/QuoteIcon";

const SinnersFilmAnalysisPage = () => {
  useRestoreScrollPosition();

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
      <div className="mt-4">
        <p className="text-neutral-500 text-sm mb-2.5"><b>Controlling Idea</b> (Theme): “Greed and hunger for power destroys communities. Culture and it’s expression can never be destroyed.”</p>
      </div>
      <div className="mt-4">
        <p className="text-neutral-500 text-xs mb-2.5"><b>Main Protagonists</b></p>
        <CastMembers cast={SinnersCast.Protagonists} avatarSize={50} />
        <p className="text-neutral-500 text-xs mb-2.5 mt-8"><b>Main Antagonists</b></p>
        <CastMembers cast={SinnersCast.Antagonists} avatarSize={50} />

        <a href="https://www.imdb.com/title/tt31193180/fullcredits/" target="_blank" rel="noopener noreferrer" className="block mt-8">
          <p className="text-neutral-400 text-xs">full cast & crew — IMDB ↗</p>
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
          <p className="leading-5 text-neutral-500 text-justify mb-2">Sinners is a film that has rocked my world. As a filmmaker (not that I consider myself one yet), sometimes you watch things
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

      <div className="px-4 sm:px-2 sm:pr-12 pb-1.5">
        <P>The following is a breakdown of the film "Sinners" by writer/director Ryan Coogler. This is a technical analysis of the
          film that will cover story, blocking of scenes, score & sound design, cinematography, editing, and more.</P>
        <P>This is best read after watching the film, or during subsequent rewatches, so that the characters & plot are fresh at-hand. I will be referencing very specific moments in certain scenes (most of which I cannot display with an accompanying still frame, for copyright reasons).</P>
        <P>I will try my best with historical context, but I have not conducted the in-depth research to do justice the serious and lengthy history the film is based on. Most historical
          remarks will be from cursory Internet searches.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H2>Story Structure</H2>
        <Aside>
          Much of my commentary throughout will be working from ideas presented by Robert McKee in his book <i className="font-medium">"Story: Substance, Structure, Style, and the Principles of Screenwriting"</i>.
        </Aside>
        <P>To avoid re-creating a hollowed-out recap of the plot, here is a full plot summary from Wikipedia:</P>
        <a
          href="https://en.wikipedia.org/wiki/Sinners_(2025_film)#Plot"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full my-4 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors border border-neutral-300 shadow-sm px-4 py-3 text-base font-medium text-neutral-700 flex items-center justify-between gap-3"
        >
          <span>Plot Summary <span className="text-neutral-400 text-sm">(primer)</span></span>
          <ArrowUpRightIcon className="w-5 h-5 text-neutral-400" />
        </a>

        <H3>Narrative Structure</H3>
        <div className="mb-6">
          <CastMembers cast={[SinnersCast.Annie, SinnersCast.SammieMoore, SinnersCast.ReverendMoore]} avatarSize={50} />
        </div>
        <P>The film takes place in Clarksdale, Mississippi over 2 days in October 1932 — the 15th (Saturday) & 16th (Sunday). It begins with a voiceover from Annie, then a <A href="https://en.wikipedia.org/wiki/Flashforward" >flash-forward</A> to
          Sunday morning, where the first scene shows Sammie driving up to a church.</P>
        <P>Sammie enters the church, crying for some reason. His father, Reverend Moore, begins a jolting incantation of prayer for his son. Sammie continues to break down,
          in a swirling mess of internal conflict, as he tightly grips his shattered guitar neck.</P>
        <P>We hear Reverend Moore finally say “<i>Let it go Sammie.</i> <i>Put it down.</i>”, before cutting to black.</P>
        <P>This dramatic introduction leaves us with many dramatic questions. Who is this boy? Who is the reverend? Why is he yelling at him? What were those
          dark monsters the editor cut to? Why is this happening in a church? <b><i>What’s going to happen next?</i></b>
        </P>
        <Dots />
        <P>This is the <b>Inciting Incident</b> for our narrative about Sammie, where we become aware that he <i>wants something</i>, but something powerful
          is in his way. It frames him early as our main protagonist.</P>
        <P>Having watched the film, we already know why Sammie is crying and in tatters. He just narrowly avoided being killed by a supernatural demon. Everyone he knows and loves is dead. He did not obey his father the day before,
          he <i>“kept dancin’ with the devil”</i> and it <i>“followed him home”</i>.</P>

        <H4>Five Act Structure</H4>
        <div className="mb-6">
          <CastMembers cast={[SinnersCast.SammieMoore, SinnersCast.Smoke, SinnersCast.Stack]} avatarSize={50} />
        </div>
        <P>Sinners is organized into 5 acts along it’s main plotline. The story weaves the hero journeys of <b>2 main protagonist forces</b>: Sammie Moore & Smoke.</P>
        <P>Both are seeking freedom in some regard. The Smoke-Stack Twins are seeking to open their juke club and leave their troubled past in Chicago behind. Sammie hopes to play music and make a living doing so (against his father’s wishes).</P>
        <P>These are 3 people, so why only 2 protagonists? Although Stack is Smoke’s brother, and both share the same desire to open a juke club — they functionally act as 1 single narritive unit, delivering 1 moral to the story.</P>
        <P>This is made clear by the following diagram, marking the major <b>turning points</b> for central plot and subplots:</P>
      </div>
      <SinnersPlotOverview />
      <div className="px-4 sm:px-2 sm:pr-12">
        <P>In addition, there are 3 “Love Story subplots, which all contribute narritive force to the story.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>Controlling Idea</H3>
        <P>Stories are vehicles for meaning. They are how we make sense of how and why things happen in the world. We observe a <b>character</b> navigate <b>conflict</b>,
          ultimately <b>changing</b> in a revelatory way. New stories lead to new meanings, new meanings lead to new realities.</P>
        <P>In his book "Story", Robert McKee says:</P>
        <Quote>
          STORYTELLING is the <b>creative demonstration of truth</b>. A
          story is the living proof of an idea, the conversion of
          idea to action. A story's event structure is the means
          by which you first express, then prove your idea ...
          without explanation.
        </Quote>
        <P>Every moment in the final master of the film is imbued with meaning. Nothing is left in by chance. Every moment in every scene serves a central
          theme (or "Controlling Idea"). We will take an educated guess at what that idea is, and center our analysis of every scene around it.</P>
        <P>But first, we need to know who the acting forces are in this story. Who are the protagonists? What are the forces of antagonism?</P>

        <H3>Protagonists</H3>
        <P>Smoke, Stack, & Sammie Moore are the protagonists of the story. Remmick & Hogwood are the antagonists.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H2>Scene Analysis</H2>
        <Aside>
          When referencing specific moments, I will write a timecode from the digital master like this: <span className="text-neutral-500">[52:00]</span> or <span className="text-neutral-500">[1:23:45]</span>. I will
          also describe the moment so we can quickly get on the same page.
        </Aside>
      </div>
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
    className="text-indigo-600 hover:text-indigo-700 visited:text-indigo-400"
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
    <div className="text-neutral-400 mb-1.5 [&>p]:text-neutral-500 [&>p]:italic [&>p]:mb-1.5">
      {children}
    </div>
  </aside>
}

const Quote = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex pb-4 rounded-lg">
    <QuoteIcon className="h-6 w-6 shrink-0 fill-neutral-700 mr-4" />
    <div className="text-neutral-800 mt-0.5 italic">{children}</div>
  </div>
}

const Highlight = ({ children }: { children: React.ReactNode }) => {
  return <span className="text-neutral-900 bg-amber-300">{children}</span>
}

const Dots = () => {
  return <div className="flex flex-row gap-1 justify-center pt-2 pb-6">
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

function useRestoreScrollPosition() {
  useEffect(() => {
    if (window) {
      // save scroll position before page refresh/navigation
      window.onbeforeunload = () => {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
      };

      // restore scroll position after page loads
      const savedPosition = sessionStorage.getItem("scrollPosition");
      if (savedPosition) {
        window.scrollTo(0, Number.parseInt(savedPosition));
        sessionStorage.removeItem("scrollPosition");
      }
    }
  }, []);
}

export default SinnersFilmAnalysisPage;
