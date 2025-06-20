import type { FunctionComponent, ReactNode } from "react";
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
  synopsis: string | ReactNode;
  objectives: SceneObjective[];
  conflict: string;
  tactics: SceneTactic[];
  turningPoint: string;
  outcome: string;
  storyContribution: string | ReactNode;
  startTimecode?: string;
  turningPointTimecode?: string | string[];
  endTimecode?: string;
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

// Helper to parse timecode (e.g., "1:35" or "3:18") to seconds
function parseTimecodeToSeconds(tc?: string): number | null {
  if (!tc) return null;
  const parts = tc.split(":").map(Number);
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return null;
}

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
  endTimecode,
  className,
}) => {
  // Timeline logic
  const startSec = parseTimecodeToSeconds(startTimecode);
  const endSec = parseTimecodeToSeconds(endTimecode);

  // Convert turningPointTimecode to array if it's a single string
  const turningPointTimecodes = Array.isArray(turningPointTimecode)
    ? turningPointTimecode
    : turningPointTimecode
      ? [turningPointTimecode]
      : [];

  // Calculate turning point percentages
  const turningPointPercentages = turningPointTimecodes.map(tc => {
    const turningSec = parseTimecodeToSeconds(tc);
    if (startSec !== null && turningSec !== null && endSec !== null && endSec > startSec) {
      const percent = ((turningSec - startSec) / (endSec - startSec)) * 100;
      return Math.max(0, Math.min(100, percent));
    }
    return 0;
  });

  return (
    <div className={twMerge("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse border border-solid border-neutral-200" style={{ borderCollapse: 'collapse', borderWidth: 1, borderColor: '#e5e7eb', borderStyle: 'solid' }}>
        <tbody>
          {/* Synopsis */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800" style={borderStyle}>Synopsis</td>
            <td className="py-2.5 px-3 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={3}>
              {typeof synopsis === 'string' ? synopsis : synopsis}
            </td>
          </tr>

          {/* Scene Objective */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800 text-left align-top" style={borderStyle} rowSpan={objectives.length + 1}>Scene Objective</td>
            <th className="py-2.5 px-3 align-top bg-neutral-100 border border-solid border-neutral-200 text-xs font-medium text-neutral-400 text-center w-[56px]" style={borderStyle} />
            <th className="py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-xs font-medium text-neutral-500 text-left" style={borderStyle}>Explicit</th>
            <th className="py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-xs font-medium text-neutral-500 text-left" style={borderStyle}>Subtext <span className="text-neutral-400">(true desires)</span></th>
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
                <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800 text-left align-top" style={borderStyle} rowSpan={tactics.length}>
                  <p>Tactics</p>
                  <p className="text-neutral-400 text-xs font-light mt-1 select-none">how do characters resolve conflict?</p>
                </td>
              ) : null}
              <td className="py-4 px-4 align-top border border-solid border-neutral-200 w-[56px]" style={borderStyle}>
                <div className="flex items-center justify-center">
                  <CastMember
                    characterName={tactic.character.character.name}
                    characterImagePath={tactic.character.character.imagePath}
                    actorName={tactic.character.actor.name}
                    actorImagePath={tactic.character.actor.imagePath}
                    size={40}
                    isActorSideUp={false}
                    setIsActorSideUp={() => { }}
                    hideLabel
                  />
                </div>
              </td>
              <td className="py-4 px-4 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={2}>{tactic.tactic}</td>
            </tr>
          ))}

          {/* Turning Point */}
          <tr>
            <td className="w-[120px] py-2.5 px-3 align-top bg-neutral-50 border border-solid border-neutral-200 text-sm font-medium text-neutral-800" style={borderStyle}>Turning Point</td>
            <td className="py-2.5 px-3 align-top border border-solid border-neutral-200 text-neutral-600 text-sm" style={borderStyle} colSpan={3}>{turningPoint}</td>
          </tr>

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
            <td colSpan={4} className="py-1 h-[40px] px-3 align-middle border border-solid border-neutral-200" style={borderStyle}>
              {startTimecode && endTimecode ? (
                <div className="relative w-full flex items-center" style={{ minHeight: 40 }}>
                  {/* Line */}
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-neutral-200 rounded-full" style={{ zIndex: 0, transform: 'translateY(-50%)' }} />
                  {/* Start pill */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                    <FilmTimecode timecode={startTimecode} />
                  </div>
                  {/* End pill (only if not duplicated by a turning point) */}
                  {!(turningPointTimecodes.includes(endTimecode ?? "")) && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                      <FilmTimecode timecode={endTimecode} />
                    </div>
                  )}
                  {/* Turning point pills */}
                  {turningPointTimecodes.map((timecode, index) => {
                    // If this turning point is at the end, use the same position as the end pill
                    const isAtEnd = timecode === endTimecode;
                    const leftStyle = isAtEnd
                      ? 'right: 0;'
                      : `left: calc(${turningPointPercentages[index]}% - 48px * ${turningPointPercentages[index] / 100})`;
                    return (
                      <div
                        key={timecode}
                        className="absolute top-1/2 -translate-y-1/2 z-20"
                        style={isAtEnd ? { right: 0 } : { left: `calc(${turningPointPercentages[index]}% - 48px * ${turningPointPercentages[index] / 100})` }}
                      >
                        <TurningPointTimecode timecode={timecode} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <span className="text-neutral-400 text-xs">No timeline data</span>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div >
  );
};

export default SceneOverview;
