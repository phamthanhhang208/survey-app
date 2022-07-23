import MyUploadImage from '@/components/MyUploadImage/MyUploadImage';
import { BorderOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input } from 'antd';
import { FunctionComponent, useState } from 'react';
import './CheckboxCreate.scss';

interface CheckboxCreateProps {
  form?: FormInstance;
}

const CheckboxCreate: FunctionComponent<CheckboxCreateProps> = ({ form }) => {
  const [errorIndex, setErrorIndex] = useState<number>();
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
                        validator: (_, v) => {
                          const answerArray = form?.getFieldValue([
                            'checkboxes',
                          ]);

                          for (let i = 0; i < answerArray?.length; i++) {
                            if (i !== name && answerArray[i]?.content === v) {
                              setErrorIndex(name);
                              return Promise.reject(
                                new Error('Answers can not be duplicated.')
                              );
                            }
                          }
                          setErrorIndex(undefined);
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
                        remove(name);

                        errorIndex &&
                          form
                            ?.getFieldInstance([
                              'checkboxes',
                              errorIndex,
                              'content',
                            ])
                            .focus();

                        errorIndex &&
                          form
                            ?.getFieldInstance([
                              'checkboxes',
                              errorIndex,
                              'content',
                            ])
                            .blur();
                        setTimeout(() => {
                          errorIndex &&
                            form
                              ?.getFieldInstance([
                                'checkboxes',
                                errorIndex - 1,
                                'content',
                              ])
                              .focus();

                          errorIndex &&
                            form
                              ?.getFieldInstance([
                                'checkboxes',
                                errorIndex - 1,
                                'content',
                              ])
                              .blur();

                          setErrorIndex(undefined);
                        }, 0);
                      }}
                    />
                  )}
                </div>
              );
            })}
            <Form.Item>
              <Button
                disabled={errorIndex ? true : false}
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
