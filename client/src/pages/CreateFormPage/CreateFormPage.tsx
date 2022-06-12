<<<<<<< HEAD
import { useState } from "react";
import { FunctionComponent } from "react";
import { Col, Button, Form, Card, Input } from "antd";
import "./CreateFormPage.scss";
import QuestionForm from "@/containers/QuestionForm/QuestionForm";
import form from "@/const/mockForm.json";
import Question from "@/components/Question/Question";
import Answer from "@/components/Answer/Answer";
=======
import { FunctionComponent } from 'react';
import { Button, Form, Input, Divider } from 'antd';
import './CreateFormPage.scss';
import QuestionList from '@/components/QuestionList/QuestionList';

const { Item } = Form;
>>>>>>> minhdl

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
<<<<<<< HEAD
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
=======
  const [form] = Form.useForm();
  const handleFinish = (v: any) => {
    console.log(v);
  };

  return (
    <div className='create-form-page'>
      <Form
        onFinish={handleFinish}
        form={form}
        layout={'vertical'}
        className={'create-form'}
      >
        <div className='create-form-header'>
          <Item
            label={'Form name:'}
            rules={[
              { required: true, message: 'Form name must not be empty.' },
            ]}
            name={'form-name'}
            initialValue={'Form name 01'}
          >
            <Input placeholder='Form name' />
          </Item>
          <Item
            label={'Description:'}
            name={'form-description'}
            initialValue='Short description'
          >
            <Input.TextArea placeholder='Description' />
          </Item>
        </div>

        <Divider />
        <div className='form-question-list'>
          <QuestionList form={form} />
        </div>

        <Button
          className='submit-btn'
          type='primary'
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
>>>>>>> minhdl
};

export default CreateFormPage;
