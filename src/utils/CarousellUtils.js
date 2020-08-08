module.exports = {
	autoExpandReadMore: () => {
		const divs = document.getElementsByTagName("button");
		for (let i = 0; i < divs.length; i += 1) {
			if (divs[i].innerHTML.indexOf("read more") > -1) {
				divs[i].click();
			}
		}
	},
	removeSpotlightListings: () => {
		Array.from(document.querySelectorAll("#IconSpotlight")).map((link) =>
			link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
		);
	},
};
