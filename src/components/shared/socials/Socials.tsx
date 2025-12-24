import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faLetterboxd } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { FunctionComponent } from 'react';
import { EXTERNAL_LINKS } from '../../../helpers/urls';
import XLogo from '../../../icons/lib/companies/XLogo';
import Link from '../elements/Link';

interface Props {
  compressed?: boolean;
}

const Socials: FunctionComponent<Props> = ({ compressed = false }) => {
  const socials = {
    twitter: EXTERNAL_LINKS.SOCIAL.TWITTER,
    linkedin: EXTERNAL_LINKS.SOCIAL.LINKEDIN,
    substack: EXTERNAL_LINKS.SOCIAL.SUBSTACK,
    letterboxd: EXTERNAL_LINKS.SOCIAL.LETTERBOXD,
  };

  return (
    <div className="flex flex-row whitespace-nowrap">
      {Object.entries(socials).map(([socialType, url]) => {
        if (!url) {
          return null;
        }

        return <SocialLink key={socialType} type={socialType} url={url} compressed={compressed} />;
      })}
    </div>
  );
};

const SocialLink = ({ type, url, compressed }) => {
  const getIcon = () => {
    switch (type) {
      case 'twitter':
        return (
          <XLogo
            className={clsx({
              'w-2.5 h-2.5': compressed,
              'w-3 h-3': !compressed
            })}
            stroke="fill-neutral-800"
          />
        );
      case 'linkedin':
        return (
          <FontAwesomeIcon
            icon={faLinkedin}
            className={clsx({
              'text-neutral-600': true,
              'w-3.5 h-3.5': compressed,
              'w-4 h-4': !compressed
            })}
          />
        );
      case 'substack':
        return (
          <SubstackIcon
            className={clsx({
              'text-neutral-600': true,
              'w-3 h-3': compressed,
              'w-3.5 h-3.5': !compressed
            })}
          />
        );
      case 'letterboxd':
        return (
          <FontAwesomeIcon
            icon={faLetterboxd}
            className={clsx({
              'text-neutral-600': true,
              'w-3.5 h-3.5': compressed,
              'w-4 h-4': !compressed
            })}
          />
        );
      default:
        return null;
    }
  };
  const Icon = getIcon();

  const className = clsx({
    'w-fit h-fit': true,
    'mr-2 sm:mr-2': compressed,
    'mr-3 sm:mr-2.5': !compressed,
    'last:mr-0 sm:last:mr-0': true
  });
  const containerClassName = clsx({
    'flex flex-row items-center justify-center': true,
    'hover:bg-neutral-100': true,
    'border border-solid border-neutral-200': true,
    'w-8 h-8 sm:w-7 sm:h-7': compressed,
    'w-9 h-9 sm:w-7 sm:h-7': !compressed,
    'rounded-lg': true
  });

  return (
    <div className={className}>
      <Link type="external" dest={url} fillContainer openInNewWindow>
        <div className={containerClassName}>{Icon}</div>
      </Link>
    </div>
  );
};

const SubstackIcon: FunctionComponent<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
  </svg>
);

export default Socials;
