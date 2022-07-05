import { PictureOutlined } from '@ant-design/icons';
import { Form, message, Tooltip, Upload, UploadFile, UploadProps } from 'antd';
import { FunctionComponent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './MyUploadImage.scss';

interface MyUploadImageProps {
  field?: any;
  initialMedia?: any;
}

const MyUploadImage: FunctionComponent<MyUploadImageProps> = ({
  field,
  initialMedia = undefined,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>(() =>
    initialMedia
      ? [
          {
            uid: String(uuidv4()),
            name: 'upload',
            status: 'done',
            url: initialMedia?.media.url,
          },
        ]
      : []
  );

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
      name={[field.name, 'media']}
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
