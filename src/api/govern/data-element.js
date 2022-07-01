import request from '@/utils/request';

// 数据治理-数据标准-数据元

// 获取数据元分类tree
export function getTree() {
  return request({
    url: '/api/dlMetaType/list',
    method: 'post'
  });
}
// 添加子分类
export function addChildTree(data) {
  return request({
    url: '/api/dlMetaType/insertOrUpdate',
    method: 'post',
    data
  });
}
// 删除
export function deleteTree(params) {
  return request({
    url: '/api/dlMetaType/remove',
    method: 'get',
    params
  });
}
//添加或更新数据元
export function addDataElement(data) {
  return request({
    url: '/api/dlMetaInfo/insertOrUpdate',
    method: 'post',
    data
  });
}
//删除数据元
export function deleteDataElement(params) {
  return request({
    url: '/api/dlMetaInfo/remove',
    method: 'get',
    params
  });
}
//数据元分页列表
export function dataElementPage(data) {
  return request({
    url: '/api/dlMetaInfo/page',
    method: 'post',
    data
  });
}
//获得详细byId
export function getMetaInfoById(params) {
  return request({
    url: '/api/dlMetaInfo/getone',
    method: 'get',
    params
  });
}
//删除标签以及数据元与标签关系
export function deleteMetaInfoLable(params) {
  return request({
    url: '/api/dlMetaInfo/removeMateInfoAndLable',
    method: 'get',
    params
  });
}