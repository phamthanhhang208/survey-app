import { useState } from "react";
import { FunctionComponent } from "react";
import { Col, Button, Form, Card, Input } from "antd";
import "./CreateFormPage.scss";
import QuestionForm from "@/containers/QuestionForm/QuestionForm";
import form from "@/const/mockForm.json";
import Question from "@/components/Question/Question";
import Answer from "@/components/Answer/Answer";

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
	const [visible, setVisible] = useState(false);
	const { questions } = form;
	//console.log(questions);
	const onFinish = (values: any) => {
		console.log("Success:", values);
	};
	return (
		<Col span={12} offset={6}>
			<Button type="primary" block onClick={() => setVisible(!visible)}>
				Add a question
			</Button>
			<QuestionForm visible={visible} setVisible={setVisible} />
			<Form
				onFinish={onFinish}
				name="display-questions"
				initialValues={{ questions }}
				//disabled={true}
			>
				<Form.List name="questions">
					{(fields) => (
						<>
							{fields.map((field, index) => (
								<div key={field.key}>
									<Card>
										<Form.Item name={[field.name, "questionText"]}>
											<Input />
										</Form.Item>
										<Form.Item name={[field.name, "description"]}>
											<Input />
										</Form.Item>
									</Card>
								</div>
							))}
						</>
					)}
				</Form.List>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
				{/* {questions.map((q) => {
					return <Question key={q._id} {...q} />;
				})} */}
			</Form>

			<Button type="primary" block>
				View form
			</Button>
		</Col>
	);
};

export default CreateFormPage;
