const commonUtil = require("../utils/commonUtil");

export default function () {
	console.log("[CarousellUtils]: injectBlockProfile");
	const followerDiv = document.querySelector('a[href$="/followers/"]').parentNode;
	const node = commonUtil.createIconText("iconDiv__icon iconDiv__icon--block", "Block");
	followerDiv.parentNode.insertBefore(node, followerDiv);
	node.addEventListener("click", function (e) {
		alert("Thanks!");
	});
}
