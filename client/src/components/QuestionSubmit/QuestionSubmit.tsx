import { Card, Form, Image } from "antd";
import AnswerSubmit from "../Answer/AnswerSubmit";
import "./QuestionSubmit.scss";

export default function QuestionSubmit(props: any) {
	const { question } = props;
	return (
		<Card key={question._id} className="question-list">
			<Form.Item label={question.questionText} required={question.required}>
				{question.questionMedia && <Image src={question.questionMedia.url} />}
				<AnswerSubmit
					name={question._id}
					type={question.type}
					answer={question.answer}
					required={question.required}
				/>
			</Form.Item>
		</Card>
	);
}
