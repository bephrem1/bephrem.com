import type { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";
import type { CastItem } from "../../../film-analysis/sinners/cast";
import CastMember from "../cast/CastMember";

interface SceneObjective {
  character: CastItem;
  explicit: string;
  subtext: string;
}

interface SceneTactic {
  character: CastItem;
  tactic: string;
}

interface Props {
  synopsis: string;
  objectives: SceneObjective[];
  conflict: string;
  tactics: SceneTactic[];
  turningPoint: string;
  outcome: string;
  storyContribution: string;
  startTimecode?: string;
  turningPointTimecode?: string;
  className?: string;
}

const borderStyle = { borderWidth: 1, borderColor: '#e5e7eb', borderStyle: 'solid' };

// Local FilmTimecode and TurningPointTimecode components
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

const TurningPointTimecode = ({ timecode }: { timecode: string }) => {
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
  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-orange-50 text-orange-600 rounded-full text-sm whitespace-nowrap">
      {pillContent}
    </span>
  );
};

const SceneOverview: FunctionComponent<Props> = ({
  synopsis,
  objectives,
  conflict,
  tactics,
  turningPoint,
  outcome,
  storyContribution,
  startTimecode,
  turningPointTimecode,
  className,
}) => {
  return (
    <div className={twMerge("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse border border-solid border-neutral-200" style={{ borderCollapse: 'collapse', borderWidth: 1, borderColor: '#e5e7eb', borderStyle: 'solid' }}>
        <tbody>
          {/* Synopsis */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800" style={borderStyle}>Synopsis</td>
            <td className="py-2.5 px-3 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={3}>{synopsis}</td>
          </tr>

          {/* Scene Objective */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800 text-left align-top" style={borderStyle} rowSpan={objectives.length + 1}>Scene Objective</td>
            <th className="py-2.5 px-3 align-top bg-neutral-100 border border-solid border-neutral-200 text-xs font-medium text-neutral-400 text-center w-[56px]" style={borderStyle} />
            <th className="py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-xs font-medium text-neutral-500 text-left" style={borderStyle}>Explicit</th>
            <th className="py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-xs font-medium text-neutral-500 text-left" style={borderStyle}>Subtext</th>
          </tr>
          {objectives.map((objective) => (
            <tr key={objective.character.character.name}>
              <td className="py-4 px-4 align-top border border-solid border-neutral-200 w-[56px]" style={borderStyle}>
                <div className="flex items-center justify-center">
                  <CastMember
                    characterName={objective.character.character.name}
                    characterImagePath={objective.character.character.imagePath}
                    actorName={objective.character.actor.name}
                    actorImagePath={objective.character.actor.imagePath}
                    size={48}
                    isActorSideUp={false}
                    setIsActorSideUp={() => { }}
                    hideLabel
                  />
                </div>
              </td>
              <td className="py-4 px-4 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle}>{objective.explicit}</td>
              <td className="py-4 px-4 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle}>{objective.subtext}</td>
            </tr>
          ))}

          {/* Conflict */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800" style={borderStyle}>Conflict</td>
            <td className="py-2.5 px-3 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={3}>{conflict}</td>
          </tr>

          {/* Tactics */}
          {tactics.map((tactic, idx) => (
            <tr key={tactic.character.character.name}>
              {idx === 0 ? (
                <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800 text-left align-top" style={borderStyle} rowSpan={tactics.length}>Tactics</td>
              ) : null}
              <td className="py-4 px-4 align-top border border-solid border-neutral-200 w-[56px]" style={borderStyle}>
                <div className="flex items-center justify-center">
                  <CastMember
                    characterName={tactic.character.character.name}
                    characterImagePath={tactic.character.character.imagePath}
                    actorName={tactic.character.actor.name}
                    actorImagePath={tactic.character.actor.imagePath}
                    size={48}
                    isActorSideUp={false}
                    setIsActorSideUp={() => { }}
                    hideLabel
                  />
                </div>
              </td>
              <td className="py-4 px-4 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={2}>{tactic.tactic}</td>
            </tr>
          ))}

          {/* Scene Outcome */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800" style={borderStyle}>Scene Outcome</td>
            <td className="py-2.5 px-3 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={3}>{outcome}</td>
          </tr>

          {/* Story Contribution */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800" style={borderStyle}>Story Contribution</td>
            <td className="py-2.5 px-3 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={3}>{storyContribution}</td>
          </tr>

          {/* Timecode Row (last) */}
          <tr>
            <td className="w-[120px] py-1 h-[40px] px-3 align-middle bg-neutral-100 border border-solid border-neutral-200 text-xs font-medium text-neutral-500" style={borderStyle}>Starts At</td>
            <td className="py-1 h-[40px] px-3 align-middle border border-solid border-neutral-200" style={borderStyle}>
              {startTimecode && <FilmTimecode timecode={startTimecode} />}
            </td>
            <td className="py-1 h-[40px] px-3 align-middle bg-neutral-100 border border-solid border-neutral-200 text-xs font-medium text-neutral-500" style={borderStyle}>Turning Point</td>
            <td className="py-1 h-[40px] px-3 align-middle border border-solid border-neutral-200" style={borderStyle}>
              {turningPointTimecode && <TurningPointTimecode timecode={turningPointTimecode} />}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SceneOverview;
