import OptionsSync from "webext-options-sync";

export const enableFeature = async ({ fn, id }) => {
	const options = await new OptionsSync().getAll();
	console.log(options);
	if (!options[id] || typeof options[id] === "undefined") {
		document.querySelector("html").classList.remove(id);
		return console.log("↩️", "Skipping", id);
	}

	try {
		document.querySelector("html").classList.add(id);
		await fn();
		console.log("✅", id);
	} catch (error) {
		console.log("❌", id);
		console.error(error);
	}
};

export const isProfilePage = () => {
	const divs = document.getElementsByTagName("p");
	for (const div of divs) if (div.textContent.indexOf("Reviews") > -1) return true;
	return false;
};

export const isOwnProfilePage = () => {
	const divs = document.getElementsByTagName("button");
	let isOwn = false;
	for (const div of divs) {
		if (div.innerHTML.indexOf("Edit Profile") > -1) {
			isOwn = true;
			break;
		}
	}

	return isProfilePage() && isOwn;
};

export const isLoggedIn = () => {
	let registerBtn = false;
	let loginBtn = false;
	const divs = document.getElementsByTagName("p");
	for (const div of divs) {
		if (!registerBtn) registerBtn = div.textContent === "Register";
		if (!loginBtn) loginBtn = div.textContent === "Login";
	}

	console.log(registerBtn, loginBtn);
	return !registerBtn && !loginBtn;
};

// const self = (module.exports = {
// 	hasClass: function (elem, className) {
// 		const elemClass = elem.getAttribute("class") || "";
// 		return elemClass.split(" ").indexOf(className) > -1;
// 	},
// 	waitForLoad: (type) => {
// 		switch (type) {
// 			case CommonEnum.CAROUSELL_URLTYPE.POST:
// 				return CommonUtils.waitForSelector("#root > div > ul");
// 			case CommonEnum.CAROUSELL_URLTYPE.LISTINGS:
// 			case CommonEnum.CAROUSELL_URLTYPE.CATEGORY:
// 				return CommonUtils.waitForSelectorText("p", "Item Condition");
// 			case CommonEnum.CAROUSELL_URLTYPE.PROFILE:
// 				return CommonUtils.waitForSelector('a[href$="/followers/"]');
// 			default:
// 				return Promise.resolve(false);
// 		}
// 	},
// 	manipulatePage: async (url) => {
// 		const settings = await StorageUtils.getSettings();
// 		const urlType = CommonUtils.getUrlType(url);
// 		console.log(`[manipulatePage]: [${url}] | [${JSON.stringify(urlType)}]`);
// 		if (urlType.type === CommonEnum.CAROUSELL_URLTYPE.ERROR) return console.error(`Ignoring error page`);
// 		const result = await self.waitForLoad(urlType.type);
// 		if (!result) return console.error("Not any type or may have timeout");
// 		switch (urlType.type) {
// 			case CommonEnum.CAROUSELL_URLTYPE.POST:
// 				if (settings.autoExpandReadMore) CarousellUtils.autoExpandReadMore();
// 				break;
// 			case CommonEnum.CAROUSELL_URLTYPE.LISTINGS:
// 			case CommonEnum.CAROUSELL_URLTYPE.CATEGORY:
// 				if (settings.autoRemoveSpotlight) CarousellUtils.removeSpotlightListings();
// 				if (settings.autoRemoveBump) CarousellUtils.removeBumpedListings();
// 				break;
// 			case CommonEnum.CAROUSELL_URLTYPE.PROFILE:
// 				CarousellUtils.injectBlockProfile();
// 				CarousellUtils.findProfilePictureDiv();
// 				CarousellUtils.injectReputationShield();
// 				CarousellUtils.injectDeleteListingProfile();
// 				break;
// 			default:
// 				console.log(`what type is this?!`);
// 		}
// 	},
// });
