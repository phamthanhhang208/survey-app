import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';

const useUpdateLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const updateLocation = (data?: any) => {
    const search = location.search.substring(1);
    const params = Object.fromEntries(new URLSearchParams(search));
    const newQuery = {
      ...params,
      ...data,
    };
    Object.keys(newQuery).forEach((key) => {
      if (!newQuery[key]) {
        delete newQuery[key];
      }
    });
    navigate(
      {
        search: createSearchParams(newQuery).toString(),
      },
      { replace: true }
    );
  };

  return { updateLocation };
};

export default useUpdateLocation;
