import request from '@/utils/request';

// 根据组织id获取系统列表
export function getListByOrganizationId(id) {
  return request({
    url: '/datasource/dlSystemInfo/list',
    method: 'get',
    params: { deptId: id }
  });
}
export function addSystem(data) {
  return request({
    url: '/datasource/dlSystemInfo/addOrUpdate',
    method: 'post',
    data
  });
}
export function page(data) {
  return request({
    url: '/datasource/dlSystemInfo/page',
    method: 'post',
    data
  });
}
export function deleteSystem(params) {
  return request({
    url: '/datasource/dlSystemInfo/remove',
    method: 'get',
    params
  });
}
// 绑定数据源
export function bind(data) {
  return request({
    url: '/datasource/dlSystemInfo/bind',
    method: 'post',
    data
  });
}
//解绑数据源
export function removeBind(params) {
  return request({
    url: '/datasource/dlSystemInfo/removeBind',
    method: 'get',
    params
  });
}