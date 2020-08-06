const domUtil = {
	hasClass: function (elem, className) {
		const elemClass = elem.getAttribute("class") || "";
		return elemClass.split(" ").indexOf(className) > -1;
	},
};

module.exports = domUtil;
