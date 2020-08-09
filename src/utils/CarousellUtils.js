module.exports = {
	autoExpandReadMore: () => {
		console.log("[CarousellUtils]: autoExpandReadMore");
		const divs = document.getElementsByTagName("button");
		for (let i = 0; i < divs.length; i += 1) {
			if (divs[i].innerHTML.indexOf("read more") > -1) {
				divs[i].click();
			}
		}
	},
	removeSpotlightListings: () => {
		console.log("[CarousellUtils]: removeSpotlightListings");
		Array.from(document.querySelectorAll("#IconSpotlight")).map((link) =>
			link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
		);
	},
	getInboxCount: () => {
		console.log("[CarousellUtils]: findInboxCount");
		const inboxSelector = document.querySelector('a[href="/inbox/"]');
		return !!inboxSelector ? parseInt(inboxSelector.previousElementSibling.textContent, 10) : 0;
	},
};
