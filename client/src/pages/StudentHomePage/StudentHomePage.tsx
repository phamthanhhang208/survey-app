import { Result, Button, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import "./StudentHomePage.scss";

export default function StudentHomePage() {
	const navigate = useNavigate();
	const auth = useAuth();
	const handleClick = () => {
		window.location.href = "https://qldt.hust.edu.vn/";
	};
	const handleChangeAccount = async () => {
		await auth.signout();
		navigate("/sign-in", { replace: true });
	};
	return (
		<div className="student-home-page">
			<Result
				icon={<SmileOutlined />}
				title="Welcome to eHust Online Survey!"
				extra={
					<>
						<Typography.Text strong>{auth.user}</Typography.Text>
						<Typography.Link onClick={handleChangeAccount}>
							Change Account?
						</Typography.Link>
						<div style={{ marginTop: 20 }}>
							<Button type="primary" onClick={handleClick}>
								Go Home
							</Button>
						</div>
					</>
				}
			/>
		</div>
	);
}
