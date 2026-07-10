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
};

const PosterLightbox: FunctionComponent<PosterLightboxProps> = ({ src, alt, className }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn('block h-full w-full cursor-zoom-in', className)}
          aria-label={`View enlarged ${alt}`}
        >
          <img src={src} alt={alt} className="block h-full w-full object-cover object-center" />
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[1000] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <img
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-[0.72] saturate-125"
          />
          <div className="absolute inset-0 bg-black/15" aria-hidden />
        </DialogPrimitive.Overlay>
        <div className="fixed inset-0 z-[1010] flex items-center justify-center p-6">
          <DialogPrimitive.Content className="relative flex max-h-[92vh] max-w-[min(92vw,26rem)] items-center justify-center outline-none sm:max-w-[min(92vw,32rem)]">
            <DialogTitle className="sr-only">{alt}</DialogTitle>
            <DialogClose className="fixed left-6 top-6 z-[1020] rounded-full bg-white/25 p-2.5 ring-1 ring-black/5 backdrop-blur-sm transition-colors hover:bg-white/40">
              <Cross2Icon className="h-5 w-5 text-black" />
              <span className="sr-only">Close</span>
            </DialogClose>
            <img
              src={src}
              alt={alt}
              className="max-h-[92vh] w-auto max-w-full object-contain shadow-2xl"
              draggable={false}
            />
          </DialogPrimitive.Content>
        </div>
      </DialogPortal>
    </Dialog>
  );
};

export default PosterLightbox;
