// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getFridgeList(params: Storage.requestItem, options?: { [key: string]: any }) {
  return request<HosManage.BloodFridgeItem>('/api/BloodFridge/GetPageData', {
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function addFridge(
  params: HosManage.BloodFridgeItem,
  options?: { [key: string]: any },
) {
  return request<HosManage.BloodFridgeItem>('/api/BloodFridge/Add', {
    method: 'post',
    data: params,
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}
