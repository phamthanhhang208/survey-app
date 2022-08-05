import { List, Table } from 'antd';

const ListDisplay = (props: any) => {
  const { dataset } = props;
  console.log(dataset);

  const columns = [
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Count',
      dataIndex: 'count',
      key: 'count',
      sorter: (a: any, b: any) => a.count - b.count,
      width: 120,
    },
  ];

  return (
    <Table
      dataSource={dataset}
      columns={columns}
      pagination={{ pageSize: 3 }}
    />
  );
};

export default ListDisplay;
