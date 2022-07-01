import {
  BorderOutlined,
  CloseOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Upload } from 'antd';
import { FunctionComponent } from 'react';
import './CheckboxCreate.scss';

interface CheckboxCreateProps {}

const CheckboxCreate: FunctionComponent<CheckboxCreateProps> = () => {
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
    <Form.Item name={'checkboxes'}>
      <Form.List name={'checkboxes'} initialValue={['']}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => {
              return (
                <div key={field.key}>
                  <BorderOutlined
                    style={{
                      marginRight: '5px',
                      fontSize: '1.2rem',
                      color: '#d9d9d9',
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
              );
            })}
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

export default CheckboxCreate;
