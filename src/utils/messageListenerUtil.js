/* global chrome */
const commonUtil = require("./commonUtil");
const MessageType = require("../enums/MessageType");

let messageListenerUtil = {
	onMessage: () => {
		chrome.runtime.onMessage.addListener(function (request, _sender, _sendResponse) {
			console.log(request);
			if (request && request.type === MessageType.PAGE_RENDERED) {
				console.log(`Rendered`);
				console.log(commonUtil.getUrlType(request.url));
				Array.from(document.querySelectorAll("#IconSpotlight")).map((link) =>
					link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
				);
			}
		});
	},
	addListners: () => {
		messageListenerUtil.onMessage();
	},
};

module.exports = messageListenerUtil;
