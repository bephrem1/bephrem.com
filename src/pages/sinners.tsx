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
import PlotTimeline from "../components/shared/film-analysis/plot/PlotTimeline";
import SceneOverview from "../components/shared/film-analysis/scene/SceneOverview";
import { ImageCarousel } from "../components/shared/images/ImageCarousel";
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
          <ListItem>It is single-handedly breathing life into a dying theater industry. (I joined AMC A-List and go every weekend after watching it)</ListItem>
          <ListItem>It's the first film to use Ultra Panavision 70 and IMAX 65mm in the same film.</ListItem>
          <ListItem>Miles Caton has never acted in a feature-length film before. He even <A href="https://youtu.be/ExF7t5jrT3o?si=0TSo2IMzZUk4WHZn&t=18">learned the guitar</A> for the leading role.</ListItem>
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

        <H4>Changing Image System</H4>
        <P>
          A film can also hint at its controlling idea subconsciously through a changing <b>image system</b>. Robert McKee defines this as:
        </P>
        <Quote>
          An <b>IMAGE SYSTEM</b> is a strategy of motifs, a category of
          imagery embedded in the film that repeats in sight and
          sound from beginning to end with persistence and great
          variation, but with equally great subtlety, as a subliminal
          communication to increase the depth and complexity of
          aesthetic emotion.
        </Quote>
        <P>Our protagonists change greatly over the course of the film, and if we take a closer look, so do the images we see them within. What are they wearing? How are they acting? Does the framing change? Do colors change?</P>
        <P>And most of all, <i>why does this change happen?</i> Our Controlling Idea sits behind this question.</P>

        <H5>Smoke & Stack’s Visual Change</H5>
        <P>The Smoke-Stack twins begin the film in crispy 3-piece suits, with a sharp, clean look. It’s daylight and they’re brimming with confidence to pursue their juke joint venture.</P>
        <ImageCarousel
          images={[
            "/film-analysis/films/sinners/stills/smoke-and-stack-image-system-start",
            "/film-analysis/films/sinners/stills/smoke-image-system-end"
          ]}
          imageExts={["jpg", "jpg"]}
          captions={["Smoke & Stack begin in tailored suits.", "Smoke ends sitting alone, rusting away at sunrise in a tank top."]}
          height={400}
          showArrows={true}
          squareCrop={true}
        />
        <P>But what happens by the end? Well Stack ends up dead on the floor shirtless in the juke club at the end of Act II. Smoke ends up completely alone, almost everyone he loves dead, in front of a rusted sawmill,
          in a rust-colored and oily tank top, rolling a cigarette with shaking hands. The composition central and wide to frame his isolation.</P>

        <H4>Sammie’s Visual Change</H4>
        <P>
          Sammie begins the film with wide-eyed idealism and a sense of purpose. He’s on a mission to pursue his music dreams, and he’s full of hope and optimism.
        </P>
        <ImageCarousel
          images={[
            "/film-analysis/films/sinners/stills/sammie-before-1",
            "/film-analysis/films/sinners/stills/sammie-before-2",
            "/film-analysis/films/sinners/stills/sammie-end"
          ]}
          imageExts={["jpg", "jpg", "jpg"]}
          captions={[
            "Sammie looks out onto the cotton fields with determination.",
            "Sammie in a clean outfit.",
            "Sammie ends torn and in tatters."
          ]}
          height={400}
          showArrows={true}
          squareCrop={true}
        />
        <P>By the end, Sammie’s clothing is torn to shreds, his guitar is shattered, and he has a large scar on his face. He sheepishly stumbles into church, seeking his father’s comfort <span className="text-neutral-500">(which he does not get)</span>.</P>
        <P>In the 2nd to last shot of the film he drives off, crying and clutching his shattered guitar to his chest. The only survivor of the weekend.</P>

        <H4>Controlling Idea(s)</H4>
        <P>Combining major protagonist choices, with the conditions they ultimately end up in, we can estimate Controlling Idea<span className="text-neutral-500">(s)</span> as:</P>
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
        <P>Just by looking at all the original (and reinterpreted) music above, you can see how expansively creative this film is.</P>

        <H5>Housekeeping <span className="text-neutral-500">(Digital Viewing)</span></H5>
        <P>A digital copy of the film itself can be found on <A href="https://athome.fandango.com/content/browse/details/Sinners/4020075">Fandango at Home</A> (owned by Warner Brothers), <A href="https://www.amazon.com/gp/video/detail/amzn1.dv.gti.cf9ab498-91f9-4f94-80fd-ba46ac6aabd7">Amazon Prime Video</A>,
          {" "}<A href="https://tv.apple.com/us/movie/sinners/umc.cmc.tl0hc0j1vx7nrrz89gxzxsx9">Apple TV</A>, <A href="https://www.youtube.com/watch?v=_5SDkR1gX8g">YouTube Movies</A>, <A href="https://play.google.com/store/movies/details?id=_M5ZE9vu_MM.P">Google Play Movies</A>, etc.</P>
        <Aside brighter>
          When referencing specific moments in the digital master I will write a timecode like this: <FilmTimecode timecode="52:00" /> or <FilmTimecode timecode="1:23:45" /> or <TurningPointTimecode timecode="52:00" /> <span className="text-neutral-500">(for turning points)</span>. For
          score pieces I will write a timecode like this: <ScoreTimecode timecode="0:54" scoreItem={SinnersScore.GrandClosin} /> or <ScoreTimecode timecode="1:23" />.
        </Aside>

        <H4>Opening Scene: Sunday Morning Service (Flash-Forward)</H4>
        <Image
          path="/film-analysis/films/sinners/stills/sunday-morning-service"
          ext="jpg"
          alt="Opening scene in Sinners, Sammie Moore entering his father's church, in tatters and distraught, clutching the neck of his shattered guitar."
          width="100%"
          optimize={false}
          inspectable
        />
        <SceneOverview
          className="my-4"
          startTimecode="1:35"
          turningPointTimecode="3:18"
          endTimecode="3:40"
          synopsis="A flash-forward to Sunday morning shows Sammie Moore entering his father's church, in tatters and distraught, clutching the neck of his shattered guitar."
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "I need to attend Sunday morning service & be present so my father can see me.",
              subtext: "I want my father to console me and tell me it's ok to pursue my dreams as a musician."
            },
            {
              character: SinnersCast.ReverendMoore,
              explicit: "I need to console my son who is clearly distraught.",
              subtext: "I need to protect my faith and my church. I need to keep Sammie from leaving and threatening that."
            },
          ]}
          conflict="Sammie wants to go to Chicago to pursue music, his father wants him to stay and serve the church."
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: "Quietly walks in to face his father. Eventually realizes he won't get the consolation he wants, sobs to himself."
            },
            {
              character: SinnersCast.ReverendMoore,
              tactic: "Barks a prayer at Sammie, then embraces him."
            },
          ]}
          turningPoint="Sammie realizes that is father won’t give in one bit. He will have to make a choice, and is internally conflicted."
          outcome="Sammie has to make a choice on leaving to pursue music or staying. (but we don’t know this is the choice yet)"
          storyContribution="This scene foreshadows the supernatural elements that will come into play later in the film, as well as our protagonists eventual ruin."
        />
        <H5>Shocking the Audience to Attention</H5>
        <P>Ryan Coogler is a master of emotional contrast and pacing. Tastefully taking watchers on a rollercoaster between expectation and reality.</P>
        <P>When Sammie walks up to a beautifully painted white church, nestled in a quiet green field, with children heard singing as he walks up, we expect peace and quiet.</P>
        <P>But then we notice Sammie's clothes are tattered, he has a large scar on his face, and his guitar is shattered. As he walks up, we begin to feel 2 emotional extremes, only slightly developed.</P>
        <P>Sammie enters, and Reverend Moore yells "Sammie!". The church falls silent. We realize something is seriously wrong. The reverend begins his incantation and we can't tell if the reverend is going to hurt him or help him.</P>

        <H5>Sound As Emotion</H5>
        <P>Sammie does not say a single word in this scene. Instead his emotional turmoil is conveyed through the score & <A href="https://en.wikipedia.org/wiki/Non-diegetic_insert">non-diegetic</A> sound effects
          (climaxing the turmoil with a bass wobble at <FilmTimecode timecode="3:21" /> — <ScoreTimecode timecode="2:07" scoreItem={SinnersScore.FilídhFireKeepersAndGriots} /> in score).</P>
        <P><TurningPointTimecode timecode="3:18" /> marks a turning point where Sammie realizes he won't get the consolation from his father that he wants. At his deepeest point of internal conflict, he clutches his
          shattered guitar as his hand shakes, then the scene cuts to black.</P>

        <H5>Precise Direction On Movements</H5>
        <P>Ryan Coogler is also a master of giving his actors direction on timing and pace of actions for viewer comprehension and emotional impact.</P>
        <P>This scene features 2 elements that would have required precise direction and forethought to materialize:</P>
        <OrderedList>
          <ListItem>The pacing of Sammie entering the church (to hear the children singing)</ListItem>
          <ListItem>The match cuts to Sammie's final stand with Remmick during Reverend Moore's incantation (for the jump scares)</ListItem>
        </OrderedList>

        <P>For the first, Sammie's pacing of action looks like this:</P>
        <TimecodeTable>
          <TimecodeTableRow
            timecode="1:52"
            content={<>Stops the car. <span className="text-neutral-500">(audience thinks: "wow it's so peaceful and quiet here. nature.")</span></>}
          />
          <TimecodeTableRow
            timecode="1:57"
            content={<>Opens the car door. <span className="text-neutral-500">(audience thinks: "what happened to him?")</span></>}
          />
          <TimecodeTableRow
            timecode="2:16"
            content={<>Waits at the church door. <span className="text-neutral-500">(audience gets a chance to hear the children singing)</span></>}
          />
          <TimecodeTableRow
            timecode="2:20"
            content="Opens the church door."
          />
        </TimecodeTable>

        <P>For the second, the match cuts:</P>
        <TimecodeTable>
          <TimecodeTableRow
            timecode="2:40"
            content="Reverend Moore's hand open to the side, Remmick's arms wide open."
          />
          <TimecodeTableRow
            timecode="2:53"
            content="Reverend Moore's hands wide open, Remmick's arms with the same open gesture."
          />
          <TimecodeTableRow
            timecode="3:10"
            content="Reverend Moore's hands on Sammie's shoulders, Remmick grabbing his shoulder during the final battle."
          />
          <TimecodeTableRow
            timecode="3:25"
            content="On the word 'god' and a scream that sounds similar."
          />
          <TimecodeTableRow
            timecode="3:27"
            content="Sammie turns his head to his right, revealing the slash marks, a cut to Remmick inflicting the wound, slashing in the same direction."
          />
        </TimecodeTable>

        <P>This emotional landscaping and gradual revelation of information had to have been planned for, either implicitly or explicitly (unless there was great luck in the cutting room).</P>

        <H5>Cinematography</H5>
        <P>A small book could be written on the cinematography of this film. Cinematography is a form of information compression. It is the art of conveying emotion and information, as effectively
          as possible, to the conscious and subconscious of the watcher.</P>
        <P>Many frames in this scene see the crucifix as a symbol in frames at various angles (initially swooping into the church, Sammie & his father interacting, Sammie clutching his guitar, etc).</P>
        <P>Also notable is the contrast between the characters' dark skin and the white church walls (which is especially noticible a few scenes later when Sammie picks up his guitar).</P>
        <P>These were intentional art direction decisions <span className="text-neutral-500">(there’s a Ryan Coogler interview on it somewhere)</span>. Potentially to draw a
          contrast between the heavens and the wordly lives of the characters we will observe later.</P>

        <H3>Act I: Getting the Band Together</H3>
        <P>After the opening scene, we begin Act I, which consists of the Smoke-Stack Twins recruiting key members of their juke joint staff. Key turning points in the act
          are as follows:
        </P>
      </div>
      <PlotTimeline
        startMinute={3}
        endMinute={44}
        rows={[
          {
            label: "Recruiting Juke Staff",
            subLabel: "Act I",
            items: [
              { atMinute: 7, label: "Juke Joint Purchased" },
              { atMinute: 9, label: "Sammie Joins", bump: true },
              { atMinute: 19, label: "Grace Joins" },
              { atMinute: 21, label: "Sammie Plays", bump: true },
              { atMinute: 25, label: "Delta Slim Joins" },
              { atMinute: 33, label: "Cornbread Joins" },
              { atMinute: 40, label: "Annie Joins" },
              { atMinute: 44, label: "Remmick Kills Bert", description: "End of Act I", bump: true },
            ],
          }
        ]}
      />

      <div className="px-4 sm:px-2 sm:pr-12">
        <H4>Sammie Picking Cotton in The Morning</H4>
        <SceneOverview
          className="my-4"
          startTimecode="3:40"
          turningPointTimecode="4:16"
          endTimecode="4:24"
          synopsis="Sammie picks cotton early in the morning at his plantation. He finishes meeting his quota as others arrive to begin working."
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "I want to finish picking my quota of cotton early. Exchange kind words with Beatrice.",
              subtext: "I want to create room for my pursuit of music. Conceal this desire from Beatrice to keep my father from hearing. Protect my passions."
            },
          ]}
          conflict="Sammie has to meet his quota to have time to pursue music. Beatrice pokes fun with him about his music."
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: "Meets his quota early, has a polite exchange with Beatrice."
            }
          ]}
          turningPoint="Sammie acknowledges Beatrice's comment, and goes his own way."
          outcome="Sammie now has time to pursue music."
          storyContribution="We get an introduction to the sprawling flat land of the Mississippi Delta, the poverty of sharecroppers (bare feet), and charm of Sammie."
        />
        <H5>Vast Expanses and Isolation</H5>
        <P>The Mississippi Delta is very flat. In <A href="https://youtu.be/itAQolHej2k?si=Sp1jBa30thtwcQKO&t=480">a conversation</A> with his Director of Photography Autumn Durald Arkapaw, Ryan Coogler says:</P>
        <Quote>
          One of the visual themes of the film we talked about is <b>isolation</b>. ... You’ll drive for what seems like hours before you get to the next building. And you’re driving through all this agricultural landscape.
          There’s a cotton farm, a pecan farm. And you might not see a car, [or] another person for a long time. ... And just that experience of, seeing these characters, on these massive expanses of isolated landscapes.
          It just clicked that this would be the way. <b>And also how big the sky can feel out there.</b> And [in] that 1.43:1, full-frame, ratio.
        </Quote>

        <H5>Cycles of Poverty</H5>
        <P>Shots of Sammie’s bare feet are displayed to communicate the poverty that sharecroppers lived in, farming land they would never own.</P>
        <P>Shots of workers feet also appear a 2nd time in the scene when Stack goes to recruit Cornbread to join the juke staff.</P>

        <H4>Sammie Goes to His Cabin</H4>
        <SceneOverview
          className="my-4"
          startTimecode="4:24"
          turningPointTimecode="5:10"
          endTimecode="5:21"
          synopsis="Sammie walks back to his cabin in the sharecropper’s village. He wakes up his siblings in his cabin, then looks out at the vast expanses of the Mississippi Delta. He searches for something under his bed."
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "I need to go back to my cabin and grab my guitar.",
              subtext: "I am getting ready to pursue my dreams."
            },
          ]}
          conflict="Sammie initially is reluctant to decide to pursue his love of music, but he looks out to the fields and decides today’s the day he’s going to make it happen."
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: "Sammie playfully splashes a lady washing clothing with water, he playfully wakes up his siblings, and he calmly looks out at the fields."
            }
          ]}
          turningPoint="Sammie goes from neutral, to determined and hopeful as he looks out at the fields."
          outcome="Sammie realizes his guitar is missing."
          storyContribution="We get more of a taste of Sammie’s playful personality, the vast expanses of land, and sense that Sammie is hopeful for something."
        />

        <H4>Smoke and Stack Wait for Hogwood</H4>
        <SceneOverview
          className="my-4"
          startTimecode="5:22"
          turningPointTimecode="5:56"
          endTimecode="6:03"
          synopsis="The Smoke-Stack Twins wait for Hogwood, the landowner of the sawmill to arrive so they can purchase it from him."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "Wait for Hogwood to arrive.",
              subtext: "∅"
            },
            {
              character: SinnersCast.Stack,
              explicit: "”",
              subtext: "”"
            },
          ]}
          conflict="The twins are waiting for someone, and it seems they have a tense relationship with him."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Brace himself for trouble, ready to fight if necessary."
            },
            {
              character: SinnersCast.Stack,
              tactic: "”"
            },
          ]}
          turningPoint="Hogwood’s car becomes visible, the twins brace themselves for his arrival."
          outcome="Hogwood arrives."
          storyContribution="Seeing Stack hand and light a cigarette for Smoke, we get a sense of the twins close bond."
        />
        <H5>Match Cut on “Searching”</H5>
        <P>We enter this scene off a clip of Sammie <i>searching</i> for something under his bed. Smoke begins by checking his watch, <i>searching</i> for someone who has not arrived.</P>

        <H5>Masterful Visual Storytelling</H5>
        <P>This scene holds the first strong moment of visual storytelling (of many) that this film will have. The camera begins on Smoke then rotates around to reveal Stack. Grouping them initially as 1 visual entity to show their inseparable bond.</P>
        <P>This shot came as a suggestion from a crew member <span>(I can’t recall the interview this popped up in), and originally the shot was planned to show both twins at once (no hiding & rotation).</span></P>

        <H5>Sound Design on Dramatic Beats</H5>
        <P>I won’t directly point out all of these (because there are a lot), but at <FilmTimecode timecode="5:56" /> bass kicks in to build tension when Hogwood’s car appears. The score “hugs” around key dramatic beats in every scene,
          embodying different characters and the emotions they are meant to convey.</P>

        <H4>Hogwood Steps Out <span className="text-neutral-500">(“You Boys Twins?”)</span></H4>
        <SceneOverview
          className="my-4"
          startTimecode="6:03"
          turningPointTimecode="6:20"
          endTimecode="6:29"
          synopsis="Hogwood drives up and gets out of his car. He asks them if they are twins, and Stack jokes that they are cousins. Hogwood gestures for them to enter the sawmill."
          objectives={[
            {
              character: SinnersCast.Hogwood,
              explicit: "I need to get more information on who these buyers are.",
              subtext: "I want to intimidate and demean them."
            },
            {
              character: SinnersCast.Smoke,
              explicit: "I need to get more information on who this sellers is.",
              subtext: "I need to maintain my power and upper-hand to complete this deal."
            },
            {
              character: SinnersCast.Stack,
              explicit: "”",
              subtext: "”"
            },
          ]}
          conflict="The twins want the sawmill, but Hogwood clearly looks down on them."
          tactics={[
            {
              character: SinnersCast.Hogwood,
              tactic: "Avoidant of directly answering questions, spits on the ground in front of them."
            },
            {
              character: SinnersCast.Smoke,
              tactic: "Plays it cool and inquisitive, with slight aggression."
            },
            {
              character: SinnersCast.Stack,
              tactic: "Make a joke “Nah’, we cousins.” Deflects Hogwood’s belittling with humor."
            },
          ]}
          turningPoint="Hogwood spits on the ground in front of the twins when asked of his name."
          outcome="The group prepares to enter the sawmill."
          storyContribution="Smoke reveals that he handles pressure with seriousness, Stack deflects it with humor, and Hogwood has a hatred towards the twins."
        />
        <H5>Speak With Actions, Not Words</H5>
        <P>Ryan Coogler is also a master of bringing life to his characters with actions, not words. Revealing their true character in a visceral way.</P>
        <P>When asked of his name, Hogwood spits in front of the twins, an action that makes the crowd wince.</P>
        <P>We also begin to distinguish how the twins handle tense situations. Smoke takes a more serious tone, while Stack turns to witty humor. Michael B. Jordan <A href="https://youtu.be/s72cBC-v6UE?si=pc4miaJujRCv23NT&t=108">comments on the distinction</A>:</P>
        <Quote>
          <b>Smoke</b> wore his trauma differently, he kind of closed up a bit. And <b>Stack</b> was a lot lighter, he’d smile through his pain. He’d smile through his trauma.
        </Quote>
        <P>This clear distinction is not by chance, but again, comes from methodical forethought and a deep understanding of characters’ internal world.</P>

        <H4>In the Sawmill <span className="text-neutral-500">(“Klan Don’t Exist No More”)</span></H4>
        <SceneOverview
          className="my-4"
          startTimecode="6:30"
          turningPointTimecode="7:29"
          endTimecode="7:55"
          synopsis="Hogwood shows them inside the sawmill. Stack asks Hogwood why the floors are washed. After a potential confrontation, Stack gives Hogwood the money. Smoke warns him to never come back."
          objectives={[
            {
              character: SinnersCast.Hogwood,
              explicit: "I need to show the buyers around the sawmill & conceal why I am selling it to them.",
              subtext: "I want to continue belittling them. In reality I’m going to return to kill them later."
            },
            {
              character: SinnersCast.Smoke,
              explicit: "I need to figure out why the floors were cleaned. I need to warn them to never come back.",
              subtext: "I need to maintain my power and control over the transaction."
            },
            {
              character: SinnersCast.Stack,
              explicit: "I will help my brother diligence and close this deal.",
              subtext: "I need to back up my brother and keep him safe. He’ll take the lead & I’ll be right behind."
            },
          ]}
          conflict="Hogwood is witholding information from them, and continuing to belittle them. The twins want to restore their sense of respect and close the deal."
          tactics={[
            {
              character: SinnersCast.Hogwood,
              tactic: "Spits on the floor in front of the twins. Conceals his true plans to kill them."
            },
            {
              character: SinnersCast.Smoke,
              tactic: "Snaps back at Hogwood, almost resorts to violence to restore his sense of respect. Purchases the mill and warns Hogwood to never come back."
            },
            {
              character: SinnersCast.Stack,
              tactic: "Encircles Hogwood, clutching his knife. Hands Hogwood a bag of money with a smile."
            },
          ]}
          turningPoint="The twins almost resort to violence, leading us to believe a fight is about to break out. Instead, Stack hands Hogwood the money to purchase the mill."
          outcome="The twins now own the sawmill."
          storyContribution="We get a sense for how the twins move as a unit to resolve conflict (and how they are quick to use deadly force). Hogwood’s ill intentions for the twins is also foreshadowed."
        />
        <H5>Drama, Anticipation, & Pacing</H5>
        <P>This film is an excellent example of planting and pacing drama to create a constant sense of tension and anticipation. You think one thing is going to happen, but the contrary happens. This is what keeps an audience
          on the edge of their seat, a stream of <i>meaning</i> coming their way.</P>
        <P>Smoke asking <i>“Yall’ wash these floors”</i> sets up a dramatic question that is resolved at the end of the film. In reality, the sawmill is a trap and Hogwood will return to kill them (and everyone else involved in the juke).</P>
        <P>We initially think the twins are going to resort to violence, then when the score turns at <FilmTimecode timecode="7:29" />, we realize they are just going to purchase the mill.</P>

        <H4>Sammie Picks Up His Guitar from the Church <span className="text-neutral-500">(“You Keep Dancin’ With the Devil...”)</span></H4>
        <SceneOverview
          className="my-4"
          startTimecode="7:55"
          turningPointTimecode="9:04"
          endTimecode="9:53"
          synopsis="Sammie visits his father’s church to pick up his guitar. He reads a bible passage, then gestures to leave. His father warns him “You keep dancin’ with the devil, one day it’s gonna follow you home”, then Sammie exits to the sound of Smoke and Stack outside."
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "I need to pick up my guitar and leave in time to meet the twins.",
              subtext: "I need to protect my dreams from my father and show him I am diligent."
            },
            {
              character: SinnersCast.ReverendMoore,
              explicit: "I want to give my son his guitar and encourage him to come to church tomorrow.",
              subtext: "I want to steer my son away from the devil & ruin."
            },
          ]}
          conflict="Sammie wants his guitar so he can go play music, his father wants to discourage him from playing in the twins juke that night."
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: "Shows his father that he is diligent and has memorized the sermon passage. Quietly listens to his father’s warning, takes it to heart, and exits."
            },
            {
              character: SinnersCast.ReverendMoore,
              tactic: "Coaches his son to read the sermon passage, warns him about playing in the juke that night."
            }
          ]}
          turningPoint="Reverend Moore challenges his son with “Where you got to be that’s more important then bein’ in the House of God?” Sammie responds informing his father that he has been working hard all week."
          outcome="Sammie now has his guitar and is with the Smoke-Stack Twins."
          storyContribution="We now have the conflict between Sammie and his father fully framed in our minds, as well as the object of Sammie’s quest in his hands (his guitar). We know what Sammie wants, and what is pulling him away from it."
        />
        <H5>About More Than Just Music</H5>
        <P>Sammie & his father’s conflict is about more than just music, in his <A href="https://youtu.be/0mU_2VWpsmQ?si=dc9LqjeiqfkALSWm&t=624">interview with Hannah Flint</A>, Ryan Coogler says:</P>
        <Quote>
          <b>It was all about money.</b> It was the devil’s music, because when it was time for offering, the congregation didn’t have as much money because they spent it on drinks the night before.
          The same people were going to the juke joint, before they came to the church. ... It wasn’t the devil’s music because they were swiveling their hips.
        </Quote>
        <P>He continues:</P>
        <Quote>
          In blues there’s no mind, body, and metaphysical separation. And in the church concept there often is. The flesh is the enemy. ... In blues the flesh is a part of you. ... Like, I hurt, my back hurts when I pick cotton all day,
          my feet hurt, I’m hungry. I’m sexy, I want this woman. She wants me.
        </Quote>

        <H5>Notes</H5>
        <TimecodeTable>
          <TimecodeTableRow
            timecode="8:23"
            content="A low cello plays a mesmerizing tone, as Sammie’s guitar lay in golden light for him to take. The guitar is a symbol of Sammie’s call to go on a quest."
          />
          <TimecodeTableRow
            timecode="8:55"
            content={<P>Sammie closes the bible and recites the verse from memory, surprising his father. Again, brilliance from Coogler in direction to <i>show</i> Sammie’s diligence rather than relegating it to dialog.</P>}
          />
          <TimecodeTableRow
            timecode="9:06"
            content={<P>Reverend Moore presents to Sammie his central challenge in 1 punchy line. <i>“Where you got to be that’s more important then bein’ in the House of God?”</i> More of Cooglers masterful and punchy writing
              that generates lines that will be memorable during and after the film.</P>}
          />
          <TimecodeTableRow
            timecode="9:33"
            content={<P>and again with <i>“Son...you keep dancin’ with the devil. One day it’s gonna follow you home.”</i></P>}
          />
          <TimecodeTableRow
            timecode="9:46"
            content="A wonderfully timed reaction shot on Sammie who takes the words to heart, then pauses long enough for the editor to layer in the Twins’ car arriving and honking."
          />
        </TimecodeTable>

        <H4>Sammie Rides with Smoke and Stack</H4>
        <SceneOverview
          className="my-4"
          startTimecode="10:10"
          turningPointTimecode="10:41"
          endTimecode="10:55"
          synopsis="Sammie rides with Smoke and Stack to pick up their other truck. Smoke lets Sammie know that Chicago is not as promising as he once thought."
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "I want to catch up with my older cousins, I haven’t seen them in years.",
              subtext: "I want to know if Chicago is as promising as I once thought."
            },
            {
              character: SinnersCast.Smoke,
              explicit: "I want to catch up with my younger cousin, I haven’t seen him in years.",
              subtext: "I want to reinforce my disillusionment about Chicago to Sammie."
            },
          ]}
          conflict="Sammie wants to go to Chicago to pursue his music dreams, Smoke wants to educate Sammie that Chicago is not as promising as he imagines it may be."
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: "Asks his cousin a question, then quietly listens to him speaking."
            },
            {
              character: SinnersCast.Smoke,
              tactic: "Answers his cousin’s question firmly."
            },
          ]}
          turningPoint="Smoke tells Sammie that Chicago is not as promising as he once thought. Sammie takes this to heart, but still doesn’t want to believe it."
          outcome="Sammie gets a sense that Chicago may not be as welcoming a place as he once thought."
          storyContribution="We get an initial taste of why the Smoke-Stack Twins are back, there are some lingering tensions they hold about Chicago. We also continue to see Sammie as a figure who receives mentorship from those around him."
        />
        <H5>Writing From Characters’ Inner World</H5>
        <P>
          Throughout the film, you’ll find scenes rich with authentic character interaction and dialogue. Interactions that could only have been conceived if the writer <span className="text-neutral-500">(Ryan Coogler in this case)</span> had a deep and
          complete understanding for the characters and their world.
        </P>
        <P>If you saw your younger cousin after years away from home, what would that conversation look like? Would it be playful? You’d probably be curious about their life, and things that may still be troubling them.</P>
        <P>Smoke asks Sammie if his father has been <i>“putting his hands on him”</i> <span className="text-neutral-500"> (beating him)</span>. We subconsciously begin to identify with the characters, <i>“Yeah...I have siblings too. This is how
          I’d be talking to them.”</i>. But we don’t consciously register this empathy-building process.</P>

        <H4>A Snake Jumps Out</H4>
        <SceneOverview
          className="my-4"
          startTimecode="10:56"
          turningPointTimecode="11:34"
          endTimecode="12:04"
          synopsis="The group move through underbrush to the back of a truck they have arrived to pick up. A snake jumps out and Smoke impales it, then rips it’s head off."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "I need to get to my truck so I can go to town. I need to kill this snake that’s in the way.",
              subtext: "I am powerful, nothing will stand in my way."
            },
            {
              character: SinnersCast.Stack,
              explicit: "I need to help Smoke kill this snake so we can get to the truck.",
              subtext: "I am always by my brother’s side to support him."
            },
            {
              character: SinnersCast.SammieMoore,
              explicit: "I need to follow my cousins to the truck.",
              subtext: "I want my cousins’ mentorship and protection."
            },
          ]}
          conflict="A snake pops out from the back of the truck."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Impales the snake with his knife without hesitation."
            },
            {
              character: SinnersCast.Stack,
              tactic: "Tosses his brother a knife."
            },
            {
              character: SinnersCast.SammieMoore,
              tactic: "Backs away and lets his brothers handle the situation."
            }
          ]}
          turningPoint="A snake jumps out and Smoke impales it with his knife."
          outcome="The group can now access the back of the truck."
          storyContribution="We strengthen the idea that Smoke and Stack move as one unit, inseparable. We gain an understanding of Smoke’s tolerance for violence. We deepen the understanding that Sammie looks up to his older cousins for guidance and protection."
        />
        <H5>More Than a Jump Scare</H5>
        <P>
          Ryan Coogler as also excellent at mixing entertainment with function. Aside from jump-scaring us to attention, the snake jumping out is a strong character development moment.
        </P>
        <P>We notice:</P>
        <UnorderedList>
          <ListItem><b>Smoke Is Quick To Violence:</b> We observe Smoke’s propensity for violence. He is more vicious than a vicious rattlesnake.</ListItem>
          <ListItem><b>Sammie Yields:</b> We see Sammie yield to his cousins for protection.</ListItem>
          <ListItem><b>The Twins Move as One:</b> We see how the cousins move as a unit, without speaking or hesitating.</ListItem>
        </UnorderedList>
        <P>During the scene, the audience is thinking: <i>“That’s definitely not how I would have handled a rattlesnake popping out at me. I would have paused and used a branch, or just run away.”</i></P>

        <H4>The Twins Bicker <span className="text-neutral-500">(“We Been Gone a Long Time Stack”)</span></H4>
        <SceneOverview
          className="my-4"
          startTimecode="12:05"
          turningPointTimecode="12:22"
          endTimecode="13:08"
          synopsis="Smoke and Stack exchange words behind the truck. Smoke has apprehensions about opening that night, and Stack convinces him today’s the day. Sammie looks on."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "I want to convince Stack that we’re running out of time and should open next weekend.",
              subtext: "I need to protect my business interests."
            },
            {
              character: SinnersCast.Stack,
              explicit: "I need to convince Smoke that we’re going to open tonight.",
              subtext: "I want to support my brother."
            },
            {
              character: SinnersCast.SammieMoore,
              explicit: "I need to listen to my cousins.",
              subtext: "I want my cousins’ protection & guidance."
            },
          ]}
          conflict="Apprehensive, Smoke wants to open next weekend. Stack wants to convince him that they should open tonight."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Initially hesitant, then agrees with Stack."
            },
            {
              character: SinnersCast.Stack,
              tactic: "Charmingly convinces Smoke that they should open tonight."
            },
            {
              character: SinnersCast.SammieMoore,
              tactic: "Quietly listens."
            }
          ]}
          turningPoint="Smoke gives in to Stack’s convincing to open that night."
          outcome="The twins will open the juke that night. They prepare to go to town."
          storyContribution="This is the strongest scene where the twins’ bond is solidified, as well as each twin distinguished in character. Ending in a hug and a “love you,” as Sammie looks on."
        />
        <H5>Bring Them Together, Then Tear Them Apart</H5>
        <P>Part of the ingenious design of this story, is that the twins <i>need</i> each other. This acts as an engine for drama because later, Ryan Coogler will tear them apart, to teach us a lesson.</P>
        <P>Because they are so close and interdependent, it offers constant fuel for drama and meaning-making in the story. We also see this tactic employed in the Stack-Mary, Smoke-Annie, Sammie-Pearline romance subplots.</P>
        <P>Characters that need each other keep banging heads to get what they want, but it just doesn’t happen the way they expect it to. More on this concept <A href="https://youtu.be/esO2C0V12jI?si=AgCBGNIFehDaD2ta&t=150">here</A>.</P>

        <H4>Watch My Truck</H4>
        <SceneOverview
          className="my-4"
          startTimecode="13:40"
          turningPointTimecode="14:50"
          endTimecode="15:26"
          synopsis="Smoke pays a young girl in the town to watch his truck."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "I need someone to watch my truck while I go talk to the Chows.",
              subtext: "I need to teach this young girl how the world works. By power and negotiation."
            },
          ]}
          conflict="The young girl is initially hesitant to talk to Smoke."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Smoke uses money to motivate the young girl to watch his truck. He encourages her to negotiate a better fee."
            }
          ]}
          turningPoint="The young girl perks up when Smoke offers to pay her 10¢/minute to watch his truck."
          outcome="The young girl agrees to watch the truck."
          storyContribution="We learn that Smoke has a feared reputation with those in town. We also get a first taste of his inclination to use money and negotiation to get what he wants."
        />
        <H4>Negotiation Truncated</H4>
        <P>I watched this scene Thursday April 17th (opening weekend) and there were 1-2 more rounds of back-and-forth in the negotiation between Smoke and the young girl.</P>
        <P>The editors must have cut it out because we get the same character impact later when Smoke does a negotiation with Grace Chow in Bo’s shop.</P>
      </div>

      {/* <SceneOverview
          className="my-4"
          startTimecode=""
          turningPointTimecode=""
          endTimecode=""
          synopsis=""
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "",
              subtext: ""
            },
          ]}
          conflict=""
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: ""
            }
          ]}
          turningPoint=""
          outcome=""
          storyContribution=""
        /> */}
    </div>
  )
}

