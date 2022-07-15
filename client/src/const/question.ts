export const CHECKBOX = 'checkboxes';
export const MULTIPLECHOICE = 'multiple-choice';
export const SHORT = 'short-paragraph';
export const PARAGRAPH = 'paragraph';

export const isNumber = 'isNumber';
export const isCharacter = 'isCharacter';

export const question = [
  { value: CHECKBOX, option: 'Checkbox' },
  { value: MULTIPLECHOICE, option: 'Multiple choice' },
  { value: SHORT, option: 'Short paragraph' },
  { value: PARAGRAPH, option: 'Paragraph' },
];

// export const questionValidation = {
//   [CHECKBOX]: [
//     { value: "maxChoices", display: "Select at most" },
//     { value: "minChoices", display: "Select at least" },
//     { value: "exactChoices", display: "Select exactly" }
//   ],
//   [MULTIPLECHOICE]: [],
//   [SHORT]: [
//     { value: isNumber, display: "Number" },
//     { value: isCharacter, display: "Text" },
//     { value: "maxLength", display: "Maximum characters count" }
//   ],
//   [PARAGRAPH]: [
//     { value: "minLength", display: "Minimum characters count" },
//     { value: "maxLength", display: "Maximum characters count" }
//   ]
// };

export const validatorSchema = {
  type: ['array', 'string', 'number'],
  max: 'number',
  min: 'number',
  pattern: 'string',
  message: 'string',
};

export const questionValidatorType = {
  ARRAY: 'array',
  STRING: 'string',
  NUMBER: 'number',
};

export const validator = {
  [questionValidatorType.ARRAY]: [
    { type: 'min', display: 'Select at least' },
    { type: 'max', display: 'Select at most' },
  ],
  [questionValidatorType.STRING]: [
    { type: 'min', display: 'Minimum characters' },
    { type: 'max', display: 'Maximum characters' },
    { type: 'pattern', display: 'Regex pattern' },
  ],
  [questionValidatorType.NUMBER]: [
    { type: 'min', display: 'Bigger than' },
    { type: 'max', display: 'Smaller than' },
  ],
};

export const questionValidation: any = {
  [CHECKBOX]: [
    { value: questionValidatorType.ARRAY, display: 'Num of answers' },
  ],
  [MULTIPLECHOICE]: [],
  [SHORT]: [
    { value: questionValidatorType.NUMBER, display: 'Number' },
    { value: questionValidatorType.STRING, display: 'Text' },
  ],
  [PARAGRAPH]: [{ value: questionValidatorType.STRING, display: 'Text' }],
};

const newLocal = 'Minimum characters';
export const questionOperators: any = {
  [CHECKBOX]: {
    [questionValidatorType.ARRAY]: [
      { type: 'min', display: 'Select at least' },
      { type: 'max', display: 'Select at most' },
    ],
  },
  [MULTIPLECHOICE]: [],
  [SHORT]: {
    [questionValidatorType.NUMBER]: [
      { type: 'min', display: 'Greater than' },
      { type: 'max', display: 'Smaller than' },
      { type: 'inBetween', display: 'Between' },
    ],
    [questionValidatorType.STRING]: [
      { type: 'min', display: newLocal },
      { type: 'max', display: 'Maximum characters' },
      { type: 'pattern', display: 'Regex pattern' },
    ],
  },
  [PARAGRAPH]: {
    [questionValidatorType.STRING]: [
      { type: 'min', display: 'Minimum characters' },
      { type: 'max', display: 'Maximum characters' },
    ],
  },
};
