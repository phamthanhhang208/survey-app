import { Table } from "antd";

const ListDisplay = (props: any) => {
	const { dataset } = props;

	const columns = [
		{
			title: "Content",
			dataIndex: "content",
			key: "content",
		},
		{
			title: "Count",
			dataIndex: "count",
			key: "count",
			sorter: (a: any, b: any) => a.count - b.count,
			width: 120,
		},
	];

	return (
		<div style={{ paddingTop: 10 }}>
			<Table
				rowKey={(item) => item.content}
				dataSource={dataset}
				columns={columns}
				pagination={{ pageSize: 3 }}
			/>
		</div>
	);
};

export default ListDisplay;
