import { EXTERNAL_LINKS, INTERNAL_LINKS } from '../../../helpers/urls';

import { FunctionComponent } from 'react';
import { useIsOnPath } from '../../../hooks/urls';
import Link from '../elements/Link';
import Socials from '../socials/Socials';

interface Props {
  children: React.ReactNode;
}

const SiteLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-svh items-center bg-neutral-900">
      <div className="flex flex-col w-full sm:w-[700px] px-4 sm:px-0 min-h-svh">{children}</div>

      <UniversalFooter />
    </div>
  );
};

const UniversalFooter = () => {
  return (
    <div className="flex flex-row justify-between w-full items-center px-8 pt-4 pb-6">
      <div className="flex-1 hidden sm:flex">
        <Name />
      </div>

      <div className="flex-1 flex sm:justify-center">
        <Socials compressed />
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex flex-row items-center">
          <Link type="external" dest={EXTERNAL_LINKS.GITHUB.REPO}>
            <p className="text-neutral-100 text-xs font-mono mr-3">(source)</p>
          </Link>
          <p className="text-neutral-100 text-xl">☻</p>
        </div>
      </div>
    </div>
  );
};

const Name = () => {
  const onHomepage = useIsOnPath(INTERNAL_LINKS.HOME);

  return onHomepage ? (
    <p className="text-neutral-100 select-none" style={{ fontWeight: 500 }}>
      Benyam Ephrem
    </p>
  ) : (
    <Link type="internal" dest={INTERNAL_LINKS.HOME}>
      <p className="text-neutral-100 text-nowrap">Benyam Ephrem</p>
    </Link>
  );
};

export default SiteLayout;
