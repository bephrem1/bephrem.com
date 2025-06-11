import { type FunctionComponent, useEffect, useState } from "react";
import Image from "../../elements/Image";

interface Props {
  characterName: string;
  characterImagePath: string;
  actorName: string;
  actorImagePath: string;

  isActorSideUp: boolean;
  setIsActorSideUp: (value: boolean) => void;
}

const CastMember: FunctionComponent<Props> = ({
  characterName,
  characterImagePath,
  actorName,
  actorImagePath,
  isActorSideUp = false,
  setIsActorSideUp
}) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered && !isActorSideUp) {
      setIsActorSideUp(true);
    } else if (!isHovered && isActorSideUp) {
      setIsActorSideUp(false);
    }
  }, [isHovered]);

  return <div className="flex flex-col items-center text-center"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div className="relative w-[75px] h-[75px] perspective-1000" style={{ perspective: '1000px' }}>
      <div
        className="absolute w-full h-full transition-all duration-700 transform-style-3d"
        style={{
          transform: isActorSideUp ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="absolute w-full h-full backface-hidden">
          <Image
            path={characterImagePath}
            width="75px"
            maxWidth="75px"
            height="75px"
            maxHeight="75px"
            ext="jpg"
            alt={characterName}
            optimize={false}
            makeCircular
          />
        </div>
        <div
          className="absolute w-full h-full backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <Image
            path={actorImagePath}
            width="75px"
            maxWidth="75px"
            height="75px"
            maxHeight="75px"
            ext="jpg"
            alt={actorName}
            optimize={false}
            makeCircular
          />
        </div>
      </div>
    </div>
    <div className="flex-col w-full items-center justify-center">
      <div className="relative h-6">
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
  </div>
};

export default CastMember;
