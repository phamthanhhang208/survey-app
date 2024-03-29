import { useNavigate, useLocation, Navigate } from "react-router-dom";
//import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Spin } from "antd";

export default function RouteWrapper(props: any) {
	const location = useLocation();
	const navigate = useNavigate();
	const [isLoadingAuth, setIsLoadingAuth] = useState(true);
	const { grantPermission } = props;

	//auth
	const auth = { user: null, role: null };
	//useAuth();
	const { user, role } = auth;
	const userHasRequiredRole = user && grantPermission.includes(role);

	useEffect(() => {
		if (user === undefined) {
			setIsLoadingAuth(true);
		}
		if (user === null) {
			setIsLoadingAuth(false);
			navigate("/sign-in", { state: location.pathname });
		}
		if (user) {
			setIsLoadingAuth(false);
		}
		// console.log("not infity");
	}, [user, navigate, location]);

	if (isLoadingAuth) {
		return (
			<div
				style={{
					margin: "20px 0",
					marginBottom: "20px",
					padding: "30px 50px",
					textAlign: "center",
					background: "rgba(0, 0, 0, 0.05)",
					borderRadius: "4px",
				}}
			>
				<Spin size="large" />
			</div>
		);
	}

	// if (user === null) {
	// 	setIsLoadingAuth(false);
	// 	return <Navigate to="/sign-in" state={{ from: location }} />;
	// }
	if (user && !userHasRequiredRole) {
		return <Navigate to="/notFound" state={{ from: location.pathname }} />;
	}

	return props.children;
}
