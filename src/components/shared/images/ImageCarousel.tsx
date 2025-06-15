import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from '../elements/Image';

type ImageExtension = 'svg' | 'png' | 'gif' | 'jpg';

interface ImageCarouselProps {
  images: string[];
  imageExts: ImageExtension[];
  captions?: string[];
  height?: number;
  showArrows?: boolean;
  squareCrop?: boolean;
  inspectable?: boolean;
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  imageExts,
  captions,
  height = 400,
  showArrows = true,
  squareCrop = false,
  inspectable = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveToIndex = useCallback((index: number) => {
    let newIndex = index;
    if (index < 0) newIndex = images.length - 1;
    if (index >= images.length) newIndex = 0;
    setCurrentIndex(newIndex);
  }, [images.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!containerRef.current?.matches(':hover')) return;

    switch (e.key) {
      case 'ArrowLeft':
        moveToIndex(currentIndex - 1);
        break;
      case 'ArrowRight':
        moveToIndex(currentIndex + 1);
        break;
      case 'ArrowUp':
        moveToIndex(0);
        break;
      case 'ArrowDown':
        moveToIndex(images.length - 1);
        break;
    }
  }, [currentIndex, moveToIndex, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const getImageStyle = (index: number) => {
    const diff = index - currentIndex;
    const scale = diff === 0 ? 1 : 0.8;

    const isLastItem = currentIndex === images.length - 1;
    const isFirstItem = currentIndex === 0;

    let opacity = 1;
    if (diff !== 0) {
      if (diff > 0) {
        opacity = isLastItem ? 0 : 0.2;
      } else {
        opacity = isFirstItem ? 0 : 0.2;
      }
    }

    const zIndex = diff === 0 ? 2 : 1;
    const x = diff * 60;

    return {
      scale,
      opacity,
      zIndex,
      x: `${x}%`,
      fadeDirection: diff < 0 ? 'right' : diff > 0 ? 'left' : null
    };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex items-center justify-center py-8 md:py-8 md:px-16"
      style={{ height: height ? `${height}px` : 'auto' }}
    >
      {showArrows && (
        <>
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 left-4 md:-left-12 bg-neutral-50/80 hover:bg-neutral-50/90 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 transition-all focus:outline-none focus:ring-2 focus:ring-black/10"
            onClick={() => moveToIndex(currentIndex - 1)}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            className="absolute top-1/2 -translate-y-1/2 right-4 md:-right-12 bg-neutral-50/80 hover:bg-neutral-50/90 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-10 transition-all focus:outline-none focus:ring-2 focus:ring-black/10"
            onClick={() => moveToIndex(currentIndex + 1)}
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}

      <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center">
        <AnimatePresence initial={false}>
          {images.map((imagePath, index) => {
            const style = getImageStyle(index);
            const isVisible = Math.abs(index - currentIndex) <= 1;

            if (!isVisible) return null;

            const caption = captions?.[index];
            const fullImagePath = `/images/${imagePath}.${imageExts[index]}`;

            return (
              <motion.div
                key={imagePath}
                className="absolute inset-0 flex flex-col items-start justify-center cursor-pointer w-full"
                initial={false}
                animate={{
                  scale: style.scale,
                  opacity: style.opacity,
                  x: style.x,
                  zIndex: style.zIndex,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={() => moveToIndex(index)}
              >
                <div className={`relative w-full ${squareCrop ? 'h-full' : 'h-auto'} rounded flex items-center justify-center overflow-hidden`}>
                  {style.fadeDirection === 'left' && (
                    <div className="absolute left-0 top-0 bottom-0 w-[20%] pointer-events-none z-10 bg-gradient-to-r from-neutral-50/60 to-transparent" />
                  )}
                  {style.fadeDirection === 'right' && (
                    <div className="absolute right-0 top-0 bottom-0 w-[20%] pointer-events-none z-10 bg-gradient-to-l from-neutral-50/60 to-transparent" />
                  )}
                  <button
                    type="button"
                    className="w-full h-full focus:outline-none focus:ring-2 focus:ring-black/10"
                    onClick={(e) => {
                      if (e.target === e.currentTarget) {
                        moveToIndex(index);
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (e.target === e.currentTarget) {
                          moveToIndex(index);
                        }
                      }
                    }}
                  >
                    <Image
                      path={imagePath}
                      ext={imageExts[index]}
                      alt={caption || `Image ${index + 1}`}
                      width="100%"
                      height={squareCrop ? "100%" : "auto"}
                      optimize={false}
                      inspectable={index === currentIndex}
                      style={{
                        objectFit: squareCrop ? 'cover' : 'contain',
                        width: '100%',
                        height: squareCrop ? '100%' : 'auto'
                      }}
                    />
                  </button>
                </div>
                {caption && (
                  <p className="mt-2 text-sm text-neutral-400">
                    {caption}
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
