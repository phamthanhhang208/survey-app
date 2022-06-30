import React from "react";
import { Tabs, Spin, Card, Typography, Button, Empty } from "antd";
import {
	useGetFormAnalytic,
	useGetForm,
	useDownloadFormAnalytic,
} from "@/hooks/form.hook";
import { DownloadOutlined } from "@ant-design/icons";
import "./EditResponsePage.scss";
import ChartDisplay from "@/containers/ChartDisplay/ChartDisplay";
import ViewResponse from "@/containers/ViewResponse/ViewResponse";
import { exportExcel } from "@/utills/utils";

const { TabPane } = Tabs;

const EditResponsePage: React.FC = () => {
	const { data: questions, isLoading: isLoadingAnalytic } =
		useGetFormAnalytic();

	const { data: formDetail, isLoading } = useGetForm();

	const { refetch } = useDownloadFormAnalytic();

	if (isLoadingAnalytic) {
		return <Spin />;
	}

	const handleOnClickDownload = async () => {
		const { data: excelContent } = await refetch();
		const { fileName, header, rows } = excelContent;
		exportExcel({ fileName, header, rows });
	};

	return (
		<div className="edit-response-page">
			<Tabs centered>
				<TabPane tab="Summary" key="1">
					{formDetail.responses.length ? (
						<>
							<Card>
								<Typography.Title level={2}>
									{formDetail.responses.length} responses
								</Typography.Title>
								<Button
									type="primary"
									icon={<DownloadOutlined />}
									onClick={handleOnClickDownload}
								>
									Download Excel File
								</Button>
							</Card>
							{questions.map((q: any) => {
								return <ChartDisplay key={q._id} question={q} />;
							})}
						</>
					) : (
						<Empty />
					)}
				</TabPane>
				<TabPane tab="Response" key="2">
					{formDetail.responses.length === 0 ? (
						<Empty />
					) : isLoading ? (
						<Spin />
					) : (
						<ViewResponse formDetail={formDetail} />
					)}
					{/* {isLoading ? <Spin /> : <ViewResponse formDetail={formDetail} />} */}
				</TabPane>
			</Tabs>
		</div>
	);
};

export default EditResponsePage;
