const CommonEnum = require("../enums/CommonEnum");

const self = (module.exports = {
	getUrlType: function (str) {
		const commonPattern = /^https:\/\/[a-z]{2,2}\.carousell\.com\/(search|categories|p|sell|likes|inbox|\w+)\/?(.*?)$/g;
		const matches = commonPattern.exec(str);
		console.log(matches);
		if (matches === null) return { type: CommonEnum.CAROUSELL_URLTYPE.HOMEPAGE };
		switch (matches[1]) {
			case "search":
				return { type: CommonEnum.CAROUSELL_URLTYPE.LISTINGS };
			case "categories":
				return { type: CommonEnum.CAROUSELL_URLTYPE.CATEGORY };
			case "p":
				return { type: CommonEnum.CAROUSELL_URLTYPE.POST };
			case "inbox":
				return { type: CommonEnum.CAROUSELL_URLTYPE.INBOX };
			case "settings":
			case "sell":
			case "likes":
				return { type: CommonEnum.CAROUSELL_URLTYPE.IGNORE };
			default:
				return { type: CommonEnum.CAROUSELL_URLTYPE.PROFILE, value: matches[1] };
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
	waitForSelectorText: (selector, text) => {
		return new Promise((resolve) => {
			let counter = 0;
			const timer = setInterval(() => {
				if (counter >= 10) return resolve(false);
				if (Array.from(document.querySelectorAll(selector)).find((el) => el.textContent === text) !== null) {
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
