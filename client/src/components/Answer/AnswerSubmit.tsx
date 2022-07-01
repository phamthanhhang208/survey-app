import { SHORT, PARAGRAPH, CHECKBOX, MULTIPLECHOICE } from "@/const/question";
import { Checkbox, Radio, Input, Form, Image } from "antd";

const AnswerSubmit = (props: any) => {
	const { type, answer, name, required, disabled } = props;
	let element = null;
	if (type === MULTIPLECHOICE) {
		element = (
			<Radio.Group>
				{answer.map((a: any, idx: any) => {
					return (
						<div key={idx}>
							<Radio value={a.content}>{a.content}</Radio>
							<br />
							{a.media && <Image src={a.media.url} />}
						</div>
					);
				})}
			</Radio.Group>
		);
	}
	if (type === CHECKBOX) {
		element = (
			<Checkbox.Group disabled={disabled}>
				{answer.map((a: any, idx: any) => {
					return (
						<div key={idx}>
							<Checkbox value={a.content}>{a.content}</Checkbox>
							<br />
							{a.media && <Image src={a.media.url} />}
						</div>
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
