import React from "react";
import { Tabs, Spin } from "antd";
import { useGetFormAnalytic, useGetForm } from "@/hooks/form.hook";
import "./EditResponsePage.scss";
import ChartDisplay from "@/containers/ChartDisplay/ChartDisplay";
import ViewResponse from "@/containers/ViewResponse/ViewResponse";

const { TabPane } = Tabs;

const EditResponsePage: React.FC = () => {
	const { data: questions, isLoading: isLoadingAnalytic } =
		useGetFormAnalytic();

	const { data: formDetail, isLoading } = useGetForm();

	if (isLoadingAnalytic) {
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
					{isLoading ? <Spin /> : <ViewResponse formDetail={formDetail} />}
				</TabPane>
			</Tabs>
		</div>
	);
};

export default EditResponsePage;
