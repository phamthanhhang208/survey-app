import { Table, TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FunctionComponent } from 'react';
import './MyTable.scss';

interface MyTableProps extends TableProps<any> {
  tableID?: string;
}

const MyTable: FunctionComponent<MyTableProps> = (props) => {
  const { columns = [] } = props;
  const convertColumn: any = columns?.map((col: ColumnType<any>) => {
    const { dataIndex, key } = col;

    return {
      ...col,
      key: key || dataIndex,
    };
  });

  return (
    <div className='my-table-container'>
      <Table className='my-table' bordered {...props} columns={convertColumn} />
    </div>
  );
};

export default MyTable;
