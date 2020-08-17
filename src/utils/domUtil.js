import OptionsSync from "webext-options-sync";
import select from "select-dom";

export const enableFeature = async ({ fn, id }) => {
	const options = await new OptionsSync().getAll();
	console.log(options);
	if (!options[id] || typeof options[id] === "undefined") {
		document.querySelector("html").classList.remove(id);
		return console.log("↩️", "Skipping", id);
	}

	try {
		document.querySelector("html").classList.add(id);
		await fn();
		console.log("✅", id);
	} catch (error) {
		console.log("❌", id);
		console.error(error);
	}
};

export const observeEl = (el, listener, options = { childList: true }) => {
	if (typeof el === "string") el = select(el);
	if (!el) return;
	listener([]);
	const observer = new MutationObserver(listener);
	observer.observe(el, options);
	return observer;
};

export const isProfilePage = () => {
	const divs = document.getElementsByTagName("p");
	for (const div of divs) if (div.textContent.indexOf("Reviews") > -1) return true;
	return false;
};

export const isOwnProfilePage = () => {
	const divs = document.getElementsByTagName("button");
	let isOwn = false;
	for (const div of divs) {
		if (div.innerHTML.indexOf("Edit Profile") > -1) {
			isOwn = true;
			break;
		}
	}

	return isProfilePage() && isOwn;
};

export const isLoggedIn = () => {
	let registerBtn = false;
	let loginBtn = false;
	const divs = document.getElementsByTagName("p");
	for (const div of divs) {
		if (!registerBtn) registerBtn = div.textContent === "Register";
		if (!loginBtn) loginBtn = div.textContent === "Login";
	}

	console.log(registerBtn, loginBtn);
	return !registerBtn && !loginBtn;
};
