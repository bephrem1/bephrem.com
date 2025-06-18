import { clsx } from "clsx";
import { formatDistanceToNow, isValid, parse, parseISO } from "date-fns";
import Head from 'next/head';
import React, { useState } from "react";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { SinnersCast } from "../components/film-analysis/sinners/cast";
import SinnersPlotOverview from "../components/film-analysis/sinners/plots/SinnersPlotOverview";
import { type ScoreItem, SinnersScore } from "../components/film-analysis/sinners/score";
import SinnersScoreOverview from "../components/film-analysis/sinners/score/SinnersScoreOverview";
import ProgressLine from "../components/page-segments/writing/ProgressLine";
import TableOfContents from "../components/page-segments/writing/TableOfContents";
import BlogGrid from "../components/shared/blog/BlogGrid";
import Image from "../components/shared/elements/Image";
import Link from "../components/shared/elements/Link";
import CastMembers from "../components/shared/film-analysis/cast/CastMembers";
import DramaticIntensityPlot from "../components/shared/film-analysis/plot/DramaticIntensityPlot";
import PlotTimeline from "../components/shared/film-analysis/plot/PlotTimeline";
import SceneOverview from "../components/shared/film-analysis/scene/SceneOverview";
import SceneTimeline from "../components/shared/film-analysis/scene/SceneTimeline";
import { ImageCarousel } from "../components/shared/images/ImageCarousel";
import VideoPlayer from "../components/shared/video/VideoPlayer";
import YouTubeEmbed from "../components/shared/youtube/YouTubeEmbed";
import YouTubeGrid from "../components/shared/youtube/YouTubeGrid";
import { isEmpty } from "../helpers/empty";
import { EXTERNAL_LINKS } from "../helpers/urls";
import ArrowUpRightIcon from "../icons/lib/ArrowUpRightIcon";
import QuoteIcon from "../icons/lib/QuoteIcon";

