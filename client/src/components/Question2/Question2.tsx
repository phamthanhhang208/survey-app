import { question as questionTypeList } from '@/const/question';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Radio, Checkbox } from 'antd';
import { FunctionComponent, useState } from 'react';
import RadioList from '@/components/RadioList/RadioList';
import './Question2.scss';
import CheckboxList from '@/components/CheckboxList/CheckboxList';

interface Question2Props {
  fields?: any;
  field?: any;
  index?: any;
  remove?: any;
}

const Question2: FunctionComponent<Question2Props> = ({
  index,
  field,
  fields,
  ...rest
}) => {
  const permission = useCurrentPermission();

  const [questionTypeState, setQuestionTypeState] = useState('');

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

  return (
    <div className='question'>
      <Form.Item
        name={[index, 'question']}
        label='Question'
        rules={[{ required: true }]}
      >
        <Input placeholder='Question' />
      </Form.Item>
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

      {fields.length > 0 ? (
        <Button
          className='dynamic-delete-button'
          danger
          type='primary'
          onClick={() => rest.remove(field.name)}
          icon={<MinusCircleOutlined />}
        >
          Delete
        </Button>
      ) : null}
    </div>
  );
};

export default Question2;
