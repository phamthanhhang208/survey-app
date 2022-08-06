import { Card, Form, Image } from 'antd';
import AnswerSubmit from '../Answer/AnswerSubmit';
import './QuestionSubmit.scss';

export default function QuestionSubmit(props: any) {
  const { question, disabled = false } = props;
  return (
    <Card key={question._id} className='question-list question-submit-card'>
      <Form.Item
        label={
          <p style={{ fontWeight: 600, fontSize: 20 }}>
            {question.questionText}
          </p>
        }
        required={question.required}
        style={{ marginBottom: 0 }}
      >
        {question.questionMedia && (
          <Image
            src={question.questionMedia.url}
            style={{ marginBottom: 32 }}
          />
        )}
        <AnswerSubmit
          name={question._id}
          type={question.type}
          answer={question.answer}
          required={question.required}
          disabled={disabled}
          validator={question.validator}
        />
      </Form.Item>
    </Card>
  );
}
