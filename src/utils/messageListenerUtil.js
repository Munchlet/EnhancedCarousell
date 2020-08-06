/* global chrome */
const domUtil = require("./domUtil");
const MessageType = require("../enums/MessageType");

let messageListenerUtil = {
	onMessage: () => {
		chrome.runtime.onMessage.addListener(function (request, _sender, _sendResponse) {
			if (request && request.type === MessageType.PAGE_RENDERED) {
				console.log(`Rendered`);
				// domUtil.addRepoData();
				Array.from(document.querySelectorAll("#IconSpotlight")).map(
					(link) =>
						(link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.opacity = "0%")
				);
			}
		});
	},
	addListners: () => {
		messageListenerUtil.onMessage();
	},
};

module.exports = messageListenerUtil;
