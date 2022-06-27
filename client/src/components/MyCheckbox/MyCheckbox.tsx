import useCurrentPermission from '@/hooks/useCurrentPermission';
import { Input, Checkbox, Form } from 'antd';
import { FunctionComponent, useState } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './MyCheckbox.scss';

interface MyCheckboxProps {
  index?: any;
  addNewCheckbox?: any;
  removeCheckbox?: any;
  isTop?: boolean;
  initialValue?: any;
}

const MyCheckbox: FunctionComponent<MyCheckboxProps> = ({
  index,
  addNewCheckbox,
  removeCheckbox,
  isTop,
  initialValue,
}) => {
  const permission = useCurrentPermission();

  return (
    <Form.Item className='my-checkbox'>
      <Input disabled={permission === 'edit' ? false : true} />
      {isTop ? (
        <PlusCircleOutlined
          className='icon'
          onClick={() => {
            addNewCheckbox();
          }}
        />
      ) : (
        <MinusCircleOutlined
          className='icon'
          onClick={() => removeCheckbox(index)}
        />
      )}
    </Form.Item>
  );
};

export default MyCheckbox;
