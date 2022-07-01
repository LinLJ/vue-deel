import request from '@/utils/request';

export function getPageList(data) {
  return request({
    url: `/api/dlAuditJobInfo/page`,
    method: 'post',
    data
  });
}

export function deleteJob(id) {
  return request({
    url: `/api/dlAuditJobInfo/remove?id=${id}`,
    method: 'get'
  });
}

export function batchDeleteJob(data) {
  return request({
    url: `/api/dlAuditJobInfo/batchRemove`,
    method: 'post',
    data
  });
}

export function getResultData(data) {
  return request({
    url: `/api/dlAuditJobInfo/outcomeInfo/page`,
    method: 'post',
    data
  });
}

