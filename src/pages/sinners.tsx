import { clsx } from "clsx";
import { formatDistanceToNow, isValid, parse, parseISO } from "date-fns";
import React from "react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SinnersCast } from "../components/film-analysis/sinners/cast";
import SinnersPlotOverview from "../components/film-analysis/sinners/plots/SinnersPlotOverview";
import { type ScoreItem, SinnersScore } from "../components/film-analysis/sinners/score";
import SinnersScoreOverview from "../components/film-analysis/sinners/score/SinnersScoreOverview";
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
        <p className="text-neutral-500 text-sm mb-2.5"><b>Controlling Idea</b> (Theme): "Greed and hunger for power destroys community. Culture and it's expression can never be destroyed."</p>
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
    <div className="pt-16 pb-80">
      <div className="px-4 sm:px-2 sm:pr-12">
        <Header className="mb-4 sm:mb-4" title="Sinners Film Analysis" date="2025-06-14" />

        <HiddenAside title="Personal Preface" defaultOpen={false}>
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

        <H3>What's All the Fuss About?</H3>
        <P>Why is Sinners such a big deal? Why are people so passionate about this film? Well, it's a lot of things. <i>A lot, of things.</i></P>
        <P>Too much to really cover here, but I'll list a few things that come to mind that make this film head-and-shoulders remarkable:</P>
        <UnorderedList>
          <ListItem>One of the best film composers in the world, Ludwig Göransson, put down the most ambitious score of his life.</ListItem>
          <ListItem>One of the best directors in the world, Ryan Coogler, releases the first original movie of his 5 feature-length film career.</ListItem>
          <ListItem>Michael B. Jordan plays <i>2 characters</i>, through a slew of acting & technical complications.</ListItem>
          <ListItem>The cinematography is breathtaking, every frame is memorable. <A href="https://www.autumndurald.com/">Autumn Durald Arkapaw</A> makes history as the first woman to shoot a film in large-format IMAX 65mm.</ListItem>
          <ListItem>Ryan Coogler makes history as the first black director to shoot in large-format IMAX 65mm.</ListItem>
          <ListItem>The writing and story are incredibly layered, original, and historically accurate — avoiding cinema tropes and clichés left & right. The film crosses genre boundaries of Supernatural Horror, Love Story, Drama, Musical, Comedy, & Western. </ListItem>
          <ListItem>If features a stellar cast, most of which can act, sing, and dance.</ListItem>
          <ListItem>It <s>is breaking</s> broke <A href="https://www.the-numbers.com/movie/Sinners-(2025)">box office</A> records (soon to be #5 <A href="https://www.the-numbers.com/box-office-records/worldwide/all-movies/genres/horror">highest grossing horror</A> film
            of <i>all time</i>) — all with a Southern American-tied plotline (weaker worldwide appeal)</ListItem>
          <ListItem>...after Variety & the New York Times <A href="https://www.nytimes.com/2025/04/20/business/media/sinners-box-office.html">raised doubts</A> over it's ability to even breakeven.</ListItem>
          <ListItem>Ryan Coogler secured a deal with Warner Brothers for first-dollar gross, final cut, and rights reversion after 25 years. Which is unheard of.</ListItem>
          <ListItem>Ryan Coogler films <A href="https://www.youtube.com/watch?v=78Ru62uFM0s">promo video with Kodak</A> where he's just your homie schooling you on theater projection formats, it goes viral.</ListItem>
          <ListItem>It is single-handedly breathing life into a dying theater industry. (I literally joined AMC A-List and go every weekend after watching it)</ListItem>
          <ListItem>It's the first film to use Ultra Panavision 70 and IMAX 65mm in the same film.</ListItem>
        </UnorderedList>
        <P>Great works of art like this come once every few decades. It's so incredibly rare, because it's nearly impossible to align talent and history like this.</P>
        <P>Let's begin talking about the story.</P>
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
        <P>We hear Reverend Moore finally say "<i>Let it go Sammie.</i> <i>Put it down.</i>", before cutting to black.</P>
        <P>This dramatic introduction leaves us with many dramatic questions. Who is this boy? Who is the reverend? Why is he yelling at him? What were those
          dark monsters the editor cut to? Why is the guitar broken? Why is this happening in a church? <b><i>What's going to happen next?</i></b>
        </P>
        <Dots />
        <P>This is the <b>Inciting Incident</b> for our narrative on Sammie, where we become aware that he <i>wants something</i>, but something powerful
          is in his way. It frames him early as our main protagonist.</P>
        <P>Having watched the film, we already know why Sammie is crying and in tatters. He just narrowly avoided being killed by a supernatural demon. Everyone he knows and loves is dead. He did not obey his father the day before,
          he "kept dancin' with the devil" and it "followed him home".</P>

        <H4>Five Act Structure</H4>
        <div className="mb-6">
          <CastMembers cast={[SinnersCast.SammieMoore, SinnersCast.Smoke, SinnersCast.Stack]} avatarSize={50} />
        </div>
        <P>Sinners is organized into 5 acts along it's main plotline. The story weaves the hero journeys of <b>2 main protagonist forces</b>: Sammie Moore & the Smoke-Stack Twins.</P>
        <P>Both are seeking freedom in some regard. The Smoke-Stack Twins are seeking to open their juke club and leave their troubled past in Chicago behind. Sammie hopes to play music and make a living doing so (against his father's wishes).</P>
        <P>The following diagram marks major <b>turning points</b> (“points of no return”) which separate acts for central plot and subplots:</P>
      </div>
      <SinnersPlotOverview />
      <div className="px-4 sm:px-2 sm:pr-12">
        <div className="mb-6">
          <CastMembers cast={[SinnersCast.Annie, SinnersCast.Mary, SinnersCast.Pearline]} avatarSize={50} />
        </div>

        <P>In addition, there are 3 "Love Story" subplots, which all contribute narritive force to the Controlling Idea.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12 pb-2">
        <H3>Story, Meaning, & Controlling Idea</H3>
        <P>Stories are vehicles for meaning. They are how we make sense of how and why things happen in the world. We observe a <b>character</b> navigate <b>conflict</b>,
          ultimately <b>changing</b> in a revelatory way.</P>
        <P>We empathize with the character (identify with & see ourselves in them), reason about how and why that change happened, then internalize
          the lesson to our own model of truth about the world.</P>
        <P>New stories lead to new meanings, new meanings lead to new realities.</P>
        <P>In his book "Story", Robert McKee says:</P>
        <Quote>
          STORYTELLING is the <b>creative demonstration of truth</b>. A
          story is the living proof of an idea, the conversion of
          idea to action. A story's event structure is the means
          by which you first express, then prove your idea ...
          without explanation.
        </Quote>
        <P>Every moment in the final master of the film is imbued with meaning. Nothing is left in by chance. Every moment in every scene serves a central
          theme (or "Controlling Idea").</P>

        <H4>Finding Controlling Idea (Jumping to the End)</H4>
        <P>To discover a director's hidden message to us in a film, we need to find the point at which their protagonists are making the <b>highest-stakes decisions</b> in moments of <b>crisis</b> & highest pressure. <i>These (usually) come at the end of a story.</i></P>
        <P>In these moments, true character is revealed. We see who the protagonists really are, rather than who they pretend to be (the entire film will show characters moving closer, then farther, then closer to who they really are).</P>
        <P><b>True character is only revealed through choice.</b> Robert McKee puts it like this:</P>
        <Quote>
          <b>Characterization</b> is the sum of all observable qualities of a human
          being, everything knowable through careful scrutiny: age and IQ; sex
          and sexuality; style of speech and gesture; choices of home, car, and
          dress; education and occupation; personality and nervosity; values
          and attitudes-all aspects of humanity we could know by taking
          notes on someone day in and day out. ... <b>TRUE CHARACTER</b> is revealed in
          the choices a human being makes under pressure-the greater the pressure,
          the deeper the revelation, the truer the choice to the
          character's essential nature.
        </Quote>
        <P>So what choices do our protagonists make? What crisis do they face?</P>

        <H5>Smoke's Character-Defining Choices</H5>
        <div className="mb-6">
          <CastMembers cast={[SinnersCast.Smoke, SinnersCast.Hogwood, SinnersCast.Annie]} avatarSize={50} />
        </div>
        <P>Smoke spends most of the film using power, money, and violence to bend the world to his will. He returns to his wife Annie's home, where he spends a sentimental moment mourning at
          the grave of his passed son.</P>
        <P>In the very last moments of Act V, he dies from a gunshot wound suffered in his shootout with the KKK. Annie appears from heaven to present him with his son. He pauses, before deciding
          to take the baby in his arms.</P>
        <P>In an "on the nose" line, Ryan Coogler scripts Hogwood to say "Hey...I've got money", offering money to Smoke, then Smoke sends a flurry of bullets his way.</P>
        <P>This is a moment of irreversible change for Smoke, and ironic as well, because he has now finally become what he always wanted to be: <b>a father</b>. But due
          to his past actions, his greed cost him the lives of everyone he loved, as well as his own.
        </P>

        <H5>Sammie's Character-Defining Choices</H5>
        <div className="mb-11">
          <CastMembers cast={[SinnersCast.SammieMoore, SinnersCast.ReverendMoore, SinnersCast.DeltaSlim, SinnersCast.Pearline, SinnersCast.SammieMooreOlder]} avatarSize={50} />
        </div>
        <P>Sammie is a youthful figure endeared and mentored by those around him. Stack gives him tips on being better in bed & advocates for his talents, Smoke
          advises him on how the world really works outside of the Delta, and Delta Slim acts as a guardian and Blues mentor.
        </P>
        <P>Throughout the film, Sammie presents as a modest, deferential character. As the night wears on, he slowly transforms into a charismatic and confident character.
          After his performance that "conjurs the spirits of the past and future", he eventually "tries something" with Pearline.
        </P>
        <P>Sammie's moment of crisis comes not when Remmick is about to kill him (at the end of Act IV), because no choice was made there. It comes the next day, Sunday
          morning, when he stumbles into church and Reverend Moore's yell burns through him with religious fervor.
        </P>
        <P>Sammie makes the choice to defy his father and leave Clarksdale to pursue music, as we see in the scene right after Smoke's death. Later, his older self is
          played by Buddy Guy (in Chicago).
        </P>
        <Aside>It's also important to note Sammie was the only survivor after the weekend concluded.</Aside>

        <H5>Stack's Character-Defining Choices</H5>
        <div className="mb-4">
          <CastMembers cast={[SinnersCast.Stack, SinnersCast.Mary]} avatarSize={50} />
        </div>
        <P>Stack is very similar to Smoke in that he uses power and money to coerce people, but to a less intense degree. He relies more on his wit and charm to
          get what he wants.
        </P>
        <P>Like his brother Smoke, he is also very avoidant of emotional responsibility. He spends most of the film avoiding confrontations with his past lover Mary.</P>
        <P>
          His moment of crisis comes in the juke when he finally has to confront those feelings and admit to Mary that he still loves her. They later make love, and
          Mary kills him in the Act II climax.
        </P>

        <H4>Controlling Idea(s)</H4>
        <P>So the film's main set of messages, through the protagonists, are:</P>
        <UnorderedList>
          <ListItem>Excessive greed for money and power will destory family, community, and self.</ListItem>
          <ListItem>Culture is immortal, it will always find a way to survive attack.</ListItem>
        </UnorderedList>
        <P>There are also strong historical notes on ownership & racism, Ryan Coogler in <A href="https://youtu.be/0mU_2VWpsmQ?si=vZNmPtdGcGTFDXah&t=431">this interview with Hanna Flint</A> comments:</P>
        <Quote>What if the vampires didn't show up, what happens to those people? ... The reality is...everybody at that juke was gonna be dead anyway. ... The was f***ed essentially the moment they bought the mill.</Quote>
        <P>Which is a reference to the slew of laws and regulations at the time that disadvantaged blacks from owning and retaining property, & truly having a path to real freedom. It was always
          a losing battle in a game you didn't control the rules to.</P>
        <P>Ryan Coogler also makes a direct comment on his personal tie to the idea of fatherhood in a <A href="https://youtu.be/1lRAnlyj5YM?si=GhZ7b0_Kj5vvSqR0&t=2905">7PM in Brooklyn podcast episode</A>:</P>
        <Quote>
          Making this movie as a father...I put a lot of myself into it. ... I went through these characters and I tried to define, like, what are these guys? If you held them
          by the shoulders, what would they tell you they were if you asked them what they were? And what is the lie? What do they think they are inside that they're too afraid
          to say? ... And for Smoke, what he would say he is, ... he would tell you "hey, I'm a soldier". <b>But deep down, what he is, is a father.</b>
        </Quote>
        <Dots />
        <P>The controlling idea<span className="text-neutral-400">(s)</span> form the backbone of every second in the film. Every writing, directing, cinematography,
          sound design, editing, art direction decision — <i>everything</i>, is in service of elevating & effectively conveying these ideas.</P>
        <P>With these in-hand, we can go scene by scene to see how characters develop & change against them.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H2>Scene-by-Scene Analysis</H2>
        <H5>Housekeeping <span className="text-neutral-500">(Score)</span></H5>
        <P>The score for the film can be found in 2 places on Spotify. The <A href="https://open.spotify.com/album/0zjAqh1Fr7XQWy1SlzGhMn">official Sinners Movie album</A>,
          and <A href="https://open.spotify.com/album/6PQXsiHd4AjrAqhWLd5HyT">Ludwig Göransson's album</A>. The former contains tracks from key, memorable moments in the film, Ludwig's album contains
          the full score (including general sound design used to enhance the film).</P>
        <P>Great films start with the story, then <A href="https://filmsound.org/articles/designing_for_sound.htm">design a sound language</A>, <i>then</i> think about
          perfecting visuals. Sound is primal & primary.</P>
        <P>Here is an overview of the score, and where each piece of music can be found in the film:</P>
        <SinnersScoreOverview className="mt-4 mb-4" />
        <P>Just by looking at all the original (and reinterpreted) music above, you can see how explosively creative this film is.</P>

        <H5>Housekeeping <span className="text-neutral-500">(Digital Viewing)</span></H5>
        <P>A digital copy of the film itself can be found on <A href="https://athome.fandango.com/content/browse/details/Sinners/4020075">Fandango at Home</A> (owned by Warner Brothers), <A href="https://www.amazon.com/gp/video/detail/amzn1.dv.gti.cf9ab498-91f9-4f94-80fd-ba46ac6aabd7">Amazon Prime Video</A>,
          {" "}<A href="https://tv.apple.com/us/movie/sinners/umc.cmc.tl0hc0j1vx7nrrz89gxzxsx9">Apple TV</A>, <A href="https://www.youtube.com/watch?v=_5SDkR1gX8g">YouTube Movies</A>, <A href="https://play.google.com/store/movies/details?id=_M5ZE9vu_MM.P">Google Play Movies</A>, etc.</P>
        <Aside brighter>
          When referencing specific moments in the digital master I will write a timecode like this: <FilmTimecode timecode="52:00" /> or <FilmTimecode timecode="1:23:45" />. For
          score pieces I will write a timecode like this: <ScoreTimecode timecode="52:00" /> or <ScoreTimecode timecode="1:23:45" />.
        </Aside>

        <H4>Scene 1: Sammie's Goes to Church (Flash-Forward)</H4>
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

const Aside = ({ children, brighter }: { children: React.ReactNode, brighter?: boolean }) => {
  return <aside
    className="border-l border-neutral-500 pl-4 mb-4"
    style={{ borderLeftWidth: "0.5px" }}
  >
    <div className={`mb-1.5 ${brighter ? 'text-neutral-600' : 'text-neutral-400'} [&>p]:italic [&>p]:mb-1.5 ${brighter ? '[&>p]:text-neutral-600' : '[&>p]:text-neutral-500'}`}>
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

const FilmTimecode = ({ timecode }: { timecode: string }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm whitespace-nowrap">
      <div className="w-4 h-4 rounded-full bg-neutral-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Film</title>
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
      </div>
      {timecode}
    </span>
  );
};

const ScoreTimecode = ({ timecode, scoreItem }: { timecode: string; scoreItem?: ScoreItem }) => {
  const pillContent = (
    <>
      <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Music</title>
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
      {timecode}
    </>
  );

  if (scoreItem) {
    return (
      <a
        href={scoreItem.spotifyLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm whitespace-nowrap hover:bg-emerald-100 transition-colors"
      >
        {pillContent}
      </a>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm whitespace-nowrap">
      {pillContent}
    </span>
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
