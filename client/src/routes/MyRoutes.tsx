import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { routerConfig } from "@/routes/routeConfig";
import EditLayout from "@/layouts/EditLayout/EditLayout";
import RouteWrapper from "./RouteWrapper";
import SignInPage from "@/pages/SignInPage/SignInPage";
import { useAuth } from "@/hooks/useAuth";
import { roles } from "@/const/roles";
import StudentHomePage from "@/pages/StudentHomePage/StudentHomePage";
//import Redirect from "@/pages/Redirect/Redirect";

export default function MyRoutes() {
	const { role, user } = useAuth();
	let element: any;
	if (role === roles.TEACHER) {
		element = <Navigate to="/forms" replace />;
	}
	if (role === roles.STUDENT) {
		element = <Navigate to="/home" replace />;
		//Redirect url = "https://qldt.hust.edu.vn/" />;
	}
	if (role === null || user === undefined) {
		element = <Navigate to="/sign-in" replace />;
	}
	// if (role)
	return (
		<Routes>
			{routerConfig.map((el: any) => {
				const { component, needAuthor, grantPermission, ...rest } = el;
				const Component = el?.component;
				if (el?.path?.includes("edit")) {
					return (
						<Route
							key={el.path}
							exact
							{...rest}
							element={
								<RouteWrapper
									needAuthor={needAuthor}
									grantPermission={grantPermission}
								>
									<EditLayout>
										<Component />
									</EditLayout>
								</RouteWrapper>
							}
						></Route>
					);
				}

				return (
					<Route
						key={el.path}
						exact
						{...rest}
						element={
							<RouteWrapper
								needAuthor={needAuthor}
								grantPermission={grantPermission}
							>
								<Component />
							</RouteWrapper>
						}
					></Route>
				);
			})}

			<Route path="/home" element={<StudentHomePage />} />
			<Route path="/" element={element} />
			<Route path="/notFound" element={<NotFoundPage />} />
			<Route path="*" element={<NotFoundPage />} />
			<Route path="/sign-in" element={<SignInPage />} />
		</Routes>
	);
}
