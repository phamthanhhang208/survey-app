import { routePaths } from '@/const/routePaths';
import HomePage from '@/pages/HomePage/HomePage';
import CreateFormPage from '@/pages/CreateFormPage/CreateFormPage';

export interface RouterInterface {
  path?: string;
  needAuthor?: boolean;
  grantPermission?: Array<any>;
  component?: any;
}

export const routerConfig: Array<RouterInterface> = [
  {
    path: routePaths.HOME,
    component: HomePage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.CREATE,
    component: CreateFormPage,
    needAuthor: true,
    grantPermission: [],
  },
];
