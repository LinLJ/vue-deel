import request from '@/utils/request';

export function getSpecificationPage(data) {
  return request({
    url: '/api/dlSpecificationInfo/page',
    method: 'post',
    data
  });
}

export function saveSpecificationInfo(data) {
  return request({
    url: '/api/dlSpecificationInfo/insertOrUpdate',
    method: 'post',
    data
  });
}

export function findSpecificationById(params) {
  return request({
    url: '/api/dlSpecificationInfo/findById',
    method: 'get',
    params
  });
}

export function removeInfo(params) {
  return request({
    url: '/api/dlSpecificationInfo/remove',
    method: 'get',
    params
  });
}

export function batchRemoveInfo(data) {
  return request({
    url: '/api/dlSpecificationInfo/batchRemove',
    method: 'post',
    data
  });
}