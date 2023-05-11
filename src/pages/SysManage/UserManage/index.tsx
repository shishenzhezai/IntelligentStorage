import { getUserList } from '@/services/SysManage/user';
import { getSearchParameters } from '@/services/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, FormInstance, message, Modal, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

const columns: ProColumns<SysManage.UserItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    ellipsis: true,
  },
  {
    title: '账号',
    dataIndex: 'UserName',
    ellipsis: true,
    valueType: 'text',
  },
  {
    title: '性别',
    dataIndex: 'Gender',
    ellipsis: true,
    search: false,
  },
  {
    title: '头像',
    dataIndex: 'HeadImageUrl',
    ellipsis: true,
    search: false,
  },
  {
    title: '角色',
    dataIndex: 'Role_Id',
    ellipsis: true,
    search: false,
  },
  {
    title: '真实姓名',
    dataIndex: 'UserTrueName',
    ellipsis: true,
    search: false,
  },
  {
    title: '注册时间',
    dataIndex: 'CreateDate',
    ellipsis: true,
    valueType: 'dateRange',
  },
  {
    title: '最后登录时间',
    dataIndex: 'LastLoginDate',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '创建人',
    dataIndex: 'Creator',
    ellipsis: true,
    search: false,
  },
  {
    title: '是否启用',
    dataIndex: 'Enable',
    ellipsis: true,
    search: false,
    valueType: 'checkbox',
    valueEnum: {},
    render: (_, record) => (
      <Space>
        <Tag key={record.Enable}>{record.Enable}</Tag>
      </Space>
    ),
  },
  {
    title: '修改时间',
    dataIndex: 'ModifyDate',
    ellipsis: true,
    search: false,
  },
];

const UserManage: React.FC = () => {
  const userlistFormRef = useRef<FormInstance>();
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showUserAddModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <ProTable<SysManage.UserItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log('sort', sort, 'filter', filter, 'params', params);
          let wheres = getSearchParameters<SysManage.UserItem>(params, columns);
          let queryConditions: SysManage.requestItem = {
            Page: params.current ?? 1,
            Rows: params.pageSize ?? 50,
            Wheres: JSON.stringify(wheres),
          };
          return getUserList(queryConditions).then(
            (value: SysManage.PageData) => {
              if (value && value.status === 0) {
                return { data: value.rows, success: true, total: value.total ?? 0 };
              } else {
                message.error(value.msg);
                return { data: [], success: false, total: 0 };
              }
            },
            () => {
              message.error('获取用户列表失败');
              return { data: [], success: false, total: 0 };
            },
          );
        }}
        columnsState={{
          persistenceKey: 'role-list-pro-table',
          persistenceType: 'sessionStorage',
          // onChange(value) {
          //   console.log('columnsState value: ', value);
          // },
        }}
        rowKey="User_Id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 100,
          },
        }}
        formRef={userlistFormRef}
        form={{
          isKeyPressSubmit: true,
          // formRef: userlistFormRef,
        }}
        pagination={{
          showSizeChanger: true,
        }}
        dateFormatter="string"
        // headerTitle="用户管理"
        toolbar={{
          title: '用户管理',
          tooltip: '只能看到当前角色下的所有帐号',
        }}
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={showUserAddModal}>
            新建
          </Button>,
        ]}
      />
      <Modal open={isModalOpen}></Modal>
    </div>
  );
};

export default UserManage;
