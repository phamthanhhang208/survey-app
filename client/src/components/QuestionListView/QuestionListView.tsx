import { Card, Typography } from 'antd';
import AnswerView from '../Answer/AnswerView';
import './QuestionListView.scss';

const { Title } = Typography;

const QuestionListView = (props: any) => {
  const { questions } = props;
  return (
    <div className='question-list-view'>
      {questions.map((q: any) => {
        return (
          <Card key={q._id} className={'question-view-card'}>
            <Title level={4}> {q.questionText}</Title>
            {q.description && <Card.Meta description={q.description} />}
            <br />
            <AnswerView answer={q.answer} type={q.type} />
          </Card>
        );
      })}
    </div>
  );
};

export default QuestionListView;
