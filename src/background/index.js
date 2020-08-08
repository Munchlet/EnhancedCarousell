/* global chrome */
const MessageType = require("../enums/MessageType");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.url) {
		chrome.tabs.sendMessage(tabId, {
			type: MessageType.PAGE_RENDERED,
			url: changeInfo.url,
		});
	}
});
