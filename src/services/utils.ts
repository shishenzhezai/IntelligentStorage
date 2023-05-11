import { ParamsType, ProColumns } from '@ant-design/pro-components';
import moment from 'moment';

export const storage = {
  get: (name: string) => {
    return localStorage.getItem(name);
  },
  set: ({ name, data }: { name: string; data: string }) => {
    localStorage.setItem(name, data);
  },
  clearItem: (name: string) => {
    localStorage.removeItem(name);
  },
  clear: () => {
    localStorage.clear();
  },
};

export const formatTime = (time: string) => {
  return moment(time).format('YYYY-MM-DD HH:mm:ss');
};

const isEmptyValue = (value: any) => {
  if (typeof value === 'string' && value.trim() === '') {
    return true;
  }
  if (value instanceof Array && !value.length) {
    return true;
  }
  return value === null || value === undefined || value === '';
};

export const getSearchParameters = <T>(
  params: ParamsType & {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  },
  columns: ProColumns<T>[],
): Utils.FieldData[] => {
  let wheres: Utils.FieldData[] = [];
  const { ...rest } = params;
  Object.entries(rest).map(([name, value]) => {
    const fieldInstance = columns.find((col) => col.dataIndex === name && col.search !== false);
    const fieldType = fieldInstance?.valueType;
    if (fieldType === 'dateRange') {
      for (let i = 0; i < value.length; i++) {
        if (!isEmptyValue(value[i])) {
          wheres.push({
            name: name,
            value: (value[i] + '').trim(),
            displayType: (() => {
              if (['dateRange', 'datetime', 'range'].indexOf(fieldType) !== -1) {
                return i ? 'lessorequal' : 'thanorequal';
              }
              return fieldType;
            })(),
          });
        }
      }
    } else if (fieldType === 'text') {
      if (!isEmptyValue(value)) {
        wheres.push({
          name: name,
          value: (value + '').trim(),
          displayType: 'like',
        });
      }
    }
    return null;
  });

  // for (const key in form.current?.getFieldsValue(true)) {
  //   console.log(key);
  //   let value = form.current?.getFieldValue(key);
  //   //   if (this.emptyValue(value)) continue;

  //   // if (typeof value == 'number') {
  //   //   value = value + '';
  //   // }
  //   let displayType = form.current?.getFieldInstance('UserName');

  //   //   //联级只保留选中节点的最后一个值
  //   //   if (displayType == 'cascader') {
  //   //     //查询下面所有的子节点，如：选中的是父节点，应该查询下面所有的节点数据--待完
  //   //     value = value.length ? value[value.length - 1] + '' : '';
  //   //   }
  //   //   //2021.05.02增加区间查询
  //   if (typeof value == 'string' || ['date', 'datetime', 'range'].indexOf(displayType) == -1) {
  //     query.wheres.push({
  //       name: key,
  //       value: typeof value == 'string' ? (value + '').trim() : value.join(','),
  //       displayType: displayType,
  //     });
  //     continue;
  //   }
  //   for (let index = 0; index < value.length; index++) {
  //     if (!this.emptyValue(value[index])) {
  //       query.wheres.push({
  //         name: key,
  //         value: (value[index] + '').trim(),
  //         displayType: (() => {
  //           if (['date', 'datetime', 'range'].indexOf(displayType) != -1) {
  //             return index ? 'lessorequal' : 'thanorequal';
  //           }
  //           return displayType;
  //         })(),
  //       });
  //     }
  //   }
  // }
  return wheres;
};
