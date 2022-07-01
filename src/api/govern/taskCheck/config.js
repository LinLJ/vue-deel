import request from '@/utils/request';
import { param } from '@/utils/index';

export function getDetail(data) {
  return request({
    url: `/api/dlAuditJobInfo/findByDatasourceIdAndTableName?${param(data)}`,
    method: 'post'
  });
}

export function saveData(data) {
  return request({
    url: `/api/dlAuditJobInfo/insertOrUpdate`,
    method: 'post',
    data
  });
}

export function previewSql(data) {
  return request({
    url: `/api/dlAuditJobInfo/showSql`,
    method: 'post',
    data
  });
}
