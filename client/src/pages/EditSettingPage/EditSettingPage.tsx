import { useGetForm, useUpdateForm } from '@/hooks/form.hook';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { BackTop, Card, Divider, Form, Spin, Switch } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import './EditSettingPage.scss';

const EditSettingPage: React.FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data: formDetail, isLoading } = useGetForm();
  const { mutate: updateFormSetting } = useUpdateForm();

  const handleOnChange = (values: any) => {
    updateFormSetting({ id, values });
  };

  return (
    <Card className='edit-setting-page'>
      <BackTop className='back-top-icon'>
        <VerticalAlignTopOutlined />
      </BackTop>
      <h1>Settings</h1>
      <Divider style={{ marginTop: 12, marginBottom: 24 }} />
      {isLoading ? (
        <Spin size='large' />
      ) : (
        <Form
          layout='horizontal'
          labelAlign='left'
          colon={false}
          labelCol={{ span: 22 }}
          wrapperCol={{ span: 1 }}
          form={form}
          onValuesChange={handleOnChange}
          initialValues={{
            isAcceptResponse: formDetail?.isAcceptResponse,
            isAllowAnonymous: formDetail?.isAllowAnonymous,
          }}
          className={'setting-form'}
        >
          <Form.Item
            name='isAcceptResponse'
            label={
              <div>
                <p style={{ fontSize: 16, marginBottom: 0 }}>
                  Accept response:
                </p>
                <p
                  style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: 0 }}
                >
                  Descriptiuon
                </p>
              </div>
            }
            valuePropName='checked'
            style={{ height: 64, marginBottom: 10 }}
          >
            <Switch />
          </Form.Item>
          <Form.Item
            name='isAllowAnonymous'
            label={
              <div>
                <p style={{ fontSize: 16, marginBottom: 0 }}>
                  Allow anonymous respondents:
                </p>
                <p
                  style={{ fontStyle: 'italic', opacity: 0.8, marginBottom: 0 }}
                >
                  Descriptiuon
                </p>
              </div>
            }
            valuePropName='checked'
            style={{ marginBottom: 10 }}
          >
            <Switch />
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default EditSettingPage;
