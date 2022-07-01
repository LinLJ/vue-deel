import request from '@/utils/request';

// 根据数据源id获取列表
export function getTableByDatasourceId(data) {
  return request({
    url: '/api/dlTableInfo/getTableByDatasourceId',
    method: 'post',
    data
  });
}

export function getjobProjectList(params) {
  return request({
    url: '/api/jobProject/list',
    method: 'get',
    params
  });
}

export function getsingleJson(data) {
  return request({
    url: '/api/dlTableInfoOperation/singleJson',
    method: 'post',
    data
  });
}
//单表接入-选择模板建任务
export function singleAccess(data) {
  return request({
    url: '/api/dlTableInfoOperation/singleAccess',
    method: 'post',
    data
  });
}
//一键接入-选择模板建任务
export function allAccess(data) {
  return request({
    url: '/api/dlTableInfoOperation/allAccess',
    method: 'post',
    data
  });
}
//批量接入-选择模板建任务
export function batchAccess(data) {
  return request({
    url: '/api/dlTableInfoOperation/batchAccess',
    method: 'post',
    data
  });
}