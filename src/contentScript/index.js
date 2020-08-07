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
			console.log(commonUtil.getUrlType(request.url));
			Array.from(document.querySelectorAll("#IconSpotlight")).map((link) =>
				link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
			);
		}
	});

	window.enhancedGithub = {
		config: {},
	};

	let readyStateCheckInterval = setInterval(function () {
		if (document.readyState === "complete") {
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
