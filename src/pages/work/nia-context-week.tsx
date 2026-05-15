import Head from 'next/head';
import NextLink from 'next/link';
import type { FunctionComponent } from 'react';
import PageBase from '../../components/shared/page/PageBase';
import type { EmptyObject } from '../../types/empty';

const NiaContextWeekPage: FunctionComponent<EmptyObject> = () => {
  return (
    <PageBase>
      <Head>
        <title>Nia Context Week — Benyam Ephrem</title>
        <meta name="description" content="Series feature campaign — 750k+ reach across X and LinkedIn." />
      </Head>
      <div className="mx-auto flex w-full max-w-2xl flex-col px-4 py-10 text-neutral-950 sm:px-6 sm:py-14">
        <NextLink href="/" className="mb-8 text-sm text-neutral-500 hover:text-neutral-800">
          ← Home
        </NextLink>
        <p className="text-[0.75rem] uppercase tracking-[0.12em] text-neutral-500">Work</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">Nia Context Week</h1>
        <p className="mt-3 text-sm text-neutral-600">series • feature campaign</p>
        <p className="mt-1 text-sm text-neutral-600">750k+ reach (X, LinkedIn)</p>
        <div className="mt-10 aspect-[16/9] w-full overflow-hidden bg-neutral-900">
          <video
            className="h-full w-full object-cover"
            controls
            playsInline
            poster="/commercial/2026/nia-context-week/thumbnail/1.jpg"
            preload="auto"
          >
            <source src="/commercial/2026/nia-context-week/preview/1080p/1.mp4" type="video/mp4" />
          </video>
        </div>

        <ul className="mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2">
          {[2, 3, 4, 5, 6].map((n) => (
            <li key={n} className="aspect-[16/9] overflow-hidden bg-neutral-900">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                poster={`/commercial/2026/nia-context-week/thumbnail/${n}.jpg`}
                preload="none"
              >
                <source src={`/commercial/2026/nia-context-week/preview/1080p/${n}.mp4`} type="video/mp4" />
              </video>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm leading-relaxed text-neutral-700">
          Detail page placeholder — add case study, embeds, and credits here.
        </p>
      </div>
    </PageBase>
  );
};

export default NiaContextWeekPage;
