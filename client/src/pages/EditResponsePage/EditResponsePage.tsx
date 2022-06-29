import React from "react";
import { Tabs, Spin } from "antd";
import { useGetFormAnalytic } from "@/hooks/form.hook";
import "./EditResponsePage.scss";
import ChartDisplay from "@/containers/ChartDisplay/ChartDisplay";

const { TabPane } = Tabs;

const EditResponsePage: React.FC = () => {
	const { data: questions, isLoading } = useGetFormAnalytic();

	if (isLoading) {
		return <Spin />;
	}

	return (
		<div className="edit-response-page">
			<Tabs centered>
				<TabPane tab="Summary" key="1">
					{questions.map((q: any) => {
						return <ChartDisplay key={q._id} question={q} />;
					})}
				</TabPane>
				<TabPane tab="Response" key="2">
					View per Response
				</TabPane>
			</Tabs>
		</div>
	);
};

export default EditResponsePage;
