import { PagingData, PagingQuery } from '@tdp/http';
import mock from 'mockjs';

const ID_PREFIX = 'TDP';

let seek = -1;

enum Status {
  SUCCESS = 'success',
  FAILURE = 'error'
}

export function getQueryString(url: string, key: string) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const r = url.split('?')[1].match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
}

/**
 * ### Example:
 * ```ts
 * const qs = buildQueryString(req.url);
 * const id = qs('id');
 * ```
 */
export const buildQueryString = (url: string) => (key: string) => getQueryString(url, key);

export function buildSuccess<T>(data: T, message = '操作成功'): MockHttpResponse<T> {
  return { message, code: 200, status: Status.SUCCESS, data };
}

export function buildFailure(error: any, message = '操作失败'): MockHttpResponse<any> {
  return { message, code: 200, status: Status.FAILURE, error };
}

export function buildFailure2(error: any, message = '操作失败'): MockHttpResponse<any> {
  return { message, code: 200, status: Status.FAILURE, data: error };
}

export function generateId() {
  return ID_PREFIX + ++seek;
}

export function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const Mock = mock;

export interface MockHttpRequest {
  url: string;
  type: string;
  body: string;
}

interface MockHttpResponse<T> {
  message: string;
  code: number;
  status: Status;
  data?: T;
  error?: any;
}

/**
 * 从 `allData` 中根据 `query` 查询数据
 *
 * @param stringFields 字符串类型的字段, 用于排序和模糊查询
 * @param compareableFields 数字类型的字段, 用于排序 */
export function mockDatasQuery<T>(
  allData: T[],
  query: PagingQuery,
  stringFields: (keyof T)[],
  compareableFields: (keyof T)[]
): PagingData<T> {
  const current = query.pageNum;
  const size = query.pageSize;
  const orders = query.orders;
  const filters = Object.entries(query.filters);

  let records = allData;

  // 筛选
  if (filters?.length) {
    records = records.filter((item) =>
      filters.every(([fk, fv]: [any, any]) =>
        stringFields.includes(fk) ? (item[fk as keyof T] as any as string).includes(fv) : item[fk as keyof T] === fv
      )
    );
  }

  // 排序
  if (orders?.length) {
    records.sort((a, b) => {
      for (let i = 0; i < orders.length; ++i) {
        const order = orders[i];
        const column = order.column as keyof T;
        let compared;
        if (compareableFields.includes(column)) {
          compared = (a[column] as any as number) > (b[column] as any as number) ? 1 : -1;
        } else if (stringFields.includes(column)) {
          compared = (a[column] as any as string).localeCompare(b[column] as any as string);
        } else {
          compared = 0;
        }

        if (compared) {
          return order.sorting === 'asc' ? compared : -compared;
        }
      }

      return 0;
    });
  }

  // 分页
  const total = records.length;
  records = records.slice((current - 1) * size, current * size);
  return { records: deepClone(records), total };
}
