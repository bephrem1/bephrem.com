import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { default as NextImage } from 'next/image';
import type { FunctionComponent } from 'react';
import React from 'react';
import { Dialog, DialogClose, DialogOverlay, DialogPortal, DialogTrigger } from '../shadcn/components/ui/dialog';
import { cn } from '../shadcn/lib/utils';

enum ImageExtensions {
  svg = 'svg',
  png = 'png',
  gif = 'gif',
  jpg = 'jpg'
}
type ImageExtension = keyof typeof ImageExtensions;

export interface ImageProps {
  path?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  srcOverride?: string;
  alt?: string;
  ext?: ImageExtension;
  optimize?: boolean;
  borderColor?: string;
  borderThickness?: string;
  curveCorners?: boolean;
  makeCircular?: boolean;
  style?: React.CSSProperties;
  inspectable?: boolean;

  onClick?: (e?: any) => void;
}

const Image: FunctionComponent<ImageProps> = ({
  path,
  width,
  maxWidth,
  height,
  maxHeight,
  srcOverride,
  alt,
  ext,
  optimize = true,
  borderColor,
  borderThickness,
  curveCorners,
  makeCircular,
  onClick,
  style,
  inspectable = false
}) => {
  if (!srcOverride && (!path || !ext)) {
    return null;
  }
  path = cleanPath(path, ext);

  const hasBorder = !!borderColor || !!borderThickness;
  const sharedStyle = {
    ...style,
    ...(maxWidth ? { maxWidth } : {}),
    ...(maxHeight ? { maxHeight } : {}),
    ...(hasBorder
      ? {
        border: `${borderThickness || '1px'} solid ${borderColor}`
      }
      : {}),
    ...(curveCorners ? { borderRadius: '10px' } : {}),
    ...(makeCircular ? { borderRadius: '50%' } : {}),
    ...(inspectable ? { cursor: 'zoom-in' } : {}),
    alignSelf: 'center'
  };

  const src = srcOverride ? srcOverride : `/images/${path}.${ext}`;
  const sharedProps = {
    src,
    draggable: false,
    alt,
    onClick
  };

  const imageElement = optimize ? (
    <NextImage
      {...sharedProps}
      width={Number.parseInt(width, 10)}
      height={Number.parseInt(height, 10)}
      style={sharedStyle}
    />
  ) : (
    <img {...sharedProps} width={width} height={height} style={sharedStyle} />
  );

  if (inspectable) {
    const [open, setOpen] = React.useState(false);

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {React.cloneElement(imageElement, { onClick: () => setOpen(true) })}
        </DialogTrigger>
        <CustomDialogContent>
          <DialogClose className="absolute left-6 top-6 p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-[1000]">
            <Cross2Icon className="h-5 w-5 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <img
            {...sharedProps}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              width: 'auto',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </CustomDialogContent>
      </Dialog>
    );
  }

  return imageElement;
};

const cleanPath = (path: string, ext: ImageExtension): string => {
  let cleanedPath = path;

  if (cleanedPath.startsWith('/')) {
    cleanedPath = cleanedPath.slice(1);
  }

  const lastDotIndex = cleanedPath.lastIndexOf('.');
  if (lastDotIndex > -1) {
    cleanedPath = cleanedPath.slice(0, lastDotIndex);
  }

  return cleanedPath;
};

// Custom DialogContent without the default close button
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay className="!z-[1000]" />
    <div className="fixed inset-0 z-[1010] flex items-center justify-center">
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          'p-0 border-none bg-transparent flex items-center justify-center',
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </div>
  </DialogPortal>
));
CustomDialogContent.displayName = 'CustomDialogContent';

export default Image;
