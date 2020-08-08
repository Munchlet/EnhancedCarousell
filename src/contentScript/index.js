/*global chrome*/
const domUtil = require("../utils/domUtil");
const storageUtil = require("../utils/storageUtil");
const CommonEnum = require("../enums/CommonEnum");
const MessageType = require("../enums/MessageType");
const commonUtil = require("../utils/commonUtil");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request && request.type === MessageType.PAGE_RENDERED) {
		return domUtil.manipulatePage(request.url);
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

			return domUtil.manipulatePage(window.location.href);
		}
	}, 10);
})();
