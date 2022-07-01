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
    console.log('first');
  };

  const handleSubmit = async (v: any) => {
    try {
      const formData = new FormData();
      formData.append('questionText', v.questionText);
      formData.append('type', v.type);
      formData.append('required', v.required);

      console.log(v);

      switch (v.type) {
        case 'multiple-choice':
          const arrMultipleChoice = [
            ...v?.multipleChoice.map((c: any) => {
              return { content: c.content, media: c.media?.fileList[0] };
            }),
          ];

          // return console.log(arrMultipleChoice);
          for (let i = 0; i < arrMultipleChoice.length; i++) {
            formData.append(
              `answer[${i}][content]`,
              arrMultipleChoice[i].content
            );
            if (arrMultipleChoice[i].media) {
              formData.append(
                `answer[${i}][media]`,
                arrMultipleChoice[i].media.originFileObj,
                arrMultipleChoice[i].media.uid
              );
            }
          }

          break;
        case 'checkboxes':
          const arrCheckbox = [
            ...v?.checkboxes.map((c: any) => {
              return { content: c.content, media: c.media?.fileList[0] };
            }),
          ];

          for (let i = 0; i < arrCheckbox.length; i++) {
            formData.append(`answer[${i}][content]`, arrCheckbox[i].content);

            if (arrCheckbox[i].media) {
              formData.append(
                `answer[${i}][media]`,
                arrCheckbox[i].media.originFileObj,
                arrCheckbox[i].media.uid
              );
            }
          }

          break;
        case 'paragraph':
        case 'short-paragraph':
          formData.append('answer[0][content]', '');
          break;

        default:
          break;
      }

      const req = addQuestion({ id: formDetail._id, values: formData });

      setConfirmLoading(true);
      const res = await req;
      console.log(res);

      form.resetFields();
    } catch (error) {
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
          title='Add question'
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          destroyOnClose
          width={700}
        >
          <Form form={form} className='question' onFinish={handleSubmit}>
            <QuestionModal form={form} />
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
