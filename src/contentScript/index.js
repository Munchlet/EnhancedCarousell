/*global chrome*/
const domUtil = require("../utils/domUtil");
const MessageType = require("../enums/MessageType");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
	if (request && request.type === MessageType.PAGE_RENDERED) {
		switch (request.type) {
			case MessageType.PAGE_RENDERED:
				return domUtil.manipulatePage(request.url);
			case MessageType.ACTION_FETCH:
				return new Promise((resolve, reject) => {
					const xhttp = new XMLHttpRequest();
					const method = request.method ? request.method.toUpperCase() : "GET";
					xhttp.onload = () => {
						return resolve(xhttp.responseText);
					};
					xhttp.onerror = () => {
						return reject(-1);
					};

					xhttp.open(method, request.url, true);
					if (method === "POST") xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
					xhttp.send();
				});
			default:
				console.error(`Missing MessageType ${request}`);
		}
	}
});

(function () {
	document.addEventListener("DOMNodeInserted", () => {
		// console.log("DOM CHANGES");
	});

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

			return domUtil.manipulatePage(window.location.href);
		}
	}, 10);
})();
