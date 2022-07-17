const { admin } = require("../firebase");
const AppError = require("../helper/AppError");

module.exports.checkAuth = async (req, res, next) => {
	const authorization = req.headers["authorization"];
	if (!authorization) {
		res.status(401);
		res.json({ error: "There is no Authorization header." });
		return false;
	}
	if (!authorization.includes("Bearer ")) {
		res.status(401);
		res.json({ error: 'Format the Authorization header as "Bearer <Token>"' });
		return false;
	}
	var token = authorization.split(" ")[1];
	admin
		.auth()
		.verifyIdToken(token)
		.then(function (decodedToken) {
			req.user = {
				uid: decodedToken.uid,
				email: decodedToken.email,
				role: decodedToken.role,
			};
			return next();
		})
		.catch(function (error) {
			console.log(error);
			res.status(401);
			res.json({ error: "You are not authorized." });
			return false;
		});
};

module.exports.checkRole = (hasRole = ["teacher"]) => {
	return (req, res, next) => {
		const { role } = req.user;

		if (!role) return next(new AppError(403));

		if (hasRole.includes(role)) return next();

		return next(new AppError(403));
	};
};
