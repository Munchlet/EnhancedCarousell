export default function () {
	console.log("[CarousellUtils]: removeSpotlightListings");
	Array.from(document.querySelectorAll("#IconSpotlight")).map((link) =>
		link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
	);
}
