import Head from 'next/head';
import type { FunctionComponent } from 'react';
import Home from '../components/page-segments/home/Home';
import { useDocumentHeadComponents } from '../hooks/page-headers';
import type { EmptyObject } from '../types/empty';

const RootHomePage: FunctionComponent<EmptyObject> = () => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'Benyam Ephrem',
    description: 'About Benyam Ephrem.'
  });

  return (
    <>
      <Head>{SEOTags}</Head>
      <Home />
    </>
  );
};

export default RootHomePage;
