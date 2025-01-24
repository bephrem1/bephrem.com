import { FunctionComponent } from 'react';
import { twMerge } from 'tailwind-merge';
import { EXTERNAL_LINKS } from '../../../helpers/urls';
import { EmptyObject } from '../../../types/empty';
import Link from '../elements/Link';

const ProfessionalSection: FunctionComponent<EmptyObject> = () => {
  return (
    <div>
      <p className="text-neutral-100 text-md font-semibold mb-2.5">Professional</p>
      <p className="text-neutral-100 mb-2.5">
        Fullstack programming is my core skillset (with a focus on web engineering).
      </p>
      <p className="text-neutral-100 mb-2.5">
        I have been programming & building Internet products since ~16 — working with a variety of
        languages, frameworks, & tools.
      </p>

      <div className="mt-10 mb-6">
        <ProfessionalTimeline />
      </div>
      <p className="text-neutral-100 font-semibold mb-1.5">
        <i>Candid</i> Career Summary:
      </p>
      <ul className="ml-3 *:mb-2">
        <CareerSummaryItemBackToBackSWE />
        <CareerSummaryItemTwitter />
        <CareerSummaryItemInterviewPen />
        <CareerSummaryItemOnsiteDev />
      </ul>
    </div>
  );
};

const ProfessionalTimeline = () => {
  const Text = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <p className={twMerge('text-neutral-300 text-sm', className)}>{children}</p>;
  };
  const items = {
    '(June ’24 - Nov ’24)': (
      <Text className="mb-1.5">product engineer @ The San Francisco Compute Company</Text>
    ),
    '(Sept ’23 - May ’24)': <Text className="mb-1.5">onsite.dev</Text>,
    '(Aug ’22 - Jan ’24)': <Text className="mb-1.5">founder @ interviewpen.com</Text>,
    '(Jan ’22 - Aug ’22)': <Text className="text-neutral-400 mb-1.5">sabbatical</Text>,
    '(Sept ’21 - Jan ’22)': <Text className="mb-1.5">software engineer @ twitter</Text>,
    '(Dec ’18 - Nov ’20)': (
      <span className="mb-1.5 leading-4">
        <Text className="inline">founder @ Back To Back SWE </Text>
        <Text className="text-neutral-400 inline">(acq.)</Text>
      </span>
    ),
    '(Jun ’20 - Aug ’20)': <Text className="mb-1.5">software engineer intern @ twitter</Text>,
    '(May ’19 - Aug ’19)': <Text className="mb-1.5">software engineer intern @ twitter</Text>
  };

  return (
    <div className="flex flex-col w-full relative">
      {/* vertical line behind the dots with gradient fade at the bottom */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-neutral-300 to-transparent"
        style={{ left: '3.24px' }}
      />

      {Object.entries(items).map(([timerange, Engagement], index, array) => {
        return (
          <div key={timerange} className="flex items-start mb-4">
            <div className="w-2 mr-4 flex flex-col items-center">
              <div className="bg-neutral-300 h-3 w-3 rounded-full" />
              {index !== array.length - 1 && <div className="w-0.5 bg-white flex-grow" />}
            </div>
            <div className="flex flex-col">
              <p className="text-neutral-500 text-xs mb-1">{timerange}</p>
              {Engagement}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CareerSummaryItemBackToBackSWE = () => {
  return (
    <li>
      <p className="text-neutral-100 mb-1">• founded, grew, & sold BackToBackSWE</p>
      <Aside className="mt-1.5">
        <p className="text-neutral-400 text-sm mb-2">
          Single-handedly grew a YouTube channel from nothing to 200k subscribers over ~2 years
          (while in college). Grew a mailing list to ~70k subscribers. Sold the site to private
          equity in Nov ’20.
        </p>
        <p className="text-neutral-400 text-sm mb-2">
          BackToBackSWE was one of the largest & most-loved DS/A-focused (Data Structures &
          Algorithms) software engineering interview prep YouTube channels during the ’18–’20
          period.
        </p>
        <p className="text-neutral-400 text-sm mb-2">
          There was a gap for ~2–3 years after Leetcode grew in popularity (in ~2017) to create
          better video explanations for software engineering interview problems. AlgoExpert ended up
          taking up most early market share (more credible founders, distributed better, product
          solidified to become better), reaping millions in profits.
        </p>
        <p className="text-neutral-400 text-sm mb-2">
          ~’21/’22 the DS/A market started becoming commoditized, with YouTubers creating large
          content libraries for free & a flood of new paid courses. (there still existed a large gap
          for a central system design instructional authority since that content is much harder to
          create, which since has been filled by ByteByteGo).
        </p>
        <p className="text-neutral-400 text-sm">
          I partnered with the wrong co-founder, made a few fatal missteps on ownership, &
          ultimately sold the company too early.
        </p>
      </Aside>
    </li>
  );
};
const CareerSummaryItemTwitter = () => {
  return (
    <li>
      <span>
        <p className="text-neutral-100 inline mr-1.5">
          • 2x intern @ Twitter on the twitter.com team
        </p>
        <p className="text-neutral-300 text-sm inline">(& joined full-time)</p>
      </span>
      <Aside className="mt-1.5">
        <p className="text-neutral-400 text-sm mb-2">
          Very much lucked out on getting the first internship, the 2nd was a follow-on. Was a
          defining professional programming experience for me & got me focused on Web engineering.
          It was also my first time visiting/living in San Francisco.
        </p>
        <p className="text-neutral-400 text-sm">
          Joined full-time in late ’21, but left shortly after to take a sabbatical in early ’22. I
          was very much burned-out from how BackToBackSWE ended & wanted to take a break to
          rebalance in other areas of life.
        </p>
      </Aside>
    </li>
  );
};
const CareerSummaryItemInterviewPen = () => {
  return (
    <li>
      <span>
        <p className="text-neutral-100 inline mr-1.5">• founded interviewpen.com</p>
        <p className="text-neutral-300 text-sm inline">(fizzled out over ~1.5 years)</p>
      </span>
      <Aside className="mt-1.5">
        <p className="text-neutral-400 text-sm mb-2">
          Frustrated with how things ended with BackToBackSWE, after ~8 months of sabbatical in 2022
          I wanted to go back & build the product I wish I had built the first time around.
        </p>
        <p className="text-neutral-400 text-sm mb-2">
          After launching (basically the same product w/ a plan for a system design focus as well)
          in early ’23, I realized the market had moved on & become heavily saturated. There was no
          opportunity left to fill a gap & build a real business (w/o a very specific personal
          brand).
        </p>
        <p className="text-neutral-400 text-sm inline mb-2">
          I struggled to find a system design co-founder since it was a very niche skillset
          (exceptional verbal communicator, deep system design understanding — not already working
          in Big Tech/trading, making entrepreneurship less appealing).
        </p>
        <span className="leading-4">
          <p className="text-neutral-400 text-sm inline mb-2">Eventually I was introduced to </p>
          <Link type="external" dest={EXTERNAL_LINKS.BOBBY.SITE} openInNewWindow>
            <p className="text-sm inline mb-2">Bobby</p>
          </Link>
          <p className="text-neutral-400 text-sm inline mb-2">
            {' '}
            who led the development of the system design vertical for the site. He is the most fun
            individual I’ve ever worked with & the fastest learner I know.
          </p>
        </span>
      </Aside>
    </li>
  );
};
const CareerSummaryItemOnsiteDev = () => {
  return (
    <li>
      <span>
        <p className="text-neutral-100 inline mr-1.5">• onsite.dev</p>
        <p className="text-neutral-300 text-sm inline">(did not launch)</p>
      </span>
      <Aside className="mt-1.5">
        <p className="text-neutral-400 text-sm mb-2">
          In September of ’23 while still running Interview Pen, I moved to San Francisco to work on
          a real-time mock interviewing platform for software engineers. It seemed the next natural
          thing to work on, the course business was faltering & real-time LLM-based AI conversation
          was becoming more & more technically feasible every month.
        </p>
        <p className="text-neutral-400 text-sm mb-2">
          The developer experience was nascent to non-existent for this use-case at the time, so I
          found myself hacking together a solution, dealing with raw audio bits on server & client,
          and stringing together 3 lossy stages of transcription, LLM inference, & text-to-speech.
        </p>
        <p className="text-neutral-400 text-sm mb-2">
          Only in ~May ’24 did true audio-to-audio models start getting to production (with audio-to-audio
          GPT-4o).
        </p>
        <p className="text-neutral-400 text-sm mb-2">
          My co-founder left the project that December (we did not see eye-to-eye on our respective
          long-term commitment/risk profile). I would stop working on the project in ~April/May ’24
          since I did not want to found a business alone (I knew how hard it was).
        </p>
      </Aside>
    </li>
  );
};

const Aside = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={twMerge('flex flex-row', className)}>
      <div className="bg-neutral-700 mr-4" style={{ width: '2.5px' }} />
      <div className="flex flex-col">{children}</div>
    </div>
  );
};

export default ProfessionalSection;
