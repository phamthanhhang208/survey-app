import { FunctionComponent } from 'react';
import { Button, Form, Input, Divider } from 'antd';
import './CreateFormPage.scss';
import QuestionList from '@/components/QuestionList/QuestionList';
import useCurrentPermission from '@/hooks/useCurrentPermission';

const { Item } = Form;

interface CreateFormPageProps {}

const CreateFormPage: FunctionComponent<CreateFormPageProps> = () => {
  const permission = useCurrentPermission();
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
            <Input
              placeholder='Form name'
              disabled={permission === 'edit' ? false : true}
            />
          </Item>
          <Item
            label={'Description:'}
            name={'form-description'}
            initialValue='Short description'
          >
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
