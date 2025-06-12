import type { CastItem } from "../../shared/film-analysis/cast/CastMembers";

const Hogwood: CastItem = {
	character: {
		name: "Hogwood",
		imagePath: "/film-analysis/films/sinners/characters/hogwood",
	},
	actor: {
		name: "David Maldonado",
		imagePath: "/film-analysis/actors/david-maldonado",
	},
};

const ReverendMoore: CastItem = {
	character: {
		name: "Reverend Moore",
		imagePath: "/film-analysis/films/sinners/characters/reverend-moore",
	},
	actor: {
		name: "Saul Williams",
		imagePath: "/film-analysis/actors/saul-williams",
	},
};

const LisaChow: CastItem = {
	character: {
		name: "Lisa Chow (Lil’ Lisa)",
		imagePath: "/film-analysis/films/sinners/characters/lisa-chow",
	},
	actor: {
		name: "Helena Hu",
		imagePath: "/film-analysis/actors/helena-hu",
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
