import { Card, Form, Image, Typography } from "antd";
import AnswerSubmit from "../Answer/AnswerSubmit";
import "./QuestionSubmit.scss";

export default function QuestionSubmit(props: any) {
	const { question, disabled = false } = props;
	return (
		<Card key={question._id} className="question-list question-submit-card">
			<Form.Item
				label={
					<div>
						<Typography.Title level={4}>
							{question.questionText}{" "}
							{question?.required && (
								<span style={{ color: "#AA1D2A" }}>*</span>
							)}
						</Typography.Title>
						{question.description && (
							<Typography.Paragraph type="secondary">
								{question.description}
							</Typography.Paragraph>
						)}
					</div>
					// <div>
					// 	<p style={{ fontWeight: 600, fontSize: 20 }}>
					// 		{question.questionText}
					// 	</p>
					// 	{question?.required && <span style={{ color: "#AA1D2A" }}>*</span>}
					// 	{question.description && (
					// 		<Typography.Paragraph type="secondary">
					// 			{question.description}
					// 		</Typography.Paragraph>
					// 	)}
					// </div>
				}
				required={question.required}
				style={{ marginBottom: 0 }}
			>
				{question.questionMedia && (
					<Image
						src={question.questionMedia.url}
						style={{ marginBottom: 32 }}
					/>
				)}
				<AnswerSubmit
					name={question._id}
					type={question.type}
					answer={question.answer}
					required={question.required}
					disabled={disabled}
					validator={question.validator}
				/>
			</Form.Item>
		</Card>
	);
}
