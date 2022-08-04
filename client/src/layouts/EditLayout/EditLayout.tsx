import { Layout } from "antd";
import { FunctionComponent, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import ShareModal from "@/components/ShareModal/ShareModal";
import "./EditLayout.scss";

interface EditLayoutProps {
	children: any;
}

const { Content } = Layout;

const EditLayout: FunctionComponent<EditLayoutProps> = ({ children }) => {
	const params = useParams();
	const [isModalVisible, setIsModalVisible] = useState(false);

	return (
		<>
			<div className="edit-layout">
				<div className="edit-layout-header">
					<NavLink className="edit-items" to={`/forms/${params.id}/edit`}>
						<span>Questions</span>
					</NavLink>
					<NavLink
						className="edit-items"
						to={`/forms/${params.id}/edit-response`}
					>
						<span>Response</span>
					</NavLink>
					<NavLink
						className="edit-items"
						to={`/forms/${params.id}/edit-setting`}
					>
						<span>Setting</span>
					</NavLink>
					<div
						className="edit-items"
						onClick={() => setIsModalVisible(!isModalVisible)}
					>
						<span>Share</span>
					</div>
				</div>
				<Content className="edit-layout-content">{children}</Content>
			</div>
			<ShareModal
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				formId={params.id}
			/>
		</>
	);
};

export default EditLayout;
