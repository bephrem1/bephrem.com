import { default as NextImage } from 'next/image';
import type { FunctionComponent } from 'react';

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
  style
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
    alignSelf: 'center'
  };

  const src = srcOverride ? srcOverride : `/images/${path}.${ext}`;
  const sharedProps = {
    src,
    draggable: false,
    alt,
    onClick
  };

  return optimize ? (
    <NextImage
      {...sharedProps}
      width={Number.parseInt(width, 10)}
      height={Number.parseInt(height, 10)}
      style={sharedStyle}
    />
  ) : (
    <img {...sharedProps} width={width} height={height} style={sharedStyle} />
  );
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

export default Image;
