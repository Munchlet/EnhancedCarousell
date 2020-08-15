export default function () {
	console.log("[CarousellUtils]: findInboxCount");
	const inboxSelector = document.querySelector('a[href="/inbox/"]');
	return !!inboxSelector ? parseInt(inboxSelector.previousElementSibling.textContent, 10) : 0;
}
