import { List } from "antd";

const ListDisplay = (props: any) => {
	const { dataset } = props;

	return (
		<List
			bordered
			dataSource={dataset}
			renderItem={(item: any) => (
				<List.Item>
					{item.content}
					<p>count: {item.count}</p>
				</List.Item>
			)}
		/>
	);
};

export default ListDisplay;
