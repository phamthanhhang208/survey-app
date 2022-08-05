import QuestionModal from '@/components/Question/QuestionModal';
import QuestionListView from '@/components/QuestionListView/QuestionListView';
import { useGetForm, useUpdateForm } from '@/hooks/form.hook';
import { useAddQuestion } from '@/hooks/question.hook';
import { VerticalAlignTopOutlined, EyeOutlined } from '@ant-design/icons';
import { BackTop, Button, Form, Input, Modal, Skeleton, Spin } from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './CreateFormPage.scss';

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
  const { data: formDetail, isLoading } = useGetForm();
  const { mutate: updateForm } = useUpdateForm();
  const [form] = Form.useForm();
  const [formHeader] = Form.useForm();
  const { mutate: addQuestion } = useAddQuestion();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isDestroyOnClose, setIsDestroyOnClose] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showModal = () => {
    setIsDestroyOnClose(false);
    setVisible(true);
  };

  useEffect(() => {
    formHeader.setFieldsValue({
      title: formDetail?.title,
      description: formDetail?.description,
    });
  }, [isLoading, formDetail, formHeader]);

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = async (v: any) => {
    setIsDestroyOnClose(true);

    try {
      const formData = new FormData();
      formData.append('questionText', v.questionText);
      formData.append('type', v.type);
      formData.append('required', v.required);

      if (v?.validator) {
        Object.entries(v?.validator).forEach(([key, value]) => {
          if (value) {
            formData.append(`validator[${key}]`, value as any);
          }
        });
      }

      if (v?.description) {
        formData.append('description', v?.description);
      }

      if (v?.questionImage) {
        formData.append(
          'questionMedia',
          v.questionImage.fileList[0].originFileObj,
          v.questionImage.fileList[0].uid
        );
      }

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
    Modal.destroyAll();
    setVisible(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const handleUpdateFormHeader = (v: any) => {
    const values = {
      title: formHeader.getFieldValue('title'),
      description: formHeader.getFieldValue('description'),
    };

    if (
      formDetail.title !== values.title ||
      formDetail?.description !== values.description
    ) {
      updateForm({ id: formDetail._id, values });
    }
  };

  const handleViewFormBtn = () => {
    const tmp = location.pathname.split('/');
    tmp.pop();
    const newPath = tmp.join().replaceAll(',', '/');

    navigate(`${newPath}/viewform`);
  };

  const getNewPath = () => {
    const tmp = location.pathname.split('/');
    tmp.pop();
    const newPath = tmp.join().replaceAll(',', '/');

    return `${newPath}/viewform`;
  };

  return (
    <div className='create-form-page'>
      <BackTop className='back-top-icon'>
        <VerticalAlignTopOutlined />
      </BackTop>

      <Modal
        title='Add question'
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose={isDestroyOnClose}
        width={700}
        bodyStyle={{ paddingBottom: 10 }}
      >
        <Form
          form={form}
          className='question'
          onFinish={handleSubmit}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          labelAlign='left'
          labelWrap
          preserve={false}
        >
          <QuestionModal form={form} />
        </Form>
      </Modal>

      <Form
        form={formHeader}
        initialValues={{
          title: formDetail?.title,
          description: formDetail?.description,
        }}
        className='create-form-header'
        onFinish={handleUpdateFormHeader}
      >
        <Form.Item
          name={'title'}
          rules={[{ required: true, message: 'Title can not be empty' }]}
        >
          <Input
            placeholder='Form title'
            style={{
              border: 'none',
              fontSize: '1.9rem',
              fontWeight: 400,
              borderBottom: '0.5px solid grey',
              padding: 0,
            }}
            onBlur={() => formHeader.submit()}
            onPressEnter={() => {
              formHeader.getFieldInstance('title').blur();
            }}
          />
        </Form.Item>
        <Form.Item name={'description'}>
          <Input.TextArea
            autoSize
            placeholder='Form description'
            style={{
              border: 'none',
              fontSize: '0.96rem',
              fontWeight: 300,
              padding: 0,
              borderBottom: '0.5px solid grey',
            }}
            onBlur={() => formHeader.submit()}
          />
        </Form.Item>
      </Form>

      <div className='create-question-fields'>
        {/* <div className='viewform-btn' onClick={() => handleViewFormBtn()}>
          <EyeOutlined />
          Viewform
        </div> */}
        <Link className='viewform-btn' to={getNewPath()} target='_blank'>
          <EyeOutlined />
          Viewform
        </Link>

        <Button type='primary' onClick={showModal}>
          Add question
        </Button>
      </div>

      {isLoading ? (
        <Skeleton active />
      ) : (
        <QuestionListView
          className={'question-list-view'}
          questions={formDetail?.questions}
          formId={formDetail._id}
        />
      )}
    </div>
  );
};

export default CreateFormPage;
