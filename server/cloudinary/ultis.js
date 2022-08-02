const { cloudinary } = require("../cloudinary");

const deleteImg = async (filename) => {
	return await cloudinary.uploader.destroy(filename);
};

const uploadImg = async (url) => {
	return await cloudinary.uploader.upload(url, {
		folder: "survey-app",
	});
};

module.exports = {
	deleteImg,
	uploadImg,
};
