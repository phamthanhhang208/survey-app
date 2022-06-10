import React from 'react';
import { Button, Result } from 'antd';
import './NotFoundPage.scss';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/', { replace: true });
  };
  return (
    <div className='not-found-page'>
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={
          <Button type='primary' onClick={handleClick}>
            Back Home
          </Button>
        }
      />
    </div>
  );
};

export default NotFoundPage;
