class AppError extends Error {
	constructor(statusCode) {
		super();
		this.statusCode = statusCode;
		this.message = errorMsg[statusCode];
	}
}

module.exports = AppError;
