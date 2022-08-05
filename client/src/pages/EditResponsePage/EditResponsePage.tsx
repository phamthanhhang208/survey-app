import ChartDisplay from '@/containers/ChartDisplay/ChartDisplay';
import ViewResponse from '@/containers/ViewResponse/ViewResponse';
import {
  useDownloadFormAnalytic,
  useGetForm,
  useGetFormAnalytic,
} from '@/hooks/form.hook';
import { useDeleteAllResponses } from '@/hooks/response.hook';
import { exportExcel } from '@/utils/utils';
import {
  DeleteOutlined,
  DownloadOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { Dropdown, Empty, Menu, Modal, Skeleton, Tabs, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useState } from 'react';
import './EditResponsePage.scss';
const { TabPane } = Tabs;

const EditResponsePage: React.FC = () => {
  const { data: questions, isLoading: isLoadingAnalytic } =
    useGetFormAnalytic();
  const [tabPage, setTabPage] = useState(1);
  const { data: formDetail, isLoading } = useGetForm();
  const { refetch } = useDownloadFormAnalytic();
  const { mutate: deleteResponses } = useDeleteAllResponses();
  const [visible, setVisible] = useState(false);

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
      style={{
        minWidth: 184,
        padding: 0,
        border: '1px solid #eaeaea',
        borderRadius: 4,
      }}
      onClick={handleMenuClick}
      items={[
        {
          label: 'Download Excel File',
          key: 'download-excel',
          icon: <DownloadOutlined />,
          style: { height: 42 },
        },
        {
          label: 'Delete all responses',
          key: 'delete-responses',
          icon: <DeleteOutlined />,
          style: { height: 42 },
        },
      ]}
    />
  );

  return (
    <div className='edit-response-page'>
      <div className='edit-response-page-header'>
        <div className='card-header-top'>
          <Typography.Title level={2}>
            {formDetail?.responses.length}{' '}
            {formDetail?.responses.length <= 1 ? 'response' : 'responses'}
          </Typography.Title>
          <Dropdown
            overlay={menu}
            trigger={['click']}
            placement='bottomRight'
            destroyPopupOnHide
          >
            <EllipsisOutlined
              className='more-icon'
              style={{
                fontSize: 22,
                transform: 'rotate(90deg) translateX(-7px)',
              }}
            />
          </Dropdown>
        </div>

        <Tabs centered onChange={(v: any) => setTabPage(Number(v))}>
          <TabPane tab='Summary' key='1'></TabPane>
          <TabPane tab='Response' key='2'></TabPane>
        </Tabs>

        {formDetail?.responses.length === 0 ? null : (
          <div
            className='response-control-field'
            style={tabPage === 2 ? undefined : { display: 'none' }}
          ></div>
        )}
      </div>

      {isLoadingAnalytic || !formDetail ? (
        <Skeleton active />
      ) : (
        <Content style={tabPage === 1 ? undefined : { display: 'none' }}>
          {formDetail?.responses.length ? (
            <>
              {questions.map((q: any) => {
                return <ChartDisplay key={q._id} question={q} />;
              })}
            </>
          ) : (
            <Empty />
          )}
        </Content>
      )}

      {isLoadingAnalytic || !formDetail ? (
        <Skeleton active />
      ) : (
        <Content style={tabPage === 2 ? undefined : { display: 'none' }}>
          {formDetail?.responses.length === 0 ? (
            <Empty />
          ) : isLoading ? (
            <Skeleton active />
          ) : (
            <ViewResponse formDetail={formDetail} />
          )}
        </Content>
      )}

      <Modal
        title='Delete All Responses'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete?</p>
        <p>Once deleted, these responses can not be restore</p>
      </Modal>
    </div>
  );
};

export default EditResponsePage;
