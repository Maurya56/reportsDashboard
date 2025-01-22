// components/Upload/Upload.tsx
import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadComponent: React.FC = () => {
  const handleFileUpload = (file: File) => {
    console.log('Uploaded file:', file);
  };

  return (
    <Upload beforeUpload={handleFileUpload} showUploadList={false}>
      <Button icon={<UploadOutlined />}>Upload CSV</Button>
    </Upload>
  );
};

export default UploadComponent;