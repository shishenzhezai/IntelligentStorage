import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ProColumns,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, Card, Dropdown, Form, Input, Modal } from 'antd';
import React, { useRef, useState } from 'react';
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

type BloodItem = {
  xxh: string;
  aboxx: string;
  rhxx: string;
  cpm: string; // 产品码
  xpz: string; //血品种
  dw: string; //单位
  sl: string; //数量
};

const columnsBloodBoxItem: ProColumns<BloodBoxItem>[] = [
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
const columnsBloodItem: ProColumns<BloodItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '血袋号',
    dataIndex: 'xxh',
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
    title: 'ABO血型',
    dataIndex: 'aboxx',
    copyable: true,
    ellipsis: true,
  },
  {
    title: 'RH血型',
    dataIndex: 'rhxx',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '产品码',
    dataIndex: 'cpm',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '血品种',
    dataIndex: 'xpz',
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
          action?.startEditable?.(record.xxh);
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

const BloodPacking: React.FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom' | 'hidden'>('bottom');
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const bloodInS_btn = () => {
    //血袋入库
    console.log('血袋入库');
    showModal();
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const setDataSource = () => {};

  return (
    <div>
      <ProTable<BloodBoxItem>
        columns={columnsBloodBoxItem}
        actionRef={actionRef}
        search={false}
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
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        // form={{
        //   // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        //   syncToUrl: (values, type) => {
        //     if (type === 'get') {
        //       return {
        //         ...values,
        //         created_at: [values.startTime, values.endTime],
        //       };
        //     }
        //     return values;
        //   },
        // }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="血袋盒列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={bloodInS_btn}>
            血袋入库
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

      <ProTable<BloodItem>
        columns={columnsBloodItem}
        actionRef={actionRef}
        search={false}
        headerTitle="血袋信息"
        cardBordered
      />

      <Modal title="血袋入库" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="bloodIn"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="RFID" name="rfid" rules={[{ required: true, message: '请输入rfid!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="RFID" name="rfid" rules={[{ required: true, message: '请输入rfid!' }]}>
            <Input />
          </Form.Item>
        </Form>
        <Card>
          <EditableProTable<BloodItem>
            rowKey="id"
            headerTitle="血袋信息"
            maxLength={5}
            scroll={{
              x: 960,
            }}
            recordCreatorProps={
              position !== 'hidden'
                ? {
                    position: position as 'top',
                    record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),
                  }
                : false
            }
            loading={false}
            toolBarRender={() => []}
            columns={columnsBloodItem}
            request={async () => ({
              data: defaultData,
              total: 3,
              success: true,
            })}
            onChange={setDataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
                await waitTime(2000);
              },
              onChange: setEditableRowKeys,
            }}
          />
        </Card>
      </Modal>
    </div>
  );
};

export default BloodPacking;
