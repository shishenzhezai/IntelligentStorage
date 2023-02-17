import React from 'react';
import { Input } from 'antd';
import { ProCard } from '@ant-design/pro-components';

const BloodPacking: React.FC = () => {
  return (
    <div>
      <div>
        <ProCard title="血袋装箱" extra="" tooltip="血袋装箱" style={{ maxWidth: 500 }}>
          <div>
            盒子RFID：
            <Input />
          </div>
          <div>Card content</div>
          <div>Card content</div>
        </ProCard>
      </div>
    </div>
  );
};

export default BloodPacking;
