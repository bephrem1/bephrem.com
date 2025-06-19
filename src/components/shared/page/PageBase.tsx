import Head from 'next/head';
import type { FunctionComponent } from 'react';
import React from 'react';

interface Props {
  children: React.ReactNode | Array<React.ReactNode>;
}

const rootDivId = '#root';

const PageBase: FunctionComponent<Props> = ({ children }) => {
  return (
    <div id={rootDivId}>
      <Head>
        <title>bephrem.com</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default PageBase;
