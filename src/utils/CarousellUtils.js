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
	injectBlockProfile: () => {
		console.log("[CarousellUtils]: injectBlockProfile");
		const followerDiv = document.querySelector('a[href$="/followers/"]').parentNode;
		const node = commonUtil.createIconText("iconDiv__icon iconDiv__icon--block", "Block");
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
			profilePicDiv.classList.add("profile__picture--clean");
			console.log(profilePicDiv);
		}
	},
	injectReputationShield: () => {
		console.log("[CarousellUtils]: injectReputationShield");
		const nameNode = document.querySelectorAll('img[src^="https://media.karousell.com/media/photos/profiles/"]')[1]
			.parentNode.parentNode.nextSibling;
		console.log(nameNode);

		const clonedNameNode = nameNode.cloneNode(true);

		const node = document.createElement("div");
		node.setAttribute("class", "iconDiv");

		const iconDiv = document.createElement("div");
		iconDiv.setAttribute("class", "iconDiv__icon iconDiv__icon--clean");

		node.appendChild(iconDiv);
		node.appendChild(clonedNameNode);
		nameNode.parentNode.insertBefore(node, nameNode);
		nameNode.parentNode.removeChild(nameNode);
	},
};
