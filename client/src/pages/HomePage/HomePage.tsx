import { FunctionComponent, useState } from 'react';
import './HomePage.scss';
import { Input, Button, Tooltip, Modal, Form, Spin } from 'antd';
import MyTable from '@/components/MyTable/MyTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
//import data from '@/const/mockData.json';
import { Link, useNavigate } from 'react-router-dom';
//import {useQueryClient} from "react-query"
import useForms from '@/hooks/form.hook';
import dayjs from 'dayjs';

interface HomePageProps {}

const { Item } = Form;

const HomePage: FunctionComponent<HomePageProps> = () => {
  //const queryClient = useQueryClient();
  let navigate = useNavigate();
  const { data, error, isFetching } = useForms();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  if (isFetching) {
    return <Spin />;
  }

  const handleOk = () => {
    form.submit();
    form.getFieldValue('form-name') && setIsModalVisible(false);
  };

  const handleSubmit = (data: any) => {
    console.log(data);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleDelete = (v: any) => {
    console.log('delete', v);
  };

  const handleEdit = (v: any) => {
    console.log('edit', v);
    navigate(`/forms/${v}/edit`);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'title',
      width: 1000,

      render: (v: any, record: any) => {
        return (
          <Link key={record._id} to={`/forms/${record?._id}/edit`}>
            {v}
          </Link>
        );
      },
    },
    {
      title: 'Last Edited',
      dataIndex: 'updatedAt',
      width: 200,
      render: (v: any) => {
        return dayjs.unix(v).format('DD-MM-YYYY');
        //new Date(Number(v)).toLocaleDateString("en-GB");
      },
    },
    {
      title: 'Actions',
      dataIndex: 'name',
      width: 100,
      required: true,
      render: (v: any, record: any) => {
        return (
          <div className='actions' key={record._id}>
            <Tooltip
              title={'Edit form'}
              mouseEnterDelay={0.05}
              mouseLeaveDelay={0.05}
            >
              <EditOutlined onClick={() => handleEdit(record?._id)} />
            </Tooltip>
            <Tooltip
              title={'Delete form'}
              mouseEnterDelay={0.05}
              mouseLeaveDelay={0.05}
            >
              <DeleteOutlined
                className='delete-icon'
                onClick={() => handleDelete(record?._id)}
              />
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
      <MyTable
        columns={columns}
        dataSource={data}
        rowKey={(item) => item?._id}
      />
      <Modal
        title='Create new form'
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Item
            label={'Form name:'}
            rules={[
              { required: true, message: 'Form name must not be empty.' },
            ]}
            name={'form-name'}
          >
            <Input placeholder='Form name' />
          </Item>
          <Item label={'Description:'} name={'form-description'}>
            <Input.TextArea placeholder='Description' />
          </Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
