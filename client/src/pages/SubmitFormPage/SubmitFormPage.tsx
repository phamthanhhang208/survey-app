import React from "react";
import "./SubmitFormPage.scss";
import { Card, Typography, Divider, Form, Button, Spin } from "antd";
//import AnswerSubmit from "@/components/Answer/AnswerSubmit";
import { useGetForm } from "@/hooks/form.hook";
import { useAddResponse } from "@/hooks/response.hook";
import { useParams } from "react-router-dom";
import QuestionSubmit from "@/components/QuestionSubmit/QuestionSubmit";

const { Title } = Typography;

const SubmitFormPage: React.FC = () => {
	const { id } = useParams();
	const { data: formDetail, isLoading } = useGetForm();
	const { mutate: addResponse } = useAddResponse();

	if (isLoading) {
		return <Spin />;
	}

	const onFinish = (values: any) => {
		const answers = [];
		for (const [questionId, response] of Object.entries(values)) {
			const answer = [];
			if (response) {
				if (Array.isArray(response)) {
					for (const content of response) {
						answer.push({ content: content });
					}
				} else {
					answer.push({ content: response });
				}
				answers.push({ questionId, answer });
			}
		}
		addResponse({ id, values: answers });
		console.log(values);
	};
	return (
		<>
			<div className="submit-form-page">
				<div className="form-title">
					<Card>
						<Typography>
							<Title>{formDetail.title}</Title>
						</Typography>
						{/* {formDetail.description && (
						<Card.Meta description={formDetail.description} />
					)} */}
					</Card>
				</div>
				<Divider />
				<Form layout="vertical" onFinish={onFinish}>
					{formDetail.questions.map((q: any) => {
						return (
							<QuestionSubmit key={q._id} question={q} />
							// <Card key={q._id} className="question-list">
							// 	<Form.Item label={q.questionText} required={q.required}>
							// 		<AnswerSubmit
							// 			name={q._id}
							// 			type={q.type}
							// 			answer={q.answer}
							// 			required={q.required}
							// 		/>
							// 	</Form.Item>
							// </Card>
						);
					})}
					<Form.Item>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>
				</Form>
			</div>
		</>
	);
};

export default SubmitFormPage;
