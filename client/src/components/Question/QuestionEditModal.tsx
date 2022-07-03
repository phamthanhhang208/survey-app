import CheckboxCreate from '@/components/CreateComponent/CheckboxCreate/CheckboxCreate';
import ParagraphCreate from '@/components/CreateComponent/Paragraph/ParagraphCreate';
import RadioCreate from '@/components/CreateComponent/RadioCreate/RadioCreate';
import { question as questionTypeList } from '@/const/question';
import { useGetQuestion } from '@/hooks/question.hook';
import useCurrentPermission from '@/hooks/useCurrentPermission';
import { MoreOutlined, PictureOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Divider,
  Form,
  FormInstance,
  Input,
  message,
  Popover,
  Select,
  Switch,
  Tooltip,
  Upload,
} from 'antd';
import { FunctionComponent, useEffect, useState } from 'react';
import './QuestionModal.scss';

interface QuestionEditModalProps {
  form: FormInstance<any>;
  formId?: any;
  questionId?: any;
}

const QuestionEditModal: FunctionComponent<QuestionEditModalProps> = ({
  form,
  formId,
  questionId,
}) => {
  const { data: getQuestion } = useGetQuestion(formId, questionId);
  const permission = useCurrentPermission();
  const [isQuestionDescriptionShown, setIsQuestionDescriptionShown] =
    useState(false);
  const [isValidatorShown, setIsValidatorShown] = useState(false);
  const [questionTypeState, setQuestionTypeState] = useState<string>(() => {
    return form.getFieldValue('type');
  });
  const [isQuestionMediaShown, setIsQuestionMediaShown] = useState(false);
  const [visible, setVisible] = useState(false);

  console.log(getQuestion);
  //fill in the data
  useEffect(() => {
    form.setFieldsValue({ questionText: getQuestion?.questionText });
    form.setFieldsValue({ type: getQuestion?.type });
    if (getQuestion?.description) {
      setIsQuestionDescriptionShown(true);
      form.setFieldsValue({ description: getQuestion?.description });
      form.setFieldsValue({ additionalFields: ['question-description'] });
    }

    switch (getQuestion?.type) {
      case 'checkboxes':
        form.setFieldsValue({ checkboxes: getQuestion?.answer });
        break;

      case 'multiple-choice':
        form.setFieldsValue({ multipleChoice: getQuestion?.answer });
        break;

      default:
        break;
    }
  }, [form, getQuestion]);

  //question image
  const [uploadedFile, setUploadedFile] = useState<any>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const beforeImageUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  };

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

      {isQuestionMediaShown ? (
        <Form.Item name='questionImage' label='Image' valuePropName='file'>
          <Upload
            maxCount={1}
            listType={'picture-card'}
            beforeUpload={beforeImageUpload}
            accept='image/*'
            onChange={(v) => {
              setUploadedFile(v);
            }}
          >
            {uploadedFile?.fileList?.length > 0 ? null : (
              <Tooltip
                visible={tooltipVisible}
                title={'Upload image'}
                placement='bottom'
                destroyTooltipOnHide
                mouseEnterDelay={0.05}
                overlayInnerStyle={{
                  fontSize: '0.6rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PictureOutlined
                  className='upload-button'
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                />
              </Tooltip>
            )}
          </Upload>
        </Form.Item>
      ) : null}

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
              style={{ marginBottom: 0, width: 200 }}
            >
              <Checkbox.Group
                name='question-description'
                style={{ display: 'flex', flexDirection: 'column' }}
              >
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
                  style={{
                    marginLeft: 0,
                  }}
                  checked={isQuestionMediaShown}
                  onChange={(v) => {
                    setVisible(false);
                    setTimeout(() => {
                      setIsQuestionMediaShown((prev) => !prev);
                    }, 300);
                  }}
                >
                  Image
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

export default QuestionEditModal;
