import useCurrentPermission from '@/hooks/useCurrentPermission';
import { Radio, Input } from 'antd';
import { FunctionComponent, useState } from 'react';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import './MyRadio.scss';

interface MyRadioProps {
  index?: any;
  addNewRadio?: any;
  removeRadio?: any;
  isTop?: boolean;
  initialValue?: any;
}

const MyRadio: FunctionComponent<MyRadioProps> = ({
  index,
  addNewRadio,
  removeRadio,
  isTop,
  initialValue,
}) => {
  const permission = useCurrentPermission();
  const [value, setValue] = useState(initialValue);
  const handleInputChange = (v: any) => {
    setValue({ content: v.target.value });
  };
  return (
    <div className='my-radio'>
      <Radio
        value={value}
        disabled={permission === 'edit' ? true : false}
      ></Radio>
      <div className='radio-input'>
        <Input
          value={value && value.content}
          onChange={handleInputChange}
          disabled={permission === 'edit' ? false : true}
        />
        {isTop ? (
          <PlusCircleOutlined
            className='icon'
            onClick={() => {
              addNewRadio();
            }}
          />
        ) : (
          <MinusCircleOutlined
            className='icon'
            onClick={() => removeRadio(index)}
          />
        )}
      </div>
    </div>
  );
};

export default MyRadio;
