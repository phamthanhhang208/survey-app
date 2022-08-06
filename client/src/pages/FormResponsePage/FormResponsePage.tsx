import { SmileOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import "./FormResponsePage.scss";

type Props = {};

const FormResponsePage = (props: Props) => {
	const navigate = useNavigate();

	const handleOk = () => {
		navigate("/");
	};
	return (
		<Result
			className="form-response-page"
			icon={<SmileOutlined />}
			title={
				<div>
					<h3 style={{ marginBottom: 0 }}>Thank you!</h3>
					<p style={{ fontSize: 14 }}>Your submission has been sent.</p>
				</div>
			}
			extra={
				<Button type="primary" onClick={handleOk}>
					OK
				</Button>
			}
		/>
	);
};

export default FormResponsePage;
