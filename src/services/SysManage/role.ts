// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getRoleList(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<SysManage.RoleItem>('/api/login/captcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