/* formatting (cleanup with .mdx later) */

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-neutral-800 text-3xl font-semibold mb-2.5">{children}</h1>
}
const H2 = ({ children }: { children: React.ReactNode }) => {
  return <h2 className="text-neutral-800 text-2xl font-semibold mb-2.5">{children}</h2>
}
const H3 = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-neutral-800 text-xl font-semibold mb-2.5">{children}</h3>
}
const H4 = ({ children }: { children: React.ReactNode }) => {
  return <h4 className="text-neutral-800 text-lg font-semibold mb-2.5">{children}</h4>
}
const H5 = ({ children }: { children: React.ReactNode }) => {
  return <h5 className="text-neutral-800 text-base font-semibold mb-2.5">{children}</h5>
}
const H6 = ({ children }: { children: React.ReactNode }) => {
  return <h6 className="text-neutral-800 text-base font-semibold mb-2.5">{children}</h6>
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

const TurningPointTimecode = ({ timecode, scoreItem }: { timecode: string; scoreItem?: ScoreItem }) => {
  const pillContent = (
    <>
      <div className="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Turning Point</title>
          <path d="M12 2L8 6h3v4H5l-3 3 3 3h6v4h3l4-4h-3v-4h6l3-3-3-3h-6V6h3L12 2z" />
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
        className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-sm whitespace-nowrap hover:bg-orange-100 transition-colors"
      >
        {pillContent}
      </a>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-sm whitespace-nowrap">
      {pillContent}
    </span>
  );
};

const TimecodeTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full overflow-x-auto my-4">
      <table className="w-full border-collapse border border-neutral-300">
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  );
};

const TimecodeTableRow = ({ timecode, content }: { timecode: string; content: React.ReactNode }) => {
  return (
    <tr className="border-b border-neutral-300 last:border-b-0">
      <td className="py-2 px-4 align-top border-r border-neutral-300">
        <FilmTimecode timecode={timecode} />
      </td>
      <td className="py-2 px-4 text-neutral-950 [&>span.text-neutral-500]:text-neutral-500 [&>span.text-neutral-500]:text-sm">
        {content}
      </td>
    </tr>
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
