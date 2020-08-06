const apiUtil = {
	parseJSON: function (response) {
		return response === null ? null : response.json();
	},
};

module.exports = apiUtil;
