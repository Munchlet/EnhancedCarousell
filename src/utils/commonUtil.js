const CommonEnum = require("../enums/CommonEnum");

const self = (module.exports = {
	getUrlType: function (str) {
		const commonPattern = new RegExp(
			"^https://[a-z]{2,2}.carousell.com/(search|categories|p|sell|likes|inbox)/?(.*?)$",
			"g"
		);

		const matches = commonPattern.exec(str);
		if (matches === null) return { type: CommonEnum.CAROUSELL_URLTYPE.PROFILE };
		switch (matches[1]) {
			case "search":
				return { type: CommonEnum.CAROUSELL_URLTYPE.SEARCH };
			case "categories":
				return { type: CommonEnum.CAROUSELL_URLTYPE.CATEGORY };
			case "p":
				return { type: CommonEnum.CAROUSELL_URLTYPE.POST };
			case "sell":
				return { type: CommonEnum.CAROUSELL_URLTYPE.SELL };
			case "likes":
				return { type: CommonEnum.CAROUSELL_URLTYPE.LIKES };
			case "inbox":
				return { type: CommonEnum.CAROUSELL_URLTYPE.INBOX };
			default:
				return { type: CommonEnum.CAROUSELL_URLTYPE.ERROR };
		}
	},
	waitForSelector: (selector) => {
		return new Promise((resolve) => {
			let counter = 0;
			const timer = setInterval(() => {
				if (counter >= 10) return resolve(false);
				if (document.querySelector(selector) !== null) {
					clearInterval(timer);
					return resolve(true);
				}

				counter += 1;
			}, 200);
		});
	},
	sortOn: function (arr, key) {
		return arr.sort(function (a, b) {
			if (a[key] < b[key]) {
				return -1;
			}
			if (a[key] > b[key]) {
				return 1;
			}
			return 0;
		});
	},
	removePrevInstancesOf: function (selector) {
		if (!selector) {
			return;
		}

		[].forEach.call(document.querySelectorAll(selector), function (el) {
			el.parentNode.removeChild(el);
		});
	},
});
