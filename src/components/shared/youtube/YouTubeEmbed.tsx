import type { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";
import ArrowUpRightIcon from "../../../icons/lib/ArrowUpRightIcon";

interface Props {
  title: string;
  youtubeId: string;
  description?: string;
  className?: string;
}

const YouTubeEmbed: FunctionComponent<Props> = ({
  title,
  youtubeId,
  description,
  className
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      <div className="border border-neutral-200 rounded-lg overflow-hidden group">
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <a
          href={`https://www.youtube.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block p-4 hover:bg-neutral-50 transition-colors"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className={twMerge(
                "text-neutral-600 text-sm font-medium group-hover:text-neutral-800 transition-colors",
                description ? "mb-1.5" : ""
              )}>
                {title}
              </h3>
              {description && (
                <p className="text-neutral-500 text-sm">{description}</p>
              )}
            </div>
            <ArrowUpRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0 mt-1" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default YouTubeEmbed;
