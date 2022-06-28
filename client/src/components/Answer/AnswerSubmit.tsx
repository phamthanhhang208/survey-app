import { SHORT, PARAGRAPH, CHECKBOX, MULTIPLECHOICE } from "@/const/question";
import { Checkbox, Radio, Input, Form } from "antd";

const AnswerSubmit = (props: any) => {
	const { type, answer, name, required } = props;
	let element = null;
	if (type === MULTIPLECHOICE) {
		element = (
			<Radio.Group>
				{answer.map((a: any, idx: any) => {
					return (
						<Radio key={idx} value={a.content}>
							{a.content}
						</Radio>
					);
				})}
			</Radio.Group>
		);
	}
	if (type === CHECKBOX) {
		element = (
			<Checkbox.Group>
				{answer.map((a: any, idx: any) => {
					return (
						<Checkbox key={idx} value={a.content}>
							{a.content}
						</Checkbox>
					);
				})}
			</Checkbox.Group>
		);
	}

	if (type === SHORT) {
		element = <Input.TextArea autoSize={{ maxRows: 1 }} />;
	}

	if (type === PARAGRAPH) {
		element = <Input.TextArea autoSize />;
	}

	return (
		<Form.Item
			name={name}
			rules={[{ required: required, message: "This question is required" }]}
		>
			{element}
		</Form.Item>
	);
};

export default AnswerSubmit;
