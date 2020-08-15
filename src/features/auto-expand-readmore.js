export default function () {
	console.log("[CarousellUtils]: autoExpandReadMore");
	const divs = document.getElementsByTagName("button");
	for (const div of divs) if (div.innerHTML.indexOf("read more") > -1) div.click();
}
