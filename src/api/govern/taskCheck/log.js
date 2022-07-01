import request from '@/utils/request';

export function getPageList(data) {
  return request({
    url: `/api/dlAuditJobInfo/log/page`,
    method: 'post',
    data
  });
}