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
  const [value, setValue] = useState(initialValue);
  const handleInputChange = (v: any) => {
    setValue({ content: v.target.value });
  };

  return (
    <div className='my-checkbox'>
      <Checkbox
        value={value}
        disabled={permission === 'edit' ? true : false}
      ></Checkbox>
      <div className='checkbox-input'>
        <Input
          value={value && value.content}
          onChange={handleInputChange}
          disabled={permission === 'edit' ? false : true}
        />
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
      </div>
    </div>
  );
};

export default MyCheckbox;
