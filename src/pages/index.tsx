import fs from 'fs';
import type { GetStaticProps } from 'next';
import Head from 'next/head';
import path from 'path';
import type { FunctionComponent } from 'react';
import Home from '../components/page-segments/home/Home';
import { comparePrevisFilenames, toPrevisStill, type PrevisStill } from '../helpers/previs-stills';
import { useDocumentHeadComponents } from '../hooks/page-headers';

type Props = {
  previsStills: PrevisStill[];
  scriptPages: string[];
};

const RootHomePage: FunctionComponent<Props> = ({ previsStills, scriptPages }) => {
  const { SEOTags } = useDocumentHeadComponents({
    title: 'Benyam Ephrem',
    description: 'About Benyam Ephrem.'
  });

  return (
    <>
      <Head>{SEOTags}</Head>
      <Home previsStills={previsStills} scriptPages={scriptPages} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const dir = path.join(process.cwd(), 'public/narrative/the-match-experiment/previs/stills');
  let filenames: string[] = [];
  try {
    filenames = fs.readdirSync(dir).filter((name) => name.toLowerCase().endsWith('.png'));
  } catch {
    filenames = [];
  }
  filenames.sort(comparePrevisFilenames);

  const scriptDir = path.join(process.cwd(), 'public/narrative/the-match-experiment/script/pages');
  let scriptPages: string[] = [];
  try {
    scriptPages = fs
      .readdirSync(scriptDir)
      .filter((name) => name.toLowerCase().endsWith('.jpg'))
      .sort()
      .map((name) => `/narrative/the-match-experiment/script/pages/${name}`);
  } catch {
    scriptPages = [];
  }

  return { props: { previsStills: filenames.map(toPrevisStill), scriptPages } };
};

export default RootHomePage;
