import { enableFeature, isLoggedIn } from "./domUtil";
import { features } from "../features";
import * as CommonUtils from "./commonUtil";
import * as CommonEnum from "../enums/CommonEnum";

export const init = async (url) => {
	const urlType = CommonUtils.getUrlType(url);
	console.log(`[manipulatePage]: [${url}] | [${JSON.stringify(urlType)}]`);
	if (urlType.type === CommonEnum.CAROUSELL_URLTYPE.ERROR) return console.error(`Ignoring error page`);
	console.log(url, urlType);
	const result = await waitForLoad(urlType.type);
	if (!result) return console.error("Not any type or may have timeout");
	document.documentElement.classList.add("enhanced-carousell");
	if (!isLoggedIn()) return console.log(`Not logged in`);
	onDomReady(urlType.type);
};

export const onDomReady = async (type) => {
	console.log(`DOM IS READY!!!`);
	console.log(type);
	switch (type) {
		case CommonEnum.CAROUSELL_URLTYPE.POST:
			await enableFeature(features.autoExpandListing);
			break;
		case CommonEnum.CAROUSELL_URLTYPE.LISTINGS:
		case CommonEnum.CAROUSELL_URLTYPE.CATEGORY:
			// if (settings.autoRemoveSpotlight) CarousellUtils.removeSpotlightListings();
			// if (settings.autoRemoveBump) CarousellUtils.removeBumpedListings();
			break;
		case CommonEnum.CAROUSELL_URLTYPE.PROFILE:
			await enableFeature(features.addProfileBlockButton);
			await enableFeature(features.addProfilePictureStatus);
			await enableFeature(features.addProfileReputationShield);
			break;
		default:
			console.log(`what type is this?!`);
	}
};

const waitForLoad = (type) => {
	switch (type) {
		case CommonEnum.CAROUSELL_URLTYPE.POST:
			return CommonUtils.waitForSelector("#root > div > ul");
		case CommonEnum.CAROUSELL_URLTYPE.LISTINGS:
		case CommonEnum.CAROUSELL_URLTYPE.CATEGORY:
			return CommonUtils.waitForSelectorText("p", "Item Condition");
		case CommonEnum.CAROUSELL_URLTYPE.PROFILE:
			return CommonUtils.waitForSelector('a[href$="/followers/"]');
		default:
			return Promise.resolve(false);
	}
};
