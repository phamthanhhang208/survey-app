const typeTemplate = "The answer is not a valid ${type}";

export const validateMessage = {
	default: "Validation error on field of this question",
	required: "This question is required",
	types: {
		string: typeTemplate,
		method: typeTemplate,
		array: typeTemplate,
		object: typeTemplate,
		number: typeTemplate,
		date: typeTemplate,
		boolean: typeTemplate,
		integer: typeTemplate,
		float: typeTemplate,
		regexp: typeTemplate,
		email: typeTemplate,
		url: typeTemplate,
		hex: typeTemplate,
	},
	string: {
		/*eslint no-template-curly-in-string: */
		len: "The answer must be exactly ${len} characters",
		min: "The answer must be at least ${min} characters",
		max: "The answer cannot be longer than ${max} characters",
		range: "The answer must be between ${min} and ${max} characters",
	},
	number: {
		len: "The answer must equal ${len}",
		min: "The answer cannot be less than ${min}",
		max: "The answer cannot be greater than ${max}",
		range: "The answer must be between ${min} and ${max}",
	},
	array: {
		len: "The answer must be exactly ${len} in length",
		min: "The answer cannot be less than ${min} in length",
		max: "The answer cannot be greater than ${max} in length",
		range: "The answer must be between ${min} and ${max} in length",
	},
	pattern: {
		mismatch: "The answer does not match pattern ${pattern}",
	},
};
