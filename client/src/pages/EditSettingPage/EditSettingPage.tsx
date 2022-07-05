import React from 'react';
import { Card, Form, Switch, Spin } from 'antd';
import { useGetForm, useUpdateForm } from '@/hooks/form.hook';
import { useParams } from 'react-router-dom';
import './EditSettingPage.scss';

const EditSettingPage: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data: formDetail, isLoading } = useGetForm();
  const { mutate: updateFormSetting } = useUpdateForm();

  if (isLoading) {
    return <Spin />;
  }

  const handleOnChange = (values: any) => {
    updateFormSetting({ id, values });
  };

  return (
    <div className='edit-setting-page'>
      <Card>
        <Form
          layout='horizontal'
          form={form}
          onValuesChange={handleOnChange}
          initialValues={{
            isAcceptResponse: formDetail?.isAcceptResponse,
            isAllowAnonymous: formDetail?.isAllowAnonymous,
          }}
        >
          <Form.Item
            name='isAcceptResponse'
            label='Accepting Responses'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name='isAllowAnonymous'
            label='Allow anonymous respondents'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default EditSettingPage;
