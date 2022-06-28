import { SHORT, PARAGRAPH, MULTIPLECHOICE, CHECKBOX } from "@/const/question";
import { Input, Checkbox, Radio } from "antd";

const { TextArea } = Input;
const AnswerView = (props: any) => {
	const { type, answer } = props;
	let element = null;

	if (type === SHORT || type === PARAGRAPH) {
		element = (
			<TextArea
				placeholder={type === SHORT ? "Short answer" : "Long answer"}
				disabled
			/>
		);
	}

	if (type === MULTIPLECHOICE) {
		element = answer.map((a: any) => {
			return (
				<div key={a.content}>
					<Checkbox disabled />
					<p>{a.content}</p>
				</div>
			);
		});
	}

	if (type === CHECKBOX) {
		element = answer.map((a: any) => {
			return (
				<div key={a.content}>
					<Radio disabled />
					<p>{a.content}</p>
				</div>
			);
		});
	}

	return element;
};

export default AnswerView;
