import { type FunctionComponent, useEffect, useRef, useState } from "react";
import { Button } from "../../shadcn/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../shadcn/components/ui/tooltip";
import CastMember from "./CastMember";

export type CastItem = {
  character: {
    name: string;
    imagePath: string;
  }
  actor: {
    name: string;
    imagePath: string;
  }
}

interface Props {
  cast: Array<CastItem>;
}

const CastMembers: FunctionComponent<Props> = ({ cast: items }) => {
  const [isActorSideUpValues, setIsActorSideUpValues] = useState<boolean[]>(Array(items.length).fill(false));
  const [isAllFlipped, setIsAllFlipped] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Keep button state in sync with cards
  useEffect(() => {
    const anyActorsShowing = isActorSideUpValues.some(isUp => isUp);
    setIsAllFlipped(anyActorsShowing);
  }, [isActorSideUpValues]);

  const handleSetIsActorSideUp = (index: number, value: boolean) => {
    setIsActorSideUpValues(prev => {
      const newValues = [...prev];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleFlipAll = () => {
    const newFlippedState = !isAllFlipped;
    setIsActorSideUpValues(Array(items.length).fill(newFlippedState));

    if (newFlippedState) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Set new timeout to flip back after 4 seconds
      timeoutRef.current = setTimeout(() => {
        setIsActorSideUpValues(prev => {
          const anyActorsShowing = prev.some(isUp => isUp);
          return anyActorsShowing ? Array(items.length).fill(false) : prev;
        });
      }, 4000);
    } else {
      // If we're flipping back manually, clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  };

  return <div className="w-full relative -ml-2">
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 relative gap-x-0 gap-y-4">
      {items.map(({ character, actor }, index) => (
        <CastMember
          key={character.name}
          characterName={character.name}
          characterImagePath={character.imagePath}
          actorName={actor.name}
          actorImagePath={actor.imagePath}
          isActorSideUp={isActorSideUpValues[index]}
          setIsActorSideUp={(value) => handleSetIsActorSideUp(index, value)}
        />
      ))}
      <div className="absolute bottom-0 right-0 translate-x-[24px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFlipAll}
              className="h-8 w-8 p-0 rounded-tl-md rounded-tr-md rounded-bl-md rounded-br-none"
              aria-label={isAllFlipped ? "Show all characters" : "Show all actors"}
            >
              <div className="relative w-3 h-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className={`absolute ${isAllFlipped ? 'animate-shuffle-front' : 'animate-shuffle-back'} text-neutral-400`}
                  role="img"
                  aria-hidden="true"
                >
                  <path d="M16 4H6C4.897 4 4 4.897 4 6v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="none"
                  className={`absolute ${isAllFlipped ? 'animate-shuffle-back' : 'animate-shuffle-front'} text-neutral-400`}
                  role="img"
                  aria-hidden="true"
                >
                  <path d="M18 2H8C6.897 2 6 2.897 6 4v16c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z" fillOpacity="0.8" />
                </svg>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" align="center">
            <p>{isAllFlipped ? "Show all characters" : "Show all actors"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  </div>
};

export default CastMembers;
