import React from 'react';
import {
  Tabs,
  Spin,
  Card,
  Typography,
  // Button,
  Empty,
  Menu,
  Dropdown,
  Modal,
} from 'antd';
import {
  useGetFormAnalytic,
  useGetForm,
  useDownloadFormAnalytic,
} from '@/hooks/form.hook';
import { useDeleteAllResponses } from '@/hooks/response.hook';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import './EditResponsePage.scss';
import ChartDisplay from '@/containers/ChartDisplay/ChartDisplay';
import ViewResponse from '@/containers/ViewResponse/ViewResponse';
import { exportExcel } from '@/utills/utils';
import { useState } from 'react';
const { TabPane } = Tabs;

const EditResponsePage: React.FC = () => {
  const { data: questions, isLoading: isLoadingAnalytic } =
    useGetFormAnalytic();

  const { data: formDetail, isLoading } = useGetForm();

  const { refetch } = useDownloadFormAnalytic();

  const { mutate: deleteResponses } = useDeleteAllResponses();

  const [visible, setVisible] = useState(false);

  if (isLoadingAnalytic) {
    return <Spin />;
  }

  if (!formDetail) {
    return <Spin />;
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    deleteResponses();
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOnClickDownload = async () => {
    const { data: excelContent } = await refetch();
    const { fileName, header, rows } = excelContent;
    exportExcel({ fileName, header, rows });
  };

  const handleMenuClick = async (e: any) => {
    switch (e.key) {
      case 'download-excel':
        await handleOnClickDownload();
        break;
      case 'delete-responses':
        showModal();
        break;
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        {
          label: 'Download Excel File',
          key: 'download-excel',
          icon: <DownloadOutlined />,
        },
        {
          label: 'Delete all responses',
          key: 'delete-responses',
          icon: <DeleteOutlined />,
        },
      ]}
    />
  );

  return (
    <div className='edit-response-page'>
      <Tabs centered>
        <TabPane tab='Summary' key='1'>
          {formDetail?.responses.length ? (
            <>
              <Card className='edit-response-page-header'>
                <Typography.Title level={2}>
                  {formDetail?.responses.length} responses
                </Typography.Title>
                <Dropdown.Button overlay={menu} />
              </Card>
              {questions.map((q: any) => {
                return <ChartDisplay key={q._id} question={q} />;
              })}
            </>
          ) : (
            <Empty />
          )}
        </TabPane>
        <TabPane tab='Response' key='2'>
          {formDetail?.responses.length === 0 ? (
            <Empty />
          ) : isLoading ? (
            <Spin />
          ) : (
            <ViewResponse formDetail={formDetail} />
          )}
        </TabPane>
      </Tabs>
      <Modal
        title='Delete All Responses'
        visible={visible}
        onOk={handleOk}
        //confirmLoading={isDeletingResponse}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete?</p>
        <p>Once deleted, this responses can not be restore</p>
      </Modal>
    </div>
  );
};

export default EditResponsePage;
