export default function () {
	console.log("[CarousellUtils]: injectReputationShield");
	const nameNode = document.querySelectorAll('img[src^="https://media.karousell.com/media/photos/profiles/"]')[1]
		.parentNode.parentNode.nextSibling;

	const clonedNameNode = nameNode.cloneNode(true);

	const node = document.createElement("div");
	node.setAttribute("class", "iconDiv");

	const iconDiv = document.createElement("div");
	iconDiv.setAttribute("class", "iconDiv__icon iconDiv__icon--clean");

	node.appendChild(iconDiv);
	node.appendChild(clonedNameNode);
	nameNode.parentNode.insertBefore(node, nameNode);
	nameNode.parentNode.removeChild(nameNode);
}
