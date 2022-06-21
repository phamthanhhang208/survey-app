import MyCheckbox from '@/components/MyCheckbox/MyCheckbox';
import { FunctionComponent, useState } from 'react';
import { v4 } from 'uuid';
import './CheckboxList.scss';

interface CheckboxListProps {
  answer?: any;
}

const CheckboxList: FunctionComponent<CheckboxListProps> = ({ answer }) => {
  const [checkboxList, setCheckboxList] = useState(() =>
    answer.map(() => v4())
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
      {checkboxList.map((r: any, index: number) => (
        <MyCheckbox
          key={r}
          addNewCheckbox={addNewCheckbox}
          removeCheckbox={removeCheckbox}
          index={r}
          isTop={r === checkboxList[checkboxList.length - 1]}
          initialValue={answer[index]}
        />
      ))}
    </div>
  );
};

export default CheckboxList;
