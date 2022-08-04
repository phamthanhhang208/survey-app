import React from "react";
import "./SubmitFormPage.scss";
import { Card, Typography, Divider, Form, Button, Spin, Skeleton } from "antd";
//import AnswerSubmit from "@/components/Answer/AnswerSubmit";
import { useGetForm } from "@/hooks/form.hook";
import { useAddResponse } from "@/hooks/response.hook";
import { useParams } from "react-router-dom";
import QuestionSubmit from "@/components/QuestionSubmit/QuestionSubmit";
import { validateMessage } from "@/utils/validateMessage";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const SubmitFormPage: React.FC = () => {
  const { id } = useParams();
  const { data: formDetail, isLoading } = useGetForm();
  const { mutate: addResponse } = useAddResponse();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const answers = [];
    for (const [questionId, response] of Object.entries(values)) {
      const answer = [];
      if (response) {
        if (Array.isArray(response)) {
          for (const content of response) {
            answer.push({ content: content });
          }
        } else {
          answer.push({ content: response });
        }
        answers.push({ questionId, answer });
      }
    }
    addResponse({ id, values: answers });
    //console.log(values);
  };
  return (
    <>
      <div className="submit-form-page">
        {isLoading ? null : (
          <Card className="form-title">
            <Typography>
              <Title>{formDetail.title}</Title>
            </Typography>
            {formDetail?.isAcceptResponse ? (
              formDetail?.description && (
                <Card.Meta description={formDetail?.description} />
              )
            ) : (
              <>
                <Card.Meta
                  description={"This form is no longer accepting responses"}
                />
                <Card.Meta
                  description={
                    "Try contacting the owner of the form if you think this is a mistake"
                  }
                />
              </>
            )}
            {/* {formDetail?.description && (
						<Card.Meta description={formDetail?.description} />
					)} */}
          </Card>
        )}
        {isLoading ? (
          <Skeleton active />
        ) : (
          formDetail?.isAcceptResponse && (
            <>
              <Divider />
              <Card className="form-title">
                {formDetail?.isAllowAnonymous ? (
                  <Paragraph>
                    <EyeInvisibleOutlined /> This form does not collect your
                    email
                  </Paragraph>
                ) : (
                  <Paragraph>
                    <EyeOutlined /> This form collects your email
                  </Paragraph>
                )}
              </Card>
              <Divider />
              <Form
                layout="vertical"
                onFinish={onFinish}
                validateMessages={validateMessage}
                scrollToFirstError
                form={form}
              >
                {formDetail.questions.map((q: any) => {
                  return <QuestionSubmit key={q._id} question={q} />;
                })}

                <div className="submit-btn" onClick={() => form?.submit()}>
                  Submit
                </div>
              </Form>
            </>
          )
        )}
      </div>
    </>
  );
};

export default SubmitFormPage;
