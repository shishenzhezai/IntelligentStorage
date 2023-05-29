import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ProColumns,
  ProTable,
  TableDropdown,
} from '@ant-design/pro-components';
import { Button, Card, Col, Form, Input, Modal, Row } from 'antd';
import React, { useRef, useState } from 'react';
import styles from './index.less';
import type { TableRowSelection } from 'antd/es/table/interface';

const defaultBoxData: HosManage.BloodBoxItem[] = [
  {
    boxid: 1,
    rfid: '001',
    mintemp: -20,
    maxtemp: 60,
    temp: 20,
    islock: 0,
    isout: 0,
    status: 0,
    batterypower: 90,
    ischarge: 1,
    isalert: 0,
  },
  {
    boxid: 2,
    rfid: '002',
    mintemp: -20,
    maxtemp: 60,
    temp: 70,
    islock: 0,
    isout: 0,
    status: 0,
    batterypower: 90,
    ischarge: 1,
    isalert: 0,
  },
  {
    boxid: 3,
    rfid: '003',
    mintemp: -20,
    maxtemp: 90,
    temp: -40,
    islock: 0,
    isout: 0,
    status: 0,
    batterypower: 90,
    ischarge: 1,
    isalert: 0,
  },
];

const columnsBloodBoxItem: ProColumns<HosManage.BloodBoxItem>[] = [
  {
    dataIndex: 'boxid',
    valueType: 'index',
    ellipsis: true,
  },
  {
    title: 'RHID',
    dataIndex: 'rfid',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '温度',
    dataIndex: 'temp',
    ellipsis: true,
    renderFormItem: (_, { defaultRender }) => {
      return defaultRender(_);
    },
    render: (_, record) => {
      if (record.temp > record.maxtemp) {
        return <span className={styles.hightemp}>{record.temp}</span>;
      } else if (record.temp < record.mintemp) {
        return <span className={styles.lowtemp}>{record.temp}</span>;
      } else {
        return <span>{record.temp}</span>;
      }
    },
  },
  {
    title: '电量',
    dataIndex: 'batterypower',
    ellipsis: true,
  },
  {
    title: '开锁状态',
    dataIndex: 'islock',
    ellipsis: true,
  },
  {
    title: '出库状态',
    dataIndex: 'isout',
    ellipsis: true,
  },
  {
    title: '充电状态',
    dataIndex: 'ischarge',
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
const columnsBloodItem: ProColumns<KeepStorage.BloodItem>[] = [
  {
    dataIndex: 'boxid',
    valueType: 'index',
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

  const rowSelection: TableRowSelection<HosManage.BloodBoxItem> = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: HosManage.BloodBoxItem[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: HosManage.BloodBoxItem) => ({
      disabled: record.status === 1, // Column configuration not to be checked
      name: record.boxid.toString(),
    }),
  };

  return (
    <div>
      <ProTable<HosManage.BloodBoxItem>
        columns={columnsBloodBoxItem}
        actionRef={actionRef}
        search={false}
        cardBordered
        defaultData={defaultBoxData}
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return request<{
            data: HosManage.BloodBoxItem[];
          }>('https://192.168.1.112/github/issues', {
            params,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="boxid"
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="血袋盒列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={bloodInS_btn}>
            血袋入库
          </Button>,
        ]}
      />

      <ProTable<KeepStorage.BloodItem>
        columns={columnsBloodItem}
        actionRef={actionRef}
        search={false}
        headerTitle="血袋信息"
        cardBordered
      />

      <Modal
        title="血袋入库"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        centered
      >
        <Form
          name="bloodIn"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col>
              <Form.Item
                label="RFID"
                name="rfid"
                rules={[{ required: true, message: '请输入rfid!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label="RFID"
                name="rfid"
                rules={[{ required: true, message: '请输入rfid!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Card>
          <EditableProTable<KeepStorage.BloodItem>
            rowKey="id"
            headerTitle="血袋信息"
            maxLength={5}
            scroll={{
              x: 960,
            }}
            loading={false}
            toolBarRender={() => []}
            columns={columnsBloodItem}
            onChange={setDataSource}
            editable={{
              type: 'multiple',
              editableKeys,
              onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
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
