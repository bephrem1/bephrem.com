import clsx from 'clsx';
import { default as NextLink } from 'next/link';
import type { FunctionComponent } from 'react';
import { isEmpty } from '../../../helpers/empty';

enum LinkTypes {
  internal = 'internal',
  external = 'external'
}
type LinkType = keyof typeof LinkTypes;

export interface LinkProps {
  type: LinkType;
  dest: string;
  bold?: boolean;
  openInNewWindow?: boolean;
  underline?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;

  fillContainer?: boolean;
  className?: string;
  children?: React.ReactNode | Array<React.ReactNode>;
}

const Link: FunctionComponent<LinkProps> = ({
  type = LinkTypes.internal,
  dest,
  bold: isBold = false,
  openInNewWindow,
  underline = false,
  onClick,
  fillContainer,
  className,
  children
}) => {
  if (isEmpty(dest)) {
    return null;
  }

  const linkClass = clsx({
    'flex items-center justify-center': true,
    'w-full h-full': fillContainer,
    'w-fit h-fit': !fillContainer,
    'text-amber-400 hover:text-amber-300 visited:text-amber-300': true,
    'font-bold': isBold,
    underline: underline
  }, className);

  const LinkTag = (
    <a
      className={linkClass}
      style={{ display: 'inline' }}
      {...(type === LinkTypes.external && { href: dest })}
      {...(type === LinkTypes.external || openInNewWindow
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      {...(onClick ? { onClick } : {})}
    >
      {children}
    </a>
  );

  return type === LinkTypes.internal ? (
    <NextLink href={dest} legacyBehavior>
      {LinkTag}
    </NextLink>
  ) : (
    LinkTag
  );
};

export default Link;
