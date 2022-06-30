import { question as questionTypeList } from '@/const/question';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import {
  BorderOutlined,
  CloseOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Popover,
  Select,
  Switch,
} from 'antd';
import { FunctionComponent, useState } from 'react';
import './QuestionModal.scss';

interface QuestionModal {}

const QuestionCreate: FunctionComponent<QuestionModal> = () => {
  const permission = useCurrentPermission();
  const [isQuestionDescriptionShown, setIsQuestionDescriptionShown] =
    useState(false);
  const [isValidatorShown, setIsValidatorShown] = useState(false);
  const [questionTypeState, setQuestionTypeState] = useState<string>('');
  const [visible, setVisible] = useState(false);

  const dynamicQuestion = () => {
    switch (questionTypeState) {
      case 'checkboxes':
        // return <CheckboxList />;
        return (
          <Form.Item name={'checkboxes'}>
            <Form.List name={'checkboxes'}>
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <BorderOutlined
                        style={{
                          marginRight: '5px',
                          fontSize: '1.2rem',
                          color: '#d9d9d9',
                        }}
                      />
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input question answer.',
                          },
                        ]}
                        noStyle
                      >
                        <Input style={{ width: '60%' }} />
                      </Form.Item>
                      <CloseOutlined
                        style={{ marginLeft: '5px' }}
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
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
      case 'multiple-choice':
        return (
          <Form.Item name={'multipleChoice'}>
            <Form.List name={'multipleChoice'}>
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
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
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input question answer',
                          },
                        ]}
                        noStyle
                      >
                        <Input style={{ width: '60%' }} />
                      </Form.Item>
                      <CloseOutlined
                        style={{ marginLeft: '5px' }}
                        className='dynamic-delete-button'
                        onClick={() => remove(field.name)}
                      />
                    </Form.Item>
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
      case 'short-paragraph':
        return (
          <Form.Item name={'shortParagraph'}>
            <Input
              disabled={permission === 'edit' ? true : false}
              placeholder={'Answer'}
            ></Input>
          </Form.Item>
        );
      case 'paragraph':
        return (
          <Form.Item name={'paragraph'}>
            <Input.TextArea
              disabled={permission === 'edit' ? true : false}
              placeholder={'Answer'}
            ></Input.TextArea>
          </Form.Item>
        );
      default:
        break;
    }
  };

  const handleQuestionTypeChange = (v: any) => {
    setQuestionTypeState(v);
  };

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  return (
    <div>
      <Form.Item
        name={'questionText'}
        label='Question'
        rules={[{ required: true }]}
      >
        <Input placeholder='Question' />
      </Form.Item>

      {isQuestionDescriptionShown && (
        <Form.Item name={'description'} label='Description'>
          <Input.TextArea placeholder='Description' />
        </Form.Item>
      )}

      <Form.Item label='Type' name={'type'} rules={[{ required: true }]}>
        <Select
          placeholder={'Question type'}
          onChange={handleQuestionTypeChange}
        >
          {questionTypeList.map((q) => {
            return (
              <Select.Option value={q.value} key={q.value}>
                {q.option}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      {dynamicQuestion()}

      {isValidatorShown && <div>Validation</div>}

      <Divider />

      <div className='question-functions'>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Form.Item
            label={'Required'}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: '0',
              padding: 0,
            }}
            initialValue={false}
            name={'required'}
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>
          <Popover
            visible={visible}
            title='Show'
            onVisibleChange={handleVisibleChange}
            content={
              <Form.Item
                className='additional-fields'
                name={'additionalFields'}
                style={{ marginBottom: 0 }}
              >
                <Checkbox.Group name='question-description'>
                  <Checkbox
                    checked={isQuestionDescriptionShown}
                    value={'question-description'}
                    onChange={(v) => {
                      setVisible(false);
                      setTimeout(() => {
                        setIsQuestionDescriptionShown((prev) => !prev);
                      }, 300);
                    }}
                  >
                    Description
                  </Checkbox>
                  <Checkbox
                    checked={isValidatorShown}
                    value={'response-validation'}
                    onChange={(v) => {
                      setVisible(false);
                      setTimeout(() => {
                        setIsValidatorShown((prev) => !prev);
                      }, 300);
                    }}
                  >
                    Response validation
                  </Checkbox>
                </Checkbox.Group>
              </Form.Item>
            }
            trigger='click'
            placement='bottom'
          >
            <MoreOutlined style={{ fontWeight: '900' }} />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreate;
