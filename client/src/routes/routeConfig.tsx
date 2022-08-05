import { routePaths } from "@/const/routePaths";
import HomePage from "@/pages/HomePage/HomePage";
import CreateFormPage from "@/pages/CreateFormPage/CreateFormPage";
import EditResponsePage from "@/pages/EditResponsePage/EditResponsePage";
import SubmitFormPage from "@/pages/SubmitFormPage/SubmitFormPage";
import EditSettingPage from "@/pages/EditSettingPage/EditSettingPage";
//import SignInPage from "@/pages/SignInPage/SignInPage";
import { roles } from "@/const/roles";

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
		grantPermission: [roles.TEACHER],
	},
	{
		path: routePaths.CREATOR_EDIT_RESPONSE,
		component: EditResponsePage,
		needAuthor: true,
		grantPermission: [roles.TEACHER],
	},
	{
		path: routePaths.CREATOR_VIEW_FORM,
		component: SubmitFormPage,
		needAuthor: true,
		grantPermission: [roles.TEACHER, roles.STUDENT],
	},
	{
		path: routePaths.CREATOR_EDIT_SETTING,
		component: EditSettingPage,
		needAuthor: true,
		grantPermission: [roles.TEACHER],
	},
	{
		path: routePaths.USER_SUBMIT,
		component: SubmitFormPage,
		needAuthor: true,
		grantPermission: [roles.TEACHER, roles.STUDENT],
	},
	{
		path: routePaths.EDIT,
		component: CreateFormPage,
		needAuthor: true,
		grantPermission: [roles.TEACHER],
	},
	// {
	// 	path: routePaths.SIGN_IN,
	// 	component: SignInPage,
	// 	needAuthor: false,
	// 	grantPermission: [roles.TEACHER, roles.STUDENT],
	// },
];
