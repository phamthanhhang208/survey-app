import AnswerView from '@/components/Answer/AnswerView';
import { useDeleteQuestion } from '@/hooks/question.hook';
import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Card, Divider, Image, Popconfirm, Tooltip, Typography } from 'antd';
import { FunctionComponent, useState } from 'react';
import './QuestionViewCard.scss';

interface QuestionViewCardProps {
  question: any;
  formId: any;
}

const QuestionViewCard: FunctionComponent<QuestionViewCardProps> = ({
  question,
  formId,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { mutate: deleteQuestion } = useDeleteQuestion();

  const handleCardSelect = () => {
    if (!isActive) {
      setIsActive(true);
    }
  };

  const handleCardDelete = (id: any) => {
    deleteQuestion({ id: formId, questionId: id });
  };

  const handleCardEdit = (questionId: any) => {
    console.log(questionId);
  };

  return (
    <Card className={'question-view-card'} onClick={handleCardSelect}>
      <Typography.Title level={4}> {question.questionText}</Typography.Title>
      {question.description && <Card.Meta description={question.description} />}
      <br />
      {question?.questionMedia?.url ? (
        <Image src={question?.questionMedia?.url} />
      ) : null}
      <AnswerView answer={question.answer} type={question.type} />

      {isActive ? (
        <div>
          <Divider />
          <div className='view-card-functions'>
            <Tooltip title={'Finish'}>
              <CheckOutlined
                onClick={() => {
                  setIsActive((prev) => !prev);
                }}
              />
            </Tooltip>

            <Tooltip title={'Duplicate'}>
              <CopyOutlined
                onClick={() => {
                  console.log('copy', question._id);
                }}
              />
            </Tooltip>

            <Tooltip title={'Edit'}>
              <EditOutlined onClick={() => handleCardEdit(question._id)} />
            </Tooltip>

            <Tooltip title={'Delete'}>
              <Popconfirm
                title='Are you sure to delete this task?'
                onConfirm={() => handleCardDelete(question._id)}
                okText='Yes'
                cancelText='No'
              >
                <DeleteOutlined />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      ) : null}
    </Card>
  );
};

export default QuestionViewCard;
