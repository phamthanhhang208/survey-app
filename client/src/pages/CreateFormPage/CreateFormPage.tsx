import { FunctionComponent } from "react";
import { Button, Form, Input, Divider } from "antd";
import "./CreateFormPage.scss";
import QuestionList from "@/components/QuestionList/QuestionList";

const { Item } = Form;

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
	const [form] = Form.useForm();
	const handleFinish = (v: any) => {
		console.log(v);
	};

	return (
		<div className="create-form-page">
			<Form
				onFinish={handleFinish}
				form={form}
				layout={"vertical"}
				className={"create-form"}
			>
				<div className="create-form-header">
					<Item
						label={"Form name:"}
						rules={[
							{ required: true, message: "Form name must not be empty." },
						]}
						name={"form-name"}
						initialValue={"Form name 01"}
					>
						<Input placeholder="Form name" />
					</Item>
					<Item
						label={"Description:"}
						name={"form-description"}
						initialValue="Short description"
					>
						<Input.TextArea placeholder="Description" />
					</Item>
				</div>

				<Divider />
				<div className="form-question-list">
					<QuestionList form={form} />
				</div>

				<Button
					className="submit-btn"
					type="primary"
					onClick={() => form.submit()}
				>
					Submit
				</Button>
			</Form>
		</div>
		// <Col span={12} offset={6}>
		// 	<Button type="primary" block onClick={() => setVisible(!visible)}>
		// 		Add a question
		// 	</Button>
		// 	<QuestionForm visible={visible} setVisible={setVisible} />
		// 	<Question />
		// 	<Button type="primary" block>
		// 		View form
		// 	</Button>
		// </Col>
	);
};

export default CreateFormPage;
