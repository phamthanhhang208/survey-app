import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Spin } from "antd";

export default function RouteWrapper(props: any) {
	const navigate = useNavigate();
	const [isLoadingAuth, setIsLoadingAuth] = useState(true);
	const { grantPermission } = props;
	const auth = useAuth();
	const { user, role } = auth;
	const userHasRequiredRole = user && grantPermission.includes(role);

	useEffect(() => {
		if (user) {
			setIsLoadingAuth(false);
		} else {
			setIsLoadingAuth(false);
			navigate("/sign-in");
		}
	}, [user, navigate]);

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
				<Spin size="large" />;
			</div>
		);
	}

	// if (!user) {
	// 	setIsLoadingAuth(false);
	// 	return <Navigate to="/sign-in" state={{ from: location }} />;
	// }
	if (user && !userHasRequiredRole) {
		return <p>403</p>;
	}

	return props.children;
}
