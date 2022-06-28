const schemaForm = {
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
	required: ["title"],
};

module.exports = {
	schemaForm,
};
