import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormSlider,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';

import styles from './index.less';
import { getSearchParameters } from '@/services/utils';
import { getBloodBoxList } from '@/services/HosManage/bloodBox';

const columns: ProColumns<HosManage.BloodBoxItem>[] = [
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

const BloodBox: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [modalProps, setModalProps] = useState<Storage.ModalProps>({
    title: '',
    isModalOpen: false,
  });

  const handleOk = () => {};

  const handleCancel = () => {
    setModalProps({ ...modalProps, isModalOpen: false });
  };

  return (
    <div>
      <ProTable<HosManage.BloodBoxItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          const { current, pageSize, ...rest } = params;
          console.log(sort, filter);
          let wheres = getSearchParameters<HosManage.BloodBoxItem>(rest, columns);
          let queryConditions: Storage.requestItem = {
            Page: current ?? 1,
            Rows: pageSize ?? 50,
            // sort: "Remark",
            // order: "desc",
            Wheres: JSON.stringify(wheres),
          };
          return getBloodBoxList(queryConditions).then(
            (value: Storage.PageData) => {
              if (value && value.status === 0) {
                return { data: value.rows, success: true, total: value.total ?? 0 };
              } else {
                message.error(value.msg);
                return { data: [], success: false, total: 0 };
              }
            },
            () => {
              message.error('获取血袋盒数据列表失败');
              return { data: [], success: false, total: 0 };
            },
          );
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'blood-box-list-table',
          persistenceType: 'sessionStorage',
          // onChange(value) {
          //   console.log('value: ', value);
          // },
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
        form={
          {
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          }
        }
        pagination={{
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="血袋盒列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setModalProps({ ...modalProps, isModalOpen: true })}
          >
            新增
          </Button>,
        ]}
      />
      <Modal
        title={modalProps.title}
        open={modalProps.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        centered
      >
        <ProForm<HosManage.BloodBoxItem>
          // layout="horizontal"  // 布局(label和文本框显示在同一行)
          onFinish={async (values: any) => {
            console.log(values);
            message.success('提交成功');
          }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="RFID"
              label="rfid"
              // tooltip="最长为 24 位"
              placeholder=""
            />
            <ProFormDigit
              width="md"
              name="temp"
              label="当前温度"
              min={-273.15}
              placeholder=""
              fieldProps={{ addonAfter: '℃' }}
            />
          </ProForm.Group>
          <ProFormDependency name={['mintemp', 'maxtemp']}>
            {({ mintemp, maxtemp }) => (
              <ProForm.Group>
                <ProFormDigit
                  name="mintemp"
                  width="md"
                  label="最低温度(℃)"
                  min={-273.15}
                  max={maxtemp}
                  placeholder=""
                  fieldProps={{ addonAfter: '℃' }}
                  rules={[
                    { required: true },
                    // ({ getFieldValue }) => ({
                    // validator(_, value) {
                    //   if (
                    //     !value ||
                    //     getFieldValue('maxtemp') >= value ||
                    //     !maxtemp ||
                    //     maxtemp === 0
                    //   ) {
                    //     console.log('maxtemp', maxtemp);
                    //     return Promise.resolve();
                    //   }
                    //   return Promise.reject(
                    //     new Error(`最低温度必须小于最高温度${maxtemp || ''}℃`),
                    //   );
                    // },
                    // }),
                  ]}
                />
                <ProFormDigit
                  width="md"
                  name="maxtemp"
                  label="最高温度(℃)"
                  min={mintemp}
                  fieldProps={{ addonAfter: '℃' }}
                  placeholder=""
                  rules={[
                    { required: true },
                    // ({ getFieldValue }) => ({
                    //   validator(_, value) {
                    //     if (
                    //       !value ||
                    //       getFieldValue('mintemp') <= value ||
                    //       !mintemp ||
                    //       mintemp === 0
                    //     ) {
                    //       return Promise.resolve();
                    //     }
                    //     return Promise.reject(
                    //       new Error(`最高温度必须大于最低温度${mintemp || ''}℃`),
                    //     );
                    //   },
                    // }),
                  ]}
                />
              </ProForm.Group>
            )}
          </ProFormDependency>
          <ProForm.Group>
            <ProFormSwitch name="islock" label="是否锁定" />
            <ProFormSwitch name="isout" label="是否出库" />
            <ProFormSwitch name="ischarge" label="是否充电" />
            <ProFormSwitch name="isalert" label="是否报警" />
            <ProFormSlider name="batterypower" label="电池电量" />
          </ProForm.Group>
          <ProFormSelect name="status" label="状态" />
        </ProForm>
      </Modal>
    </div>
  );
};

export default BloodBox;
