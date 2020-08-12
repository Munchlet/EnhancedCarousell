const commonUtil = require("./commonUtil");

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
	removeBumpedListings: () => {
		console.log("[CarousellUtils]: removeBumpedListings");
		Array.from(document.querySelectorAll("#iconBumpOutlined")).map((link) =>
			link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
		);
	},
	getInboxCount: () => {
		console.log("[CarousellUtils]: findInboxCount");
		const inboxSelector = document.querySelector('a[href="/inbox/"]');
		return !!inboxSelector ? parseInt(inboxSelector.previousElementSibling.textContent, 10) : 0;
	},
	findProfileFollowerDiv: () => {
		console.log("[CarousellUtils]: findProfileFollowerDiv");
		const followerDiv = document.querySelector('a[href$="/followers/"]').parentNode;
		const node = commonUtil.createIconText("", "Block");
		followerDiv.parentNode.insertBefore(node, followerDiv);
		node.addEventListener("click", function (e) {
			alert("Thanks!");
		});
	},
	findProfilePictureDiv: () => {
		console.log("[CarousellUtils]: findProfilePictureDiv");
		const profilePicDiv = document.querySelectorAll(
			'img[src^="https://media.karousell.com/media/photos/profiles/"]'
		)[1].parentNode;
		if (!!profilePicDiv) {
			profilePicDiv.classList.add("profile__picture--caution");
			console.log(profilePicDiv);
		}
	},
};