const SinnersFilmAnalysisPage = () => {
  useRestoreScrollPosition();

  const [hideLeftColumn, setHideLeftColumn] = useState(false);
  const [hideRightColumn, setHideRightColumn] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll('.left-column——avoid');
    const observer = new window.IntersectionObserver(
      (entries) => {
        setHideLeftColumn(Array.from(entries).some(entry => entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.right-column——avoid');
    const observer = new window.IntersectionObserver(
      (entries) => {
        setHideRightColumn(Array.from(entries).some(entry => entry.isIntersecting));
      },
      { threshold: 0.1 }
    );
    for (const el of elements) {
      observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return <>
    <Head>
      <link rel="icon" href="/images/film-analysis/films/sinners/favicon/favicon.ico" />
    </Head>
    <div className="relative w-full flex justify-center bg-neutral-50 min-h-svh">
      <ProgressLine />

      <div className="w-full max-w-[1400px] flex">
        {/* Placeholders for left/right columns */}
        <div className="flex-1" />
        <div className="flex flex-col w-full max-w-[700px] min-h-svh border-r border-r-neutral-200 z-10">
          <Contents />
        </div>
        <div className="flex-1" />
      </div>
      {/* Conditionally render the left column */}
      <div
        className={twMerge(
          "hidden xl:block w-[275px] fixed top-16 left-[calc(50%-700px/2-275px-48px)] p-2 z-20 transition-opacity duration-300",
          hideLeftColumn ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <LeftColumnContents />
      </div>
      {/* Fixed right column */}
      {!hideRightColumn && (
        <div className="hidden xl:block w-[300px] fixed top-16 right-[calc(50%-700px/2-300px-24px)] p-2 z-20">
          <TableOfContents className="w-full" primaryColor="#D9622B" />
        </div>
      )}
    </div>
  </>
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
        <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 ml-[-12px]">
          <p className="text-neutral-500 text-sm mb-1"><b>Controlling Idea</b> <span className="text-neutral-400 text-xs">(Theme)</span></p>
          <p className="text-neutral-600 text-sm text-left">"Greed and hunger for power destroys community. Culture and its expression can never be destroyed"</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-neutral-500 text-xs mb-2.5"><b>Main Protagonists</b></p>
        <CastMembers cast={SinnersCast.Protagonists} avatarSize={50} />
        <p className="text-neutral-500 text-xs mb-2.5 mt-8"><b>Main Antagonists</b></p>
        <CastMembers cast={SinnersCast.Antagonists} avatarSize={50} />

        <CastCrewPill className="mt-6" href="https://www.imdb.com/title/tt31193180/fullcredits/" />
      </div>
      <div className="mt-4">
        <p className="text-neutral-500 text-xs mb-2.5"><b>Score</b></p>
        <ScoreTimecode className="mb-1" link="https://open.spotify.com/album/6PQXsiHd4AjrAqhWLd5HyT" label="Ludwig Göransson's Album" />
        <ScoreTimecode link="https://open.spotify.com/album/0zjAqh1Fr7XQWy1SlzGhMn" label="Sinners Movie Album" />
      </div>
    </div>
  )
}

const Contents = () => {
  return (
    <div className="pt-4 pb-16 md:pt-16 md:pb-36">
      <div className="px-4 sm:px-2 sm:pr-12">
        <Header className="mb-4 sm:mb-4" title="Analyzing “Sinners” — By Ryan Coogler" date="2025-06-19" />

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
          <ListItem>One of the best writer/directors in the world, Ryan Coogler, releases the first original movie of his 5 feature-length film career.</ListItem>
          <ListItem>Michael B. Jordan plays <i>2 characters</i>, through a slew of acting & technical complications.</ListItem>
          <ListItem>The cinematography is breathtaking, every frame is memorable. <A href="https://www.autumndurald.com/">Autumn Durald Arkapaw</A> makes history as the first woman to shoot a film in large-format IMAX 65mm.</ListItem>
          <ListItem>Ryan Coogler makes history as the first black director to shoot in large-format IMAX 65mm.</ListItem>
          <ListItem>The writing and story are incredibly layered, original, and historically accurate — avoiding cinema tropes and clichés left & right. The film <A href="https://youtu.be/Pjb_eH0C_vQ?si=plG7O-mGPO_48cae&t=462">crosses genre boundaries</A> of Supernatural Horror, Love Story, Drama, Musical, Comedy, & Western. </ListItem>
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
        <P>Great works of art like this come once every few decades. This film threads dozens of creative needles.</P>
        <P>It's so incredibly rare, because it's nearly impossible to align talent and history like this.</P>
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
        <P>Sinners is organized into 5 acts along it's main plotline. The story weaves the hero journeys of <b>2 main protagonist forces</b>: Sammie Moore & the Smokestack Twins.</P>
        <P>Both are seeking freedom in some regard. The Smokestack Twins are seeking to open their juke club and leave their troubled past in Chicago behind. Sammie hopes to play music and make a living doing so (against his father's wishes).</P>
        <P>The following diagram marks major <b>turning points</b> ("points of no return") which separate acts for central plot and subplots:</P>
      </div>
      <SinnersPlotOverview className="left-column——avoid right-column——avoid" />
      <div className="px-4 sm:px-2 sm:pr-12">
        <div className="mb-6">
          <CastMembers cast={[SinnersCast.Annie, SinnersCast.Mary, SinnersCast.Pearline]} avatarSize={50} />
        </div>

        <P>In addition, there are 3 "Love Story" subplots, which all contribute narrative force to the Controlling Idea.</P>
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

        <H5>Smoke & Stack's Visual Change</H5>
        <P>The Smokestack twins begin the film in crispy 3-piece suits, with a sharp, clean look. It's daylight and they're brimming with confidence to pursue their juke joint venture.</P>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
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

        <H4>Sammie's Visual Change</H4>
        <P>
          Sammie begins the film with wide-eyed idealism and a sense of purpose. He's on a mission to pursue his music dreams, and he's full of hope and optimism.
        </P>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
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
        <P>By the end, Sammie's clothing is torn to shreds, his guitar is shattered, and he has a large scar on his face. He sheepishly stumbles into church, seeking his father's comfort <span className="text-neutral-500">(which he does not get)</span>.</P>
        <P>In the 2nd to last shot of the film he drives off, crying and clutching his shattered guitar to his chest. The only survivor of the weekend.</P>

        <H4>Controlling Idea(s)</H4>
        <P>Combining major protagonist choices, with the conditions they ultimately end up in, we can estimate Controlling Idea<span className="text-neutral-500">(s)</span> as:</P>
        <UnorderedList>
          <ListItem>Excessive greed for money and power will destroy family, community, and self.</ListItem>
          <ListItem>Culture is immortal, it will always find a way to survive attack.</ListItem>
        </UnorderedList>
        <P>There are also strong historical notes on ownership & racism, Ryan Coogler in <A href="https://youtu.be/0mU_2VWpsmQ?si=vZNmPtdGcGTFDXah&t=431">this interview with Hanna Flint</A> comments:</P>
        <Quote>What if the vampires didn't show up, what happens to those people? ... The reality is...everybody at that juke was gonna be dead anyway. ... They was f***ed essentially the moment they bought the mill.</Quote>
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
          turningPoint="Sammie realizes that is father won't give in one bit. He will have to make a choice, and is internally conflicted."
          outcome="Sammie has to make a choice on leaving to pursue music or staying. (but we don't know this is the choice yet)"
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
        <P>These were intentional art direction decisions <span className="text-neutral-500">(there's a Ryan Coogler interview on it somewhere)</span>. Potentially to draw a
          contrast between the heavens and the wordly lives of the characters we will observe later.</P>

        <H3>Act I: Getting the Band Together</H3>
        <P>After the opening scene, we begin Act I, which consists of the Smokestack Twins recruiting key members of their juke joint staff. Key turning points in the act
          are as follows:
        </P>
      </div>
      <PlotTimeline
        className="left-column——avoid right-column——avoid"
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
          One of the visual themes of the film we talked about is <b>isolation</b>. ... You'll drive for what seems like hours before you get to the next building. And you're driving through all this agricultural landscape.
          There's a cotton farm, a pecan farm. And you might not see a car, [or] another person for a long time. ... And just that experience of, seeing these characters, on these massive expanses of isolated landscapes.
          It just clicked that this would be the way. <b>And also how big the sky can feel out there.</b> And [in] that 1.43:1, full-frame, ratio.
        </Quote>

        <H5>Cycles of Poverty</H5>
        <P>Shots of Sammie's bare feet are displayed to communicate the poverty that sharecroppers lived in, farming land they would never own.</P>
        <P>Shots of workers feet also appear a 2nd time in the scene when Stack goes to recruit Cornbread to join the juke staff.</P>

        <H4>Sammie Goes to His Cabin</H4>
        <SceneOverview
          className="my-4"
          startTimecode="4:24"
          turningPointTimecode="5:10"
          endTimecode="5:21"
          synopsis="Sammie walks back to his cabin in the sharecropper's village. He wakes up his siblings in his cabin, then looks out at the vast expanses of the Mississippi Delta. He searches for something under his bed."
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "I need to go back to my cabin and grab my guitar.",
              subtext: "I am getting ready to pursue my dreams."
            },
          ]}
          conflict="Sammie initially is reluctant to decide to pursue his love of music, but he looks out to the fields and decides today's the day he's going to make it happen."
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: "Sammie playfully splashes a lady washing clothing with water, he playfully wakes up his siblings, and he calmly looks out at the fields."
            }
          ]}
          turningPoint="Sammie goes from neutral, to determined and hopeful as he looks out at the fields."
          outcome="Sammie realizes his guitar is missing."
          storyContribution="We get more of a taste of Sammie's playful personality, the vast expanses of land, and sense that Sammie is hopeful for something."
        />

        <H4>Smoke and Stack Wait for Hogwood</H4>
        <SceneOverview
          className="my-4"
          startTimecode="5:22"
          turningPointTimecode="5:56"
          endTimecode="6:03"
          synopsis="The Smokestack Twins wait for Hogwood, the landowner of the sawmill to arrive so they can purchase it from him."
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
          outcome="Sammie now has his guitar and is with the Smokestack Twins."
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
          storyContribution="We get an initial taste of why the Smokestack Twins are back, there are some lingering tensions they hold about Chicago. We also continue to see Sammie as a figure who receives mentorship from those around him."
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

        <H5>Twins Splitting Up Under Threat</H5>
        <P>The twins end up splitting up after this scene is actually rooted in an observation by Ryan Coogler from working with actual twins during pre-production.</P>
        <P>In an interview on The Breakfast Club <A href="https://youtu.be/YWqTXowtqJg?si=xyN_TKjIXVMuJdXg&t=923">he says</A>:</P>
        <Quote>
          I’ve been knowing [Noah & Logan] for over a decade and I had them come over to my house. ... Just to kind of work through some stuff with Mike, and I’ll never forget this. They came to sit down on my couch, and they sit side-by-side.
          ... and they’re completely identical. ... And I’m lookin’, and I say “Ay man, I notice y’all touching each other, close to each other ... <b>When y’all sit side-by-side, like that, is that for me? Or is that for y’all?”</b> <b>They say <i>“it’s
            for you”</i></b>. and I’m like “So you don’t need to be next to each other?” and they’re like “Nah. ... But it freaks people out when we’re not.”
        </Quote>
        <P>The twins only split up when they want to be more of a threat to others, for intimidation. And individually, their character can be more distinctly developed in later scenes.</P>

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

        <H4>Lingering on the Truck</H4>
        <P>It’s important to notice that the camera gives 2 more seconds on the truck (<FilmTimecode timecode="15:24" />) as Smoke walks away. This allows the audience to subconsciously absorb that the truck will have dramatic importance later.</P>

        <H4>Bo’s Shop <span className="text-neutral-500">(“You Not Lil’ Lisa, Is You?”)</span></H4>
        <SceneOverview
          className="my-4"
          startTimecode="15:26"
          turningPointTimecode={["15:50", "16:16"]}
          endTimecode="16:16"
          synopsis="Smoke meets his old friend, shop owner Bo Chow. He hears the horn of his truck outside, indicating that someone is trying to rob it."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "I want to find Bo Chow so I can get Grace Chow’s help.",
              subtext: "I’m excited to see my friend I haven’t seen in a while."
            },
            {
              character: SinnersCast.BoChow,
              explicit: "I want to help my friend Smoke.",
              subtext: "∅"
            },
            {
              character: SinnersCast.LisaChow,
              explicit: "Not Smoke again. Looks like he wants to talk to my Dad.",
              subtext: "I need to keep an eye on him and protect my Dad."
            },
          ]}
          conflict="Smoke hasn’t seen his friend Bo Chow in a while, Lil’ Lisa is a bit apprehensive about his visit. Someone is trying to rob Smoke’s truck outside."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Glares at Lil’ Lisa. Begins to move outside to check on his truck."
            },
            {
              character: SinnersCast.BoChow,
              tactic: "Hugs and welcomes Smoke."
            },
            {
              character: SinnersCast.LisaChow,
              tactic: "Glares at Smoke. Stays mostly quiet."
            }
          ]}
          turningPoint="Smoke sees his friend Bo Chow for the first time in years, he embraces him. Someone is trying to rob his truck outside."
          outcome="Smoke makes his way outside."
          storyContribution="We learn that Smoke and Bo are long-time friends. Lisa is introduced to the story (she will be a minor dramatic element much later)."
        />
        <H4>“Bo Chow!”</H4>
        <P>Instead of having Smoke labor through robotic dialog like <i>“Good seeing you my old friend! It’s been a long time Bo!”</i>... Ryan Coogler writes a simple <i>“Bo Chow!”</i>, a long pause after Bo comes out of the door, and a <i>big</i> hug.</P>
        <P>More brilliant visual storytelling. We immediately understand they’ve known each other for a long time, and that they have a close relationship that goes way back, with no additional dialog needed.</P>
        <P>Another snappy moment at <FilmTimecode timecode="19:06" /> when in 1 motion Smoke holds up the money to answer Grace’s <i>“How you payin’ for this?”</i>, then Bo follows-on immediately with <i>“and...”</i>. 1 fluid motion of visual speech.</P>

        <H4>Catfish</H4>
        <P>Smoke says <i>“I need catfish, for 100 people”</i>. During my visit to Clarksdale, I didn’t remember this line, until someone recommended that I go eat some catfish <A href="https://maps.app.goo.gl/zHB42QnAoNtAhGRR9">by the crossroads</A>.</P>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
          images={[
            "/film-analysis/films/sinners/clarksdale/catfish-1",
            "/film-analysis/films/sinners/clarksdale/catfish-2",
            "/film-analysis/films/sinners/clarksdale/catfish-3",
            "/film-analysis/films/sinners/clarksdale/catfish-4",
          ]}
          imageExts={["jpg", "jpg", "jpg", "jpg"]}
          captions={["Catfish on toast.", "Crossroads Catfish, next to “The Blues Crossroads”.", " Crossroads Catfish interior.", "My table."]}
          height={400}
          showArrows={true}
          squareCrop={true}
        />
        <P>Catfish, it turns out, has long been a staple of southern black and white working-class cuisine (though it wasn’t widely commercialized until the late 1950s/early 1960s, 30 years after this film takes place).</P>

        <H4>Lil’ Lisa & The Chow Family</H4>
        <Image
          path="/film-analysis/films/sinners/clarksdale/gilroy-chow"
          ext="jpg"
          alt="Gilroy & Sally Chow, the actual Chow family."
          width="100%"
          optimize={false}
          inspectable
        />
        <p className="text-neutral-500 text-sm mt-2 mb-4"><A href="https://www.cityofclarksdale.org/leaders/chow/">Gilroy</A> & Sally Chow are actual residents of Clarksdale. They act as advocates for the heritage of the Chinese community in the Mississippi Delta.</p>
        <P>Although their names acted as inspiration for Grace & Bo’s, their daughter’s actual name is in-fact, Lisa.</P>

        <H4>Investigating the Truck Break-In</H4>
        <SceneOverview
          className="my-4"
          startTimecode="16:20"
          turningPointTimecode={["16:33", "16:41", "17:10"]}
          endTimecode="17:29"
          synopsis="Smoke goes outside to see who is robbing his truck. He ends up shooting his friend in the leg, then a small boy in the knee."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "I need to find out who is robbing my truck.",
              subtext: "I need to maintain my power and reputation as a feared man."
            },
          ]}
          conflict="Smoke ends up shooting an old friend in the leg, then shoots a small boy in the knee."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Shoots the robber before knowing who it was. Shoots a helpless boy in the knee."
            }
          ]}
          turningPoint="Smoke ends up shooting an old friend, then a small boy."
          outcome="Smoke has neutralized the threat."
          storyContribution="Smoke is now clearly a very violent character, almost to a comical degree. This scene is a climax on Smoke’s character development in this regard."
        />
        <P>This scene turns multiple times:</P>
        <TimecodeTable>
          <TimecodeTableRow
            timecode="16:33"
            content="Smoke ends up shooting his friend Terry in the leg. When his friend turns around he has a distinctly lazy left eye, indicating that Smoke should recognize him quickly."
          />
          <TimecodeTableRow
            timecode="17:00"
            content="We are afraid that Smoke is going to shoot him again."
          />
          <TimecodeTableRow
            timecode="17:10"
            content="We see a scared little boy and think he’s in the clear."
          />
          <TimecodeTableRow
            timecode="17:11"
            content={<P>Ryan Coogler <i>doubles down</i> on Smoke’s violence to punctuate the scene. He shoots the boy in the knee.</P>}
          />
        </TimecodeTable>
        <H5>Mixing Comedy & Violence</H5>
        <P>You can’t just put your audience through an emotional wringer with no reward, with no space to breathe. Despite Smoke’s violent acts, there is always an air of absurdity and comedy to the violence.
          Enough where you can think to yourself <i>“this is just a movie”</i>, without losing dramatic impact.</P>
        <P>I could always feel the energy in the room turn a bit dark towards Smoke after the 2nd gunshot. But the comedy makes the violence palatable.</P>
        <P>The <i>“N***a I need help”</i> line heard from the little boy as Smoke returns to Bo’s store is one of the great initial laughs the audience experiences. When under pressure, we seek comedic relief.</P>

        <H4>Grace Walks Over <span className="text-neutral-500">(Long-Take, “Oner”)</span></H4>
        <SceneOverview
          className="my-4"
          startTimecode="17:53"
          turningPointTimecode={["17:38", "17:54", "18:36"]}
          endTimecode="18:50"
          synopsis="Bo asks his daughter Lisa to get Grace from her store."
          objectives={[
            {
              character: SinnersCast.GraceChow,
              explicit: "I need to go find out what Bo wants.",
              subtext: "I want to support Bo."
            },
            {
              character: SinnersCast.LisaChow,
              explicit: "I need to go grab my mom.",
              subtext: "∅"
            },
          ]}
          conflict="∅"
          tactics={[
            {
              character: SinnersCast.GraceChow,
              tactic: "Grace walks over, giving a concerned glance to the 2 men who were shot outside."
            },
            {
              character: SinnersCast.LisaChow,
              tactic: "Politely walks over to her mom’s shop and tells her Bo wants her."
            },
          ]}
          turningPoint="During the long take on Grace we silently wonder if Chinese people actually existed in the American South in 1932. The lingering take on Grace says a loud but quiet “Yes”."
          outcome="Grace enters Bo’s shop."
          storyContribution="We get a feel for the enterprising nature of Clarksdale residents, each owning their own shops. We also get a long look at the fact that Chinese immigrants were an important part of the Delta community."
        />
        <H5>Wide Streets</H5>
        <P>During my visit to Clarksdale, the first thing I noticed was that the streets downtown were <i>wide</i>.</P>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
          images={[
            "/film-analysis/films/sinners/clarksdale/downtown-streets-day",
            "/film-analysis/films/sinners/clarksdale/downtown-streets-night",
            "/film-analysis/films/sinners/clarksdale/downtown-clarksdale-map",
          ]}
          imageExts={["jpg", "jpg", "jpg"]}
          captions={["Downtown street during the day.", "Street corner the night I arrived.", "The downtown is very small. Only maybe 6-by-12 blocks of independently-owned shops."]}
          height={400}
          showArrows={true}
          squareCrop={true}
        />
        <P>Downtown Clarksdale is maybe 6-by-12 blocks, with streets lined by independently-owned shops <span className="text-neutral-500">(most of which were closed when I visited)</span>. The community is very
          tight-knit, everyone knows each other and you’ll recognize the same people within a day or two.</P>
        <Aside>
          Ryan Coogler comments on <span className="text-neutral-400">(I lost the interview)</span> the self-enterprising nature of the people in the community. So it only makes sense that Bo owns his own shop, Grace owns her own shop, etc.
        </Aside>

        <H5>Chinese in the Delta</H5>
        <P>This gave the perfect opportunity for a strong storytelling moment. We see a long tracking shot of Lisa walking to Grace’s store, then Grace walking back over to Bo’s.</P>
        <P>The Grace tracking shot spans from <FilmTimecode timecode="18:25" /> to <FilmTimecode timecode="18:51" />. <b>26 seconds!</b> This is an eternity for one shot to hold, and speaks volumes to this scene’s storytelling importance.</P>
        <P>By <FilmTimecode timecode="18:37" /> we know <i>there’s something more to this shot than just the contents</i>. The <i>storyteller</i> is trying to say something to us. Specifically, that Chinese immigrants did exist
          in the American South during this time (and played a <A href="https://youtu.be/2NMrqGHr5zE?si=R8cIXbIXDmOAFGAa&t=67">pivotal role</A> in the Delta community).</P>
        <P>This moment also lets us get aquainted to the commotion of the town, setting up the next scene where Grace mentions the 2 men that have been shot outside.</P>

        <H4>Negotiating for Grace’s Help</H4>
        <SceneOverview
          className="my-4"
          startTimecode="18:52"
          turningPointTimecode={["19:11", "19:21", "19:31", "19:39"]}
          endTimecode="19:42"
          synopsis="Grace enters Bo’s shop asking why 2 men outside were shot. She negotiates a deal with Smoke for her sign painting services."
          objectives={[
            {
              character: SinnersCast.GraceChow,
              explicit: "I need to figure out what’s going on here. I need to negotiate a good deal for my sign painting services.",
              subtext: "I need to protect Bo & my daughter Lisa. I’m not getting ripped off by this troublemaker."
            },
            {
              character: SinnersCast.Smoke,
              explicit: "I need to get Grace to help me at the cheapest price possible.",
              subtext: "I need to maintain my power and get Grace to bend to my will."
            },
          ]}
          conflict="Smoke wants Grace to paint a sign for the juke joint in a hurry. Grace will only help for the right price."
          tactics={[
            {
              character: SinnersCast.GraceChow,
              tactic: "Negotiates in a short back-and-forth with Smoke."
            },
            {
              character: SinnersCast.Smoke,
              tactic: "Negotiates in a short back-and-forth with Grace."
            },
          ]}
          turningPoint="Grace negotiates a deal with Smoke for her sign painting services."
          outcome="Grace agrees to paint a sign for Smoke."
          storyContribution="We further develop Smoke’s character as a hard-headed negotiator. Grace & Bo join the venture."
        />
        <H5>What Color Ya’ Got? Red.</H5>
        <P><A href="https://maps.app.goo.gl/Bna7tT3YnLRgLCjaA">Red’s</A> is actually the name of one of the final real juke joints that exist in Clarksdale. The other main one
          being <A href="https://maps.app.goo.gl/4gzx22dGSXdDcqZq6">Ground Zero Blues Club</A> (founded by Morgan Freeman in 2001).</P>
        <VideoPlayer
          className="mt-5"
          src="/images/film-analysis/films/sinners/clarksdale/reds-juke-joint.mp4"
          autoPlay
          loop
          muted
        />
        <p className="text-neutral-400 text-sm mt-2 mb-4">Red’s only takes cash. This weaves into Smoke later demanding that juke patrons pay with cash-only.</p>
        <P>This also foreshadows the supernatural mayhem that is soon to come.</P>

        <H4>Sammie and Stack Ride Along</H4>
        <SceneOverview
          className="my-4"
          startTimecode="19:42"
          turningPointTimecode={["20:32", "21:35"]}
          endTimecode="22:00"
          synopsis="Sammie and Stack ride in the car together. Stack gives Sammie some sex tips. Sammie learns that Smoke killed their father. Sammie plays his guitar for Stack, impressing him."
          objectives={[
            {
              character: SinnersCast.SammieMoore,
              explicit: "I want to figure out what happened to Smoke & Stack’s Dad. I want to play the guitar for Stack.",
              subtext: "I need to show Stack how good I am at guitar to impress him."
            },
            {
              character: SinnersCast.Stack,
              explicit: "I want to answer Sammie’s question in a polite way. I want to see if Sammie can really play.",
              subtext: "I want to protect Sammie from the harsh truth."
            },
          ]}
          conflict="Sammie wants to know what happened to Smoke & Stack’s Dad."
          tactics={[
            {
              character: SinnersCast.SammieMoore,
              tactic: "Politely asks and listens. Plays his heart out on the guitar to impress his brother."
            },
            {
              character: SinnersCast.Stack,
              tactic: "Casually breaks the bad news to Sammie of what happened to their father. Gets excited to see Sammie play so well."
            },
          ]}
          turningPoint="Sammie plays his guitar, showing off his voice for Stack."
          outcome="Stack realizes that Sammie has incredible talents that will make the juke money."
          storyContribution="We further develop Stack’s character as the more playful of the twins. The audience (and Stack) realize that Sammie is incredibly talented at singing."
        />
        <H5>Plant and Payoff</H5>
        <P>Ryan Coogler is also a master at planting ideas in minute 10, that later end up having major importance 1 hour later. A commanding grasp of the story to weave ideas “long range” across acts.</P>
        <P>Smokes sex ed lesson with Sammie at <FilmTimecode timecode="19:42" /> ends up tying back 40 minutes later at <FilmTimecode timecode="1:00:34" />, when Stack overhears Pearline moaning in the juke’s
          backroom <span className="text-neutral-500">(due to Sammie’s taking the lesson to heart)</span>.</P>


        <H4>Delta Slim’s Patch</H4>
        <SceneOverview
          className="my-4"
          startTimecode="22:28"
          turningPointTimecode={["22:50", "23:36", "24:26", "24:52", "25:21", "25:38"]}
          endTimecode="25:38"
          synopsis="Sammie and Smoke walk up to Delta Slim’s playing spot. They bribe him with beer to have him come play that night."
          objectives={[
            {
              character: SinnersCast.Stack,
              explicit: "Get Slim to join the juke staff as a musician.",
              subtext: "I need to show that I’m crafty and clever."
            },
            {
              character: SinnersCast.DeltaSlim,
              explicit: "I need to do the most stable thing so I’m not out of a job.",
              subtext: "I want to maintain that I’m the best blues player around."
            },
            {
              character: SinnersCast.SammieMoore,
              explicit: "I want to have Slim join us as a musician.",
              subtext: "I want a mentor."
            },
          ]}
          conflict="Stack wants Delta Slim to play at the juke, Slim doubts that Stack will pay him consistently."
          tactics={[
            {
              character: SinnersCast.Stack,
              tactic: "Bribes Slim with beer. It works."
            },
            {
              character: SinnersCast.DeltaSlim,
              tactic: "Pokes fun at Sammie. Is mesmerized by the ice cold irish beer. Takes it and joins."
            },
          ]}
          turningPoint="Delta Slim is bribed with an offering of beer and joins."
          outcome="Delta Slim joins the juke staff."
          storyContribution="We realize that Delta Slim is a comical character, who has been seduced by a bottle of beer. And probably has a drinking problem."
        />
        <H5>Ice Cold Beer vs Delta Slim</H5>
        <P>This is one of my favorite scenes in the movie. At <FilmTimecode timecode="24:52" /> you can <i>feel</i> how crisp and ice cold that beer is when Stack opens it and Slim reacts. It’s full of impactful
          turns of dialogue, punctuated by the score taking the wheel at <FilmTimecode timecode="25:18" /> with the orchestra crescendoing to the final dramatic beat.</P>

        <H5>Slim’s Importance in Cast Design</H5>
        <P>The order in which characters were recruited into the juke’s staff is important. The order is:</P>
        <OrderedList>
          <ListItem>Sammie <span className="text-neutral-500 text-sm">(core protagonist)</span></ListItem>
          <ListItem>Grace & Bo</ListItem>
          <ListItem>Delta Slim <span className="text-neutral-500 text-sm">(comedy character)</span></ListItem>
          <ListItem>Cornbread <span className="text-neutral-500 text-sm">(comedy character)</span></ListItem>
          <ListItem>Annie <span className="text-neutral-500 text-sm">(more serious maternal figure)</span></ListItem>
        </OrderedList>
        <P>Note how the comedy characters are saved for a bit later, once the crowd warms up and is more bought into the characters and its world.</P>
        <P>Delta Slim and Cornbread are the comedy characters of the cast and balance out the more serious nature of Smoke & Annie.</P>

        <H5>Messengers Pool Hall</H5>
        <P>Delta Slim mentions playing at a current location called “Messengers”. This is an <A href="https://maps.app.goo.gl/6jU8HWrAdeg4LK5R7">actual bar and pool hall</A> in Clarksdale.</P>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
          images={[
            "/film-analysis/films/sinners/clarksdale/messengers",
            "/film-analysis/films/sinners/clarksdale/ice-cold-beer-reds",
          ]}
          imageExts={["jpg", "jpg"]}
          captions={["Messenger’s Pool Hall.", "Ice Cold Beer at Red’s Juke Joint. Just how Delta Slim would like it."]}
          height={800}
          showArrows={true}
        />

        <H4>Mary Confronts Stack</H4>
        <SceneOverview
          className="my-4"
          startTimecode="27:22"
          turningPointTimecode={["27:54", "28:15"]}
          endTimecode="28:51"
          synopsis="Mary confronts Stack about his absence from her life. She tells him her mother has died."
          objectives={[
            {
              character: SinnersCast.Stack,
              explicit: "I need to deflect Mary’s questioning.",
              subtext: "I don’t want to reveal my true feelings for Mary. I still love her."
            },
            {
              character: SinnersCast.Mary,
              explicit: "I need to confront Stack about his love for me.",
              subtext: "I still love him and hate that he disappeared from my life."
            },
          ]}
          conflict="Mary confronts Stack about his absence from her life."
          tactics={[
            {
              character: SinnersCast.Stack,
              tactic: "Acts heavily avoidant towards Mary."
            },
            {
              character: SinnersCast.Mary,
              tactic: "Confronts Stack aggressively then insults him."
            },
          ]}
          turningPoint="Mary tells Stack that her mother has died. There is a moment of sympathy from Stack."
          outcome="Mary storms away, angry."
          storyContribution="Stack’s avoidant character is further developed. The conflict with Mary is introduced. Her mixed race is also mentioned."
        />
        <H5>Notes</H5>
        <TimecodeTable>
          <TimecodeTableRow
            timecode="27:18"
            content="2 Love Story subplots are introduced side-by-side, for audience comprehension & pace."
          />
          <TimecodeTableRow
            timecode="27:54"
            content={<P>Mary’s sass + the word <i>“cooze”</i> creates a fan favorite moment.</P>}
          />
          <TimecodeTableRow
            timecode="28:31"
            content={<P>Ryan Coogler writes in the ironic line <i>“Rot in hell, Stack,”</i> which he ends up doing at <FilmTimecode timecode="1:20:41" /> when Mary kills him.</P>}
          />
        </TimecodeTable>

        <H4>Slim’s Monologue</H4>
        <SceneOverview
          className="my-4"
          startTimecode="28:52"
          turningPointTimecode={["29:20", "30:08", "30:36", "31:06"]}
          endTimecode="32:07"
          synopsis={<p className="leading-5">The trio crosses a <A href="https://en.wikipedia.org/wiki/Chain_gang">chaingang</A>, before Delta Slim begins a heartfelt monologue about his friend Rice who was lynched.</p>}
          objectives={[
            {
              character: SinnersCast.DeltaSlim,
              explicit: "Tell them the story of my friend Rice.",
              subtext: "Be careful and protect Sammie from the harsh truth."
            },
          ]}
          conflict="∅"
          tactics={[
            {
              character: SinnersCast.DeltaSlim,
              tactic: "∅"
            }
          ]}
          turningPoint="During Delta Slim’s telling of the story, the mood turns from lighthearted to tragic."
          outcome="Sammie is shaken by the story."
          storyContribution="An accurate and moving portraiture of black suffering in the American South is conveyed."
        />
        <H5>Crowd Reaction</H5>
        <P>This scene was almost cut from the movie due to it’s length and biting racial commentary, but it’s important that it stayed in. It was one of the most moving scenes for some.</P>
        <P>The reaction to this scene in Clarksdale, versus San Francisco, versus Oakland was very different. In Clarksdale the crowd would loudly laugh then fell dead quiet in silent recognition. In Oakland a few laughs then silence.
          In San Francisco mostly silent throughout. Each silence had a different quality to it, as I glanced around.</P>
        <P>On my first few viewings I couldn’t discern the words through the strong southern accents, but later pieced the commentary together.</P>

        <H5>Racial Trauma in the South</H5>
        <P>My visit to Clarksdale was one of the first times that I truly got an understanding of black culture, in a visceral way. When I arrived at my Airbnb at 1am (Thursday, May 29th), these paintings looked back at me in the dark:</P>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
          images={[
            "/film-analysis/films/sinners/clarksdale/paintings-1",
            "/film-analysis/films/sinners/clarksdale/paintings-2",
            "/film-analysis/films/sinners/clarksdale/paintings-3",
            "/film-analysis/films/sinners/clarksdale/paintings-4",
            "/film-analysis/films/sinners/clarksdale/paintings-5",
          ]}
          imageExts={["jpg", "jpg", "jpg", "jpg", "jpg"]}
          captions={[
            "Painting by my bedside, it felt like the eyes were staring at me as I went to bed.",
            "A large oak tree, a graveyard, the farmland.",
            "A musician looks out onto the cotton fields at sunset.",
            "A small fading light in the middle, surrounded by pitch-black darkness, surrounded by a large halo of light.",
            "Front entrance.",
          ]}
          height={500}
          showArrows
          squareCrop
        />
        <P>I got a sense for the silent suffering that had taken place in the land I was in. Late into the night I began doing research into the various laws and regulations that robbed black southerners of their land and
          freedom.</P>
        <UnorderedList>
          <ListItem>Heirs’ Property & Partition-By-Sale Laws</ListItem>
          <ListItem>Tax Lien and Debt Foreclosure Laws</ListItem>
          <ListItem>Redlining & Denial of Credit</ListItem>
          <ListItem>Employment Restrictions & Fines</ListItem>
        </UnorderedList>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
          images={[
            "/film-analysis/films/sinners/clarksdale/parchman-farm-chain-gang",
            "/film-analysis/films/sinners/clarksdale/laura-nelson-and-son-lynching",
            "/film-analysis/films/sinners/clarksdale/rocky-ford-lynching",
          ]}
          imageExts={["jpg", "jpg", "jpg"]}
          captions={[
            "Parchman Farm chain gang, 1911",
            "Laura Nelson and Son Lynching, 1911",
            "Rocky Ford Lynching, 1925",
          ]}
          height={500}
          showArrows
          squareCrop
        />
        <P>When Ryan Coogler says <i>“They was f***ed essentially the moment they bought the mill.”</i>, he was talking about this inescapable oppression spanning almost 3 centuries.</P>
        <P>And you can’t make a movie that takes these things head-on (people don’t want a grim history lesson, they want entertainment). You bury these ideas deep into the symbols and structure of the plot.</P>

        <H5>Delroy Lindo’s Improv</H5>
        <P>Delta Slim breaking into song at <FilmTimecode timecode="31:41" /> was actually improvised in the moment. From <A href="https://dangerbowie.com/2025/04/22/8-sinners-film-fun-facts">a post</A> by Desiree Bowie:</P>
        <Quote>
          As the weight of the memory overtakes him, Delta begins to hum a slow, aching and raw tune.
          In that moment, grief becomes melody, and the blues is born, right before our eyes.
        </Quote>

        <H4>Recruiting Cornbread</H4>
        <SceneOverview
          className="my-4"
          startTimecode="32:08"
          turningPointTimecode={["32:50", "33:05", "33:16"]}
          endTimecode="33:26"
          synopsis="Stack pulls up to Cornbread picking cotton in the field. He recruits Cornbread to join."
          objectives={[
            {
              character: SinnersCast.Cornbread,
              explicit: "I need to deflect Stack’s plans and focus on meeting my quota.",
              subtext: "∅"
            },
            {
              character: SinnersCast.Stack,
              explicit: "I need to recruit Cornbread to join the juke.",
              subtext: "I am crafty and charming."
            },
          ]}
          conflict="Stack wants Cornbread to work for the juke that night, Cornbread wants to continue working on meeting his quota for the day."
          tactics={[
            {
              character: SinnersCast.Cornbread,
              tactic: "Deflecting Stack’s proposal. Prepares to fight Stack for insulting his wife."
            },
            {
              character: SinnersCast.Stack,
              tactic: "Disrespects Cornbread then bribes him into working for him."
            }
          ]}
          turningPoint="Stack offers Cornbread money to work for him."
          outcome="Cornbread joins the crew."
          storyContribution="This is the first scene where Stack uses money to coerce others to do his bidding. Cornbread is introduced as a comical character who is commanded by his wife."
        />
        <P><FilmTimecode timecode="32:14" /> features the second shot in the film of bare feet, to emphasize the poverty at the time.</P>
        <H5>“Well, F**k Yo Wife Too”</H5>
        <P>This was the most disrespectful moment of the film, and yielded the 4th largest laugh at <FilmTimecode timecode="33:16" /> from the audience (with Delta Slim’s <i>“I think I just s**t
          myself”</i> at <FilmTimecode timecode="1:27:56" /> later taking #1).</P>

        <H5>Transition From Slim’s Humming</H5>
        <P>Initially the transition from Delta Slim’s hum to the shot of the field played Slim’s groaning <i>“Ahh!”</i> as the field was visible (opening weekend). I believe they rearranged the shot to stay on Slim
          a little longer so the <i>“Ahh!”</i> could finish, before cutting to the shot of the field. I was initially thinking it was a bit weird he was making that noise while I was looking at a field.
        </P>

        <H4>Outside Annie’s Shack</H4>
        <SceneOverview
          className="my-4"
          startTimecode="33:26"
          turningPointTimecode={["34:17", "35:25"]}
          endTimecode="35:46"
          synopsis="Smoke visits Annie’s shack. He leaves flowers at his passed son’s grave. Annie walks out and they exchange words."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "I want Annie to cook for the juke.",
              subtext: "I miss my son and I miss Annie."
            },
            {
              character: SinnersCast.Annie,
              explicit: "I want to figure out why Smoke is here.",
              subtext: "I miss Smoke and am angry he went away at an important time."
            },
          ]}
          conflict="Smoke left Annie and their son died."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Avoidant towards Annie. Gently addresses why he has returned."
            },
            {
              character: SinnersCast.Annie,
              tactic: "Prods Smoke about why he is back."
            }
          ]}
          turningPoint="Annie doesn’t believe that Smoke bought the mill with clean money."
          outcome="Smoke walks to meet Annie in her shack."
          storyContribution="It is revealed to us that Smoke’s son has passed away. We see the first sentimental moment from Smoke. Annie hints that the twins have earned their money through illicit means. This sets up a central theme of the film: fatherhood."
        />

        <H4>Inside Annie’s Shack</H4>
        <SceneOverview
          className="my-4"
          startTimecode="35:46"
          turningPointTimecode={["36:12", "36:58", "37:05", "37:21", "37:40", "39:30", "39:57", "40:34"]}
          endTimecode="40:52"
          synopsis="Smoke and Annie talk in the shack. Smoke comments on Annie’s hoodoo practices. Annie blesses Smoke’s amulet. They make love."
          objectives={[
            {
              character: SinnersCast.Annie,
              explicit: "I want to figure out why Smoke is here.",
              subtext: "I miss Smoke."
            },
            {
              character: SinnersCast.Smoke,
              explicit: "I want Annie to cook for the juke.",
              subtext: "I miss Annie."
            },
          ]}
          conflict="Smoke wants Annie to cook for the juke. Annie is angry Smoke has returned after abandoning the family."
          tactics={[
            {
              character: SinnersCast.Annie,
              tactic: "Is cold towards Smoke. Blesses Smoke’s amulet, embraces him."
            },
            {
              character: SinnersCast.Smoke,
              tactic: "Disparages Annie’s hoodoo practices, eventually tells her he loves her. Makes love to her."
            }
          ]}
          turningPoint="There are many turning points, the most dramatic being the scene ending in sex."
          outcome="Annie joins the juke staff as a cook."
          storyContribution="Annie’s practice of hoodoo is revealed, as well as it potentially having protected Smoke. We further reinforce the fact that Smoke’s money may be “curse money” illicitly gained. Smokes love of power & money is emphasized."
        />
        <H5>Hoodoo</H5>
        <P>In this scene Smoke mocks Annie’s interest in hoodoo, but later her amulet will save his life in the Act IV battle with Stack (at <FilmTimecode timecode="1:52:36" />).</P>
        <P>This will tie into a larger thematic point of Protestant Christianity being forced upon slaves, various religions being their original practice, which pops up in his <A href="https://youtu.be/0mU_2VWpsmQ?si=akQHPTINgQK4M3CC&t=534">Hanna Flint interview</A>.</P>

        <H5>Mickey Mousing</H5>
        <P>Great films have the visuals <i>married</i> to the score. They ebb and flow, trading control of narrative drive. A more minor interplay happens at <FilmTimecode timecode="38:28" />, when the plucking of the guitar perfectly matches
          the 3 strikes of Annie’s matches. This is a scoring technique called <A href="https://en.wikipedia.org/wiki/Mickey_Mousing"><i>Mickey Mousing</i></A>.</P>
        <P>It is used later in 2 places:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:13:36" content={<p className="text-left">Mary stomps back into the juke after becoming a vampire. <span className="text-neutral-500 text-sm">(the drum matching her footsteps)</span></p>} />
          <TimecodeTableRow timecode="1:24:20" content={<p className="text-left">Cornbread walks back to the juke (secretly a vampire) and cricks his neck before speaking. <span className="text-neutral-500 text-sm">(the cello finishing it’s note right as he does it)</span></p>} />
        </TimecodeTable>

        <H5>Sex Scenes</H5>
        <P>There are 3 sex scenes in the film:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="39:52" content={<p className="text-left">Smoke & Annie’s <span className="text-neutral-500 text-sm">(more explicit)</span></p>} />
          <TimecodeTableRow timecode="59:38" content={<p className="text-left">Sammie & Pearline’s <span className="text-neutral-500 text-sm">(most graphic)</span></p>} />
          <TimecodeTableRow timecode="1:18:26" content={<p className="text-left">Stack & Mary’s <span className="text-neutral-500 text-sm">(more at a distance)</span></p>} />
        </TimecodeTable>
        <P>Beyond being thematically appropriate for a movie called “Sinners,” these scenes acutally serve a functional purpose to increase the emotional range the audience experiences.</P>
        <P>Experiencing discomfort, while still being drawn in. The more emotions (rooted in truth, not fabricated), with proper pace, the higher their highs and lower the lows, the better the film.</P>

        <H4>Remmick Visits Joan & Bert</H4>
        <Image
          path="/film-analysis/films/sinners/stills/joan-and-berts-shack"
          ext="jpg"
          alt="Opening scene in Sinners, Sammie Moore entering his father's church, in tatters and distraught, clutching the neck of his shattered guitar."
          width="100%"
          optimize={false}
          inspectable
          style={{ marginTop: "12px", marginBottom: "12px" }}
        />
        <SceneOverview
          className="my-4"
          startTimecode="41:37"
          turningPointTimecode={["41:50", "42:07", "42:23"]}
          endTimecode="42:36"
          synopsis="Remmick crash lands on Joan & Bert’s porch in a state of injury and confusion. He offers them gold to shelter him."
          objectives={[
            {
              character: SinnersCast.Remmick,
              explicit: "I need to get shelter from the Indians that are after me.",
              subtext: "I want to get inside their house so I can kill them."
            },
            {
              character: SinnersCast.Bert,
              explicit: "I need to figure out who this guy is.",
              subtext: "∅"
            },
            {
              character: SinnersCast.Joan,
              explicit: "I need to figure out who this guy is.",
              subtext: "∅"
            },
          ]}
          conflict="Remmick wants to get inside Joan and Bert’s house to hide from Indians that are apparently after him. Joan and Bert are skeptical."
          tactics={[
            {
              character: SinnersCast.Remmick,
              tactic: "Feign confusion and helplessness. Begs, pleads, and offers them gold."
            },
            {
              character: SinnersCast.Bert,
              tactic: "Skeptical then sympathetic."
            },
            {
              character: SinnersCast.Joan,
              tactic: "Skeptical then sympathetic."
            },
          ]}
          turningPoint="Remmick offers the couple gold and they let him in."
          outcome="Remmick is let in the house."
          storyContribution={<p className="leading-5">A main antagonist Remmick is introduced. He bribes Joan and Bert for shelter <span className="text-neutral-500">(this will later lead to their demise)</span>. Remmick’s capacity for charm and deceit is portrayed.</p>}
        />
        <H5>An Irish Vampire</H5>
        <P>Instead of writing a cinema cliché and making the primary antoganist White American, Ryan Coogler chooses an Irish vampire. The Irish being a group that were also persecuted by the KKK for their Catholicism, alongside blacks.</P>
        <P>This is a strong moment of visual storytelling, because Remmick lands like a steaming spaceship from another planet <span className="text-neutral-500">(having been burned by the sun because vampires can’t tolerate sunlight)</span>.</P>
        <P>Ryan Coogler in <A href="https://youtu.be/yP-4Yhn8I_g?si=Rx2wi-lFQj8UATyR&t=1148">an interview with IndieWire</A> comments:</P>
        <Quote>
          <b>It was very important that our master vampire in this movie was unique.</b> ... It was important to me that he was old. But also that he came from a time that pre-existed these racial definitions that existed in these place
          that he showed up in. So that <b>he would be extremely odd. <i>And it would all seem odd to him.</i></b> But also that he would see it for what it was. And offer a sweet deal. ... And that the music was just as beautiful.
        </Quote>
        <P>The score turns curious and we hear an inflection at <FilmTimecode timecode="41:42" />, almost to question alongside us <i>“...Who is that?”</i>.</P>
        <Aside>Ryan Coogler comments on <A href="https://youtu.be/Pjb_eH0C_vQ?si=McG6qkT0sBqMRRz5&t=729">why he used vampires</A> as a narrative device.</Aside>

        <H5>“Injuns”</H5>
        <P>Bert says <i>“Ain’t no Injuns around here for miles,”</i> after 20 times watching the film I always thought this line was “engines” (as in, there are no cars closeby). I now only realize this after watching with captions.</P>
        <P>According to ChatGPT:</P>
        <Quote>
          The word ”Injuns” is a derogatory, phonetic mispronunciation of "Indians" (referring to Native Americans) and was commonly used in 19th- and early 20th-century American literature and speech, especially in Westerns and frontier stories. It was:
          Frequently used by white American characters, especially cowboys, settlers, or soldiers, to refer dismissively to Native Americans.
        </Quote>

        <H4>The Choctaw Visit</H4>
        <SceneOverview
          className="my-4"
          startTimecode="42:37"
          turningPointTimecode={["42:55", "43:23"]}
          endTimecode="43:55"
          synopsis=""
          objectives={[
            {
              character: SinnersCast.Chayton,
              explicit: "I need to warn them of what they’re dealing with.",
              subtext: "I need to protect my people."
            },
            {
              character: SinnersCast.Joan,
              explicit: "I need to figure out who this guy is.",
              subtext: "I need to protect Bert."
            },
          ]}
          conflict="Chayton wants to warn Joan she is dealing with evil, but she doesn’t believe him."
          tactics={[
            {
              character: SinnersCast.Chayton,
              tactic: "Warns Joan then leaves"
            },
            {
              character: SinnersCast.Joan,
              tactic: "Holds Chayton at gunpoint and ignores him."
            }
          ]}
          turningPoint="Chayton decides to leave because the sun is going down."
          outcome="Chayton leaves."
          storyContribution="We get an uneasy feeling that the story is going to take a turn for the worst."
        />
        <H5>The Title “Sinners”</H5>
        <P>I’ve wondered whether the film is named “Sinners” because the sin goes beyond the individual characters’ actions (like greed, lust, etc), but actually expands to cover the dark past of America itself.</P>
        <P>The displacement of Native Indians from their land, African-American slavery, etc. Chayton (the Choctaw man) was foreshadowing the danger they were in.</P>
        <Aside><span className="text-neutral-500">Ryan Coogler comments on the title <A href="https://youtu.be/3zfqPIZrzU4?si=FkgFS47fI_ffgNiY&t=463">here</A>.</span></Aside>

        <H4>Joan Discovers Bert</H4>
        <P>We get a dark hallway scene (Ryan Coogler has said <i>“I love dark hallway [scenes]”</i>), then discover that Remmick has killed Bert. This ends Act I.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>Act II: Juke Joint Grand Opening</H3>
        <P>The juke joint has its grand opening. Things take a supernatural turn and Stack dies at the end of the act. Key turning points are as follows:</P>
      </div>
      <PlotTimeline
        className="mt-6 mb-1 left-column——avoid"
        startMinute={45}
        endMinute={79}
        rows={[
          {
            label: "Grand Opening",
            subLabel: "Act II",
            items: [
              { atMinute: 45, label: "Pearline Arrives." },
              { atMinute: 46, label: "Mary Arrives.", bump: true },
              { atMinute: 50, label: "Stack Confronts Mary.", doublebump: true },
              { atMinute: 55, label: "Sammie Plays" },
              { atMinute: 61, label: "Remmick Appears" },
              { atMinute: 73, label: "Mary Turns", doublebump: true },
              { atMinute: 75, label: "Cornbread Turns", bump: true },
              { atMinute: 79, label: "Mary Kills Stack" },
            ],
          }
        ]}
      />
      <div className="px-4 sm:px-2 sm:pr-12">
        <H4>Electrical Pole Bit</H4>
        <P>We have a small scene where a patron is helping set up the electricity for the juke joint and triggers an electrical spark. Although a funny bit, this scene serves a functional purpose, to lighten up the mood after the
          dramatic close of Act I. We are now ahead of the protagonists and take humor that they have no idea what’s coming for them.</P>

        <H4>Character & World-Building</H4>
        <P>Bringing the audience into a new environment, we want to show them around to orient them. So Ryan Coogler & Michael P. Shawver <span className="text-neutral-500">(Coogler’s longtime editor)</span> take us around the juke
          club.</P>
        <P>From <FilmTimecode timecode="45:07" /> to <FilmTimecode timecode="50:03" /> we cut between 4 layers of activity:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="45:22" content={<P><b>Dance Floor:</b> Delta Slim plays for the people dancing.</P>} />
          <TimecodeTableRow timecode="45:28" content={<P><b>Kitchen & Bar:</b> The juke joint kitchen and bar.</P>} />
          <TimecodeTableRow timecode="45:58" content={<P><b>Front Door:</b> Pearline <FilmTimecode timecode="45:58" /> and Mary <FilmTimecode timecode="46:34" /> enter.</P>} />
          <TimecodeTableRow timecode="46:06" content={<P><b>Back Room:</b> The back room <span className="text-neutral-500 text-sm">(where Stack is eventually killed by Mary)</span>.</P>} />
        </TimecodeTable>
        <P>More character development moments:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="46:08" content="We observe Smoke’s exacting nature around finances." />
          <TimecodeTableRow timecode="47:09" content="Sammie growing in confidence and hitting on Pearline." />
        </TimecodeTable>
        <P>And other moments:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="47:35" content={<P>A moment of irony as Cornbread beats up a juke-goer for $2 after letting Mary in for free.</P>} />
          <TimecodeTableRow timecode="47:40" content={
            <div>
              <P>Match cut on the idea of prostitution, cutting from the backroom conversation on “sellin a**” to Pearline asking <i>“You gon’ pay?”</i> to Sammie.</P>
              <P>Sammie replies <i>“You gon’ sing?”</i> and Pearline replies <i>“We’ll see where the night takes us.”</i></P>
              <P>More planting of irony in Coogler’s writing, as Pearline ends up “singing” while Sammie performs oral sex later.</P>
            </div>
          } />
        </TimecodeTable>

        <H4>Mary & Sammie Have a Drink</H4>
        <SceneOverview
          className="my-4"
          startTimecode="49:00"
          turningPointTimecode={["49:20", "49:42"]}
          endTimecode="50:35"
          synopsis="Mary and Sammie sit down at the bar to catch up. Mary tells Sammie about her past with the twins. Smoke comes out of the back room and dismisses the conversation."
          objectives={[
            {
              character: SinnersCast.Mary,
              explicit: "I want to catch up with Sammie.",
              subtext: "I want to get closer to making Stack care about me."
            },
            {
              character: SinnersCast.SammieMoore,
              explicit: "I want to figure out who this person is.",
              subtext: "∅"
            },
            {
              character: SinnersCast.Smoke,
              explicit: "I want to stop this conversation.",
              subtext: "I want to protect my brother and patrons from race troubles breaking out."
            },
          ]}
          conflict="Mary feels resentment towards the twins for abandoning her. Smoke wants her out of the juke joint."
          tactics={[
            {
              character: SinnersCast.Mary,
              tactic: "Addresses Smoke with resentment."
            },
            {
              character: SinnersCast.SammieMoore,
              tactic: "Quietly listens."
            },
            {
              character: SinnersCast.Smoke,
              tactic: "Dismisses Sammie to end the conversation."
            },
          ]}
          turningPoint="Smoke comes out of the back room to confront Mary."
          outcome="Mary is more frustrated with the twins."
          storyContribution="We learn more about Mary’s race and backstory. We also further develop Smoke’s character as emotionally hardened and unfeeling."
        />
        <H5>Seamless Perspective Change</H5>
        <P>At <FilmTimecode timecode="49:42" /> Smoke comes out of the back room and the camera angle switches to assume his POV (blurring Mary in the foreground for continuity). This is called <A href="https://en.wikipedia.org/wiki/Point-of-view_shot"><i>subjective POV</i></A>.</P>
        <P>The closer you align with a character’s line of vision, the more the watcher persoanlly identifies with that character’s perspective. Here we fully assume Sammie’s eyesight for this transition.</P>

        <H4>Mary Confronts Stack</H4>
        <SceneOverview
          className="my-4"
          startTimecode="50:35"
          turningPointTimecode={["50:55", "51:46", "52:01"]}
          endTimecode="52:48"
          synopsis="Mary confronts Stack about his love for her. Stack admits to it."
          objectives={[
            {
              character: SinnersCast.Mary,
              explicit: "Stay in the juke joint to keep getting at the twins.",
              subtext: "I want him to confess he still loves me."
            },
            {
              character: SinnersCast.Stack,
              explicit: "Get Mary out of the juke joint.",
              subtext: "I still love her."
            },
          ]}
          conflict="Mary wants answers from Stack about whether he still cares for her."
          tactics={[
            {
              character: SinnersCast.Mary,
              tactic: "Directly confronts Stack about his love for her."
            },
            {
              character: SinnersCast.Stack,
              tactic: "Stack at first dances around the topic, eventually admits he cares."
            },
          ]}
          turningPoint="Stack admits that he still loves Mary, but couldn’t be with her."
          outcome="Mary tears up and walks away. "
          storyContribution="We learn that Stack could never be with Mary due to the race-related danger it would pose to her."
        />
        <H5>Talking Guitars</H5>
        <P>If you listen closely you will hear the score decorate the dialogue at emotional moments to accentuate them, almost like a conversation of guitars:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="51:31" content={<P>Stack: <i>“...put they hands on you”</i></P>} />
          <TimecodeTableRow timecode="51:36" content={<P>Mary: <i>“...so you’ll kill for me?”</i> (the word “kill” deserves a low, eerie note)</P>} />
          <TimecodeTableRow timecode="51:41" content={<P>Mary: <i>“But you still won’t tell me the truth.”</i></P>} />
          <TimecodeTableRow timecode="51:46" content={<P>A guitar plucks a bit before Mary’s haunted <i>“I waited...I waited a long time.”</i></P>} />
          <TimecodeTableRow timecode="52:02" content={<P>Smoke: <i>“Say what? ... hm?”</i> (the guitar begins picking up before Stack’s admitting he still loves her)</P>} />
          <TimecodeTableRow timecode="52:18" content="Captures Mary’s silent reaction, the guitar does the talking." />
        </TimecodeTable>


        <H4>Sammie Prepares to Play</H4>
        <P>At <FilmTimecode timecode="53:10" /> we transition to the scene before Sammie plays. We establish the standing position of 5 characters:</P>
        <UnorderedList>
          <ListItem><b>Sammie & Pearline:</b> By the bar. <span className="text-neutral-500">(they’re consistently framed in shots together to build the association)</span></ListItem>
          <ListItem><b>Stack:</b> Against a wooden beam near them. <span className="text-neutral-500">(a bit to their left)</span></ListItem>
          <ListItem><b>Smoke:</b> Further along, stage-right, in the crowd.</ListItem>
          <ListItem><b>Mary:</b> Center audience.</ListItem>
        </UnorderedList>
        <P>During Sammie’s performance there is a reaction “triangle” formed at <FilmTimecode timecode="55:25" /> between Stack poking fun at Smoke & Sammie playing.</P>

        <H4>Surreal Montage</H4>
        <Image
          path="/film-analysis/films/sinners/stills/surreal-montage-climax"
          ext="jpg"
          alt="Opening scene in Sinners, Sammie Moore entering his father's church, in tatters and distraught, clutching the neck of his shattered guitar."
          height="100"
          optimize={false}
          inspectable
          style={{ paddingTop: "4px", paddingBottom: "16px" }}
        />
        <H5>Delta Slim’s Preface</H5>
        <P>Before Sammie conjurs the spirits of the past & future in the montage scene, Delta Slim says:</P>
        <Quote>
          Blues wasn’t forced on us like that religion. Nah son, we brought this with us from home.
          It’s magic what we do. It’s sacred...and big.
        </Quote>
        <P>The religion Slim is referencing is Protestant Christianity. Quoting from ChatGPT <span className="text-neutral-500 text-sm">(this is a deep topic I’m not qualified to be an authority on)</span>:</P>
        <Quote>
          In the American South, enslaved Africans were forced to adopt Protestant Christianity, often under a version tailored to enforce obedience and submission. Yet behind closed
          doors, many blended this imposed faith with their own African spiritual traditions, giving rise to a powerful, hidden theology rooted in resistance, hope, and cultural survival.
        </Quote>
        <H5>Montage</H5>
        <P>This scene needs no words or explanation. I’ve wondered to myself if Ryan Coogler’s background in football gave him an advantage in creating “play-by-play” schematics for this scene. I believe he said it took them
          3 months to plan it.
        </P>
        <P>My favorite portion is the drummer speaking <A href="https://en.wikipedia.org/wiki/Mandinka_people">Mandinka</A> at <FilmTimecode timecode="56:57" />, then floating over to the group twerking at the bar
          as the bass kicks in <FilmTimecode timecode="57:04" />. In Clarksdale during one screening half a row in front of me got up and danced to it.</P>
        <P>Also a huge fan of Grace’s little walk at <FilmTimecode timecode="57:11" />. And Bo leaving his card game at <FilmTimecode timecode="57:22" />.</P>
        <P>Then <FilmTimecode timecode="58:12" /> is an epic cinematic moment. The sound editors take watchers to another world. This is the very climax of the whole movie, then it’s downhill from here.</P>
        <P><FilmTimecode timecode="58:31" /> is an earpiercing note that was never pleaseant to listen too. I wonder if they kept that in to create a sense of separation from the following scene.</P>

        <H4>Dramatic Pressure</H4>
        <P>As we move towards the Act II climax, Ryan Coogler constantly builds dramatic tension then releases it, keeping us on the edge of our seats <span className="text-neutral-500 text-sm">(and humored)</span>. Paces builds and builds:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="59:38" content={<P><b>Remmick Eyeing the Juke Club → <span className="text-neutral-500 text-xs">[CUT TO]</span>  Sammie & Pearline Kissing In the Back Room</b></P>} />
          <TimecodeTableRow timecode="1:03:06" content={<P><b>Remmick Draws His... → Banjo Up To Play</b></P>} />
          <TimecodeTableRow timecode="1:12:58" content={<P><b>Remmick Gets Up To Attack Mary → <span className="text-neutral-500 text-xs">[CUT TO]</span> Pearline Wailing In Song</b></P>} />
          <TimecodeTableRow timecode="1:15:11" content={<P><b>Loud Juke Club Interior → <span className="text-neutral-500 text-xs">[CUT TO]</span> Pitch Black Darkness As Cornbread Runs To Pee</b></P>} />
          <TimecodeTableRow timecode="1:15:47" content={<P><b>Cornbread Before Getting Attacked → <span className="text-neutral-500 text-xs">[CUT TO]</span> Smoke Pushing Through Curtains</b></P>} />
        </TimecodeTable>
        <P>Some of these transitions seem like they could have been conceived in post-production, rather than being baked in the screenplay.</P>

        <H4>Sammie Eating Out Pearline</H4>
        <P>This scene made people uncomfortable, but the key is you always want to balance it out with some other emotion rather quickly.</P>
        <P>We bring in humor at <FilmTimecode timecode="1:00:48" /> when Stack overhears the couple and smirks. This received the 3rd largest laugh of the movie (behind Slim’s <i>“I think I just shat
          myself”</i> at <FilmTimecode timecode="1:27:57" /> and <i>“Well fuck ya wife too”</i> from Stack to Cornbread at <FilmTimecode timecode="32:50" />).</P>

        <H4>Remmick Walks Up</H4>
        <SceneOverview
          className="my-4"
          startTimecode="1:01:04"
          turningPointTimecode={["1:01:11", "1:02:33", "1:03:06", "1:04:24"]}
          endTimecode="1:04:51"
          synopsis="Remmick walks up to the juke front door with Bert and Joan. He tries to get into the juke joint, especially to get at Sammie. Smoke turns them away."
          objectives={[
            {
              character: SinnersCast.Remmick,
              explicit: "I want to get into the juke joint to kill all of them.",
              subtext: "I want Sammie for his culture and soul."
            },
            {
              character: SinnersCast.Smoke,
              explicit: "I want them to go away.",
              subtext: "I need to protect my patrons."
            },
          ]}
          conflict="Remmick wants to get into the juke joint, Smoke wants them to go away."
          tactics={[
            {
              character: SinnersCast.Remmick,
              tactic: "Walks up and casually chats with them. Plays a song, obliges and walks away."
            },
            {
              character: SinnersCast.Smoke,
              tactic: "Unamused, turns them away."
            },
          ]}
          turningPoint="The vampires break out into song. Smoke eventually dismisses them."
          outcome="The Remmick, Bert, and Joan leave."
          storyContribution="The vampire’s desire to enter the juke is made explicit. Thematic contribution explained below."
        />
        <H5>What Remmick Really Wants</H5>
        <P>On the surface an innocent moment of humor and light song, this scene has enormous contribution to the film’s intended meaning.</P>
        <P>We notice that at <FilmTimecode timecode="1:02:29" /> Remmick is enamored with Sammie’s voice when he emerges from the group, and singles him out saying <i>“Oh. And you...must be that voice I heard from out here. It was beautiful.”</i></P>
        <P>The irony is that Smoke asks Remmick at <FilmTimecode timecode="1:02:51" /> <i>“Yall’ Klan?”</i>, thinking Remmick wants to hurt them for their race. But the reality is that he wants Sammie’s music.</P>
        <P>Sammie is a metaphor for culture (specifically black culture, the blues, in this case), and Remmick, a vampire, wants to suck it out of him.</P>
        <P>Ryan Coogler comments on the metaphor of vampirism and ownership <A href="https://youtu.be/0mU_2VWpsmQ?si=jk9dB0udoV0kxu72&t=970">here</A>:</P>
        <Quote>
          <b>The more I learned about the blues, the more I found songs that nobody knows who wrote them.</b> I would say alright, Howlin’ Wolf is the first song where the concept Smokestack Lightning was uttered.
          And then I go find a song that was recorded 20 years earlier, where somebody says “Smokestack Lightning”. It’s called “Dark Road Blues”, I think the artist’s name is Willie Lofton. ... I was like
          “Oh he got it from this person. Oh, where did he get it from?” <b>At this time there was no ownership. We were a people who came from a place where that’s not how s**t worked. Music was not to be bought
            and sold, it was a way of life.</b> ... Comin’ from where I’m from, <b>the moment s**t becomes a business, somebody’s getting f***ed.</b>
        </Quote>

        <P>2 more important moments where Remmick doubles-down on what he really wants:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="59:38" content={<Quote>
            Sammie! You the one I came for. I sensed you. I wanna see my people again. I’m trapped here. But your gifts can bring ’em to me.”
            Y’all give him to me now. Just give me little Sammie...we’ll let y’all live.
          </Quote>} />
          <TimecodeTableRow timecode="1:51:06" content={<Quote>I want your stories. And I want your songs. And you gon’ have mine.</Quote>} />
        </TimecodeTable>
        <P>Note how gradually Ryan Coogler writes in this revelation, not rushing to get to the thematic point. Letting the full story mature before fully unraveling it.</P>

        <H5>Pick Poor Robin Clean</H5>
        <P>There are 3 layers of meaning to unpack with this song:</P>
        <H6>Racism & Exploitation</H6>
        <P>The phrase <i>“pick poor Robin clean”</i> refers to taking everything from someone—robbing them of all they have, like plucking a bird of all its feathers. Exploit someone until they have nothing left.</P>
        <H6>Ownership & Authorship</H6>
        <P>The original author of “Pick Poor Robin Clean” <i>is not known</i>. The earliest <i>recordings</i> are known, one by Geeshie Wiley in 1930  <ScoreTimecode link="https://open.spotify.com/track/0Utsr56pOqhWnuHFi00CcG?si=9071364e79474c14" label="Pick Poor Robin Clean (Geeshie Wiley, 1930)" /> and
          another by Luke Jordan in 1927 <ScoreTimecode link="https://open.spotify.com/track/4ohioAEDyvR2nh2QVB5Bg7" label="Pick Poor Robin Clean (Luke Jordan, 1927)" />. Before being recorded, it was likely a traditional or folk blues song passed orally
          through Black communities in the South.</P>
        <H6>Juxtaposition With Family</H6>
        <P>The original recorded version by Geeshie Wiley has the lyrics <span className="text-neutral-500 text-sm">(which were truncated out)</span>:</P>
        <div className="mb-2">
          <div className="pl-4 border-l border-neutral-300">
            <p className="text-sm italic"><b>Get off my money, and don't get funny</b></p>
            <p className="text-sm italic">'Cause I'm a n****r, don't cut no figure</p>
            <p className="text-sm italic">Then old Miss Sadie, she is my baby</p>
            <p className="text-sm italic"><b>And I'm a hustling coon, that's just what I am</b></p>
          </div>
        </div>
        <P><span className="text-neutral-500 text-sm">(before the eventual line)</span></P>
        <div className="mb-2">
          <div className="pl-4 border-l border-neutral-300">
            <p className="text-sm italic">And I'll be satisfied having a family.</p>
          </div>
        </div>
        <P>This final line sounds sincere, but in the context of the broader song, it’s irony. It reveals how people can cloak selfishness in the language of love and loyalty while quietly taking everything from someone else. It’s cultural criticism.</P>

        <H5><i>“How’d She Get In”?</i></H5>
        <P>Mary is more than a token mixed-race character, she is an intentionally placed metaphor to add narrative drive about race tensions in the Deep South. At <FilmTimecode timecode="1:04:10" /> Remmick asks <i>“How’d she get in?”</i>, pointing to her.</P>
        <P>Annie holds her hand up and says <i>“She here, cus’ she family.”</i> Which Mary will later parrot as a vampire back at her at <FilmTimecode timecode="1:42:43" />. This, is excellent writing.</P>

        <H5>The Group Debriefs</H5>
        <P>Coogler writes in more irony at <FilmTimecode timecode="1:04:55" /> when Smoke asks <i>“You think they brought company?”</i> and Stack says <i>“I doubt it.”</i>. At <FilmTimecode timecode="1:05:05" /> Mary adds <i>“Y’all don’t need the trunk. There was
          just three of ’em.”</i></P>
        <P>Well, there will actually be dozens of them by the end of the night <FilmTimecode timecode="1:45:37" />.</P>

        <H4>Private Chats Upstairs</H4>
        <SceneOverview
          className="my-4"
          startTimecode="1:05:43"
          turningPointTimecode={["1:07:49", "1:08:15", "1:08:52"]}
          endTimecode="1:09:11"
          synopsis="Smoke/Sammie & Stack/Mary talk privately upstairs. Sammie tells Smoke of his desire to go to Chicago. Stack tells Mary the juke is financially unsustainable."
          objectives={[
            {
              character: SinnersCast.Smoke,
              explicit: "I need to convince Sammie to leave this lifestyle and go to Mound Bayou.",
              subtext: "I want to clean myself of this lifestyle I’m trapped in."
            },
            {
              character: SinnersCast.SammieMoore,
              explicit: "I want to mention to Smoke that I’m going to Chicago to pursue music.",
              subtext: "I want to make my brother proud."
            },
          ]}
          conflict="Sammie wants to go to Chicago to play music, Smoke wants him to go to Mound Bayou, live a clean life, and play church music."
          tactics={[
            {
              character: SinnersCast.Smoke,
              tactic: "Draws a gun on Sammie then puts it away."
            },
            {
              character: SinnersCast.SammieMoore,
              tactic: "Backs away."
            },
          ]}
          turningPoint="Smoke draws a gun on Sammie, warning him to not play for other juke clubs."
          outcome="Smoke threatens Sammie to not play for other juke clubs, Mary goes outside to see if Remmick has money."
          storyContribution="We learn that Smoke feels he’s trapped by an illicit lifestyle, and that Sammie is about to leave for Chicago."
        />
        <H5>Word on Pacing</H5>
        <P>This is the most “boring” scene in the movie <span className="text-neutral-500 text-sm">(in my opinion)</span> for 2 reasons:</P>
        <UnorderedList>
          <ListItem><b>Accents Lose Attention:</b> The accents are so strong that it’s hard to tell what they’re saying at times. Smoke mentions the real town “Mound Bayou”, but watchers won’t know what that is. Sammie uses period dialect
            saying <i>“That sound like a crock”</i> <FilmTimecode timecode="1:07:14" /> (crock a period term for “lie”).</ListItem>
          <ListItem><b>Turns Late:</b> Ryan averages a scene turning point every 30 seconds to 1 minute. The scene has no turning points for <i>2 minutes</i>. There is no reason to pay keen attention.</ListItem>
        </UnorderedList>
        <P>But it’s packed with narrative importance. There’s always a balance between substance and drama.</P>

        <H5>Visual Metaphor</H5>
        <P>At <FilmTimecode timecode="1:08:27" /> Mary backs up against Stack, their silhouettes framed body-to-body as a visual metaphor of their romance. Smoke holsters his gun to her leg. Seeding sexual tension in the back of the viewers mind.</P>

        <H5>“I’m a Soldier Boy”</H5>
        <P>At <FilmTimecode timecode="1:09:01" /> Smoke says <i>“I’m a soldier boy. And you just gave me a command.”</i> Ryan Coogler comments on how Smoke <A href="https://youtu.be/1lRAnlyj5YM?si=oTn_AdcLc9UAO6wa&t=3040">thinks he’s a soldier</A>, but
          he’s actually a father.</P>
        <P>This is one of my favorite lines in the movie.</P>

        <H4>Mary Walks Outside</H4>
        <Image
          path="/film-analysis/films/sinners/stills/mary-side-profile"
          ext="jpg"
          alt="Opening scene in Sinners, Sammie Moore entering his father's church, in tatters and distraught, clutching the neck of his shattered guitar."
          width="100%"
          optimize={false}
          inspectable
        />
        <p className="text-neutral-500 text-sm mt-2 mb-2">My favorite frame in the entire movie.</p>
        <SceneTimeline
          className="mt-10 mb-5"
          startTimecode="1:09:11"
          turningPointTimecode={["1:11:21", "1:11:47", "1:12:34", "1:12:58"]}
          endTimecode="1:13:00"
        />

        <H5>“Will Ye Go, Lassie, Go?”</H5>
        <P>Like <A href="https://en.wikipedia.org/wiki/Siren_(mythology)">sirens</A>, the vampires stand outside and beckon Mary towards them with song. Joan’s solo at <FilmTimecode timecode="1:09:41" /> is piercingly beautiful.</P>
        <P>The <A href="https://en.wikipedia.org/wiki/Wild_Mountain_Thyme">Scottish/Irish folk song</A> dates back to the late 1700s and is a romantic <A href="https://en.wikipedia.org/wiki/Pastoral">pastoral</A> rooted in themes of love, longing, and connection to land.</P>
        <ImageCarousel
          className="left-column——avoid right-column——avoid"
          images={[
            "/film-analysis/films/sinners/other/scottish-heathers",
            "/film-analysis/films/sinners/other/wild-thyme"
          ]}
          imageExts={["jpg", "jpg"]}
          captions={["Wild heather plant in Scotland.", "Wild thyme."]}
          height={400}
          showArrows
          squareCrop
        />
        <P>More irony, the vampires long for what they once had, their land and life itself. They want it from Sammie.</P>
        <H6>The Author Is Unknown</H6>
        <P>In the 1950s, Belfast musician Francis McPeake reworked and popularized the version now widely known, which was first recorded by his family. Though McPeake copyrighted the song, he acknowledged it as an arrangement of a traditional
          version he encountered while traveling in Scotland, blurring the line between authorship and folk inheritance.</P>
        <P>So when Ryan Coogler said his research <i>“made [him] question everything”</i> he knew about music, this is what he meant.</P>

        <H5>Deal With the Devil</H5>
        <P>The moment Mary accepts money from Remmick at <FilmTimecode timecode="1:11:17" />, it’s over. This is Ryan Coogler silently reiterating <i>“<b>the moment s**t becomes a business, somebody’s getting f***ed.</b>”</i> And after this moment,
          the rest of the film, everyone gets f****d.</P>

        <H5>Triple-Meaning</H5>
        <P>By this point, it’s clear to us that Coogler loves writing in layered & <s>double</s>triple-meanings. At <FilmTimecode timecode="1:11:43" />, Remmick says <i>“’Cus you in some deep deep pain, that money can’t fix.”</i> as Bert tilts his
          neck like a predator.</P>
        <P>The dramatic suspense is maintained, because this can mean one of 2 things:</P>
        <UnorderedList>
          <ListItem><b>“Mary, you’re in a lot of emotional pain with Stack and your mother.”</b> It’s true, and money actually can’t fix these things.</ListItem>
          <ListItem><b>“Mary, we’re about to kill you.”</b> This is also true, but we don’t know if this will be the case yet.</ListItem>
        </UnorderedList>
        <P>And, 3rd, we have irony in that the vampires are also looking for “fellowship and love”. Vampires are lonley creatures because they’re:</P>
        <UnorderedList>
          <ListItem><b>Immortal</b>: Outliving everyone they love creates deep isolation.</ListItem>
          <ListItem><b>Separated from humanity</b>: They’re often outsiders, unable to fully participate in normal human life.</ListItem>
          <ListItem><b>Face moral conflict</b>: If they retain a conscience, feeding on humans can make them feel monstrous or ashamed.</ListItem>
          <ListItem><b>Fear closeness</b>: Getting close to others might put them in danger or reveal their secret.</ListItem>
          <ListItem><b>Longing for love</b>: Many vampire stories emphasize eternal longing for love they can’t fully have.</ListItem>
        </UnorderedList>

        <H4>Juke Ascends Into Euphoria</H4>
        <SceneTimeline
          className="mt-24 mb-5"
          startTimecode="1:13:01"
          turningPointTimecode={["1:13:54", "1:14:43", "1:15:45", "1:16:20", "1:16:24", "1:16:48", "1:17:55", "1:19:16", "1:19:34", "1:19:44"]}
          endTimecode="1:20:04"
        />
        <P>The next sequence picks up pace, moving faster and faster as Pearline sings <ScoreTimecode scoreItem={SinnersScore.PalePaleMoon} label="Pale Pale Moon" />.</P>
        <H5>Layering Dramatic Subplots</H5>
        <P>This ascent sequence layers 4 mini-subplots that all <span className="text-neutral-500 text-sm">(except Cornbread’s)</span> snap at the climax of Stack dying. It is highly coordinated and would have required tight collaboration between director, composer, editor, and choreography:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:13:01" content={<p className="text-left"><b>Main Stage</b> <span className="text-neutral-500 text-sm">(Pearline Singing)</span></p>} />
          <TimecodeTableRow timecode="1:14:17" content={<p className="text-left"><b>Cornbread Going Outside to Pee</b></p>} />
          <TimecodeTableRow timecode="1:14:20" content={<p className="text-left"><b>The Gambling Side-Room</b> <span className="text-neutral-500 text-sm">(Fight Over Loaded Dice Breaks Out)</span></p>} />
          <TimecodeTableRow timecode="1:16:16" content={<p className="text-left"><b>The Back Room</b> <span className="text-neutral-500 text-sm">(Stack & Mary Make Love)</span></p>} />
        </TimecodeTable>
        <H5>“So You Rob Trains and Banks?...”</H5>
        <P>It’s important that you give the audience lines that they can take home, that stick with them. At <FilmTimecode timecode="1:14:20" />, Mary says asks <i>“So you rob trains and banks?...But you can’t steal this p****y for a night?”</i>. This
          is one of them.</P>
        <H5>Ready to Snap</H5>
        <P>At <FilmTimecode timecode="1:16:06" />, once Stack goes into the back room, we know our understanding of the situation is about to meet the characters’ own. We’re ready to snap each of the dramatic subplots:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:16:20" content={<p className="text-left"><b>Mary Kisses Stack</b> <span className="text-neutral-500 text-sm">(The Back Room)</span></p>} />
          <TimecodeTableRow timecode="1:16:24" content={<p className="text-left"><b>Smoke Hits the Loaded Dice Offender</b> <span className="text-neutral-500 text-sm">(The Gambling Side-Room)</span></p>} />
          <TimecodeTableRow timecode="1:16:48" content={<p className="text-left"><b>Pearline & the Crowd Roar</b> <span className="text-neutral-500 text-sm">(Main Stage)</span></p>} />
        </TimecodeTable>
        <H5>Stomping</H5>
        <P>The stomping at <FilmTimecode timecode="1:16:57" /> in IMAX was something else. And we match cut on the same concept to the man getting stomped in the back room. And of course, <FilmTimecode timecode="1:17:09" /> it ain’t none of Grace’s business.</P>
        <P>Autumn Durald Arkapaw chooses to go handheld for a shot on Pearline’s shoes to emphasize the commotion.</P>
        <H5>Leaning Over</H5>
        <P>Next <FilmTimecode timecode="1:17:22" /> Pearline begins a sequence where she crawls stage-left, mirroring the sequence happening in the back room:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:17:23" content={<p className="text-left">Getting down to the ground, pivoting stage-left.</p>} />
          <TimecodeTableRow timecode="1:17:42" content={<p className="text-left">Sliding stage-left.</p>} />
          <TimecodeTableRow timecode="1:17:52" content={<p className="text-left">A demonic laugh knowing Stack’s demise is coming.</p>} />
        </TimecodeTable>
        <H5>Delta Slim’s “Oh He Busy Huh?”</H5>
        <P>We bring some humor back, and have Sammie check the back room where Smoke and Mary are having sex. <FilmTimecode timecode="1:18:30" /> yields the 3rd largest laugh from the audience.</P>
        <H5>Story Hole</H5>
        <P>Why does Mary run out of the juke at <FilmTimecode timecode="1:19:57" /> when she could’ve just killed them all? <span className="text-neutral-500 text-sm">(running outside will make her need permission to get back in)</span></P>
        <P>Doesn’t really matter since we move our attention to a dying Stack.</P>

        <H4>Stack Dies</H4>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:20:04"
          turningPointTimecode={["1:20:42", "1:22:08"]}
          endTimecode="1:24:10"
        />
        <H5>Michael B. Jordan’s Stellar Acting</H5>
        <P>At <FilmTimecode timecode="1:20:56" /> Smoke glances between Annie & Stack’s dead body, his eyes red with tears, choked up at the throat, a vein on his forehead, eyes darting. It’s incredibly intense and authentic acting. He had to have gone to a
          special place mentally to perform like that.</P>
        <H5>Southern Accents</H5>
        <P>A few lines I now understand watching with captions:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:22:30" content={<p className="text-left">Annie says “This a <A href="https://en.wikipedia.org/wiki/Haint_blue#Etymology">haint</A> we’re dealin’ with, Smoke.” I always thought she was saying <b><i>“hate”</i></b>.</p>} />
          <TimecodeTableRow timecode="1:22:41" content={<p className="text-left">Smoke says <i>“This ain’t no dead body. This Stack. He’s stayin’ here with me.”</i> I always thought he was
            saying <i>“This ain’t no dead body. This Stack. <b>Stack the ol’ man.</b>”</i>.</p>} />
        </TimecodeTable>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>Act III: Facing the Vampires</H3>
        <P>Now that Stack is dead, we quickly approach a face-to-face confrontation with the vampires. But not just yet. Key turning points are as follows:</P>
      </div>
      <PlotTimeline
        className="mt-6 mb-1 left-column——avoid right-column——avoid"
        startMinute={79}
        endMinute={106}
        rows={[
          {
            label: "Facing the Vampires",
            subLabel: "Act III",
            items: [
              { atMinute: 87, label: "Cornbread Attacks." },
              { atMinute: 95, label: "Remmick’s Irish Jig." },
              { atMinute: 100, label: "Remmick Returns." },
              { atMinute: 106, label: "Grace Calls the Vampires In.", description: "End Act III" },
            ],
          }
        ]}
      />

      <div className="px-4 sm:px-2 sm:pr-12">
        <H4>Cornbread Returns</H4>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:24:11"
          turningPointTimecode={["1:25:28", "1:27:16"]}
          endTimecode="1:28:01"
        />
        <H5>Notes</H5>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:25:34" content={<p className="text-left"><b>2nd Largest Laugh</b>: Delta Slim’s swig of his flask yields the 2nd largest laugh from the audience. A laugh to break the nervous energy because we know what’s coming next.</p>} />
          <TimecodeTableRow timecode="1:25:42" content={<p className="text-left">Love Cornbreads line: <i>“Woman, this man showed me kindness. Employed me. Grabbed me out the field!”</i></p>} />
          <TimecodeTableRow timecode="1:26:07" content={<p className="text-left"><b>“Bein’ Kind to One-Another”</b>: This line suprisingly yielded few laughs, despite being pretty funny. Once you get the main laugh from the moment before, the audience needs time to recharge.</p>} />
          <TimecodeTableRow timecode="1:27:16" content={<p className="text-left">This is the first jump scare of the movie. It is so emotionally intense that the first slow-motion shots are used to add gravity.</p>} />
          <TimecodeTableRow timecode="1:27:56" content={<p className="text-left"><b>Delta Slim’s “I Think I Just Shat Myself”</b>: The largest laugh in the movie. Everyone cracks up. No exceptions.</p>} />
        </TimecodeTable>

        <H4>Stack Attacks</H4>
        <SceneTimeline
          className="mt-10 mb-4"
          startTimecode="1:28:01"
          turningPointTimecode={["1:28:03", "1:28:15", "1:30:09"]}
          endTimecode="1:30:41"
        />
        <H5>Back-To-Back Dramatic Sequences</H5>
        <P>Coogler’s a master of pacing & emotional variety. He decides to keep the pressure high with <i>another</i> dramatic sequence immediately following Cornbread’s attack:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:28:03" content={<p className="text-left">Stack knocks on the backroom door.</p>} />
          <TimecodeTableRow timecode="1:28:15" content={<p className="text-left">A knife jabs through the door. <span className="text-neutral-500 text-sm">(after <b>4 seconds</b> of Sammie’s ear to the door)</span></p>} />
          <TimecodeTableRow timecode="1:28:34" content={<p className="text-left">Smoke’s eye comes right to the hole in the door. <span className="text-neutral-500 text-sm">(only in the movies!)</span></p>} />
          <TimecodeTableRow timecode="1:30:03" content={<p className="text-left">Sammie brings it even closer, 1-2 inches away. Sammie holds it there for <b>5 seconds</b>. <span className="text-neutral-500 text-sm">(now the audience is yelling at the screen)</span></p>} />
          <TimecodeTableRow timecode="1:30:08" content={<p className="text-left">We get a shot <i>right down the hole</i> (peak audience angst).</p>} />
          <TimecodeTableRow timecode="1:30:09" content={<p className="text-left">Then Stack breaks through.</p>} />
        </TimecodeTable>
        <DramaticIntensityPlot
          title="Dramatic Intensity"
          points={[
            {
              timecode: "1:28:03",
              intensity: 20,
              label: "Stack Knocks",
            },
            {
              timecode: "1:28:15",
              intensity: 80,
              label: "Knife Jabs Through The Door"
            },
            {
              timecode: "1:28:34",
              intensity: 60,
              label: "Smoke's Eye At The Hole"
            },
            {
              timecode: "1:30:03",
              intensity: 80,
              label: "Sammie Goes Right Up To The Hole"
            },
            {
              timecode: "1:30:09",
              intensity: 100,
              label: "Stack Breaks Through"
            }
          ]}
        />
        <H5>Visual Metaphor: Separation</H5>
        <P>A door now separates the twins. Life on one side, death on the other. Stack is torn between his desire to be a brother, and a desire to keep himself safe. This furthers his internal conflict, since what he really is, is a caring father.</P>
        <H5>Twin Character Design</H5>
        <P>As I mentioned before, the twin character design is an engine for conflict. They need each other, and at this moment in time, they couldn’t be farther away from each other. Smoke fundamentally can’t get the companionship he wants from Stack,
          since Stack wants to kill him.</P>
        <H5>Pickled Garlic</H5>
        <P>Annie uses the only jar of pickled garlic on Stack to fend him off <FilmTimecode timecode="1:30:12" />, Grace later asks <i>“You don’t got none of the pickled ones?”</i> at <FilmTimecode timecode="1:36:38" />. More long-range connection of
          concepts in Coogler’s script.</P>

        <H4>Annie Explains the Situation</H4>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:30:41"
          turningPointTimecode={["1:32:32"]}
          endTimecode="1:33:01"
        />
        <H5>Annie Educates</H5>
        <P>You never have a character explain to another character what they already know in dialog. Rather, here Annie educates not just other characters, but us, the audience, on the ground-rules of how vampires work <span className="text-neutral-500">(and how the rest of the
          movie will work)</span>.</P>
        <P>This scene doesn’t turn at all, but it doesn’t need to since we just got 2 large dramatic sequences in a row <span className="text-neutral-500">(but if you’re rewatching, this is the 2nd most boring part of the movie)</span>.</P>
        <H5>“She Bit Me Everywhere, but Me Neck”</H5>
        <P>Delta Slim’s line at <FilmTimecode timecode="1:32:32" /> <i>“I had a gal once, vampire. She was light skinneded too. That gal bit me everywhere but my neck.”</i> was the <b>2nd/3rd largest laugh</b> in the movie.</P>
        <P>In Clarksdale, Ryan Coogler mentioned that this came up spontaneously in a recording studio when <A href="https://en.wikipedia.org/wiki/Bobby_Rush_(musician)">Bobby Rush</A> quoted it while telling a story. He then incorporated it into the script.</P>

        <H4>The Irish Jig Scene</H4>
        <Image
          path="/film-analysis/films/sinners/stills/irish-jig-scene"
          ext="jpg"
          alt="The Irish Jig Scene"
          width="100%"
          optimize={false}
          inspectable
        />
        <p className="text-neutral-500 text-sm mt-2 mb-2">My favorite scene in the entire movie.</p>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:33:47"
          turningPointTimecode={[]}
          endTimecode="1:35:59"
        />
        <Aside brighter>I’ve heard this scene maybe 20+ times in the theater, and after movies finish, I try to see if I can catch <i>just this scene</i> playing in other theaters.</Aside>

        <H5>Continuity Error</H5>
        <P>The only seam, in this seamless movie, is the transition at <FilmTimecode timecode="1:33:36" />. Where Grace screams at finding the man passed out on the floor. Smoke and Annie immediately appear in the next shot, without context on how they got there so quickly.</P>
        <P>It’s a convenient transition, but Annie & Smoke didn’t react to a bloodcurdling scream they could obviously hear while in that backroom.</P>

        <H5>Remmick’s Irish Jig</H5>
        <P>This scene <i>captivated</i> the audience. When we talk about cinematic moments, it’s when your attention and imagination are fully captured and entertained. And this <span className="text-neutral-500"><i>(outlandish)</i></span> scene did that.</P>
        <P>Remmick’s actor Jack O’Connell actually even had <A href="https://youtu.be/SLpzfFCYz8E?si=oGAMyc-v3N29YJba&t=50">irish dance lessons</A> as a child, and sung irish folk music like this in bars.</P>
        <P>My favorite moments:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:34:45" content={<p className="text-left">It’s important to notice that the direction for the extras is to act like mindless zombies. They nod their heads around like they almost don’t control their bodies.</p>} />
          <TimecodeTableRow timecode="1:35:05" content={<p className="text-left">The cue is brilliant, and the mob roars in response to his command. The attack on “<b><i>hunt</i></b> the hare” in theaters plays with many layers not heard on digital.</p>} />
          <TimecodeTableRow timecode="1:35:10" content={<p className="text-left">If you listen closely, there is a bass hit in the score right before Remmick breaks into his jig (before <i>“the boys of Liverpool”</i>).
            It cues the emotional impact of the moment, hitting low in our emotional register.</p>} />
        </TimecodeTable>

        <H5>Principle of Antagonism</H5>
        <P>The best stories, have forces of antagonism so strong, that we put into question whether the protagonists will achieve the object of their quest.</P>
        <P>Author Robert McKee calls this the <i>Principle of Antagonism</i>:</P>
        <Quote>
          <b>THE PRINCIPLE OF ANTAGONISM</b>: A protagonist and
          his story can only be as intellectually fascinating and
          emotionally compelling as the forces of antagonism
          make them.
        </Quote>
        <P>When we see a giant mob of vampires doing a stylish jig outside, we’re almost on the side of the vampires by the end <i>(“where’d he learn to dance like that?”)</i>. The odds keep stacking and stacking against our protagonists.</P>
        <P>Beyond being an <i>ultra</i> stylish jig, this scene is a story device with real function.</P>

        <H4>Garlic Circle</H4>
        <P>The survivors inside get in a circle to eat garlic to see who’s a vampire.</P>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:35:59"
          turningPointTimecode={["1:37:00", "1:37:40", "1:38:07"]}
          endTimecode="1:38:17"
        />
        <H5>Delta Slim’s “I’m Fine.”</H5>
        <P>This was the <b>2nd largest laugh</b> in the movie <span className="text-neutral-500">(losing track by now, it’s fine if it’s tied with others)</span>. Slim cements his place as the funniest character in the movie here.</P>

        <H4>A Man From Outside Returns</H4>
        <P>A man from outside returns and gets eaten by Cornbread. Bo walks up and tries to get in, we realize Bo is a vampire. This tees up Remmick walking up next.</P>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:38:29"
          turningPointTimecode={["1:38:58", "1:39:52"]}
          endTimecode="1:39:56"
        />

        <H4>Remmick Returns</H4>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:39:56"
          turningPointTimecode={["1:40:31", "1:41:40", "1:42:58"]}
          endTimecode="1:44:15"
        />
        <H5>Raising the Stakes</H5>
        <P>At <FilmTimecode timecode="1:40:31" /> <span className="text-neutral-500">(also one of my favorite lines)</span> Remmick says “And I want you to let us in there. <b>Or we gon’ go to the grocery store. <i>We gon’ pay Lil’ Lisa a visit.</i></b>”</P>
        <P>Lil’ Lisa is more than just a prop character. <b>She’s a dramatic device to <i>raise the stakes</i> for Grace.</b> One of the most important things you can be asking while writing a scene is <i>how can I raise the stakes</i> for my characters. What is
          on the line here? That will make the audience care.</P>
        <P>On top of that, Lil’ Lisa allows Grace to step into a maternal role as <i>protector</i>, to interact with the abandoned fatherhood theme adjacent to Smoke.</P>

        <H5>Taishanese</H5>
        <P>Remmick then speaks in Taishanese, as <A href="https://www.reddit.com/r/asianamerican/comments/1k52axt/comment/moeutzv">one Reddit comment</A> points out:</P>
        <Quote>
          ... most of the Chinese people who were in America during the Chinese Exclusion Act descended from those who helped build the railroads, and they came from Guangdong.
        </Quote>
        <P>Since vampires live forever, they have the resources and time to pick up various languages during travels. Here Coogler throws that in as a surrealistic touch. The audience is now simultaneously half-terrified and half-intrigued.</P>

        <H5>Foreshadowing the Final Battle</H5>
        <P>At <FilmTimecode timecode="1:41:57" />, Remmick points out Hogwood is the leader of the KKK, and that he will return to kill them all. The potential for this was planted earlier in the movie at<FilmTimecode timecode="7:47" />. This foreshadows
          the final act.</P>
        <P>We’ve come late enough in the movie to begin unraveling seeds that were planted far ago. In the words of Smoke, <i>“This wasn’t no juke joint. No club. This here’s a...slaughterhouse.”</i></P>

        <H5>"We Was Never Gon' Be Free"</H5>
        <P>At <FilmTimecode timecode="1:43:33" />, we have a dialog between Smoke and Stack. Stack says:</P>
        <div className="border-l-2 border-neutral-300 pl-3 text-md mb-4">
          <p className="text-neutral-600"><i>"We was never gon' be free. We've been running around everywhere looking for freedom. You know damn well, you was never gonna find it."</i></p>
        </div>
        <P>In addition to Remmick’s previous remarks, these again point to the hopeless conditions Southern Black-Americans faced at the time. There was no real freedom to be found, no matter what rules you played
          by <span className="text-neutral-500">(because the rules themselves were written to rob you of your land and freedom)</span>.</P>

        <H4>Grace Calls the Vampires In</H4>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:44:16"
          turningPointTimecode={["1:44:53", "1:45:38", "1:46:34"]}
          endTimecode="1:46:34"
        />

        <H5>Smoke’s Internal Transformation</H5>
        <P>We see Smoke’s hands shaking at <FilmTimecode timecode="1:44:16" />, contrast this with the Smoke we saw at the start of the film. Cool, calm, ruthless. His character is slowly breaking down as we apprach the ending act, where the final lesson
          is delivered.</P>

        <H5>“Ain’t You a Soldier?”</H5>
        <P>Grace snaps in this scene and lets her maternal instinct take over. She wants to protect Lil’ Lisa, almost as a message for Smoke to wake up to his own fatherhood.</P>
        <Aside brighter>When at <FilmTimecode timecode="1:44:40" /> she says <i>”That white devil spoke Chinese. He got in Bo’s mind.“</i> I always thought she was saying <i>“He got a buzz mind.”</i> (like the mind of a <A href="https://en.wikipedia.org/wiki/Common_buzzard">buzzard</A>).</Aside>

        <H5>Pick Poor Robin Clean <span className="text-neutral-500">(again)</span></H5>
        <P>The vampires close in <FilmTimecode timecode="1:45:43" /> while singing <i>“Pick Poor Robin Clean”</i> again. They’re ready to go for the kill & pick them clean.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>Act IV: Grand Juke Battle</H3>
        <P>Now that the vampires have been invited in, everyone will fight for their lives. This act will be action-driven, with fight choreography leading the way.</P>
        <P>Key turning points are as follows:</P>
      </div>
      <PlotTimeline
        className="mt-6 mb-1 left-column——avoid"
        startMinute={107}
        endMinute={115}
        rows={[
          {
            label: "Grand Juke Battle",
            subLabel: "Act IV",
            items: [
              { atMinute: 107, label: "Remmick Walks In.", doublebump: true },
              { atMinute: 108, label: "Stack Kills Annie.", bump: true },
              { atMinute: 109, label: "Smoke Kills Annie (again)." },
              { atMinute: 110, label: "Delta Slim Dies.", bump: true },
              { atMinute: 110, label: "Pearline Dies.", doublebump: true },
              { atMinute: 115, label: "Remmick Dies.", doublebump: true },
            ],
          }
        ]}
      />

      <div className="px-4 sm:px-2 sm:pr-12">
        <Image
          path="/film-analysis/films/sinners/stills/grand-juke-battle-formation"
          ext="jpg"
          alt="Grand Juke Battle Formation"
          width="100%"
          optimize={false}
          inspectable
        />
        <p className="text-neutral-500 text-sm mt-2 mb-2">Smoke is front and center, leading the formation, as others arc behind.</p>
        <P>This sequence has over a dozen turning points, each coming in quick succession:</P>
        <SceneTimeline
          className="mt-32"
          startTimecode="1:46:44"
          turningPointTimecode={["1:48:21", "1:49:16", "1:50:02", "1:50:21", "1:50:30", "1:51:13", "1:51:20", "1:52:36", "1:52:47", "1:53:06", "1:53:45"]}
          endTimecode="1:55:18"
        />
        <P>There’s a lot going on so I’ll just timecode various thoughts:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:47:46" content={<p className="text-left">We get a dog whimper/bark sound-effect when Delta Slim punches Joan.</p>} />
          <TimecodeTableRow timecode="1:47:52" content={<p className="text-left">Incredible gunmanship from Smoke.</p>} />
          <TimecodeTableRow timecode="1:47:57" content={<p className="text-left">Grace in a flaming ball of fire after having staked a man, why not.</p>} />
          <TimecodeTableRow timecode="1:48:09" content={<p className="text-left">Annie says <i>“Smoke! They feel his pain.”</i> I always thought she was saying <i>“Smoke! They feelin’ pain.”</i></p>} />
          <TimecodeTableRow timecode="1:48:29" content={<p className="text-left">Smoke’s <i>“Everything gon’ be all right now”</i> was surreal to see in an IMAX theater. The coloring made it look like a nightmare.</p>} />
          <TimecodeTableRow timecode="1:48:50" content={<p className="text-left">The main vampires <span className="text-neutral-500">(Remmick, Stack, Mary)</span> come to attention before the major event of Smoke <span className="text-neutral-500">(re)</span>killing Annie.</p>} />
          <TimecodeTableRow timecode="1:49:15" content={<p className="text-left">There’s a loud and low bass hit you can’t hear on digital, right when Smoke stabs Annie with the stake. To add width & volume to the action.</p>} />
          <TimecodeTableRow timecode="1:49:49" content={<p className="text-left">Delta Slim scraping his forearm with the shattered bottle for blood always made the audience uneasy.</p>} />
          <TimecodeTableRow timecode="1:50:40" content={<p className="text-left">Sammie’s jump from 2-stories high to the ground always made the audience laugh and wince. I think they kept that in since it was just plain funny & impractical.</p>} />
        </TimecodeTable>

        <H5>The Last Stand</H5>
        <P><FilmTimecode timecode="1:50:55" /> marks the last stands of our 2 main protagonists <span className="text-neutral-500">(Sammie & Smoke)</span>. At <FilmTimecode timecode="1:51:13" /> Sammie begins a prayer of <i>“Our Father,”</i> and the score changes
          to high strings in <ScoreTimecode scoreItem={SinnersScore.ThyKingdomCome} label="Thy Kingdom Come" timecode="1:38" />.</P>
        <P>All the chips are on the table. The protagonists have nothing left to lose <span className="text-neutral-500">(but their lives)</span>. This is an impossible situation for both of them.</P>
        <Aside brighter>When Sammie broke out into prayer, one crowd even broke into laughter because it was so comical.</Aside>
        <P>Remmick parrots back in prayer at <FilmTimecode timecode="1:51:20" />, and the crowd of vampires closes in. There is less and less air to breathe.</P>

        <H5>Christianity vs Hoodoo</H5>
        <P>At <FilmTimecode timecode="1:51:48" /> Remmick says:</P>
        <div className="mt-2 mb-4">
          <div className="pl-4 border-l border-neutral-300">
            <p className="text-sm italic">Long ago...the men who stole my father’s land forced these words upon us.</p>
            <p className="text-sm italic">I hated those men but the words still bring me comfort.</p>
          </div>
        </div>
        <P>In this great moment of irony, Remmick is repeating back to Sammie the cultural condition Southern Blacks found themselves in. Land stolen, a religion of Protestant Christianity forced upon them — as he dips Sammie
          in a baptism of water.</P>
        <P>In <i>another</i> great moment of irony, while Sammie’s prayer is ineffective on Remmick, Smoke’s amulet saves his life from Stack’s bite at <FilmTimecode timecode="1:52:36" /> <span className="text-neutral-500">(after he ridiculed
          Annie for her hoodoo practice the whole film)</span>.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>Act V: The Last Stand</H3>
        <P>Now that Remmick is dead, Smoke has a different kind of devil to face, and Sammie has to catch Sunday Service.</P>
        <P>Key turning points are as follows:</P>
      </div>
      <PlotTimeline
        className="mt-6 mb-1 left-column——avoid right-column——avoid"
        startMinute={115}
        endMinute={123}
        rows={[
          {
            label: "The Last Stand",
            subLabel: "Act V",
            items: [
              { atMinute: 118, label: "KKK Arrive." },
              { atMinute: 119, label: "Smoke Appears.", bump: true },
              { atMinute: 121, label: "Smoke Dies." },
              { atMinute: 122, label: "Hogwood Dies.", bump: true },
              { atMinute: 123, label: "Sammie Leaves for Chicago." },
            ],
          }
        ]}
      />
      <div className="px-4 sm:px-2 sm:pr-12">
        <H4>Before the Shootout</H4>
        <Image
          path="/film-analysis/films/sinners/stills/smoke-image-system-end"
          ext="jpg"
          alt="Smoke sits alone before the shootout"
          width="100%"
          optimize={false}
          inspectable
        />
        <p className="text-neutral-500 text-sm mt-2 mb-2">Smoke is alone, hands shaking, rolling his own cigarette.</p>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="1:55:18"
          turningPointTimecode={[]}
          endTimecode="1:58:31"
        />
        <H6>Emotional Build-Up</H6>
        <P>Since we’re about to go through a fight sequence, the editor takes us through a series of shots to take us through Smoke’s internal state of welling up
          emotion <span className="text-neutral-500">(while also teeing up the Sammie church confrontation subplot)</span>:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:56:38" content={<p className="text-left">We see the first shot of the movie, with Sammie driving up to church. We are now experiencing it in real-time.</p>} />
          <TimecodeTableRow timecode="1:57:14" content={<p className="text-left">Smoke rolls his own cigarette, something that Stack used to help him with. <span className="text-neutral-500 text-sm">(we see a cut to the daylight scene of Stack handing and lighting for him)</span></p>} />
          <TimecodeTableRow timecode="1:57:29" content={<p className="text-left">Flashback sequence to all those who he loved and helped him open the juke joint.</p>} />
          <TimecodeTableRow timecode="1:58:17" content={<p className="text-left">More irony, Smoke takes off his amulet at <FilmTimecode timecode="1:58:17" />, and later dies in the KKK shootout without its protection.</p>} />
        </TimecodeTable>

        <H5>Character Framing</H5>
        <P>To frame this scene for Smoke, he has lost <i>everything</i>. His friends, his wife, his business, and his twin brother. He has nothing left to lose.</P>
        <P>So going into this battle he will be fierce, but also helpless and vulnerable.</P>

        <H5>Charlie Patton’s Guitar</H5>
        <P>Earlier in the movie <FilmTimecode timecode="21:02" />, Stack told Sammie that they gave him <A href="https://en.wikipedia.org/wiki/Charley_Patton">Charlie Patton</A>’s old guitar. At <FilmTimecode timecode="1:55:56" />, Smoke dismisses this claim
          saying <i>“What? Boy who told you that?”</i>. Sammie says <i>“Stack.”</i> Smoke says <i>“Lyin’ son of a b***h”</i> <span className="text-neutral-500">(I always thought this was <i>“my a soul bitchin,”</i> I could never discern the words)</span>.</P>
        <P>More long-range plant-and-payoff from Coogler.</P>
        <Aside brighter>After Smoke’s <i>“Boy who told you that?”</i> <FilmTimecode timecode="1:56:00" />, Sammie waits a full <b>4 seconds</b> before responding with <i>“Stack.”</i> <FilmTimecode timecode="1:56:04" />. Being a heavier emotional moment
          the exchange is paced to draw out, the characters are exhausted and haven’t slept.</Aside>

        <H4>The Shootout (Climax)</H4>
        <Image
          path="/film-analysis/films/sinners/stills/smoke-kkk-shootout"
          ext="jpg"
          alt="Smoke and the KKK shootout"
          width="100%"
          optimize={false}
          inspectable
        />
        <p className="text-neutral-500 text-sm mt-2 mb-2">Smoke, in an aggressive center-frame composition, lingered on for 6 intense seconds (<i>1:59:57</i> - <i>2:00:03</i>).</p>
        <SceneTimeline
          className="mt-6 mb-7"
          startTimecode="1:58:31"
          turningPointTimecode={["1:59:33", "2:00:31", "2:01:56", "2:02:48"]}
          endTimecode="2:03:52"
        />
        <P>Before Smoke first begins shooting <span className="text-neutral-500">(he initially hides in the underbrush as the KKK roll up)</span>:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:58:40" content={<p className="text-left">We flashback to Smoke warning Hogwood to never return, as the KKK cars roll up. Explicitly tying the two points in narrative.</p>} />
          <TimecodeTableRow timecode="1:58:51" content={<div>
            <p className="text-left">Loved the layering and how authentic the Klansman voices sounded getting out of their cars:</p>
            <div className="pl-4 border-l border-neutral-300 mt-2 mb-2">
              <p className="text-sm italic">“Lil’ coon huntin’ this morning boys”</p>
              <p className="text-sm italic">“Love skinnin’ me a n****r, first thing of the day.”</p>
              <p className="text-sm italic">“Gettin’ a little too uppity around here.”</p>
              <p className="text-sm italic">“Time to teach these boys a lesson.”</p>
            </div>
            <p className="text-left">The voiceover sessions must have been fun.</p>
          </div>} />
          <TimecodeTableRow timecode="1:59:00" content={<p className="text-left">Hogwood’s line <i>“Club Juke, huh? Grand openin’, and grand closin’.”</i>. <span className="text-neutral-500 text-sm">(I always thought he was saying <i>“Club Juke, huh? Grand openin’, <b><i>or</i></b> grand closin’?”</i>)</span></p>} />
          <TimecodeTableRow timecode="1:59:07" content={<div>
            <p className="text-left">We’re right on the edge of our seats, terrified of what’s about to happen. But right as the henchman opens the door, we match cut seamlessly to Sammie
              opening the church doors. Making progress on his subplot & cooling dramtic tension.</p>
            <div className="pl-4 border-l border-neutral-300 mt-2 mb-2">
              <p className="text-neutral-500 text-sm italic">I have a strong feeling Coogler must have wrote this in the screenplay, as it would be a cue for production design to design the sets with this cut in-mind.</p>
            </div>
          </div>} />
        </TimecodeTable>

        <H5>The Score Takes Over</H5>
        <H6>Score Transformation</H6>
        <P>The score piece <ScoreTimecode scoreItem={SinnersScore.GrandClosin} label="Grand Closin’" timecode="1:58:31" /> represents a transformation from the gentle guitar strumming we experience at the start of the
          film  <ScoreTimecode scoreItem={SinnersScore.SmokestackTwins} label="Smokestack Twins" timecode="4:14" />. Eventually involving the electric guitar.</P>
        <P>Instead of an evolving image system, we have an evolving “score system”.</P>
        <Aside brighter>Ludwig Göransson touches on this transformation in an <A href="https://youtu.be/Ccmg8Bzjdis?si=IJUb-VhTUftbZzkr&t=409">interview with Classical FM</A> and <A href="https://youtu.be/Rz3xHhOLK6M?si=SUvh46RPi0XyHJjj&t=918">NME</A>.
          It happens to be one of his & Coogler’s favorite parts too.</Aside>

        <H6>Narrative Drive</H6>
        <P>The score takes the wheel in this sequence, speaking us through who and what to pay attention to:</P>
        <TimecodeTable>
          <TimecodeTableRow timecode="1:59:30" content={<p className="text-left">We get a radical pluck of the electric guitar as Sammie holds his broken guitar in-hand. So as to say <i>”This is what’s at stake. Culture.“</i></p>} />
          <TimecodeTableRow timecode="1:59:38" content={<p className="text-left">Smoke appears and the low synths smash down.</p>} />
          <TimecodeTableRow timecode="1:59:43" content={<div>
            <p className="text-left mb-2">In this epic moment, the orchestra begins to repeat a descending progression. Hurried, but steady. So as to represent Stack’s determination to unleash his
              wrath on the adversaries.</p>
            <p className="text-left">Raining down punishment.</p>
          </div>} />
          <TimecodeTableRow timecode="1:59:50" content={<div>
            <p className="text-left mb-2">Smoke switches from a semi-automatic <span className="text-neutral-500">(one shot per trigger pull)</span>, to an
              automatic <span className="text-neutral-500">(continuous fire)</span> weapon.</p>
            <p className="text-left">I’m pretty sure this is a pacing decision to have 2 discrete emotional intensities Smoke moves between.</p>
          </div>} />
          <TimecodeTableRow timecode="1:59:53" content={<p className="text-left">The 2nd use of slow-motion in the film. <span className="text-neutral-500">(the first was at Cornbread’s attack at <FilmTimecode timecode="1:27:16" />)</span></p>} />
          <TimecodeTableRow timecode="2:00:17" content={<p className="text-left">The orchestra begins a crescendo as Smoke unpins a grenade. Things are getting intense.</p>} />
          <TimecodeTableRow timecode="2:00:31" content={<p className="text-left">The electric guitar wails out a note. Almost like it’s saying <i>Oww.</i> —— <i>“that hurt”</i>.</p>} />
          <TimecodeTableRow timecode="2:00:36" content={<p className="text-left">A 2nd wailing note, doubling down on the importance of Smoke getting hit.</p>} />
          <TimecodeTableRow timecode="2:00:39" content={<div>
            <p className="text-left mb-2">We hear a high-pitched synth scoop up. It tells us there’s a new entity to pay attention to.</p>
            <p className="text-left">Beforehand, at <FilmTimecode timecode="2:00:32" /> we hear Hogwood crawling away <span className="text-neutral-500">(very much backgrounded)</span>. Only at <FilmTimecode timecode="2:00:41" /> do we actually see him.</p>
          </div>} />
        </TimecodeTable>

        <H5>Drop the Guitar Samuel <span className="text-neutral-500">(In the Name of Gawd!)</span></H5>
        <div className="mb-6">
          <CastMembers cast={[SinnersCast.ReverendMoore]} />
        </div>
        <P>Saul Williams put on an incredible performance as Reverend Moore. At <FilmTimecode timecode="2:00:53" />, he <i>rips</i> through Sammie with his voice <i>saturated</i> in <i>piercing</i> religious fervor.</P>
        <div className="pl-4 border-l border-neutral-300 mt-2 mb-4">
          <p className="text-sm italic">Drop the guitar, Samuel. Put it down. In the name of God!</p>
          <p className="text-sm italic">You tell them...</p>
          <p className="text-sm italic">My heart...my voice...my soul...</p>
          <p className="text-sm italic">Belong’eth, to the Lord!</p>
        </div>
        <Aside brighter>This is a moment I come back to the theater for too, 2nd in line to the Irish Jig scene.</Aside>
        <P>Sammie stands there, unable to accept his father’s words. Completely and totally conflicted. Physically & emotionally injured.</P>
        <P>There is great irony here, Sammie & Father Moore’s relationship as a father-son battle is actually a narrative cloak over what Ryan Coogler is really saying.</P>

        <H5>Everything Comes Together</H5>
        <P>Between <FilmTimecode timecode="2:00:53" /> and the end where Sammie drives away to Chicago, the whole meaning of the film resolves at once.</P>

        <H6>Ancestral Religion vs Inherited Christianity</H6>
        <P>Reverend Moore as a character represents the forces that forced Christianity upon Southern Blacks as a means to control them. Sammie as a character represents the soul of Southern Black culture.</P>
        <P>Reverend Moore would like to tie him down and force him to practice the religion he adopted, but Sammie decides to take his own path, preserve the culture, and go north to Chicago.</P>
        <P>We have noted previously where major plot points subvert religious control and favor ancestral religious roots <span className="text-neutral-500">(practice of <A href="https://en.wikipedia.org/wiki/Hoodoo_(spirituality)">Hoodoo</A>)</span>.</P>
        <Aside brighter>
          <span className="block mb-2">I saw this YouTube video titled <A href="https://www.youtube.com/watch?v=OpvIlVlxdcg">“Sinners is Anti-Christian”</A> and was initially taken aback/confused by the title. But, after completing this analysis,
            I see where it’s coming from.</span> <span className="block">But the message isn’t about the contents of Christianity itself. The message is centered around <i>cultural control</i>. Religion just happens to be the means of control.</span>
        </Aside>

        <H6>Racism and Slavery</H6>
        <P>Smoke <span className="text-neutral-500">(in one facet of character)</span> represents the Southern Black people. His revenge in the final scene over the KKK mobsters, and brutal killing of Hogwood by
          machine gun <FilmTimecode timecode="2:02:48" /> —— is <span className="font-medium">Grand Cinema Payback</span> for centuries of slavery and oppression.</P>
        <P>Final and total justice, immortalized on film.</P>

        <H6>Parenthood</H6>
        <P>At <FilmTimecode timecode="2:03:07" /> Smoke accepts his baby from Annie after his death. <b>He is now the father he always wanted to be.</b></P>
        <P><b>But he has lost his life</b>, due to his ways of the past. Robert McKee talks about film endings in his book <i>“Story”</i>:</P>
        <Quote>
          [the writer] from the way he tells his story [at] the beginning, whispers to the audience: <i>“Expect an up-ending”</i> or <i>“Expect a down-ending”</i> or <b><i>“Expect irony.”</i></b>
          <span className="block">Having pledged a certain emotion, it’d be ruinous not to deliver. So <b>we give the audience the experience we’ve promised, but not in the way it expects</b>.</span>
        </Quote>
        <P>In the same exact moment, Smoke receives everything he ever wanted, and loses it all.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>Post-Credits</H3>
        <div className="mb-11">
          <CastMembers cast={[SinnersCast.SammieMooreOlder, SinnersCast.Stack, SinnersCast.Mary]} />
        </div>
        <P>Later Stack and Mary visit old Sammie <span className="text-neutral-500">(Buddy Guy)</span> in Chicago for a post-credits scene. They offer him immortality as a vampire, and he declines.</P>
        <SceneTimeline
          className="mt-4 mb-5"
          startTimecode="2:05:34"
          turningPointTimecode={["2:06:08", "2:07:28", "2:09:38"]}
          endTimecode="2:10:39"
        />
        <H5>Closing Out Final Subplot</H5>
        <P>This resolves the dramatic question of <i>“what happened to Stack?”</i> after Smoke had him at stake-point at <FilmTimecode timecode="1:52:55" />.</P>
        <Aside brighter>At <FilmTimecode timecode="2:07:13" />, Stack says <i>“It won’t be long for you, huh?”</i>. I always thought this was <i>“Won’t be long till’ you gone.”</i>.</Aside>
        <P>Outtro to <ScoreTimecode scoreItem={SinnersScore.FreeForADay} label="Free for a Day" />.</P>
      </div>
      <div className="px-4 sm:px-2 sm:pr-12 mt-5">
        <Image
          path="/film-analysis/films/sinners/stills/smoke-stack-twins"
          ext="jpg"
          alt="Opening scene in Sinners, Sammie Moore entering his father's church, in tatters and distraught, clutching the neck of his shattered guitar."
          width="100%"
          optimize={false}
          inspectable
        />
        <p className="text-neutral-500 text-sm mt-2 mb-2">The end.</p>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>Key Takeaways</H3>
        <P>There are a lot of things that only stuck out to me after painstakingly going second-by-second, scene-by-scene, through the film. Ryan Coogler is more than a great director, he’s a great <i>screenwriter</i>.</P>
        <P>Here are a few disparate notes:</P>
        <UnorderedList>
          <ListItem><b>Scene Length</b>: In Acts I & II keep scenes to 1-2 minutes.</ListItem>
          <ListItem><b>Turning Scenes</b>: In Acts I & II, turn scenes every 30 seconds to 1 minute. A scene that doesn’t turn <span className="text-neutral-500">(and has no drama)</span> should go in the trash.</ListItem>
          <ListItem><b>Gradually Increase Pace</b>: In later acts, pace increases and scenes turn faster.</ListItem>
          <ListItem><b>Develop Character With Actions</b>: Take what you’d say in words, and show it in character action. It is much more powerful.</ListItem>
          <ListItem><b>No Meaning? Cut It.</b> Every line of dialog should move to a scene turning point, build character, and/or thematic significance. If that is not directly the case, cut it.</ListItem>
          <ListItem><b>Double/Triple Meanings</b>: Explore moments in scenes where words or actions can have double or triple meanings. Making the audience not sure how to feel.</ListItem>
          <ListItem><b>Know Your World</b>: Deeply research the inner and outer world of your story and know it cold. Build scenes from inside-out.</ListItem>
          <ListItem><b>Emotional Dynamic Range</b>: Take the audience between various intensities of various emotions, at varied pace.</ListItem>
          <ListItem><b>Plant and Payoff</b>: Know your script from the <FilmTimecode timecode="1:00" /> mark, to the <FilmTimecode timecode="2:00:00" /> mark. Plant ideas and resolve them sensibly.</ListItem>
          <ListItem><b>What You Can’t Teach</b>: There are a lot of lived emotional and life experiences that Ryan Coogler has had that funnelled into this film. This film is a singular creative event, and much
            of what created it’s contents, you can’t teach.</ListItem>
        </UnorderedList>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <Dots />
        <P>If you made it this far, thanks for reading! You should <A href={EXTERNAL_LINKS.SOCIAL.TWITTER}>reach out</A>.</P>
      </div>

      <div className="px-4 sm:px-2 sm:pr-12">
        <H3>More Resources</H3>
        <H4>Ryan Coogler Interviews</H4>
        <YouTubeEmbed
          className="my-4"
          title="Ryan Coogler × Kodak"
          youtubeId="78Ru62uFM0s"
          description="Viral video where Ryan Coogler talks film types and theater projection formats."
        />
        <YouTubeGrid
          className="my-4"
          videos={[
            {
              title: "Ryan Coogler × Hanna Flint",
              youtubeId: "0mU_2VWpsmQ"
            },
            {
              title: "Ryan Coogler × Democracy Now!",
              youtubeId: "Pjb_eH0C_vQ"
            },
            {
              title: "Ryan Coogler × 7PM in Brooklyn",
              youtubeId: "1lRAnlyj5YM"
            },
            {
              title: "Ryan Coogler × SpringHill",
              youtubeId: "6szF0pznbfQ"
            },
            {
              title: "Ryan Coogler × Angie Martinez",
              youtubeId: "fvwhd5Kph3A"
            },
            {
              title: "Ryan Coogler × IndieWire",
              youtubeId: "yP-4Yhn8I_g"
            },
            {
              title: "Ryan Coogler × Breakfast Club",
              youtubeId: "YWqTXowtqJg"
            },
            {
              title: "Ryan Coogler × ALL THE SMOKE",
              youtubeId: "MnbRbFhJ_HU"
            },
            {
              title: "Ryan Coogler × Straw Hat Goofy",
              youtubeId: "jLcPawzbp_4"
            },
            {
              title: "Ryan Coogler × SWAY’S UNIVERSE",
              youtubeId: "9U33k4aMGsw"
            },
            {
              title: "Ryan Coogler × DP/30 (Fruitvale Station, 2013)",
              youtubeId: "Ddk2uILZWwA"
            },
          ]}
        />
        <H4>Ludwig Göransson Interviews</H4>
        <YouTubeGrid
          className="my-4"
          videos={[
            {
              title: "Ludwig Göransson (Proximity Media)",
              youtubeId: "uZgtm6-EMEM"
            },
            {
              title: "Ludwig Göransson × Classic FM",
              youtubeId: "Ccmg8Bzjdis"
            },
            {
              title: "Ludwig Göransson × Apple Music",
              youtubeId: "k_WTkPaUMJk"
            },
            {
              title: "Ludwig Göransson × Ryan Coogler — NME",
              youtubeId: "Rz3xHhOLK6M"
            },
          ]}
        />
        <H4>Autumn Durald Arkapaw Interviews</H4>
        <YouTubeGrid
          className="my-4"
          videos={[
            {
              title: "Autumn Durald Arkapaw, Ryan (Proximity Media)",
              youtubeId: "itAQolHej2k"
            },
            {
              title: "Autumn Durald Arkapaw, Ryan × IMAX",
              youtubeId: "W7BIK_pjneo"
            },
          ]}
        />
        <H4>Michael B. Jordan Interviews</H4>
        <YouTubeGrid
          className="my-4"
          videos={[
            {
              title: "Michael B. Jordan × Proximity Media",
              youtubeId: "fuQvwrb9gIQ"
            },
            {
              title: "Michael, Ryan × The Tonight Show w/ Jimmy Fallon",
              youtubeId: "uszxvzA88O4"
            },
            {
              title: "Michael B. Jordan × DP/30 (Fruitvale Station, 2013)",
              youtubeId: "WL6JTgvJSbg"
            },
          ]}
        />
        <H4>Michael P. Shawver Interviews</H4>
        <YouTubeGrid
          className="my-4"
          videos={[
            {
              title: "Michael P. Shawver × Avid (2018)",
              youtubeId: "rCb-i1IPcYM"
            }
          ]}
        />
        <H4>Warner Brothers</H4>
        <YouTubeGrid
          className="my-4"
          videos={[
            {
              title: "Becoming the Smokestack Twins",
              youtubeId: "s72cBC-v6UE"
            },
            {
              title: "Behind the Scenes",
              youtubeId: "wWvVQtutmVs"
            },
          ]}
        />
        <H4>Other Great Articles</H4>
        <BlogGrid
          className="my-4"
          posts={[
            {
              title: "Pick Poor Robin Clean (One More Thing I Love About Sinners)",
              url: "https://www.spectrecollie.com/2025/04/21/pick-poor-robin-clean-one-more-thing-i-love-about-sinners/"
            },
            {
              title: "8 ‘Sinners’ Fun Facts That’ll Change How You See the Film",
              url: "https://dangerbowie.com/2025/04/22/8-sinners-film-fun-facts/"
            },
          ]}
        />
      </div>

    </div>
  )
}

