import { Modal, Typography } from "antd";

const { Paragraph } = Typography;

export default function ShareModal(props: any) {
	const { isModalVisible, setIsModalVisible } = props;
	const handleOk = () => {
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
			<Paragraph ellipsis={true} copyable>
				This is a copyable text.
			</Paragraph>
		</Modal>
	);
}
