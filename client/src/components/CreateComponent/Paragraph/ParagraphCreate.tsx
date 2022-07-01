import useCurrentPermission from '@/hooks/useCurrentPermission';
import { Form, Input } from 'antd';
import { FunctionComponent } from 'react';
import './ParagraphCreate.scss';

interface ParagraphCreateProps {}

const ParagraphCreate: FunctionComponent<ParagraphCreateProps> = () => {
  const permission = useCurrentPermission();

  return (
    <Form.Item name={'paragraph'} className={'paragraph-create'}>
      <Input.TextArea
        disabled={permission === 'edit' ? true : false}
        placeholder={'Answer'}
      ></Input.TextArea>
    </Form.Item>
  );
};

export default ParagraphCreate;
