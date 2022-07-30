import { SHORT, PARAGRAPH, CHECKBOX, MULTIPLECHOICE } from '@/const/question';
import { Checkbox, Radio, Input, Form, Image } from 'antd';
import { useState, useEffect } from 'react';

const AnswerSubmit = (props: any) => {
  const { type, answer, name, required, disabled, validator } = props;
  const [rules, setRules] = useState([
    { required: required, message: 'This question is required' },
  ]);

  useEffect(() => {
    if (validator) {
      if (validator.type === 'number') {
        setRules((r) => [
          ...r,
          {
            transform: (value: any) => {
              if (value.length === 0) return;
              return +value;
            },
            ...validator,
          },
        ]);
      } else {
        setRules((r) => [...r, { ...validator }]);
      }
    }
  }, [validator]);

  let element = null;
  if (type === MULTIPLECHOICE) {
    element = (
      <Radio.Group>
        {answer.map((a: any, idx: any) => {
          return (
            <div key={idx}>
              <Radio value={a.content}>{a.content}</Radio>
              <br />
              {a.media && <Image src={a.media.url} />}
            </div>
          );
        })}
      </Radio.Group>
    );
  }
  if (type === CHECKBOX) {
    element = (
      <Checkbox.Group disabled={disabled}>
        {answer.map((a: any, idx: any) => {
          return (
            <div key={idx}>
              <Checkbox value={a.content}>{a.content}</Checkbox>
              <br />
              {a.media && <Image src={a.media.url} />}
            </div>
          );
        })}
      </Checkbox.Group>
    );
  }

  if (type === SHORT) {
    element = <Input.TextArea autoSize={{ maxRows: 1 }} allowClear />;
  }

  if (type === PARAGRAPH) {
    element = <Input.TextArea autoSize allowClear />;
  }

  return (
    <Form.Item name={name} rules={rules} style={{ marginBottom: 15 }}>
      {element}
    </Form.Item>
  );
};

export default AnswerSubmit;
