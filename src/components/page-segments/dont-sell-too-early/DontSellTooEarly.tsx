import React, { FunctionComponent } from 'react';
import { SPACES, TEXT_SIZE } from '../../../design';
import { getOpenGraphMetaTags, getSEOMetaTags } from '../../../global-helpers/page-headers';

import { EXTERNAL_LINKS } from '../../../global-helpers/urls';
import EllipsisSeparator from '../../shared/layout/EllipsisSeparator';
import Head from 'next/head';
import Link from '../../shared/elements/Link';
import Spacer from '../../shared/layout/Spacer';
import StandardLayout from '../StandardLayout';
import Text from '../../shared/elements/Text';
import { useRouter } from 'next/router';

interface Props {}

const DontSellTooEarly: FunctionComponent<Props> = () => {
  const router = useRouter();

  return (
    <React.Fragment>
      <Head>
        {getSEOMetaTags({
          title: 'Benyam Ephrem | Don’t Sell Too Early',
          description: 'Why you shouldn’t sell your company too early.'
        })}
        {getOpenGraphMetaTags(router, {
          title: 'Don’t Sell Too Early',
          description: 'Why you shouldn’t sell your company too early.'
        })}
      </Head>
      <StandardLayout>
        <Text tag="h3" bold>
          Don’t Sell Too Early
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p" fontSize={TEXT_SIZE.MICRO} uninteractive>
          June 2022
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />

        <Text tag="p" fontSize={TEXT_SIZE.MICRO}>
          This writing is specifically directed at young entrepreneurs (18-25) running promising
          businesses for whom a major liquidity event would be enticing & likely life-changing.
        </Text>

        <EllipsisSeparator />

        <Text tag="h5" bold>
          The Backstory
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          In August of 2020 I was probably clinically depressed. I had grinded myself down from 2
          years of maniacal focus on my company. I was having ownership & time-investment struggles
          with my co-founder who was a minority owner and had taken up a rapidly growing role as CMO
          at another startup.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          The business was still small. We were not doing enough revenue to justify either of us
          going full-time to grow the company. I knew the unrealized value we had yet to tap. We
          were just hitting the start of an exponential growth curve in online traction I had fought
          2 years to secure. We had the highest quality content, we just needed to effectively
          capture the value we were (I was) creating.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          I was starting to be recognized any time I entered the{' '}
          <Link type="external" dest={EXTERNAL_LINKS.IRIBE} openInNewWindow>
            Iribe
          </Link>{' '}
          Computer Science building. Even in 2019 in San Francisco I was being recognized by
          strangers in public. Students in entry-level & advanced algorithms classes at Maryland
          were using my videos to study (without me even knowing it). I felt like we were on the
          verge of something massive, but things still felt small.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          I was going to graduate soon. I was a rising Senior at this point in time and my future
          was unsure. I felt like I was out of gas, but I wanted the mission I had worked so hard
          for to continue. I was between a rock and a hard place. Running a company is hard.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          One August night after shooting a video, I sat outside of Iribe. I called my co-founder
          and basically had a panic attack. I hung up and sat alone. I felt like I was battling the
          world by myself. We were chasing competitors that had a 2-year headstart over us, and much
          better organic distribution in the algorithms teaching ecosystem. How would I as a college
          student win this race, working part-time?
        </Text>

        <EllipsisSeparator />

        <Text tag="p" fontSize={TEXT_SIZE.MICRO}>
          <b>Aside</b>: In retrospect, I should have reinvested 100% of the company's profits back
          into hiring more teachers, programmers, and staff to systematize the business. Instead, we
          took money off the table, and the burden for running the whole business continued to rest
          on my shoulders. This was enticing because I didn't really have much personal wealth as a
          20-something.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p" fontSize={TEXT_SIZE.MICRO}>
          The right course of action would have been to raise money, hire myself out of the teacher
          role, hire a software engineer to rewrite all of our systems w/ me alongside, negotiate my
          co-founder out of the cap table, & step up into the CEO role to direct the next phase of
          the company's growth (but this is getting ahead in the story).
        </Text>

        <EllipsisSeparator />

        <Text tag="p">
          The pressure was crushing. I was trapped by my business. Customers who pay for a product
          do not take days off when they need help, you are on the hook.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          I had the crazy thought, “What if we sold the company?” If we could find another entity to
          continue the company, I would have some liquidity, and the project would not die from my
          burnout. It seemed possible.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          I discussed this with my co-founder and he agreed to sell the company if a buyer could be
          found. I spearheaded the efforts to find a buyer. Eventually we began fielding calls (most
          coming from a site called MicroAcquire which had just started).
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          It was a long, drawn-out process. Operations suffered, it was very hard to live in two
          worlds.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          In one world, the company had to grow and I would be running it for the next 2-4 years, in
          another, I would not be running the company in 3 months. It is a bizarre feeling that you
          only truly understand when in the thick of it.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          Eventually, we received a reasonable offer from a venture arm of an Indian hotel booking
          site that invests in technology companies. We took the offer, and in November a majority
          of the company was acquired (I would maintain a minority stake until December 2021).
        </Text>

        <EllipsisSeparator />

        <Text tag="p">
          I provided the top-level backstory just so the following would make more sense and
          resonate more. There is much more to it than the above, but now we can continue to the
          main topic.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.MEDIUM} />

        <Text tag="h5" bold>
          Why To Not Sell
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          As with anything life-changing, you only realize the full implications of the happening in
          the longterm, years later. Events like that have a large ripple effect you cannot foresee.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">lorem.</Text>
      </StandardLayout>
    </React.Fragment>
  );
};

export default DontSellTooEarly;
