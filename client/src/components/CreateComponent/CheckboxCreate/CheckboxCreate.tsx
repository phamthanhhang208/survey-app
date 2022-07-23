import MyUploadImage from '@/components/MyUploadImage/MyUploadImage';
import { BorderOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input } from 'antd';
import { FunctionComponent } from 'react';
import './CheckboxCreate.scss';

interface CheckboxCreateProps {
  form?: FormInstance;
}

const CheckboxCreate: FunctionComponent<CheckboxCreateProps> = ({ form }) => {
  return (
    <Form.Item name={'checkboxes'}>
      <Form.List name={'checkboxes'} initialValue={['']}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name, ...restField }) => {
              return (
                <div key={key} className={'dynamic-question-item'}>
                  <BorderOutlined
                    style={{
                      marginRight: '5px',
                      fontSize: '1.2rem',
                      color: '#d9d9d9',
                      transform: 'translateY(5px)',
                    }}
                  />
                  <Form.Item
                    {...restField}
                    style={{ marginBottom: 0, width: 420 }}
                    name={[name, 'content']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        message: 'Please input question answer',
                      },
                      {
                        validator: (a, v) => {
                          form
                            ?.getFieldValue(['checkboxes'])
                            .forEach((q: any, i: number) => {
                              console.log({ ...restField });
                              // if (i !== index) {
                              //   console.log(q);
                              // }
                            });
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input style={{ width: '100%' }} />
                  </Form.Item>

                  <MyUploadImage
                    name={name}
                    initialQuestion={
                      form && form.getFieldValue('checkboxes')[name]
                    }
                  />

                  {fields?.length > 1 && (
                    <CloseOutlined
                      style={{ marginLeft: '5px' }}
                      className='dynamic-delete-button'
                      onClick={() => {
                        console.log(form?.getFieldValue(['checkboxes']));
                        remove(name);
                      }}
                    />
                  )}
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
