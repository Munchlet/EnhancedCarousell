import { createIconText } from "../utils/commonUtil";
import OptionsSync from "webext-options-sync";

const optionsStorage = new OptionsSync();

export default async function () {
	console.log("[CarousellUtils]: injectBlockProfile");
	const followerDiv = document.querySelector('a[href$="/followers/"]').parentNode;
	// pathname = /{username}
	// const matches = /https:\/\/[\w+]{2,2}\.carousell\.com\/(.*?)$/g.exec(window.location.href)
	const username = window.location.pathname.substr(1);
	let node = null;
	const { profilesBlock = [] } = await optionsStorage.getAll();
	const blocked = profilesBlock.includes(username);
	if (blocked) node = createIconText("iconDiv__icon iconDiv__icon--block", "Unblock");
	else node = createIconText("iconDiv__icon iconDiv__icon--block", "Block");
	followerDiv.parentNode.insertBefore(node, followerDiv);
	node.addEventListener("click", async (e) => {
		if (blocked) {
			const idx = profilesBlock.indexOf(username);
			if (idx > -1) profilesBlock.splice(idx, 1);
		} else profilesBlock.push(username);
		await optionsStorage.set({ profilesBlock });
		window.location.reload();
		// TODO: Prevent reloading somehow
	});
}
