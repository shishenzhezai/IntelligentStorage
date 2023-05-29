import { getRoleList } from '@/services/SysManage/role';
import { getSearchParameters } from '@/services/utils';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

const columns: ProColumns<SysManage.RoleItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'index',
    ellipsis: true,
  },
  {
    title: '角色ID',
    dataIndex: 'Role_Id',
    ellipsis: true,
    search: false,
  },
  {
    title: '上级角色',
    dataIndex: 'ParentId',
    ellipsis: true,
    search: false,
  },
  {
    title: '角色名称',
    dataIndex: 'RoleName',
    ellipsis: true,
  },
  {
    title: '部门名称',
    dataIndex: 'DeptName',
    filters: true,
    onFilter: true,
    ellipsis: true,
    search: false,
    hideInSearch: true,
  },

  {
    title: '是否启用',
    dataIndex: 'Enable',
    ellipsis: true,
    hideInSearch: true,
    valueType: 'checkbox',
    valueEnum: {},
    render: (_, record) => (
      <Space>
        <Tag key={record.Enable}>{record.Enable}</Tag>
      </Space>
    ),
  },
  {
    title: '创建人',
    dataIndex: 'Creator',
    ellipsis: true,
    search: false,
  },
  {
    title: '创建时间',
    dataIndex: 'CreateDate',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '修改人',
    dataIndex: 'Modifier',
    ellipsis: true,
    search: false,
  },
  {
    title: '修改时间',
    dataIndex: 'ModifyDate',
    ellipsis: true,
    hideInSearch: true,
  },
];

const RoleManage: React.FC = () => {
  const rolelistFormRef = useRef<ProFormInstance>();
  const actionRef = useRef<ActionType>();
  // const { roleList ,loading} = useModel('SysManage.RoleManage.roleModel');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showRoleAddModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <ProTable<SysManage.RoleItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log('sort', sort, 'filter', filter, 'params', params);
          const { current, pageSize, ...rest } = params;
          let wheres = getSearchParameters<SysManage.RoleItem>(rest, columns);
          let queryConditions: Storage.requestItem = {
            Page: current ?? 1,
            Rows: pageSize ?? 50,
            Wheres: JSON.stringify(wheres),
          };
          return getRoleList(queryConditions).then(
            (value: Storage.PageData) => {
              if (value && value.status === 0) {
                return { data: value.rows, success: true, total: value.total ?? 0 };
              } else {
                message.error(value.msg);
                return { data: [], success: false, total: 0 };
              }
            },
            () => {
              message.error('获取角色列表失败');
              return { data: [], success: false, total: 0 };
            },
          );
        }}
        columnsState={{
          persistenceKey: 'role-list-pro-table',
          persistenceType: 'sessionStorage',
        }}
        rowKey="Role_Id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 100,
          },
        }}
        formRef={rolelistFormRef}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="角色管理"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={showRoleAddModal}>
            新建
          </Button>,
          //   <Dropdown
          //     key="menu"
          //     menu={{
          //       items: [
          //         {
          //           label: '1st item',
          //           key: '1',
          //         },
          //         {
          //           label: '2nd item',
          //           key: '1',
          //         },
          //         {
          //           label: '3rd item',
          //           key: '1',
          //         },
          //       ],
          //     }}
          //   >
          //     <Button>
          //       <EllipsisOutlined />
          //     </Button>
          //   </Dropdown>,
        ]}
      />
      <Modal open={isModalOpen}></Modal>
    </div>
  );
};

export default RoleManage;
