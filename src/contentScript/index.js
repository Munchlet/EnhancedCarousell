/*global chrome*/
import * as Utils from "../utils";
import * as MessageType from "../enums/MessageType";

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request) {
		switch (request.type) {
			case MessageType.PAGE_RENDERED:
				// return domUtil.manipulatePage(request.url);
				return Utils.init(request.url);
			default:
				console.error(`Missing MessageType ${request}`);
		}
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
					if (
						e.target.getAttribute("type") === "button" &&
						e.target.nodeName === "BUTTON" &&
						e.target.textContent === "Load more"
					) {
						console.log(`CLICK LOAD MORE`);
					}
				},
				false
			);

			// return domUtil.manipulatePage(window.location.href);
			return Utils.init(window.location.href);
		}
	}, 10);
})();
