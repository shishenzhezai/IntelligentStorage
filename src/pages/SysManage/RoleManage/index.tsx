import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';

type RoleItem = {
  Role_Id: number;
  CreateDate: Date;
  Creator: string;
  DeleteBy: string;
  DeptName: string;
  Dept_Id: number;
  Enable: number;
  Modifier: string;
  ModifyDate: Date;
  OrderNo: number;
  ParentId: number;
  RoleName: string;
};

const columns: ProColumns<RoleItem>[] = [
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
    ellipsis: true,
    search: false,
  },

  {
    title: '是否启用',
    dataIndex: 'Enable',
    ellipsis: true,
    valueType: 'checkbox',
    valueEnum: {},
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
    search: false,
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
    search: false,
  },
];

const RoleManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showRoleAddModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <ProTable<RoleItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return request<{
            data: RoleItem[];
          }>('http:192.168.1.112:9991/role/getroles', {
            params,
          });
        }}
        columnsState={{
          persistenceKey: 'role-list-pro-table',
          persistenceType: 'sessionStorage',
          onChange(value) {
            console.log('columnsState value: ', value);
          },
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
          pageSize: 10,
          onChange: (page) => {
            console.log('change page', page);
          },
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
    </div>
  );
};

export default RoleManage;
