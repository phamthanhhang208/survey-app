import { List } from "antd";

const ListDisplay = (props: any) => {
	const { dataset } = props;

	return (
		<List
			bordered
			dataSource={dataset}
			renderItem={(item: any) => (
				<List.Item>
					{dataset.content}
					<div>{dataset.count}</div>
				</List.Item>
			)}
		/>
	);
};

export default ListDisplay;
