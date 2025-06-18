import type { FunctionComponent } from "react";
import { twMerge } from "tailwind-merge";
import ArrowUpRightIcon from "../../../icons/lib/ArrowUpRightIcon";

interface BlogPost {
  title: string;
  url: string;
  description?: string;
}

interface Props {
  posts: BlogPost[];
  className?: string;
  gridClassName?: string;
}

const ShapePlaceholder = ({ index }: { index: number }) => {
  const shapes = [
    // Circle
    <div key="circle" className="w-16 h-16 rounded-full bg-neutral-200" />,
    // Triangle
    <div key="triangle" className="w-16 h-16 bg-neutral-200" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />,
    // Hexagon
    <div key="hexagon" className="w-16 h-16 bg-neutral-200" style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }} />,
    // Trapezoid
    <div key="trapezoid" className="w-16 h-16 bg-neutral-200" style={{ clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)" }} />,
  ];

  return shapes[index % shapes.length];
};

const BlogGrid: FunctionComponent<Props> = ({
  posts,
  className,
  gridClassName
}) => {
  return (
    <div className={twMerge("w-full", className)}>
      <div className={twMerge("grid grid-cols-1 md:grid-cols-2 gap-4", gridClassName)}>
        {posts.map((post, index) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block border border-neutral-200 rounded-lg overflow-hidden group hover:bg-neutral-50 transition-colors"
          >
            <div className="aspect-video bg-neutral-100 flex items-center justify-center">
              <ShapePlaceholder index={index} />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className={twMerge(
                    "text-neutral-600 text-sm font-medium group-hover:text-neutral-800 transition-colors",
                    post.description ? "mb-1.5" : ""
                  )}>
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-neutral-500 text-sm">{post.description}</p>
                  )}
                </div>
                <ArrowUpRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0 mt-1" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default BlogGrid; 