import "./Question.scss";
import { Card, Typography, Input, Tooltip, Popconfirm } from "antd";
//import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";

const Question = () => {
	return (
		<div style={{ margin: "24px 0" }}>
			<Card
				hoverable
				bodyStyle={{ paddingBottom: 10 }}
				//onClick={() => console.log("click on card")}
				//onMouseEnter={() => console.log("hover on card")}
			>
				<Typography.Title level={4}>question</Typography.Title>
				<Card.Meta description={"description"} />
				<br />
				<div className="answer-group">
					<Input.TextArea autoSize />
				</div>
				{/* <div className="icon-group">
					<span className="icon">
						<Tooltip title="edit">
							<SettingOutlined />
						</Tooltip>
					</span>
					<span className="icon">
						<Popconfirm
							title="Are you sure to delete this question?"
							onConfirm={() => console.log("confirm")}
							onCancel={() => console.log("cancel")}
							okText="Yes"
							cancelText="No"
						>
							<DeleteOutlined />
						</Popconfirm>
					</span>
				</div> */}
			</Card>
		</div>
	);
};

export default Question;
