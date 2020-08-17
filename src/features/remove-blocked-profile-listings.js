import OptionsSync from "webext-options-sync";
import select from "select-dom";

const optionsStorage = new OptionsSync();

export default function () {
	console.log("[CarousellUtils]: removeBlockedProfileListings");
	optionsStorage.getAll().then(({ profilesBlock = [] }) => {
		if (profilesBlock.length < 1) return;
		const listings = select.all('img[src^="https://media.karousell.com/media/photos/profiles"]');
		listings.splice(0, 1);
		const names = listings.map((link) => ({
			name: link.parentNode.parentNode.nextSibling.firstChild.textContent,
			parent: link.parentNode.parentNode.parentNode.parentNode.parentNode,
		}));

		for (const name of names) if (profilesBlock.includes(name.name)) name.parent.remove();
	});
}
