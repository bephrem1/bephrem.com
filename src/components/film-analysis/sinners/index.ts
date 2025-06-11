import type { CastItem } from "../../shared/film-analysis/cast/CastMembers";

const Hogwood: CastItem = {
	character: {
		name: "Hogwood",
		imagePath: "/characters/sinners/hogwood",
	},
	actor: {
		name: "David Maldonado",
		imagePath: "/actors/david-maldonado",
	},
};

const ReverendMoore: CastItem = {
	character: {
		name: "Reverend Moore",
		imagePath: "/characters/sinners/reverend-moore",
	},
	actor: {
		name: "Saul Williams",
		imagePath: "/actors/saul-williams",
	},
};

const LisaChow: CastItem = {
	character: {
		name: "Lisa Chow (Lil’ Lisa)",
		imagePath: "/characters/sinners/lisa-chow",
	},
	actor: {
		name: "Helena Hu",
		imagePath: "/actors/helena-hu",
	},
};

export const SinnersCast = {
	// by category
	Leads: [],
	Supporting: [ReverendMoore, Hogwood],
	Featured: [],
	BitParts: [LisaChow],

	// individual cast members
	ReverendMoore,
	Hogwood,
	LisaChow,
};
