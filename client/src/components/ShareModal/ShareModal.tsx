import { Modal, Input, Tooltip, Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

export default function ShareModal(props: any) {
	const { isModalVisible, setIsModalVisible, formId } = props;
	const url = `${window.location.origin}/forms/${formId}`;

	const copy = async () => {
		await navigator.clipboard.writeText(url);
		message.success("copied to clipboard");
	};

	const handleOk = () => {
		copy();
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	return (
		<Modal
			title="Share Form"
			visible={isModalVisible}
			onOk={handleOk}
			onCancel={handleCancel}
		>
			<Input.Group compact>
				<Input style={{ width: "calc(100% - 35px)" }} disabled value={url} />
				<Tooltip title="copy url">
					<Button onClick={() => copy()} icon={<CopyOutlined />} />
				</Tooltip>
			</Input.Group>
		</Modal>
	);
}
