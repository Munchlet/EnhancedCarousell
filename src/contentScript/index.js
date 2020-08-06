/*global chrome*/
const messageListenerUtil = require("../utils/messageListenerUtil");
const domUtil = require("../utils/domUtil");
const storageUtil = require("../utils/storageUtil");
const CommonEnum = require("../enums/CommonEnum");
const MessageType = require("../enums/MessageType");

(function () {
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		// listen for messages sent from background.js
		if (request.type === MessageType.PAGE_RENDERED) {
			console.log(`HELL YEAH!`);
			console.log(request.url); // new url is now in content scripts!
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
			messageListenerUtil.addListners();
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