/* formatting (cleanup with .mdx later) */

function HeadingWithAnchor({
  as: Tag,
  children,
  className = "",
}: {
  as: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
}) {
  // Only use string for id generation
  const text = React.Children.toArray(children).map(child => {
    if (typeof child === 'string') return child;
    // If child is a React element, try to extract its string children
    if (React.isValidElement(child) && typeof child.props.children === 'string') {
      return child.props.children;
    }
    return '';
  }).join(' ');

  // Generate id: kebab-case, remove non-alphanumerics except dash/space, lowercased
  const id = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <Tag id={id} className={`group scroll-mt-24 ${className}`}>
      <span>{children}</span>
      <a
        href={`#${id}`}
        className="ml-2 align-middle opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400 hover:text-neutral-600"
        style={{ fontSize: '0.85em', verticalAlign: 'middle' }}
        aria-label="Anchor link"
      >
        #
      </a>
    </Tag>
  );
}

const H1 = (props: { children: React.ReactNode }) => (
  <HeadingWithAnchor as="h1" {...props} className="text-neutral-800 text-3xl font-semibold mb-2.5" />
);
const H2 = (props: { children: React.ReactNode }) => (
  <HeadingWithAnchor as="h2" {...props} className="text-neutral-800 text-2xl font-semibold mb-2.5" />
);
const H3 = (props: { children: React.ReactNode }) => (
  <HeadingWithAnchor as="h3" {...props} className="text-neutral-800 text-xl font-semibold mb-2.5" />
);
const H4 = (props: { children: React.ReactNode }) => (
  <HeadingWithAnchor as="h4" {...props} className="text-neutral-800 text-lg font-semibold mb-2.5" />
);
const H5 = (props: { children: React.ReactNode }) => (
  <HeadingWithAnchor as="h5" {...props} className="text-neutral-800 text-base font-semibold mb-2.5" />
);
const H6 = (props: { children: React.ReactNode }) => (
  <HeadingWithAnchor as="h6" {...props} className="text-neutral-800 text-base font-semibold mb-2.5" />
);
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
    <div className="text-neutral-800 mt-0.5 italic text-justify">{children}</div>
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
      <span className="w-4 h-4 rounded-full bg-neutral-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Film</title>
          <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
        </svg>
      </span>
      {timecode}
    </span>
  );
};

