import MyCheckbox from '@/components/MyCheckbox/MyCheckbox';
import { Form, Input } from 'antd';
import { FunctionComponent, useState } from 'react';
import { v4 } from 'uuid';
import './CheckboxList.scss';

interface CheckboxListProps {
  answer?: any;
}

const CheckboxList: FunctionComponent<CheckboxListProps> = ({ answer }) => {
  const [checkboxList, setCheckboxList] = useState(() =>
    answer?.length > 0 ? answer?.map(() => v4()) : [v4()]
  );
  const addNewCheckbox = () => {
    setCheckboxList((prev: any) => [...prev, v4()]);
  };

  const removeCheckbox = (v: any) => {
    const tmp = [...checkboxList];
    for (let i = 0; i < checkboxList.length; i++) {
      if (v === checkboxList[i]) {
        tmp.splice(i, 1);
      }
    }

    setCheckboxList(tmp);
  };

  return (
    <div className='checkbox-list'>
      {checkboxList?.map((r: any, index: number) => (
        <Form.Item name={[r, 'checkboxCreate']} key={index}>
          <Input></Input>
        </Form.Item>
      ))}
    </div>
  );
};

export default CheckboxList;
