import { question as questionTypeList } from '@/const/question';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import { DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Select,
  Radio,
  Checkbox,
  Divider,
  Switch,
  Tooltip,
  Popover,
} from 'antd';
import { FunctionComponent, useState } from 'react';
import RadioList from '@/components/RadioList/RadioList';
import CheckboxList from '@/components/CheckboxList/CheckboxList';
import './Question.scss';

interface QuestionProps {
  fields?: any;
  field?: any;
  index?: any;
  remove?: any;
}

const Question: FunctionComponent<QuestionProps> = ({
  index,
  field,
  fields,
  ...rest
}) => {
  const permission = useCurrentPermission();
  const [isQuestionDescriptionShown, setIsQuestionDescriptionShown] =
    useState(false);
  const [isValidationRequired, setIsValidationRequired] = useState(false);
  const [questionTypeState, setQuestionTypeState] = useState('');
  const [visible, setVisible] = useState(false);
  const dynamicQuestion = (index?: any) => {
    switch (questionTypeState) {
      case 'checkboxes':
        return (
          <Form.Item name={[index, 'answer']}>
            <Checkbox.Group name='checkbox-group' className={'radio-group'}>
              <CheckboxList />
            </Checkbox.Group>
          </Form.Item>
        );
      case 'multiple-choice':
        return (
          <Form.Item name={[index, 'answer']} initialValue={null}>
            <Radio.Group name='radio-group' className={'radio-group'}>
              <RadioList />
            </Radio.Group>
          </Form.Item>
        );
      case 'short-paragraph':
        return (
          <Form.Item name={[index, 'answer']}>
            <Input
              disabled={permission === 'edit' ? true : false}
              placeholder={'Answer'}
            ></Input>
          </Form.Item>
        );
      case 'paragraph':
        return (
          <Form.Item name={[index, 'answer']}>
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
    <div className='question'>
      <Form.Item
        name={[index, 'question']}
        label='Question'
        rules={[{ required: true }]}
        initialValue={''}
      >
        <Input placeholder='Question' />
      </Form.Item>

      {isQuestionDescriptionShown && (
        <Form.Item name={[index, 'question-description']} label='Description'>
          <Input.TextArea placeholder='Description' />
        </Form.Item>
      )}

      <Form.Item
        label='Type'
        name={[index, 'type']}
        rules={[{ required: true }]}
      >
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

      {dynamicQuestion(index)}

      {isValidationRequired && <div>Validation</div>}

      <Divider />

      <div className='question-functions'>
        {fields.length > 0 ? (
          <Tooltip title={'Delete'} placement={'bottom'}>
            <DeleteOutlined
              size={20}
              className='dynamic-delete-button'
              type='primary'
              onClick={() => rest.remove(field.name)}
            />
          </Tooltip>
        ) : null}

        <Divider type='vertical' />

        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Form.Item
            label={'Required'}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: '0',
              padding: 0,
            }}
            name={[index, 'isRequired']}
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
                name={[index, 'additional-fields']}
                style={{ marginBottom: 0 }}
              >
                <Checkbox.Group>
                  <Checkbox
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
                    value={'response-validation'}
                    onChange={(v) => {
                      setVisible(false);
                      setTimeout(() => {
                        setIsValidationRequired((prev) => !prev);
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

export default Question;