const ScoreTimecode = ({
  className,
  timecode,
  scoreItem,
  label,
  link
}: {
  className?: string;
  timecode?: string;
  scoreItem?: ScoreItem;
  label?: string;
  link?: string;
}) => {
  const pillContent = (
    <>
      <span className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Music</title>
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </span>
      {label && timecode ? `${label} (${timecode})` : label || timecode}
    </>
  );

  const href = link || scoreItem?.spotifyLink;

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={twMerge(
          "inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm whitespace-nowrap hover:bg-emerald-100 transition-colors",
          className
        )}
      >
        {pillContent}
      </a>
    );
  }

  return (
    <span className={twMerge(
      "inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm whitespace-nowrap",
      className
    )}>
      {pillContent}
    </span>
  );
};

const TurningPointTimecode = ({ timecode, scoreItem }: { timecode: string; scoreItem?: ScoreItem }) => {
  const pillContent = (
    <>
      <span className="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Turning Point</title>
          <path d="M12 2L8 6h3v4H5l-3 3 3 3h6v4h3l4-4h-3v-4h6l3-3-3-3h-6V6h3L12 2z" />
        </svg>
      </span>
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

const CastCrewPill = ({ href, className }: { href: string; className?: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        "inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm hover:bg-neutral-200 transition-colors whitespace-nowrap",
        className
      )}
    >
      <p className="text-xs text-neutral-600">Full Cast & Crew</p>
      <span className="text-xs">↗</span>
    </a>
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
