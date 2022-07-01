const errorMsg = {
	400: "Please make sure your input is correct",
	404: "Invalid Id",
	409: "Duplicated",
	403: "Forbinden",
	405: "Method not allowed",
	401: "Unauthorized",
};

class AppError extends Error {
	constructor(statusCode, message) {
		super();
		this.statusCode = statusCode;
		this.message = message || errorMsg[statusCode];
	}
}

module.exports = AppError;
