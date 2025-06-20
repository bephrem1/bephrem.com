import "../styles/global.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { TooltipProvider } from "../components/shared/shadcn/components/ui/tooltip";
import { useDocumentHeadComponents } from "../hooks/page-headers";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <GlobalHead />
      <TooltipProvider>
        <Component {...pageProps} />
      </TooltipProvider>
    </div>
  );
};

const GlobalHead = () => {
  const { SEOTags, OpenGraphTags } = useDocumentHeadComponents({});

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Native HTML Meta Tags for SEO */}
      {SEOTags}

      {/* Open Graph Data */}
      {OpenGraphTags}
    </Head>
  );
};

export default App;
