// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getRoleList(params: SysManage.requestItem, options?: { [key: string]: any }) {
  return request<SysManage.PageData>('/api/role/GetPageData', {
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
