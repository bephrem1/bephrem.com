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
};

module.exports = withMDX(nextConfig);
