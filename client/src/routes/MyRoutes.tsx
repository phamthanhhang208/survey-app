import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import { Route, Routes, Navigate } from 'react-router-dom';
import { routerConfig } from '@/routes/routeConfig';
import EditLayout from '@/components/Layout/EditLayout/EditLayout';

export default function MyRoutes() {
  return (
    <Routes>
      {routerConfig.map((el: any) => {
        const { component, needAuthor, grantPermission, ...rest } = el;
        const Component = el?.component;
        if (el?.path?.includes('edit')) {
          return (
            <Route
              key={el.path}
              exact
              {...rest}
              element={
                <EditLayout>
                  <Component />
                </EditLayout>
              }
            ></Route>
          );
        }

        return (
          <Route key={el.path} exact {...rest} element={<Component />}></Route>
        );
      })}

      <Route path='/' element={<Navigate to='/forms' replace />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}
