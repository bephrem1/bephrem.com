import { NextRouter } from "next/router";

export const INTERNAL_LINKS = {
	HOME: "/",
	WRITING: "/writing",
	WORK: "/work",
};

export const EXTERNAL_LINKS = {
	SOCIAL: {
		TWITTER: "https://twitter.com/bephrem",
		YOUTUBE: "https://www.youtube.com/@bephrem",
		LINKEDIN: "https://linkedin.com/in/bephrem",
		GITHUB: "https://github.com/bephrem1",
		INSTAGRAM: "https://www.instagram.com/bephrem_",
	},
	VIDEOGRAPHY: {
		HOME: "https://bephrem.studio",
	},
	GITHUB: {
		REPO: "https://github.com/bephrem1/bephrem.com",
	},

	BACKTOBACKSWE: {
		WEBSITE: "https://backtobackswe.com",
		YOUTUBE: "https://www.youtube.com/c/BackToBackSWE",
	},
	INTERVIEW_PEN: {
		WEBSITE: "https://interviewpen.com",
	},

	BOBBY: {
		SITE: "https://www.bobbygeorge.dev",
	},
	WIKIPEDIA: {
		UNIVERSITY_OF_MARYLAND:
			"https://en.wikipedia.org/wiki/University_of_Maryland,_College_Park",
		LOCATIONS: {
			MARYLAND_STATE: "https://en.wikipedia.org/wiki/Maryland",
			SALISBURY: "https://en.wikipedia.org/wiki/Salisbury,_Maryland",
			COLLEGE_PARK: "https://en.wikipedia.org/wiki/College_Park,_Maryland",
			SAN_FRANCISCO: "https://en.wikipedia.org/wiki/San_Francisco",
			BALTIMORE: "https://en.wikipedia.org/wiki/Baltimore",
			BOULDER: "https://en.wikipedia.org/wiki/Boulder,_Colorado",
			WASHINGTON_DC: "https://en.wikipedia.org/wiki/Washington,_D.C.",
		},
	},
};

const EMAILS = {
	BEPHREM_STUDIO: "ben@bephrem.studio",
};

export const getCurrentUrl = (router: NextRouter) => {
	return getFrontendUrl(router.asPath);
};

const getFrontendUrl = (path: string, params?: Record<string, string>) => {
	return getUrlToResource(getBaseFrontendUrl(), path, params);
};

const getUrlToResource = (
	baseUrl: string,
	resourcePath: string,
	params?: Record<string, string>,
) => {
	// Adjust for trailing slash
	if (!!resourcePath && resourcePath.charAt(resourcePath.length - 1) === "/") {
		resourcePath = resourcePath.substring(0, resourcePath.length - 1);
	}

	// Adjust for leading slash
	if (!!resourcePath && resourcePath.charAt(0) !== "/") {
		resourcePath = "/" + resourcePath;
	}

	const queryParamString = params ? getQueryParamString(params) : "";

	return baseUrl + resourcePath + queryParamString;
};

const getQueryParamString = (params: Record<string, string>): string => {
	if (!params) {
		return "";
	}

	const paramItems = Object.keys(params).map((paramLabel: string) => {
		return `${encodeURIComponent(paramLabel)}=${encodeURIComponent(params[paramLabel])}`;
	});

	return `?${paramItems.join("&")}`;
};

const getBaseFrontendUrl = () => {
	return getBaseUrl({
		host: process.env.NEXT_PUBLIC_HOSTNAME || "localhost",
		port: process.env.NEXT_PUBLIC_HOSTNAME === "localhost" ? ":3000" : "",
	});
};

interface BaseUrlOptions {
	host: string;
	port: string;
	suffix?: string;
}
const getBaseUrl = ({ host, port, suffix }: BaseUrlOptions) => {
	const protocol = host === "localhost" ? "http" : "https";

	return `${protocol}://${host}${port}${!!suffix ? suffix : ""}`;
};
