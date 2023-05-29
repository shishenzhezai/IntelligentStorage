import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  ProColumns,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Modal, message } from 'antd';
import React, { useRef, useState } from 'react';

import styles from './index.less';
import { getSearchParameters } from '@/services/utils';
import { getFridgeList } from '@/services/HosManage/bloodFridge';

const columns: ProColumns<HosManage.BloodFridgeItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
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
          action?.startEditable?.(record.id);
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
  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalProps, setModalProps] = useState<Storage.ModalProps>({
    title: '',
    isModalOpen: false,
  });

  const actionRef = useRef<ActionType>();
  const handleCancel = (): void => {
    setModalProps((prevState: Storage.ModalProps) => ({ ...prevState, isModalOpen: false }));
  };

  /**
   * 当点击 handleOk 按钮时，将 isModalOpen 状态设置为 true。
   *
   * @param {MouseEvent<HTMLButtonElement, MouseEvent>} e - 触发按钮点击事件的鼠标事件。
   * @return {void} 该函数没有返回值。
   */
  const handleOk = (e: MouseEvent): void => {
    e.preventDefault();
    // setModalProps((prevState:Storage.ModalProps)=>({title:'添加冰箱',isModalOpen:   true}));
  };

  return (
    <div>
      <ProTable<HosManage.BloodFridgeItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          const { current, pageSize, ...rest } = params;
          let wheres = getSearchParameters<HosManage.BloodFridgeItem>(rest, columns);
          let queryConditions: Storage.requestItem = {
            Page: current ?? 1,
            Rows: pageSize ?? 50,
            // sort: "Remark",
            // order: "desc",
            Wheres: JSON.stringify(wheres),
          };
          return getFridgeList(queryConditions).then(
            (value: Storage.PageData) => {
              if (value && value.status === 0) {
                return { data: value.rows, success: true, total: value.total ?? 0 };
              } else {
                message.error(value.msg);
                return { data: [], success: false, total: 0 };
              }
            },
            () => {
              message.error('获取冰箱数据列表失败');
              return { data: [], success: false, total: 0 };
            },
          );
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'blood-fridge-list-table',
          persistenceType: 'sessionStorage',
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
        form={{}}
        pagination={{
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="冰箱列表"
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              setModalProps({ title: '添加冰箱', isModalOpen: true });
            }}
          >
            新建
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
        <ProForm<HosManage.BloodFridgeItem>
          // layout="horizontal"
          onFinish={async (values: any) => {
            console.log(values);
            message.success('提交成功');
          }}
          // initialValues={{
          //   name: '蚂蚁设计有限公司',
          //   useMode: 'chapter',
          // }}
        >
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="冰箱名称"
              // tooltip="最长为 24 位"
              placeholder=""
            />
            <ProFormText width="md" name="rfid" label="条码" placeholder="" />
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
          {/* <ProForm.Group>
            <ProFormSelect
              options={[
                {
                  value: 'chapter',
                  label: '盖章后生效',
                },
              ]}
              readonly 
              width="xs"
              name="useMode"
              label="合同约定生效方式"
            />
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 'time',
                  label: '履行完终止',
                },
              ]}
              name="unusedMode"
              label="合同约定失效效方式"
            />
          </ProForm.Group> */}
          <ProForm.Group>
            <ProFormText width="md" name="brand" label="品牌" placeholder="" />
            <ProFormText name="specification" width="md" label="规格" placeholder="" />
          </ProForm.Group>{' '}
        </ProForm>
        {/* <Form
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
        </Form> */}
      </Modal>
    </div>
  );
};

export default BloodFridge;
