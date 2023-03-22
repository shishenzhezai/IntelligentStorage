import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown } from 'antd';
import React, { useRef } from 'react';

import styles from './index.less';

type BloodBoxItem = {
  boxid: number;
  rfid: string;
  mintemp: number;
  maxtemp: number;
  temp: number;
  islock: number;
  isout: number;
  status: number;
  batterypower: number;
  ischarge: number;
  isalert: number;
};

const columns: ProColumns<BloodBoxItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'RHID',
    dataIndex: 'rfid',
    copyable: true,
    ellipsis: true,
    // tip: '标题过长会自动收缩',
    // formItemProps: {
    //   rules: [
    //     {
    //       required: true,
    //       message: '此项为必填项',
    //     },
    //   ],
    // },
  },
  {
    title: '温度',
    dataIndex: 'temp',
    copyable: true,
    ellipsis: true,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => {
      if (record.temp > record.maxtemp) {
        return <span className={styles.hightemp}>record.temp</span>;
      } else if (record.temp < record.mintemp) {
        return <span className={styles.lowtemp}>record.temp</span>;
      } else {
        return <span>record.temp</span>;
      }
    },
  },
  {
    title: '电量',
    dataIndex: 'batterypower',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '开锁状态',
    dataIndex: 'islock',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '出库状态',
    dataIndex: 'isout',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '充电状态',
    dataIndex: 'ischarge',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '报警状态',
    dataIndex: 'isalert',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.boxid);
        }}
      >
        编辑
      </a>,
      //   <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      //     查看
      //   </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => action?.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const BloodFridge: React.FC = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<BloodBoxItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        return request<{
          data: BloodBoxItem[];
        }>('https://192.168.1.112/github/issues', {
          params,
        });
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="冰箱列表"
      toolBarRender={() => [
        <Button key="button" icon={<PlusOutlined />} type="primary">
          新建
        </Button>,
        <Dropdown
          key="menu"
          menu={{
            items: [
              {
                label: '1st item',
                key: '1',
              },
              {
                label: '2nd item',
                key: '1',
              },
              {
                label: '3rd item',
                key: '1',
              },
            ],
          }}
        >
          <Button>
            <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
    />
  );
};

export default BloodFridge;
