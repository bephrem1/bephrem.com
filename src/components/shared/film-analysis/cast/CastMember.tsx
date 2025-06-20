import type { FunctionComponent } from "react";
import Image from "../../elements/Image";

interface Props {
  characterName: string;
  characterImagePath: string;
  actorName: string;
  actorImagePath: string;
  size?: number; // Size in pixels for the avatar
  isActorSideUp: boolean;
  setIsActorSideUp: (value: boolean) => void;
  hideLabel?: boolean; // Whether to hide the character/actor name label
}

const CastMember: FunctionComponent<Props> = ({
  characterName,
  characterImagePath,
  actorName,
  actorImagePath,
  size = 75, // Default size of 75px if not provided
  isActorSideUp = false,
  setIsActorSideUp,
  hideLabel = false // Default to showing the label
}) => {
  return (
    <div
      className="flex flex-col items-start text-left"
      onMouseEnter={() => setIsActorSideUp(true)}
      onMouseLeave={() => setIsActorSideUp(false)}
    >
      <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
        <div
          className="absolute w-full h-full transition-transform duration-700"
          style={{
            transform: isActorSideUp ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <div
            className="absolute w-full h-full"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <Image
              path={characterImagePath}
              width={`${size}px`}
              maxWidth={`${size}px`}
              height={`${size}px`}
              maxHeight={`${size}px`}
              ext="jpg"
              alt={characterName}
              optimize={false}
              makeCircular
            />
          </div>
          <div
            className="absolute w-full h-full"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            <Image
              path={actorImagePath}
              width={`${size}px`}
              maxWidth={`${size}px`}
              height={`${size}px`}
              maxHeight={`${size}px`}
              ext="jpg"
              alt={actorName}
              optimize={false}
              makeCircular
            />
          </div>
        </div>
      </div>
      {!hideLabel && (
        <div className="flex-col w-full items-center justify-center ml-[-8px]">
          <div className="relative h-6" style={{ width: `${size}px` }}>
            <div
              className="absolute w-full transition-opacity duration-500"
              style={{ opacity: isActorSideUp ? 0 : 1 }}
            >
              <div className="text-xs text-left text-neutral-500 p-2 select-none">{characterName}</div>
            </div>
            <div
              className="absolute w-full transition-opacity duration-500"
              style={{ opacity: isActorSideUp ? 1 : 0 }}
            >
              <div className="text-xs text-left text-neutral-500 p-2 select-none">{actorName}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastMember;
