/* global chrome */
import OptionsSync from "webext-options-sync";
import { featuresDefaultValues } from "../features";
const MessageType = require("../enums/MessageType");

const ALARMID = "ALARM_REFRESH_ID";
const pollIntervalDefault = 3; // 3 seconds
const pollIntervalMax = 3600; // 1 hour
const requestTimeout = 1000 * 2; // 2 seconds

var options = {
	defaultUser: 0,
	pollInterval: 20,
	quietHours: [],
	distractionFreeMinutes: 30,
	useSnoozeColor: true,
	useDesktopNotifications: true,
	showPageMenu: true,
	focusExistingInboxTab: false,
	openInEmptyTab: false,
};

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
	fetchInboxCount();
});

function notify(count) {
	// var newMessagesCount = count - localStorage.unreadCount;
	// if (options.useDesktopNotifications && !isQuietTime() && newMessagesCount > 0) {
	chrome.notifications.create("inboxUpdate", {
		type: "basic",
		iconUrl: "img/icon-128.png",
		title: "Enhanced Carousell",
		isClickable: true,
		contextMessage: "Click to open Inbox",
		message: `You have ${count} unread messages`,
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

function createIntervalAlarm() {
	console.log("scheduleRequest");
	let pollInterval = options.pollInterval || pollIntervalDefault;
	const multiplier = Math.pow(2, localStorage.requestFailureCount || 0);
	if (pollInterval < 1) {
		pollInterval *= multiplier;
	} else {
		const randomness = Math.random() * 2;
		const fuzzyMultiplier = Math.max(randomness * multiplier, 1);
		pollInterval = Math.round(fuzzyMultiplier * pollInterval);
	}

	const delay = Math.min(pollInterval, pollIntervalMax);
	console.log("Scheduling for: " + delay + " seconds");
	return chrome.alarms.create(ALARMID, { periodInMinutes: delay / 60.0 });
}

function main() {
	chrome.alarms.get("refresh", function (alarm) {
		if (!alarm) {
			createIntervalAlarm();
			fetchInboxCount();
		}
	});
}

function fetchInboxCount() {
	console.log(`Fetching inbox count`);
	// localStorage.requestFailureCount = 0;
	fetch("https://carousell.com")
		.then((response) => response.text())
		.then((resp) => console.log(resp));
}

//main();

const optionsSync = new OptionsSync({
	defaults: Object.assign({}, featuresDefaultValues, {
		logging: false,
	}),
	migrations: [OptionsSync.migrations.removeUnused],
});

// Make sure that all features have an option value
optionsSync.getAll().then((options) => {
	console.log(`ALL VALUES, ${options}`);
	const newOptions = Object.assign({}, featuresDefaultValues, options);
	optionsSync.setAll(newOptions);
});
