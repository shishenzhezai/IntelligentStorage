// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getUserList(params: SysManage.requestItem, options?: { [key: string]: any }) {
  return request<SysManage.PageData>('/api/User/GetPageData', {
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
