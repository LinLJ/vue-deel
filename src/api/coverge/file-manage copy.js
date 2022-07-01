import request from '@/utils/request';

export function getPage(data) {
  return request({
    url: '/dlDocumentManagement/page',
    method: 'post',
    data
  });
}
export function getDlFileResolveLogPage(data) {
  return request({
    url: '/dlFileResolveLog/page',
    method: 'post',
    data
  });
}
export function uploadDlDocument(data) {
  return request({
    url: '/dlDocumentManagement/upload',
    method: 'post',
    data
  });
}
export function addOrUpdate(data) {
  return request({
    url: '/dlDocumentManagement/insertOrUpdate',
    method: 'post',
    data
  });
}
export function batchRemove(data) {
  return request({
    url: '/dlDocumentManagement/batchRemove',
    method: 'post',
    data
  });
}
export function parse(data) {
  return request({
    url: '/dlFileResolveLog/resolveFile',
    method: 'post',
    data
  });
}
export function downloadProblemDataFile(id) {
  return request({
    url: `/dlFileResolveLog/downloadProblemDataFile?id=${id}`,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
}
export function downloadFile(id) {
  return request({
    url: `/dlDocumentManagement/download?id=${id}`,
    method: 'post',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
}
export function downloadTemplate() {
  return request({
    url: `/dlFileResolveLog/downloadTemplate`,
    method: 'get',
    responseType: 'blob',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  });
}
export function getOne(id) {
  return request({
    url: `/dlDocumentManagement/findByid?id=${id}`,
    method: 'get'
  });
}
export function remove(id) {
  return request({
    url: `/dlDocumentManagement/remove?id=${id}`,
    method: 'get'
  });
}
