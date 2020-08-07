const CommonEnum = require("../enums/CommonEnum");

const self = (module.exports = {
	getUrlType: function (str) {
		const commonPattern = new RegExp(
			`^https:\/\/[a-z]{2,2}\.carousell\.com\/(search|categories|p|sell|likes|inbox)\/?(.*?)$`,
			"g"
		);

		const matches = commonPattern.exec(str);
		if (matches === null) return CommonEnum.CAROUSELL_URLTYPE.PROFILE;
		switch (matches[1]) {
			case "search":
				return CommonEnum.CAROUSELL_URLTYPE.SEARCH;
			case "categories":
				return CommonEnum.CAROUSELL_URLTYPE.CATEGORY;
			case "p":
				return CommonEnum.CAROUSELL_URLTYPE.POST;
			case "sell":
				return CommonEnum.CAROUSELL_URLTYPE.SELL;
			case "likes":
				return CommonEnum.CAROUSELL_URLTYPE.LIKES;
			case "inbox":
				return CommonEnum.CAROUSELL_URLTYPE.INBOX;
			default:
				return CommonEnum.CAROUSELL_URLTYPE.ERROR;
		}
	},
	waitForSelector: (selector) => {
		return new Promise((resolve) => {
			const timer = setInterval(() => {
				if (document.querySelector(selector) !== null) {
					clearInterval(timer);
					return resolve();
				}
			}, 100);
		});
	},
	getContentPath: function () {
		let str = window.location.href;
		let result = str.match(/.*[bt][lr][oe][be]\/[^//]+\/(.*)/); // blob/tree :D
		return result && result.length && result[1];
	},
	getBranch: function () {
		let str = window.location.href;
		let result = str.match(/.*(blob|tree|commits)\/([^//]+).*$/); // just after blob/tree
		return result && result.length && result[2];
	},
	getUsernameWithReponameFromGithubURL: function () {
		let pathnames = window.location.pathname.split("/");
		let user = pathnames[1];
		let repo = pathnames[2];

		return {
			user: user,
			repo: repo,
		};
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
	sortFileStructureAsOnSite: function (data) {
		if (!data || Object.prototype.toString.call(data) !== "[object Array]") {
			return;
		}

		let folders = [];
		let files = [];
		let others = [];
		let dataAfterSorting = [];

		data.forEach(function (item) {
			if (item.type === "dir") {
				folders.push(item);
			} else if (item.type === "file") {
				files.push(item);
			} else {
				others.push(item);
			}
		});

		folders = self.sortOn(folders, "name");
		files = self.sortOn(files, "name");
		others = self.sortOn(others, "name");

		dataAfterSorting = dataAfterSorting.concat(folders).concat(files).concat(others);
		return dataAfterSorting;
	},
	convertSizeToHumanReadableFormat: function (bytes) {
		if (bytes === 0) {
			return {
				size: 0,
				measure: "Bytes",
			};
		}

		bytes *= 1024;

		const K = 1024;
		const MEASURE = ["", "Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
		const i = Math.floor(Math.log(bytes) / Math.log(K));

		return {
			size: parseFloat((bytes / Math.pow(K, i)).toFixed(2)),
			measure: MEASURE[i],
		};
	},
	getFileSizeAndUnit: function (data) {
		let formatBytes = self.convertSizeToHumanReadableFormat(data.size);
		let size = formatBytes.size;
		let unit = formatBytes.measure;
		return size + " " + unit;
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
