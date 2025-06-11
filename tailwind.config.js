/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx,md,mdx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			rotate: {
				"y-180": "rotateY(180deg)",
			},
			backfaceVisibility: {
				hidden: "hidden",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"shuffle-front": {
					"0%": {
						transform: "translateX(0) translateY(0) scale(1)",
						zIndex: "1",
					},
					"50%": {
						transform: "translateX(4px) translateY(-4px) scale(0.95)",
						zIndex: "0",
					},
					"100%": {
						transform: "translateX(0) translateY(0) scale(1)",
						zIndex: "0",
					},
				},
				"shuffle-back": {
					"0%": {
						transform: "translateX(0) translateY(0) scale(1)",
						zIndex: "0",
					},
					"50%": {
						transform: "translateX(-4px) translateY(4px) scale(1.05)",
						zIndex: "1",
					},
					"100%": {
						transform: "translateX(0) translateY(0) scale(1)",
						zIndex: "1",
					},
				},
				flip: {
					"0%, 100%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(180deg)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"shuffle-front": "shuffle-front 0.5s ease-in-out forwards",
				"shuffle-back": "shuffle-back 0.5s ease-in-out forwards",
				flip: "flip 0.7s ease-in-out",
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		({ addUtilities }) => {
			addUtilities({
				".backface-hidden": {
					"backface-visibility": "hidden",
					"-webkit-backface-visibility": "hidden",
				},
				".rotate-y-180": {
					transform: "rotateY(180deg)",
				},
				".preserve-3d": {
					"transform-style": "preserve-3d",
				},
				".perspective-1000": {
					perspective: "1000px",
				},
				".transform-style-3d": {
					"transform-style": "preserve-3d",
				},
			});
		},
	],
};
