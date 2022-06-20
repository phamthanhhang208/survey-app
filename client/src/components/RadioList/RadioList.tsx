import MyRadio from '@/components/MyRadio/MyRadio';
import { FunctionComponent, useState } from 'react';
import { v4 } from 'uuid';
import './RadioList.scss';

interface RadioListProps {
  answer?: any;
}

const RadioList: FunctionComponent<RadioListProps> = ({ answer }) => {
  const [radioList, setRadioList] = useState(() => answer.map(() => v4()));
  const addNewRadio = () => {
    setRadioList((prev: any) => [...prev, v4()]);
  };

  const removeRadio = (v: any) => {
    const tmp = [...radioList];
    for (let i = 0; i < radioList.length; i++) {
      if (v === radioList[i]) {
        tmp.splice(i, 1);
      }
    }

    setRadioList(tmp);
  };

  return (
    <div className='radio-list'>
      {radioList.map((r: any, index: number) => (
        <MyRadio
          key={r}
          addNewRadio={addNewRadio}
          removeRadio={removeRadio}
          index={r}
          isTop={r === radioList[radioList.length - 1]}
          initialValue={answer[index]}
        />
      ))}
    </div>
  );
};

export default RadioList;
