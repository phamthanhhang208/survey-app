import useCurrentPermission from '@/hooks/useCurrentPermission';
import { Form, Input } from 'antd';
import { FunctionComponent } from 'react';
import './ParagraphCreate.scss';

interface ParagraphCreateProps {}

const ParagraphCreate: FunctionComponent<ParagraphCreateProps> = () => {
  const permission = useCurrentPermission();

  return (
    <div>
      <Form.Item
        name={['paragraph', 'content']}
        className={'paragraph-create'}
        wrapperCol={{ span: 24 }}
      >
        <Input.TextArea
          disabled={permission === 'edit' ? true : false}
          placeholder={'Answer'}
        ></Input.TextArea>
      </Form.Item>
    </div>
  );
};

export default ParagraphCreate;
