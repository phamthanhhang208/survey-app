import { useLocation } from 'react-router-dom';

const useCurrentPermission = () => {
  const location = useLocation();
  const tmpArr = location.pathname.split('/');
  const currentPermission = tmpArr[tmpArr.length - 1];

  return currentPermission;
};

export default useCurrentPermission;
