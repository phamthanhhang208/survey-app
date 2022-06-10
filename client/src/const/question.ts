export const CHECKBOX = "checkboxes";
export const MULTIPLECHOICE = "multiple-choice";
export const SHORT = "short-paragraph";
export const PARAGRAPH = "paragraph";

export const isNumber = "isNumber";
export const isCharacter = "isCharacter";

export const question = [
	{ value: CHECKBOX, option: "Checkbox" },
	{ value: MULTIPLECHOICE, option: "Multiple choice" },
	{ value: SHORT, option: "Short paragraph" },
	{ value: PARAGRAPH, option: "Paragraph" },
];

export const questionValidation: any = {
	[CHECKBOX]: [
		{ value: "maxChoices", display: "Select at most" },
		{ value: "minChoices", display: "Select at least" },
		{ value: "exactChoices", display: "Select exactly" },
	],
	[MULTIPLECHOICE]: [],
	[SHORT]: [
		{ value: isNumber, display: "Number" },
		{ value: isCharacter, display: "Text" },
		{ value: "maxLength", display: "Maximum characters count" },
	],
	[PARAGRAPH]: [
		{ value: "minLength", display: "Minimum characters count" },
		{ value: "maxLength", display: "Maximum characters count" },
	],
};
