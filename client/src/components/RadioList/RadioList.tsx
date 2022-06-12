import useCurrentPermission from '@/hooks/useCurrentPermission';
import { v4 } from 'uuid';
import MyRadio from '@/components/MyRadio/MyRadio';
import { FunctionComponent, useState } from 'react';
import './RadioList.scss';

interface RadioListProps {}

const RadioList: FunctionComponent<RadioListProps> = () => {
  const [radioList, setRadioList] = useState([v4()]);
  const addNewRadio = () => {
    setRadioList((prev) => [...prev, v4()]);
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
      {radioList.map((r) => (
        <MyRadio
          key={r}
          addNewRadio={addNewRadio}
          removeRadio={removeRadio}
          index={r}
          isTop={r === radioList[radioList.length - 1]}
        />
      ))}
    </div>
  );
};

export default RadioList;
