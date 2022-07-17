import { Checkbox, Form, Input } from 'antd';
import { FunctionComponent } from 'react';
import './SignInPage.scss';

interface SignInPageProps {}

const { Item } = Form;

const SignInPage: FunctionComponent<SignInPageProps> = () => {
  const [formSignIn] = Form.useForm();

  const handleLogin = async (v: any) => {
    console.log(v);
  };

  return (
    <div className='sign-in-page'>
      <Form
        form={formSignIn}
        onFinish={handleLogin}
        className='main-form'
        layout={'vertical'}
        labelCol={{ style: { fontWeight: 700 } }}
      >
        <Item
          label={'Username'}
          name={'username'}
          style={{ width: '100%', marginBottom: 10 }}
        >
          <Input />
        </Item>
        <Item
          label={'Password'}
          name={'password'}
          style={{ width: '100%', marginBottom: 10 }}
        >
          <Input.Password style={{ borderRadius: 4 }} />
        </Item>
        <Form.Item
          name='remember'
          valuePropName='checked'
          style={{ width: '100%', marginBottom: 25 }}
        >
          <Checkbox style={{ marginLeft: 2 }}>Remember me</Checkbox>
        </Form.Item>
        <div
          className='sign-in-btn'
          onClick={() => {
            formSignIn.submit();
          }}
        >
          Sign In
        </div>
      </Form>
    </div>
  );
};

export default SignInPage;
