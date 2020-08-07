/*global chrome*/
const domUtil = require("../utils/domUtil");
const storageUtil = require("../utils/storageUtil");
const CommonEnum = require("../enums/CommonEnum");
const MessageType = require("../enums/MessageType");
const commonUtil = require("../utils/commonUtil");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request && request.type === MessageType.PAGE_RENDERED) {
		const urlType = commonUtil.getUrlType(request.url);
		console.log(`Type: ${urlType}`);
		if (urlType === CommonEnum.CAROUSELL_URLTYPE.ERROR) return console.log(`Ignoring error page`);
		const result = await domUtil.waitForLoad(urlType);
		switch (urlType) {
			case CommonEnum.CAROUSELL_URLTYPE.POST:
				console.log(
					document.querySelector(
						"#root > div > div._2ht8F6eyne > div._19cQeGrSZp > div > div:nth-child(2) > div._3jSxGs6DS1 > h1"
					).innerHTML
				);
				const divs = document.getElementsByTagName("button");
				for (let i = 0; i < divs.length; i += 1) {
					if (divs[i].innerHTML.indexOf("read more") > -1) {
						divs[i].click();
					}
				}
				break;
			default:
				console.log(`what type is this?!`);
		}

		Array.from(document.querySelectorAll("#IconSpotlight")).map((link) =>
			link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
		);
	}
});

(function () {
	let readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
			console.log(`Page load completed`);
			clearInterval(readyStateCheckInterval);
			document.addEventListener(
				"click",
				function (e) {
					console.log(`CLICK CLICK`);
				},
				false
			);

			chrome.storage.sync.get(
				{
					"x-github-token": "",
				},
				function (storedData) {
					if (storedData) {
						storageUtil.set(CommonEnum.TOKEN, storedData["x-github-token"]);
					}
					console.log(`Adding data`, `>> ${storedData["x-github-token"]} <<`);
					// domUtil.addRepoData();
				}
			);
		}
	}, 10);
})();
