import React from "react";
import { Tabs, Card } from "antd";
import "./EditResponsePage.scss";

const { TabPane } = Tabs;

const EditResponsePage: React.FC = () => {
	return (
		<div className="edit-response-page">
			<Card>
				<Tabs centered>
					<TabPane tab="Summary" key="1">
						Show Chart Here
					</TabPane>
					<TabPane tab="Response" key="2">
						View per Response
					</TabPane>
				</Tabs>
			</Card>
		</div>
	);
};

export default EditResponsePage;
