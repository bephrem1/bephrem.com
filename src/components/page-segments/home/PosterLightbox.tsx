import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Dialog, DialogClose, DialogPortal, DialogTitle, DialogTrigger } from '../../shared/shadcn/components/ui/dialog';
import { cn } from '../../shared/shadcn/lib/utils';

type PosterLightboxProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

const PosterLightbox: FunctionComponent<PosterLightboxProps> = ({ src, alt, className, imgClassName }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn('block h-full w-full cursor-zoom-in', className)}
          aria-label={`View enlarged ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className={cn('block h-full w-full object-cover object-center', imgClassName)}
          />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[1000] bg-black/55 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <div className="fixed inset-0 z-[1010] flex items-center justify-center p-4 sm:p-8">
          <DialogPrimitive.Content className="relative flex max-h-[94vh] max-w-[94vw] items-center justify-center outline-none">
            <DialogTitle className="sr-only">{alt}</DialogTitle>
            <DialogClose className="fixed left-6 top-6 z-[1020] rounded-full bg-white/15 p-2.5 ring-1 ring-white/10 backdrop-blur-sm transition-colors hover:bg-white/30">
              <Cross2Icon className="h-5 w-5 text-white" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <img
              src={src}
              alt={alt}
              className="max-h-[94vh] w-auto max-w-[94vw] object-contain"
              draggable={false}
            />
          </DialogPrimitive.Content>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default PosterLightbox;
