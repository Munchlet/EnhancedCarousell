const commonUtil = require("../utils/commonUtil");

export default function () {
	console.log("[CarousellUtils]: injectDeleteListingProfile");
	const insightNodes = document.querySelectorAll('img[src^="https://mweb-cdn.karousell.com/build/listing-insight-"]');

	if (insightNodes.length < 1) return;
	for (const insightNode of insightNodes) {
		const parent = insightNode.parentNode;
		const url = parent.parentNode.previousSibling.firstChild.href;
		if (url === null) return;
		const commonPattern = /^https:\/\/sg\.carousell\.com\/p\/.+-(\d+)\/\?/g;
		const matches = commonPattern.exec(url);
		if (matches === null) return;
		const itemId = matches[1].trim();
		const node = document.createElement("div");
		node.setAttribute("class", "iconDiv__icon iconDiv__icon--delete");
		node.addEventListener("click", async (e) => {
			try {
				const response = await commonUtil.createHttp({
					method: "DELETE",
					url: `https://sg.carousell.com/api-service/listing/2.0/product/${itemId}/`,
				});

				const json = JSON.parse(response);
				if (json.data.success) parent.parentNode.parentNode.remove();
			} catch (error) {
				console.error(error);
			}
		});

		parent.parentNode.insertBefore(node, parent);
	}
}
