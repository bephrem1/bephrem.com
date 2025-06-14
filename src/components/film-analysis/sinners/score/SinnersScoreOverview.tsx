import { twMerge } from "tailwind-merge";
import { type ScoreItem, SinnersScore } from "../score";

interface ScoreSection {
  description: string;
  subtext?: string;
  scoreItems: ScoreItem[];
}

interface Props {
  className?: string;
}

const SinnersScoreOverview = ({ className }: Props) => {
  return (
    <div className={twMerge("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse">
        <tbody>
          {scoreSections.map((section, index) => (
            <tr key={`row-${section.description}`} className="border-b border-neutral-200">
              {/* Number column */}
              <td className="w-8 py-2 text-neutral-400 text-sm font-mono">
                {index + 1}
              </td>

              {/* Description */}
              <td className="w-64 py-2">
                <div className="text-neutral-500 text-sm">
                  {section.description}
                </div>
                {section.subtext && (
                  <div className="text-neutral-400 text-xs mt-0.5">
                    {section.subtext}
                  </div>
                )}
              </td>

              {/* Score items */}
              <td className="py-2">
                <div className="flex flex-wrap gap-2">
                  {section.scoreItems.map((item) => (
                    <ScoreItemPill key={item.name} item={item} />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface ScoreItemPillProps {
  item: ScoreItem;
  className?: string;
}

export const ScoreItemPill = ({ item, className }: ScoreItemPillProps) => {
  return (
    <a
      href={item.spotifyLink}
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        "inline-flex items-center gap-1.5 px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-sm hover:bg-neutral-200 transition-colors whitespace-nowrap",
        className
      )}
    >
      <div className="w-4 h-4 rounded-full bg-neutral-600 flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="w-2.5 h-2.5"
          aria-hidden="true"
        >
          <title>Play</title>
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {item.name}
    </a>
  );
};

const scoreSections: ScoreSection[] = [
  {
    description: "Opening & Introduction (Annie's Voiceover)",
    scoreItems: [SinnersScore.FilídhFireKeepersAndGriots,],
  },
  {
    description: "Sunday Morning Service (Sammie Returns)",
    scoreItems: [SinnersScore.ThisLittleLightOfMine,],
  },
  {
    description: "Sammie Goes to His Plantation Cabin, Smoke & Stack Introduced",
    scoreItems: [SinnersScore.SmokestackTwins,],
  },
  {
    description: "The Trio Goes Downtown",
    scoreItems: [SinnersScore.WangDangDoodle],
  },
  {
    description: "Grace, Bo, & Lil' Lisa's Shop",
    scoreItems: [SinnersScore.GraceBoAndLilLisa],
  },
  {
    description: "Sammie Rides with Stack",
    scoreItems: [SinnersScore.Travelin],
  },
  {
    description: "Delta Slim's Patch",
    scoreItems: [SinnersScore.DeltaSlimsPatch, SinnersScore.Juke],
  },
  {
    description: "Sammie Meets Pearline",
    scoreItems: [SinnersScore.ClarksdaleLove],
  },
  {
    description: "Smoke Goes to Annie's Shack",
    scoreItems: [SinnersScore.Séance, SinnersScore.WhyYouHere],
  },
  {
    description: "Joan & Bert's Shack",
    scoreItems: [SinnersScore.NotWhatHeSeems, SinnersScore.InMoonlight],
  },
  {
    description: "Mary Confronts Stack (\"I waited...I waited a long time...\")",
    scoreItems: [SinnersScore.Dangerous],
  },
  {
    description: "Sammie Performs + Surreal Montage",
    scoreItems: [SinnersScore.ILiedToYou, SinnersScore.MagicWhatWeDoSurrealMontage],
  },
  {
    description: "Vampires Walk Up",
    scoreItems: [SinnersScore.PickPoorRobinClean],
  },
  {
    description: "Juke Ambiance",
    scoreItems: [SinnersScore.CantWinForLosin, SinnersScore.OldCornLiquor],
  },
  {
    description: "Upstairs — Smoke & Sammie, Mary & Stack",
    scoreItems: [SinnersScore.MoundBayouProperBlackFolks],
  },
  {
    description: "Mary Walks Outside",
    scoreItems: [SinnersScore.WillYeGoLassieGo],
  },
  {
    description: "Juke's Euphoric Ascent",
    scoreItems: [SinnersScore.PalePaleMoon],
  },
  {
    description: "Stack Dies",
    scoreItems: [SinnersScore.SheSaidWe],
  },
  {
    description: "Cornbread Returns",
    scoreItems: [SinnersScore.PlayinGamesTellinGhostStories, SinnersScore.HoleUpTilSunrise],
  },
  {
    description: "Remmick's Irish Jig",
    subtext: "This is my favorite musical track & scene.",
    scoreItems: [SinnersScore.RockyRoadToDublin],
  },
  {
    description: "Remmick Returns, Stack Confronts Smoke",
    scoreItems: [SinnersScore.TogetherForever],
  },
  {
    description: "The Grand Juke Battle",
    scoreItems: [SinnersScore.ThyKingdomCome],
  },
  {
    description: "The Morning Aftermath",
    scoreItems: [SinnersScore.BuryThatGuitar],
  },
  {
    description: "Smoke's Last Stand",
    subtext: "This one's a sleeper, but it's my favorite score track.",
    scoreItems: [SinnersScore.GrandClosin],
  },
  {
    description: "Smoke Dies, Accepts His Baby From Annie",
    scoreItems: [SinnersScore.Elijah],
  },
  {
    description: "Buddy Guy in Chicago",
    scoreItems: [SinnersScore.IveSeenEnoughOfThisPlace, SinnersScore.LastTimeISeenTheSun, SinnersScore.FreeForADay],
  },
  {
    description: "End Credits",
    scoreItems: [SinnersScore.Sinners],
  },
];

export default SinnersScoreOverview;
