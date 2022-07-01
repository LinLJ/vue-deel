import request from '@/utils/request';

// 根据系统id获取系统列表
export function getListBySystemId(params) {
  return request({
    url: '/datasource/jobJdbcDatasource/getChildren',
    method: 'get',
    params
  });
}
export function getPage(data) {
  return request({
    url: '/datasource/jobJdbcDatasource/page',
    method: 'post',
    data
  });
}
export function addDatasource(data) {
  return request({
    url: '/datasource/jobJdbcDatasource/insert',
    method: 'post',
    data
  });
}
export function updateDatasource(data) {
  return request({
    url: '/datasource/jobJdbcDatasource/update',
    method: 'post',
    data
  });
}
// 测试数据源
export function testDatasource(data) {
  return request({
    url: '/datasource/jobJdbcDatasource/test',
    method: 'post',
    data
  });
}
export function deleteDatasource(params) {
  return request({
    url: '/datasource/jobJdbcDatasource/remove',
    method: 'get',
    params
  });
}
export function getDataSourceOne(id) {
  return request({
    url: '/datasource/jobJdbcDatasource/getOne',
    method: 'get',
    params:{id:id}
  });
}
