import MyUploadImage from '@/components/MyUploadImage/MyUploadImage';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FunctionComponent } from 'react';
import './RadioCreate.scss';

interface RadioCreateProps {
  form?: any;
}

const RadioCreate: FunctionComponent<RadioCreateProps> = ({ form }) => {
  return (
    <Form.Item name={'multipleChoice'}>
      <Form.List name={'multipleChoice'} initialValue={['']}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key} className={'dynamic-question-item'}>
                <svg width='24' height='32'>
                  <circle
                    cx='10'
                    cy='16'
                    r='8'
                    stroke='#9d9d9d'
                    strokeWidth='2'
                    fill='white'
                  />
                </svg>
                <Form.Item
                  name={[field.name, 'content']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input question answer',
                    },
                  ]}
                  style={{ marginBottom: 0, width: 420 }}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>

                <MyUploadImage
                  field={field}
                  initialMedia={
                    form && form.getFieldValue('multipleChoice')[index]
                  }
                />
                {fields?.length > 1 && (
                  <CloseOutlined
                    style={{ marginLeft: '5px' }}
                    className='dynamic-delete-button'
                    onClick={() => remove(field.name)}
                  />
                )}
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
