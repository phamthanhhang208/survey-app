import { routePaths } from '@/const/routePaths';
import HomePage from '@/pages/HomePage/HomePage';
import CreateFormPage from '@/pages/CreateFormPage/CreateFormPage';
import EditResponsePage from '@/pages/EditResponsePage/EditResponsePage';
import SubmitFormPage from '@/pages/SubmitFormPage/SubmitFormPage';
import EditSettingPage from '@/pages/EditSettingPage/EditSettingPage';
import SignInPage from '@/pages/SignInPage/SignInPage';
import FormResponsePage from '@/pages/FormResponsePage/FormResponsePage';

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
    path: routePaths.CREATOR_EDIT_RESPONSE,
    component: EditResponsePage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.CREATOR_VIEW_FORM,
    component: SubmitFormPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.CREATOR_EDIT_SETTING,
    component: EditSettingPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.USER_SUBMIT,
    component: SubmitFormPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.EDIT,
    component: CreateFormPage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.FORM_RESPONSE,
    component: FormResponsePage,
    needAuthor: true,
    grantPermission: [],
  },
  {
    path: routePaths.SIGN_IN,
    component: SignInPage,
    needAuthor: true,
    grantPermission: [],
  },
];
