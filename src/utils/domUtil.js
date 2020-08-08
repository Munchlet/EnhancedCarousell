const CommonEnum = require("../enums/CommonEnum");
const CommonUtils = require("./commonUtil");
const StorageUtils = require("./storageUtil");
const CarousellUtils = require("./CarousellUtils");

const self = (module.exports = {
	hasClass: function (elem, className) {
		const elemClass = elem.getAttribute("class") || "";
		return elemClass.split(" ").indexOf(className) > -1;
	},
	waitForLoad: (type) => {
		switch (type) {
			case CommonEnum.CAROUSELL_URLTYPE.POST:
				return CommonUtils.waitForSelector("#root > div > ul");
			default:
				return Promise.resolve(false);
		}
	},
	manipulatePage: async (url) => {
		const settings = await StorageUtils.getSettings();
		const urlType = CommonUtils.getUrlType(url);
		console.log(`[manipulatePage]: [${url}] | [${JSON.stringify(urlType)}]`);
		if (urlType.type === CommonEnum.CAROUSELL_URLTYPE.ERROR) return console.error(`Ignoring error page`);
		const result = await self.waitForLoad(urlType.type);
		if (!result) return console.error("Not any type or may have timeout");
		switch (urlType.type) {
			case CommonEnum.CAROUSELL_URLTYPE.POST:
				if (settings.autoExpandReadMore) CarousellUtils.autoExpandReadMore();
				break;
			case CommonEnum.CAROUSELL_URLTYPE.LISTINGS:
				if (settings.removeSpotlightListings) CarousellUtils.removeSpotlightListings();
				break;
			default:
				console.log(`what type is this?!`);
		}
	},
});
