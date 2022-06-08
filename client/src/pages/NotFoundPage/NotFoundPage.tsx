import React from 'react';
import { Button, Result } from 'antd';
import './NotFoundPage.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className='not-found-page'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={<Button type='primary'>Back Home</Button>}
      />
    </div>
  );
};

export default NotFoundPage;
