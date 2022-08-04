import MyUploadImage from '@/components/MyUploadImage/MyUploadImage';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FunctionComponent, useState } from 'react';
import './RadioCreate.scss';

interface RadioCreateProps {
  form?: any;
}

const RadioCreate: FunctionComponent<RadioCreateProps> = ({ form }) => {
  const [errorIndex, setErrorIndex] = useState<number>();
  return (
    <Form.Item name={'multipleChoice'}>
      <Form.List name={'multipleChoice'} initialValue={['']}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className={'dynamic-question-item'}>
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
                  {...restField}
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
                          'multipleChoice',
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
                  style={{ marginBottom: 0, width: 420 }}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>

                <MyUploadImage
                  name={name}
                  initialQuestion={
                    form && form.getFieldValue('multipleChoice')[name]
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
                            'multipleChoice',
                            errorIndex,
                            'content',
                          ])
                          .focus();

                      errorIndex &&
                        form
                          ?.getFieldInstance([
                            'multipleChoice',
                            errorIndex,
                            'content',
                          ])
                          .blur();
                      setTimeout(() => {
                        errorIndex &&
                          form
                            ?.getFieldInstance([
                              'multipleChoice',
                              errorIndex - 1,
                              'content',
                            ])
                            .focus();

                        errorIndex &&
                          form
                            ?.getFieldInstance([
                              'multipleChoice',
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
            ))}
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

export default RadioCreate;
