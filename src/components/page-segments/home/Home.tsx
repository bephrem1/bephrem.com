import { EXTERNAL_LINKS, INTERNAL_LINKS } from '../../../global-helpers/urls';
import { PAGE_SECTION_MAX_WIDTH, SPACES } from '../../../design';

import { FunctionComponent } from 'react';
import Link from '../../shared/elements/Link';
import Navbar from '../../shared/navigation/Navbar';
import Spacer from '../../shared/layout/Spacer';
import Text from '../../shared/elements/Text';
import View from '../../shared/elements/View';

interface Props {}

const Home: FunctionComponent<Props> = () => {
  return (
    <View
      paddingTop="40px"
      paddingX={SPACES.PADDING.SMALL}
      paddingBottom={SPACES.PADDING.JUMBO}
      centerItemsHorizontally
    >
      <View direction="vertical" maxWidth={PAGE_SECTION_MAX_WIDTH}>
        <Navbar />
        <Spacer direction="vertical" size={SPACES.GAP.MEDIUM} />

        <span>
          <Text tag="p">
            Hi, my name is Benyam Ephrem. I am an Ethiopian-American software engineer & internet
            teacher. I grew up in{' '}
          </Text>
          <Link type="external" dest={EXTERNAL_LINKS.MARYLAND_STATE_WIKI} openInNewWindow>
            Maryland, USA
          </Link>
          <Text tag="p"> & studied Computer Science at the </Text>
          <Link type="external" dest={EXTERNAL_LINKS.UNIVERSITY_OF_MARYLAND_WIKI} openInNewWindow>
            University of Maryland
          </Link>
          <Text tag="p"> (’21) (Computer Science was hard).</Text>
        </span>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />
        <Text tag="p">
          Programming & engineering is my core skillset. But I like thinking about, and working on
          business problems.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.MEDIUM} />

        <Text tag="h5" bold>
          Interesting Things
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.SMALL} />

        <Text tag="h6" bold>
          Back To Back SWE (Dec. ’18 - Dec. ’21)
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          In November/December of 2018 I founded a software engineer interview prep company I called
          "Back To Back SWE" (it was a goal of many undergraduate students to land high-tier
          internships in "back to back" years).
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          I never wanted to start the company. I just felt compelled to because the way I processed
          problems from the ground-up seemed to be different from how they were being taught back to
          me. I felt that disconnect, & wanted to create highly-academic prep material for others to
          benefit from.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          I ended up teaching technical interviews & Computer Science concepts to hundreds of
          thousands of people online, and helped thousands of engineers get jobs.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <span>
          <Text tag="p">The company ended up being acquired in November 2020 (that’s a </Text>
          <Link type="internal" dest={INTERNAL_LINKS.WRITING.DONT_SELL_TOO_EARLY} openInNewWindow>
            whole other topic
          </Link>
          <Text tag="p">).</Text>
        </span>
        <Spacer direction="vertical" size={SPACES.GAP.MEDIUM} />

        <Text tag="h6" bold>
          Twitter (’19 - ’22)
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          In 2019 I interned at Twitter as a web engineer on the twitter.com team. It was my first
          professional programming experience and it changed the course of my career & skillset.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">I learned how good very good programmers are.</Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">I would intern again in 2020, and join fulltime in 2021.</Text>
        <Spacer direction="vertical" size={SPACES.GAP.MEDIUM} />

        <Text tag="h6" bold>
          Boulder, Colorado (June ’21 - December ’21)
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          When I graduated from the University of Maryland in May 2021 I wanted to move somewhere
          new to experience a new life. I ended up moving to Boulder Colorado after visiting a
          friend in Denver in March. It was a beautiful place.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          I bought a condo there and heavily renovated it. It was a hectic time. I eventually
          decided to move back to Maryland.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          I learned the value of proximity to loved ones & friends, a lot about how a home works and
          how to renovate, & it completely shifted my view on wealth and the lowerbound resource
          requirements for a happy life.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          You want to minimize expensive assemblies of atoms, maximize people you love in your life,
          & maximize your health/fitness.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.MEDIUM} />

        <Text tag="h6" bold>
          Getting Jacked (Dec. ’21 - Summer ’22)
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          After I left Twitter in January ’22 to take a yearlong sabbatical, my focus became 100% on
          health & fitness. I wanted to reach a socially notable level of fitness. I began lifting
          twice a day.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          I really wanted to solve the problem of reaching high levels of fitness that had eluded me
          my whole life (& seemed to elude others who regularly attended the gym).
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          I was most interested in cutting through the noise and cracking the core formula for
          getting exceptionally fit as a normal person.
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <span>
          <Text tag="p">
            I moved from Maryland to Washington, DC in March to live with my college friend{' '}
          </Text>
          <Link
            type="external"
            dest={EXTERNAL_LINKS.MICHAEL_WEINBERGER_PERSONAL_SITE}
            openInNewWindow
          >
            Michael
          </Link>
          <Text tag="p">
            . As summer kicked in I focused on losing fat while maintaining lean mass (which I had
            also never done successfully).
          </Text>
        </span>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <Text tag="p">
          As I write this, I am in the best shape of my life (both body composition & cardiovascular
          fitness) and on the lower-to-mid range of what one would socially consider "jacked".
        </Text>
        <Spacer direction="vertical" size={SPACES.GAP.XSMALL} />
        <span>
          <Text tag="p">I document my findings in "</Text>
          <Link type="internal" dest={INTERNAL_LINKS.WRITING.HOW_TO_GET_JACKED} openInNewWindow>
            How To Get Jacked
          </Link>
          <Text tag="p">" & "</Text>
          <Link
            type="internal"
            dest={INTERNAL_LINKS.WRITING.WHY_IT_IS_HARD_TO_GET_FIT}
            openInNewWindow
          >
            Why It Is Hard To Get Fit
          </Link>
          <Text tag="p">".</Text>
        </span>
      </View>
    </View>
  );
};

export default Home;
