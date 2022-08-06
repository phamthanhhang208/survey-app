import React from "react";
import { Card, Form, Switch, Spin, Divider } from "antd";
import { useGetForm, useUpdateForm } from "@/hooks/form.hook";
import { useParams } from "react-router-dom";
import "./EditSettingPage.scss";

const EditSettingPage: React.FC = () => {
	const { id } = useParams();
	const [form] = Form.useForm();

	const { data: formDetail, isLoading } = useGetForm();
	const { mutate: updateFormSetting } = useUpdateForm();

	const handleOnChange = (values: any) => {
		updateFormSetting({ id, values });
	};

	return (
		<Card className="edit-setting-page">
			<h1>Settings</h1>
			<Divider style={{ marginTop: 12, marginBottom: 24 }} />
			{isLoading ? (
				<Spin size="large" />
			) : (
				<Form
					layout="horizontal"
					labelAlign="left"
					colon={false}
					labelCol={{ span: 22 }}
					wrapperCol={{ span: 1 }}
					form={form}
					onValuesChange={handleOnChange}
					initialValues={{
						isAcceptResponse: formDetail?.isAcceptResponse,
						isAllowAnonymous: formDetail?.isAllowAnonymous,
					}}
					className={"setting-form"}
				>
					<Form.Item
						name="isAcceptResponse"
						label={
							<div>
								<p style={{ fontSize: 16, marginBottom: 0 }}>Accept response</p>
								<p
									style={{ fontStyle: "italic", opacity: 0.8, marginBottom: 0 }}
								>
									Form is currently accepting responses
								</p>
							</div>
						}
						valuePropName="checked"
						style={{ height: 64, marginBottom: 10 }}
					>
						<Switch />
					</Form.Item>
					<Form.Item
						name="isAllowAnonymous"
						label={
							<div>
								<p style={{ fontSize: 16, marginBottom: 0 }}>
									Allow anonymous respondents
								</p>
								<p
									style={{ fontStyle: "italic", opacity: 0.8, marginBottom: 0 }}
								>
									Form does not collect user email
								</p>
							</div>
						}
						valuePropName="checked"
						style={{ marginBottom: 10 }}
					>
						<Switch />
					</Form.Item>
				</Form>
			)}
		</Card>
	);
};

export default EditSettingPage;
