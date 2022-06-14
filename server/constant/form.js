const { schemaQuestion } = require("../constant/question");

const schemaForm = {
	type: "object",
	properties: {
		title: {
			type: "string",
		},
		description: {
			type: "string",
		},
		questions: {
			type: "array",
			items: schemaQuestion,
		},
	},
	required: ["title"],
};

module.exports = {
	schemaForm,
};
