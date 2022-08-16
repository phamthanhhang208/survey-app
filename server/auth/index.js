const { roles } = require("../constant/role");

module.exports.checkAuth = () => {};

module.exports.checkRole = (hasRole = roles.teacher) => {
	return (req, res, next) => {
		const { role } = req.user;

		if (!role) return next(new AppError(403));

		if (hasRole.includes(role)) return next();

		return next(new AppError(403));
	};
};
