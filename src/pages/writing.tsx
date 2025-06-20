import type { EmptyObject } from '../types/empty';
import type { FunctionComponent } from 'react';
import Head from 'next/head';
import PageBase from '../components/shared/page/PageBase';
import Writings from '../components/page-segments/writings/Writings';
import { useDocumentHeadComponents } from '../hooks/page-headers';

const WritingsPage: FunctionComponent<EmptyObject> = () => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'Benyam Ephrem',
    description: 'Writing.'
  });

  return (
    <PageBase>
      <Head>{SEOTags}</Head>
      <Writings />
    </PageBase>
  );
};

export default WritingsPage;
