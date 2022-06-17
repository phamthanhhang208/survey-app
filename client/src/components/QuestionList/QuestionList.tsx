import Question from '@/components/Question/Question';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance } from 'antd';
import { FunctionComponent } from 'react';
import './QuestionList.scss';

interface QuestionListProps {
  form?: FormInstance<any>;
}

const QuestionList: FunctionComponent<QuestionListProps> = ({ form }) => {
  const permission = useCurrentPermission();

  return (
    <Form.List name='fields'>
      {(fields, { add, remove }) => {
        return (
          <div className='question-list'>
            {fields.map((field, index) => (
              <div
                key={field.key}
                // draggable={true}
                // onDragStart={(e) => console.log(e.target)}
              >
                <Question
                  field={field}
                  index={index}
                  fields={fields}
                  remove={remove}
                />
              </div>
            ))}

            {permission === 'edit' && (
              <Button onClick={() => add()}>
                <PlusOutlined /> Add question
              </Button>
            )}
          </div>
        );
      }}
    </Form.List>
  );
};

export default QuestionList;
