/* global chrome */
module.exports = {
	getSettings: () => {
		return new Promise((resolve, reject) => {
			chrome.storage.sync.get({ settings: {} }, function (result) {
				console.debug(`[stored] ${JSON.stringify(result)}`);
				if (result) return resolve(result);
				return reject(new Error("Failed to retrieve settings"));
			});
		});
	},
};
