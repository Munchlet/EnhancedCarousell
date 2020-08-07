const CommonEnum = require("../enums/CommonEnum");
const commonUtils = require("./commonUtil");

const domUtil = {
	hasClass: function (elem, className) {
		const elemClass = elem.getAttribute("class") || "";
		return elemClass.split(" ").indexOf(className) > -1;
	},
	waitForLoad: (type) => {
		switch (type) {
			case CommonEnum.CAROUSELL_URLTYPE.POST:
				return commonUtils.waitForSelector("#root > div > ul");
			default:
				return Promise.reject(false);
		}
	},
};

module.exports = domUtil;
