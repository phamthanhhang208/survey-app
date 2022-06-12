import Question2 from '@/components/Question2/Question2';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance } from 'antd';
import { FunctionComponent } from 'react';
import './QuestionList.scss';

interface QuestionListProps {
  form?: FormInstance<any>;
}

const QuestionList: FunctionComponent<QuestionListProps> = ({ form }) => {
  return (
    <Form.List name='fields'>
      {(fields, { add, remove }) => {
        return (
          <div className='question-list'>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Question2
                  field={field}
                  index={index}
                  fields={fields}
                  remove={remove}
                />
              </div>
            ))}

            <Button onClick={() => add()}>
              <PlusOutlined /> Add question
            </Button>
          </div>
        );
      }}
    </Form.List>
  );
};

export default QuestionList;
