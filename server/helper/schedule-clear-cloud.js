const { cloudinary } = require("../cloudinary");
const DeleteMedia = require("../model/deleteMedia");

const deleteImages = async () => {
	try {
		const images = await DeleteMedia.find({});
		if (images.length !== 0) {
			console.log("deleting images on cloudinary");
			for (const img of images) {
				await cloudinary.uploader.destroy(img.filename);
				await DeleteMedia.findByIdAndDelete(img._id);
			}
		} else {
			console.log("My job here is done");
		}
	} catch (error) {
		console.log(error);
	}
};

module.exports = deleteImages;
