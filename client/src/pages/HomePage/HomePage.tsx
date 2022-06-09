import { FunctionComponent, useState } from 'react';
import './HomePage.scss';
import { Input, Button, Tooltip, Modal, Form } from 'antd';
import MyTable from '@/components/MyTable/MyTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import data from '@/const/mockData.json';
import { Link } from 'react-router-dom';

interface HomePageProps {}

const { Item } = Form;

const HomePage: FunctionComponent<HomePageProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (v: any) => {
    console.log('delete', v);
  };

  const handleEdit = (v: any) => {
    console.log('edit', v);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: 1000,
      render: (v: any, record: any) => {
        return <Link to={`${record?.id}`}>{v}</Link>;
      },
    },
    {
      title: 'Last Edited',
      dataIndex: 'lastEdited',
      width: 200,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      width: 100,
      required: true,
      render: (v: any, record: any) => {
        return (
          <div className='actions'>
            <Tooltip title={'Delete form'}>
              <DeleteOutlined onClick={() => handleDelete(record?.id)} />
            </Tooltip>
            <Tooltip title={'Delete form'}>
              <EditOutlined onClick={() => handleEdit(record?.id)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  return (
    <div className='home-page'>
      <div className='functions'>
        <Input className='search-input' placeholder='Search' allowClear />
        <Button type='primary' onClick={showModal}>
          New form
        </Button>
      </div>
      <MyTable columns={columns} dataSource={data} />
      <Modal
        title='Create new form'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Item label={'Form name'}>
            <Input />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
