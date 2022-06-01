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
};

const schemaFormEdit = {
	type: "object",
	additionalProperties: false,
	properties: {
		title: {
			type: "string",
		},
		description: {
			type: "string",
		},
	},
};

module.exports = {
	schemaForm,
	schemaFormEdit,
};
