import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { FunctionComponent } from 'react';
import Link from '../components/shared/elements/Link';
import PageBase from '../components/shared/page/PageBase';
import Socials from '../components/shared/socials/Socials';
import { EXTERNAL_LINKS } from '../helpers/urls';

const EMAIL = "ben@bephrem.studio";

const About: FunctionComponent = () => {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <PageBase>
      {/* Name in top-left */}
      <div className="fixed top-6 left-8 z-50 flex items-center h-9">
        <Link type="internal" dest="/">
          <span className="text-neutral-200 font-medium text-md select-none cursor-pointer hover:text-neutral-100 transition-colors">Benyam Ephrem</span>
        </Link>
      </div>

      {/* Top-right group: socials and navigation */}
      <div className="fixed top-6 right-8 z-50 flex flex-col items-end gap-2">
        <Socials compressed />
        <div className="flex items-center gap-2">
          <Link type="internal" dest="/writing">
            <span className="text-amber-400 hover:text-amber-300 text-sm transition-colors select-none cursor-pointer">Writing</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-svh w-full flex flex-col justify-start bg-neutral-900 px-8 pt-24 pb-16">
        <div className="max-w-3xl mx-auto w-full">
          {/* Introduction */}
          <div className="mb-12">
            <h1 className="text-neutral-100 text-lg mb-3">Hi, my name is Benyam Ephrem.</h1>
            <p className="text-neutral-100 text-lg mb-6">
              I'm an Ethiopian-American software engineer & <Link type="external" dest={EXTERNAL_LINKS.VIDEOGRAPHY.HOME}><span className="text-amber-400 hover:text-amber-300 transition-colors">videographer</span></Link>.
            </p>
          </div>

          {/* Professional Section */}
          <div className="mb-12">
            <h2 className="text-neutral-100 text-lg font-medium mb-4">Professional</h2>
            <p className="text-neutral-100 mb-4">
              Fullstack programming is my core skillset (with a focus on web engineering).
            </p>
            <p className="text-neutral-100 mb-8">
              I have been programming & building Internet products since ~16 — working with a variety of
              languages, frameworks, & tools.
            </p>

            {/* Timeline */}
            <div className="relative mb-12">
              {/* Vertical line */}
              <div className="absolute left-[6px] top-2 bottom-2 w-[2px] bg-neutral-700" />

              {/* Timeline items */}
              {[
                { date: "June '24 - Nov '24", title: "product engineer @ The San Francisco Compute Company" },
                { date: "Sept '23 - May '24", title: "onsite.dev" },
                { date: "Aug '22 - Jan '24", title: "founder @ interviewpen.com" },
                { date: "Jan '22 - Aug '22", title: "sabbatical", muted: true },
                { date: "Sept '21 - Jan '22", title: "software engineer @ twitter" },
                { date: "Dec '18 - Nov '20", title: "founder @ Back To Back SWE", subtitle: "(acq.)" },
                { date: "Jun '20 - Aug '20", title: "software engineer intern @ twitter" },
                { date: "May '19 - Aug '19", title: "software engineer intern @ twitter" }
              ].map((item) => (
                <TimelineItem key={item.date} {...item} />
              ))}
            </div>

            {/* Candid Career Summary */}
            <h3 className="text-neutral-100 mb-6"><i>Candid</i> Career Summary:</h3>
            <div className="space-y-8">
              {[
                {
                  id: 'backtoswe',
                  title: "founded, grew, & sold BackToBackSWE",
                  details: [
                    "Single-handedly grew a YouTube channel from nothing to 200k subscribers over ~2 years (while in college). Grew a mailing list to ~70k subscribers. Sold the site to private equity in Nov '20.",
                    "BackToBackSWE was one of the largest & most-loved DS/A-focused (Data Structures & Algorithms) software engineering interview prep YouTube channels during the '18–'20 period.",
                    "There was a gap for ~2–3 years after Leetcode grew in popularity (in ~2017) to create better video explanations for software engineering interview problems. AlgoExpert ended up taking up most early market share (more credible founders, distributed better, product solidified to become better), reaping millions in profits.",
                    "~'21/'22 the DS/A market started becoming commoditized, with YouTubers creating large content libraries for free & a flood of new paid courses. (there still existed a large gap for a central system design instructional authority since that content is much harder to create, which since has been filled by ByteByteGo).",
                    "I partnered with the wrong co-founder, made a few fatal missteps on ownership, & ultimately sold the company too early."
                  ]
                },
                {
                  id: 'twitter',
                  title: "2x intern @ Twitter on the twitter.com team",
                  subtitle: "(& joined full-time)",
                  details: [
                    "Very much lucked out on getting the first internship, the 2nd was a follow-on. Was a defining professional programming experience for me & got me focused on Web engineering. It was also my first time visiting/living in San Francisco.",
                    "Joined full-time in late '21, but left shortly after to take a sabbatical in early '22. I was very much burned-out from how BackToBackSWE ended & wanted to take a break to rebalance in other areas of life."
                  ]
                },
                {
                  id: 'interviewpen',
                  title: "founded interviewpen.com",
                  subtitle: "(fizzled out over ~1.5 years)",
                  details: [
                    "Frustrated with how things ended with BackToBackSWE, after ~8 months of sabbatical in 2022 I wanted to go back & build the product I wish I had built the first time around.",
                    "After launching (basically the same product w/ a plan for a system design focus as well) in early '23, I realized the market had moved on & become heavily saturated. There was no opportunity left to fill a gap & build a real business (w/o a very specific personal brand).",
                    "I struggled to find a system design co-founder since it was a very niche skillset (exceptional verbal communicator, deep system design understanding — not already working in Big Tech/trading, making entrepreneurship less appealing).",
                    <span key="bobby">Eventually I was introduced to <Link type="external" dest={EXTERNAL_LINKS.BOBBY.SITE}><span className="text-amber-400 hover:text-amber-300 transition-colors">Bobby</span></Link> who led the development of the system design vertical for the site. He is the most fun individual I've ever worked with & the fastest learner I know.</span>
                  ]
                },
                {
                  id: 'onsite',
                  title: "onsite.dev",
                  subtitle: "(did not launch)",
                  details: [
                    "In September of '23 while still running Interview Pen, I moved to San Francisco to work on a real-time mock interviewing platform for software engineers. It seemed the next natural thing to work on, the course business was faltering & real-time LLM-based AI conversation was becoming more & more technically feasible every month.",
                    "The developer experience was nascent to non-existent for this use-case at the time, so I found myself hacking together a solution, dealing with raw audio bits on server & client, and stringing together 3 lossy stages of transcription, LLM inference, & text-to-speech.",
                    "Only in ~May '24 did true audio-to-audio models start getting to production (with audio-to-audio GPT-4o).",
                    "My co-founder left the project that December (we did not see eye-to-eye on our respective long-term commitment/risk profile). I would stop working on the project in ~April/May '24 since I did not want to found a business alone (I knew how hard it was)."
                  ]
                }
              ].map((item) => (
                <CareerSummaryItem
                  key={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  details={item.details}
                />
              ))}
            </div>
          </div>

          {/* Life Section */}
          <div>
            <h2 className="text-neutral-100 text-lg font-medium mb-6">Life</h2>

            {/* Locations */}
            <h3 className="text-neutral-100 text-lg font-medium mb-4">Locations</h3>
            <p className="text-neutral-100 mb-3">
              I grew up in <Link type="external" dest={EXTERNAL_LINKS.WIKIPEDIA.LOCATIONS.MARYLAND_STATE}><span className="text-amber-400 hover:text-amber-300 transition-colors">Maryland, USA</span></Link> & studied Computer Science at the <Link type="external" dest={EXTERNAL_LINKS.WIKIPEDIA.UNIVERSITY_OF_MARYLAND}><span className="text-amber-400 hover:text-amber-300 transition-colors">University of Maryland</span></Link> ('21).
            </p>
            <p className="text-neutral-400 text-sm mb-8">
              (locations: <LocationLink href={EXTERNAL_LINKS.WIKIPEDIA.LOCATIONS.SALISBURY}>Salisbury, MD</LocationLink> → <LocationLink href={EXTERNAL_LINKS.WIKIPEDIA.LOCATIONS.COLLEGE_PARK}>College Park, MD</LocationLink> → <LocationLink href={EXTERNAL_LINKS.WIKIPEDIA.LOCATIONS.BALTIMORE}>Baltimore, MD</LocationLink> → <LocationLink href={EXTERNAL_LINKS.WIKIPEDIA.LOCATIONS.BOULDER}>Boulder, CO</LocationLink> → <LocationLink href={EXTERNAL_LINKS.WIKIPEDIA.LOCATIONS.WASHINGTON_DC}>Washington, DC</LocationLink> → <LocationLink href={EXTERNAL_LINKS.WIKIPEDIA.LOCATIONS.SAN_FRANCISCO}>San Francisco, CA</LocationLink>)
            </p>

            {/* Hobbies */}
            <h3 className="text-neutral-100 text-lg font-medium mb-4">Hobbies</h3>
            <p className="text-neutral-100">
              I'm an avid cyclist & enjoy working with <Link type="external" dest={EXTERNAL_LINKS.VIDEOGRAPHY.HOME}><span className="text-amber-400 hover:text-amber-300 transition-colors">cameras</span></Link>.
            </p>
          </div>
        </div>
      </div>
    </PageBase>
  );
};

const TimelineItem = ({ date, title, subtitle, muted = false }: { date: string; title: string; subtitle?: string; muted?: boolean }) => (
  <div className="flex items-start mb-4">
    <div className="shrink-0 w-3 h-3 rounded-full bg-neutral-300 mt-1.5 mr-4" />
    <div>
      <p className="text-neutral-500 text-xs mb-1">{date}</p>
      <p className={`text-sm ${muted ? 'text-neutral-400' : 'text-neutral-300'}`}>
        {title} {subtitle && <span className="text-neutral-400">{subtitle}</span>}
      </p>
    </div>
  </div>
);

const CareerSummaryItem = ({ title, subtitle, details }: { title: string; subtitle?: string; details: (string | JSX.Element)[] }) => (
  <div>
    <h4 className="text-neutral-100 mb-3">
      • {title} {subtitle && <span className="text-neutral-300 text-sm ml-1.5">{subtitle}</span>}
    </h4>
    <div className="flex">
      <div className="w-0.5 bg-neutral-700 mr-4 mt-1" />
      <div className="space-y-2">
        {details.map((detail, i) => (
          <p key={`${title.replace(/[^a-zA-Z0-9]/g, '')}-${i}`} className="text-neutral-400 text-sm">{detail}</p>
        ))}
      </div>
    </div>
  </div>
);

const LocationLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link type="external" dest={href}>
    <span className="text-amber-400 hover:text-amber-300 transition-colors">{children}</span>
  </Link>
);

export default About; 