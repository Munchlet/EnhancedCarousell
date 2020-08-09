/* global chrome */
const MessageType = require("../enums/MessageType");

const ALARMID = "ALARM_REFRESH_ID";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.url) {
		chrome.tabs.sendMessage(tabId, {
			type: MessageType.PAGE_RENDERED,
			url: changeInfo.url,
		});
	}
});

chrome.alarms.onAlarm.addListener(function (alarm) {
	console.log("Got an alarm!", alarm);
	notify(10);
});

function notify(count) {
	// var newMessagesCount = count - localStorage.unreadCount;
	// if (options.useDesktopNotifications && !isQuietTime() && newMessagesCount > 0) {
	chrome.notifications.create("inboxUpdate", {
		type: "basic",
		iconUrl: "img/icon-128.png",
		title: "Inbox by Gmail Checker",
		isClickable: true,
		contextMessage: "Click to open Inbox",
		message: `You have ${count} messages`,
	});
}

function updateIcon() {
	// chrome.browserAction.setIcon({
	// 	path: {
	// 		"19": "media/inbox_not_logged_in.png",
	// 		"38": "media/inbox_not_logged_in_retina.png",
	// 	},
	// });
	chrome.browserAction.setBadgeBackgroundColor({ color: "grey" });
	chrome.browserAction.setBadgeText({ text: "?" });
}

function main() {
	chrome.alarms.create(ALARMID, { delayInMinutes: 0.1, periodInMinutes: 0.1 });
}

main();
