import { PictureOutlined } from '@ant-design/icons';
import { Form, message, Tooltip, Upload, UploadFile, UploadProps } from 'antd';
import { FunctionComponent, useEffect, useId, useState } from 'react';
import './MyUploadImage.scss';

interface MyUploadImageProps {
  name?: any;
  initialQuestion?: any;
}

const MyUploadImage: FunctionComponent<MyUploadImageProps> = ({
  name,
  initialQuestion = undefined,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const id = useId();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (initialQuestion?.media?.url) {
      setFileList([
        {
          uid: id,
          name: 'upload',
          status: 'done',
          url: initialQuestion?.media?.url,
        },
      ]);
    }
  }, [id, initialQuestion?.media?.url]);

  const beforeImageUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return false;
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Form.Item
      name={[name, 'media']}
      valuePropName='file'
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: 0,
        width: 'fit-content',
        order: fileList?.length > 0 ? 1 : 0,
        marginLeft: fileList?.length > 0 ? 34 : 0,
      }}
      className='my-upload-image'
    >
      <Upload
        maxCount={1}
        listType={fileList?.length > 0 ? 'picture-card' : 'picture'}
        beforeUpload={beforeImageUpload}
        accept='image/*'
        fileList={fileList}
        onChange={handleChange}
      >
        {fileList?.length > 0 ? null : (
          <Tooltip
            visible={tooltipVisible}
            title={'Upload image'}
            placement='bottom'
            destroyTooltipOnHide
            mouseEnterDelay={0.05}
            overlayInnerStyle={{
              fontSize: '0.6rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <PictureOutlined
              className='upload-button'
              onMouseEnter={() => setTooltipVisible(true)}
              onMouseLeave={() => setTooltipVisible(false)}
            />
          </Tooltip>
        )}
      </Upload>
    </Form.Item>
  );
};

export default MyUploadImage;
