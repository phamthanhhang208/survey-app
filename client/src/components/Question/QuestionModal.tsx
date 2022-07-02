import CheckboxCreate from '@/components/CreateComponent/CheckboxCreate/CheckboxCreate';
import ParagraphCreate from '@/components/CreateComponent/Paragraph/ParagraphCreate';
import RadioCreate from '@/components/CreateComponent/RadioCreate/RadioCreate';
import { question as questionTypeList } from '@/const/question';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import { MoreOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Divider,
  Form,
  FormInstance,
  Input,
  Popover,
  Select,
  Switch,
} from 'antd';
import { FunctionComponent, useState } from 'react';
import './QuestionModal.scss';

interface QuestionModal {
  form: FormInstance<any>;
}

const QuestionCreate: FunctionComponent<QuestionModal> = ({ form }) => {
  const permission = useCurrentPermission();
  const [isQuestionDescriptionShown, setIsQuestionDescriptionShown] =
    useState(false);
  const [isValidatorShown, setIsValidatorShown] = useState(false);
  const [questionTypeState, setQuestionTypeState] = useState<string>(() => {
    return form.getFieldValue('type');
  });
  const [visible, setVisible] = useState(false);

  const dynamicQuestion = () => {
    switch (questionTypeState) {
      case 'checkboxes':
        return <CheckboxCreate />;
      case 'multiple-choice':
        return <RadioCreate />;
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
        return <ParagraphCreate />;
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
    <div className='question-modal'>
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
          allowClear
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

      <div className='dynamic-questions'>{dynamicQuestion()}</div>

      {isValidatorShown && <div>Validation</div>}

      <Divider style={{ marginBottom: 10 }} />

      <div className='question-functions'>
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
          labelCol={{ span: 15, offset: 0 }}
          wrapperCol={{ span: 8, offset: 0 }}
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
                  style={{
                    marginLeft: 0,
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
          <MoreOutlined style={{ fontWeight: '900', fontSize: '1.2rem' }} />
        </Popover>
      </div>
    </div>
  );
};

export default QuestionCreate;
