/* global chrome */
// chrome.storage.sync is not supported in every Chromium-derivate.
const storageArea = chrome.storage.sync || chrome.storage.local;

module.exports = {
	getSettings: () => {
		return new Promise((resolve, reject) => {
			storageArea.get({ settings: {} }, function (result) {
				console.debug(`[stored] ${JSON.stringify(result)}`);
				if (result) return resolve(result.settings);
				return reject(new Error("Failed to retrieve settings"));
			});
		});
	},
};
