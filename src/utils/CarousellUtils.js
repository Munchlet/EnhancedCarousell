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
		const node = document.createElement("div"); // Create a <li> node
		node.style.display = "flex";
		node.style.alignItems = "center";
		node.style.cursor = "pointer";
		node.innerHTML = `<div style="height:16px;width:16px;display:inline-block;margin-right:8px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="none" d="M-1-1h18v18H-1z"/><g><path fill="#d15241" stroke="null" d="M8 0a8 8 0 100 16A8 8 0 008 0zM2 8a6 6 0 019-5l-8 8-1-3zm6 6l-3-1 8-8a6 6 0 01-5 9z"/></g></svg></div><span>Block</span>`;
		followerDiv.parentNode.insertBefore(node, followerDiv);
		node.addEventListener("click", function (e) {
			alert("Thanks!");
		});
	},
};
