import { enableFeature, isLoggedIn, observeEl } from "./domUtil";
import select from "select-dom";
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

function onNewListing(cb) {
	observeEl(select("main").firstChild.firstChild, cb);
}

export const onDomReady = async (type) => {
	console.log(`[onDomReady] ${type}`);
	switch (type) {
		case CommonEnum.CAROUSELL_URLTYPE.POST:
			enableFeature(features.autoExpandListing);
			break;
		case CommonEnum.CAROUSELL_URLTYPE.LISTINGS:
		case CommonEnum.CAROUSELL_URLTYPE.CATEGORY:
			onNewListing(async () => {
				enableFeature(features.removeBumpedListings);
				enableFeature(features.removeSpotlightListings);
				enableFeature(features.removeBlockedProfileListings);
			});

			break;
		case CommonEnum.CAROUSELL_URLTYPE.PROFILE:
			enableFeature(features.addProfileBlockButton);
			enableFeature(features.addProfilePictureStatus);
			enableFeature(features.addProfileReputationShield);
			enableFeature(features.addDeleteOwnListing);
			break;
		default:
			console.log(`[onDomReady] Unable to identify type.`);
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
