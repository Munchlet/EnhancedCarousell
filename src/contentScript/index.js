/*global chrome*/
const domUtil = require("../utils/domUtil");
const storageUtil = require("../utils/storageUtil");
const CommonEnum = require("../enums/CommonEnum");
const MessageType = require("../enums/MessageType");
const commonUtil = require("../utils/commonUtil");

(function () {
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		console.log(request);
		if (request && request.type === MessageType.PAGE_RENDERED) {
			const urlType = commonUtil.getUrlType(request.url);
			console.log(urlType);
			switch (urlType) {
				case CommonEnum.CAROUSELL_URLTYPE.POST:
					console.log(`here`);
					const divs = document.getElementsByTagName("button");
					for (let i = 0; i < divs.length; i += 1) {
						console.log(divs[i].innerHTML);
						if (divs[i].innerHTML.indexOf("read more") > -1) {
							console.log(`GOOD AH!`);
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
