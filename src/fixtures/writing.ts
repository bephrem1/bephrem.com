export interface WritingInfo {
	title: string;
	date: string;
	path: string;
}

export const Writings = {
	// 2025
	TheFutureOfOnlineDatingWillBeMostlyOffline: {
		title: "The Future of Online Dating Will Be Mostly Offline",
		date: "Jan 2025",
		path: "/dating",
	} as WritingInfo,
	// 2022
	MasteringBodyComposition: {
		title: "Mastering Body Composition",
		date: "Jun 2022",
		path: "/composition",
	} as WritingInfo,
};

export const WritingItems = Object.keys(Writings).map((key) => {
	return Writings[key];
});
