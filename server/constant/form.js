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
		isAllowAnonymous: {
			type: "boolean",
		},
		isAcceptResponse: { type: "boolean" },
	},
	//required: ["title"],
};

module.exports = {
	schemaForm,
};
