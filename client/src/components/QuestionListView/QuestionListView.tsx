import QuestionViewCard from '@/components/QuestionViewCard/QuestionViewCard';
import './QuestionListView.scss';

const QuestionListView = (props: any) => {
  const { questions } = props;
  return (
    <div className='question-list-view'>
      {questions.map((q: any) => {
        return (
          <QuestionViewCard question={q} key={q._id} formId={props.formId} />
        );
      })}
    </div>
  );
};

export default QuestionListView;
