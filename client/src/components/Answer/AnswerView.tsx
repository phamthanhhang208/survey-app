import { CHECKBOX, MULTIPLECHOICE, PARAGRAPH, SHORT } from '@/const/question';
import { BorderOutlined } from '@ant-design/icons';
import { Image, Input } from 'antd';
import './AnswerView.scss';

const { TextArea } = Input;
const AnswerView = (props: any) => {
  const { type, answer } = props;
  let element = null;

  if (type === SHORT || type === PARAGRAPH) {
    element = (
      <TextArea
        placeholder={type === SHORT ? 'Short answer' : 'Long answer'}
        disabled
      />
    );
  }

  if (type === CHECKBOX) {
    element = answer.map((a: any) => {
      return (
        <div
          key={a.content}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BorderOutlined
              style={{
                marginRight: '5px',
                fontSize: '1.2rem',
                color: '#d9d9d9',
              }}
            />
            <span>{a.content}</span>
          </div>
          {a.media?.url ? <Image height={200} src={a?.media?.url} /> : null}
        </div>
      );
    });
  }

  if (type === MULTIPLECHOICE) {
    element = answer.map((a: any) => {
      return (
        <div key={a.content} style={{ display: 'flex' }}>
          <svg width='24' height='24'>
            <circle
              cx='10'
              cy='12'
              r='8'
              stroke='#9d9d9d'
              strokeWidth='2'
              fill='white'
            />
          </svg>
          <span>{a.content}</span>
          {a?.media?.url ? <Image height={200} src={a?.media?.url} /> : null}
        </div>
      );
    });
  }

  return element;
};

export default AnswerView;
