export default function () {
	console.log("[CarousellUtils]: removeBumpedListings");
	Array.from(document.querySelectorAll("#iconBumpOutlined")).map((link) =>
		link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
	);
}
