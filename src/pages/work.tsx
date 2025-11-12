import Head from "next/head";
import { FunctionComponent } from "react";
import PageBase from "../components/shared/page/PageBase";
import { EmptyObject } from "../types/empty";
import Link from "next/link";

const WorkPage: FunctionComponent<EmptyObject> = () => {
	return (
		<PageBase>
			<Head>
				<title>bephrem.com | Work</title>
			</Head>
			<Link href="/">
				<div className="flex flex-col items-center justify-center min-h-[60vh] cursor-pointer">
					<p className="text-neutral-400 text-sm italic">coming soon</p>
				</div>
			</Link>
		</PageBase>
	);
};

export default WorkPage;

