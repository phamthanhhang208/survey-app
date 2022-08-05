import { Result, Button } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import "./StudentHomePage.scss";

export default function StudentHomePage() {
	const handleClick = () => {
		window.location.href = "https://qldt.hust.edu.vn/";
	};
	return (
		<div className="student-home-page">
			<Result
				icon={<SmileOutlined />}
				title="Welcome to eHust Online Survey!"
				extra={
					<Button type="primary" onClick={handleClick}>
						Go Home
					</Button>
				}
			/>
		</div>
	);
}
