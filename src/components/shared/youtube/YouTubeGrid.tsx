import type { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";
import ArrowUpRightIcon from "../../../icons/lib/ArrowUpRightIcon";

interface Interview {
  title: string;
  youtubeId: string;
  description?: string;
}

interface Props {
  videos: Interview[];
  className?: string;
  gridClassName?: string;
}

const YouTubeGrid: FunctionComponent<Props> = ({
  videos,
  className,
  gridClassName
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      <div className={twMerge("grid grid-cols-1 md:grid-cols-2 gap-4", gridClassName)}>
        {videos.map((interview, index) => (
          <div
            key={interview.youtubeId}
            className="border border-neutral-200 rounded-lg overflow-hidden group"
          >
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${interview.youtubeId}`}
                title={interview.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <a
              href={`https://www.youtube.com/watch?v=${interview.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className={twMerge(
                    "text-neutral-600 text-sm font-medium group-hover:text-neutral-800 transition-colors",
                    interview.description ? "mb-1.5" : ""
                  )}>
                    {interview.title}
                  </p>
                  {interview.description && (
                    <p className="text-neutral-500 text-sm">{interview.description}</p>
                  )}
                </div>
                <ArrowUpRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0 mt-1" />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YouTubeGrid; 