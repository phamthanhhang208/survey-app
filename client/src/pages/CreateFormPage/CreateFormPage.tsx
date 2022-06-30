import QuestionModal from '@/components/Question/QuestionModal';
import QuestionListView from '@/components/QuestionListView/QuestionListView';
import { useGetForm } from '@/hooks/form.hook';
import { useAddQuestion } from '@/hooks/question.hook';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { FunctionComponent, useState } from 'react';
import './CreateFormPage.scss';

const { Item } = Form;

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
  const permission = useCurrentPermission();
  const [form] = Form.useForm();
  const { data: formDetail, isLoading } = useGetForm();
  const { mutate: addQuestion } = useAddQuestion();

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = async (v: any) => {
    try {
      const formData = new FormData();
      formData.append('questionText', v.questionText);
      formData.append('type', v.type);
      formData.append('required', v.required);

      switch (v.type) {
        case 'multiple-choice':
          formData.append(
            'answer',
            JSON.stringify([
              ...v?.multipleChoice.map((c: any) => {
                return { content: c };
              }),
            ])
          );
          break;
        case 'checkboxes':
          formData.append(
            'answer',
            JSON.stringify([
              ...v?.checkboxes.map((c: any) => {
                return { content: c };
              }),
            ])
          );

          break;
        case 'short-paragraph':
          formData.append('answer', JSON.stringify([{ content: '' }]));
          break;
        case 'paragraph':
          formData.append('answer', JSON.stringify([{ content: '' }]));
          break;

        default:
          break;
      }

      const entries = formData.entries();

      for (let entry of entries) {
        console.log(entry[0], entry[1]);
      }
      // const req = addQuestion({ id: formDetail._id, values: formData });
      const req = addQuestion({
        id: formDetail._id,
        values: {
          questionText: 'test hard code checkboxes',
          type: 'checkboxes',
          required: 'false',
          answer: [{ content: 'met qua' }, { content: 'met qua 2' }],
        },
      });
      setConfirmLoading(true);
      const res = await req;
      console.log(res);

      form.resetFields();
    } catch (error) {
      console.log('go here');

      console.log(error);
    }
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  if (isLoading) {
    return <Spin />;
  }

  const handleFinish = (v: any) => {
    console.log(form.getFieldValue(['questions']));
  };

  return (
    <div className='create-form-page'>
      <Form
        onFinish={handleFinish}
        // form={form}
        layout={'vertical'}
        className={'create-form'}
        initialValues={{
          title: formDetail?.title,
        }}
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
      </Form>

      <div className='form-question-list'>
        <Button type='primary' onClick={showModal}>
          Add question
        </Button>
        <Modal
          title='Title'
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose
        >
          <Form form={form} className='question' onFinish={handleSubmit}>
            <QuestionModal />
          </Form>
        </Modal>
      </div>

      <QuestionListView
        className={'question-list-view'}
        questions={formDetail?.questions}
      />
    </div>
  );
};

export default CreateFormPage;
