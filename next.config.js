const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
});

const nextConfig = {
	redirects: async () => {
		return [
			{
				source: "/x",
				destination: "https://twitter.com/bephrem",
				permanent: true,
			},
			{
				source: "/twitter",
				destination: "https://twitter.com/bephrem",
				permanent: true,
			},
			{
				source: "/bephrem",
				destination: "/",
				permanent: true,
			},
		];
	},
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
	webpack: (config, { dev }) => {
		if (dev) {
			config.watchOptions = {
				...config.watchOptions,
				poll: 1000,
				aggregateTimeout: 300,
				ignored: ["**/.git/**", "**/.next/**", "**/node_modules/**"],
			};
		}

		return config;
	},
};

module.exports = withMDX(nextConfig);
