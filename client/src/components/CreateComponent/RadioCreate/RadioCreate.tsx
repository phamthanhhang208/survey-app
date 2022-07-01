import { CloseOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import { FunctionComponent } from 'react';
import './RadioCreate.scss';

interface RadioCreateProps {}

const RadioCreate: FunctionComponent<RadioCreateProps> = () => {
  const beforeImageUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  };

  return (
    <Form.Item name={'multipleChoice'}>
      <Form.List name={'multipleChoice'} initialValue={['']}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key}>
                <div
                  style={{
                    display: 'inline-block',
                    border: '1px solid #9d9d9d',
                    height: '16px',
                    width: '16px',
                    borderRadius: '50%',
                    transform: 'translateY(3px)',
                    marginRight: '5px',
                  }}
                />
                <Form.Item
                  name={[field.name, 'content']}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input question answer',
                    },
                  ]}
                  noStyle
                >
                  <Input style={{ width: '60%' }} />
                </Form.Item>
                <Form.Item
                  name={[field.name, 'media']}
                  label='Attachment'
                  valuePropName='file'
                >
                  <Upload
                    maxCount={1}
                    listType='picture'
                    beforeUpload={beforeImageUpload}
                    accept='image/*'
                  >
                    <Button icon={<UploadOutlined />}>Images</Button>
                  </Upload>
                </Form.Item>
                <CloseOutlined
                  style={{ marginLeft: '5px' }}
                  className='dynamic-delete-button'
                  onClick={() => remove(field.name)}
                />
              </div>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => {
                  add();
                }}
                style={{ width: '60%', marginTop: '20px' }}
                icon={<PlusOutlined />}
              >
                Add question
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form.Item>
  );
};

export default RadioCreate;
