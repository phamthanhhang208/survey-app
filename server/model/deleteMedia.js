const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const deleteImgSchema = new Schema([{ type: Schema.Types.Mixed }], {
	strict: false,
});

module.exports = mongoose.model("DeleteMedia", deleteImgSchema);
