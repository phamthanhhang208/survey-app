import useCurrentPermission from '@/hooks/useCurrentPermission';
import { Form, Input } from 'antd';
import { FunctionComponent } from 'react';
import './ShortParagraphCreate.scss';

interface ShortParagraphCreateProps {}

const ShortParagraphCreate: FunctionComponent<
  ShortParagraphCreateProps
> = () => {
  const permission = useCurrentPermission();

  return (
    <Form.Item
      name={'short-paragraph'}
      className={'short-paragraph-create'}
      wrapperCol={{ span: 24 }}
    >
      <Input.TextArea
        disabled={permission === 'edit' ? true : false}
        placeholder={'Answer'}
      ></Input.TextArea>
    </Form.Item>
  );
};

export default ShortParagraphCreate;
