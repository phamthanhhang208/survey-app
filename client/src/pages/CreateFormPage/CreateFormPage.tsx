import QuestionList from '@/components/QuestionList/QuestionList';
import { useGetForm } from '@/hooks/form.hook';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import { Button, Divider, Form, Input, Spin } from 'antd';
import { FunctionComponent, useState } from 'react';
import './CreateFormPage.scss';

//mock
import mockForm from '@/const/mockForm.json';

const { Item } = Form;

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
  const permission = useCurrentPermission();
  const [form] = Form.useForm();
  const [, reload] = useState(true);
  // const { data: formDetail, isLoading } = useGetForm();

  // if (isLoading) {
  //   return <Spin />;
  // }

  const handleFinish = (v: any) => {
    console.log(form.getFieldValue(['questions']));
  };

  const convertedQuestionsData = () => {
    const res = mockForm?.questions.map((q: any) => {
      return {
        ...q,
        answers: [...q.answer],
        additionalFields: [
          q?.description && 'question-description',
          q?.validator && 'response-validation',
        ],
      };
    });

    res.forEach((element: any) => {
      delete element.answer;
    });

    return res;
  };

  return (
    <div className='create-form-page'>
      <Form
        onFinish={handleFinish}
        form={form}
        layout={'vertical'}
        className={'create-form'}
        // initialValues={{
        //   questions: [...convertedQuestionsData()],
        //   title: mockForm?.title,
        // }}
      >
        <div className='create-form-header'>
          <Item
            label={'Form name:'}
            rules={[
              { required: true, message: 'Form name must not be empty.' },
            ]}
            name={'title'}
          >
            <Input
              placeholder='Form name'
              disabled={permission === 'edit' ? false : true}
            />
          </Item>
          <Item label={'Description:'} name={'formDescription'}>
            <Input.TextArea
              placeholder='Description'
              disabled={permission === 'edit' ? false : true}
            />
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
  );
};

export default CreateFormPage;
