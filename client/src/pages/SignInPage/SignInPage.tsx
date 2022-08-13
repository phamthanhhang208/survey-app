import { Form, Input } from "antd";
import { FunctionComponent, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

import "./SignInPage.scss";

interface SignInPageProps {}

const { Item } = Form;

const SignInPage: FunctionComponent<SignInPageProps> = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const state: any = location.state;
	const auth = useAuth();
	const { user } = auth;
	const [formSignIn] = Form.useForm();

	const handleLogin = async (v: any) => {
		//console.log(v);
		await auth.signin(v.email, v.password);
	};

	useEffect(() => {
		if (user) {
			//navigate("/", { replace: true });
			//navigate(location, { state: location });

			if (state !== null && state.includes("/forms/")) {
				navigate(-1);
			} else {
				navigate("/", { state: location.pathname });
			}
			console.log("not infinity");
		}
	}, [user, navigate, location, state]);

	return (
		<div className="sign-in-page">
			<Form
				form={formSignIn}
				onFinish={handleLogin}
				className="main-form"
				layout={"vertical"}
				labelCol={{ style: { fontWeight: 700 } }}
			>
				<Item
					label={"Email"}
					name={"email"}
					style={{ width: "100%", marginBottom: 10 }}
				>
					<Input />
				</Item>
				<Item
					label={"Password"}
					name={"password"}
					style={{ width: "100%", marginBottom: 10 }}
				>
					<Input.Password style={{ borderRadius: 4 }} />
				</Item>
				<div
					className="sign-in-btn"
					onClick={() => {
						formSignIn.submit();
					}}
				>
					Sign In
				</div>
			</Form>
		</div>
	);
};

export default SignInPage;
