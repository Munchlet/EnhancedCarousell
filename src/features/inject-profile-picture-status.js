export default function () {
	console.log("[CarousellUtils]: findProfilePictureDiv");
	const profilePicDiv = document.querySelectorAll('img[src^="https://media.karousell.com/media/photos/profiles/"]')[1]
		.parentNode;
	if (!!profilePicDiv) {
		profilePicDiv.classList.add("profile__picture--clean");
		console.log(profilePicDiv);
	}
}
