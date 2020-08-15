export const features = {
	/* GENERAL */
	removeBumpedListings: {
		id: "removeBumpedListings",
		category: "general",
		label: "Remove bumped listings from all page",
		fn: require("./remove-listings-bumped").default,
		hidden: true,
	},
	removeSpotlightListings: {
		id: "removeSpotlightListings",
		category: "general",
		label: "Remove Spotlight listings from all page",
		fn: require("./remove-listings-spotlight").default,
		hidden: true,
	},
	/* PROFILE */
	addDeleteOwnListing: {
		id: "addDeleteOwnListing",
		category: "profile",
		label: "Place a Delete icon on your own profile listings",
		fn: require("./inject-delete-own-listings").default,
	},
	addProfileBlockButton: {
		id: "addProfileBlockButton",
		category: "profile",
		label: "Add a Block Profile button to profile",
		fn: require("./inject-profile-block-button").default,
	},
	addProfilePictureStatus: {
		id: "addProfilePictureStatus",
		category: "profile",
		label: "Add a Reputation ring around a profile picture",
		fn: require("./inject-profile-picture-status").default,
	},
	addProfileReputationShield: {
		id: "addProfileReputationShield",
		category: "profile",
		label: "Add a Reputation shield in profile beside username",
		fn: require("./inject-reputation-shield").default,
	},

	/* POST */
	autoExpandListing: {
		id: "autoExpandListing",
		category: "post",
		label: "Auto expand post listing",
		fn: require("./auto-expand-readmore").default,
	},
};

const _featuresDefaultValues = {};
for (const [, value] of Object.entries(features)) {
	_featuresDefaultValues[value.id] = typeof value.enabledByDefault === "boolean" ? value.enabledByDefault : true;
}

export const featuresDefaultValues = _featuresDefaultValues;
