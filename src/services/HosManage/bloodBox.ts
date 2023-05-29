// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getBloodBoxList(
  params: Storage.requestItem,
  options?: { [key: string]: any },
) {
  return request<HosManage.BloodBoxItem>('/api/BloodBox/GetPageData', {
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function addFridge(params: HosManage.BloodBoxItem, options?: { [key: string]: any }) {
  return request<HosManage.BloodBoxItem>('/api/BloodBox/Add', {
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
