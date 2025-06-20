import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import { useEffect } from "react";
import Writing from "../../components/page-segments/writing/Writing";
import PageBase from "../../components/shared/page/PageBase";
import { useDocumentHeadComponents } from "../../hooks/page-headers";

export interface WritingData {
  title: string;
  date: string;
}
const CONTENT_PATH = "src/content";

const WritingPage = ({ mdxSource, mdxData }) => {
  const { SEOTags } = useDocumentHeadComponents({
    title: mdxData.title,
  });

  useRestoreScrollPosition();

  return (
    <PageBase>
      <Head>{SEOTags}</Head>
      <Writing mdxSource={mdxSource} mdxData={mdxData} />
    </PageBase>
  );
};

function useRestoreScrollPosition() {
  useEffect(() => {
    if (window) {
      // save scroll position before page refresh/navigation
      window.onbeforeunload = () => {
        sessionStorage.setItem("scrollPosition", window.scrollY.toString());
      };

      // restore scroll position after page loads
      const savedPosition = sessionStorage.getItem("scrollPosition");
      if (savedPosition) {
        window.scrollTo(0, Number.parseInt(savedPosition));
        sessionStorage.removeItem("scrollPosition");
      }
    }
  }, []);
}

// will render all writings to static pages at build time
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(CONTENT_PATH));

  const paths = files.map((filename) => ({
    params: {
      writingId: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// writing pages will be prerendered (at build time) with the data from the markdown files
export async function getStaticProps({ params: { writingId } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join(CONTENT_PATH, `${writingId}.mdx`),
    "utf-8",
  );

  const { content, data } = matter(markdownWithMeta);

  const mdxSource = await serialize(content);

  return {
    props: {
      mdxSource: mdxSource,
      mdxData: data as WritingData,
    },
  };
}

export default WritingPage;
