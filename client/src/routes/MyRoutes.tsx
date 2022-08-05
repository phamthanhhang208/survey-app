import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { routerConfig } from "@/routes/routeConfig";
import EditLayout from "@/layouts/EditLayout/EditLayout";
import RouteWrapper from "./RouteWrapper";
import SignInPage from "@/pages/SignInPage/SignInPage";
import { useAuth } from "@/hooks/useAuth";

export default function MyRoutes() {
	const { role } = useAuth();
	console.log(role);
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

			<Route path="/" element={<Navigate to="/forms" replace />} />
			<Route path="*" element={<NotFoundPage />} />
			<Route path="/sign-in" element={<SignInPage />} />
		</Routes>
	);
}
