import request from '@/utils/request';
// 层级管理
// 获取全部层级
export function getLevelPage() {
  return request({
    url: '/api/dlLevelInfo/list',
    method: 'get'
  });
}

export function saveLevelInfo(data) {
  return request({
    url: '/api/dlLevelInfo/insertOrUpdate',
    method: 'post',
    data
  });
}

export function findLevelById(id) {
  return request({
    url: '/api/dlLevelInfo/findById',
    method: 'get',
    params: {
      id: id
    }
  });
}

export function delLevelInfo(params) {
  return request({
    url: '/api/dlLevelInfo/remove',
    method: 'get',
    params
  });
}

export function getDataSourceType(type, levelId, datasourceType) {
  return request({
    url: '/api/dlLevelInfo/getdatasourcebytype',
    method: 'get',
    params: {
      type: type,
      levelId: levelId,
      datasourceType: datasourceType
    }
  });
}

// 主题管理
export function getThemePage(data) {
  return request({
    url: '/api/dlThemeInfo/page',
    method: 'post',
    data
  });
}

export function getThemeByLevelId(id) {
  return request({
    url: '/api/dlThemeInfo/getThemeByLevelId',
    method: 'get',
    params: {
      levelId: id
    }
  });
}

export function saveThemeInfo(data) {
  return request({
    url: '/api/dlThemeInfo/insertOrUpdate',
    method: 'post',
    data
  });
}

export function findThemeById(params) {
  return request({
    url: '/api/dlThemeInfo/findById',
    method: 'get',
    params
  });
}

export function delThemeInfo(params) {
  return request({
    url: '/api/dlThemeInfo/remove',
    method: 'get',
    params
  });
}
export function batchRemoveTheme(data) {
  return request({
    url: '/api/dlThemeInfo/batchRemove',
    method: 'post',
    data
  });
}
// 数据模型管理
export function dataModelPage(data) {
  return request({
    url: '/model/getmodelpage',
    method: 'post',
    data
  });
}
export function add(data) {
  return request({
    url: '/model/add',
    method: 'post',
    data
  });
}
export function update(data) {
  return request({
    url: '/model/update',
    method: 'post',
    data
  });
}
export function deleteModel(id) {
  return request({
    url: '/model/del',
    method: 'get',
    params: { id: id }
  });
}
export function copy(params) {
  return request({
    url: '/model/copy',
    method: 'get',
    params: params
  });
}
export function getOne(id) {
  return request({
    url: '/model/getone',
    method: 'get',
    params: { id: id }
  });
}
export function getAllColumnByVersion(tableId, version) {
  return request({
    url: '/model/getcolumnbyversion',
    method: 'get',
    params: { tableId: tableId, version: version }
  });
}
export function getNamespaceByThemeId(themeId) {
  return request({
    url: '/api/dlNamingSpecInfo/getbythemeid',
    method: 'get',
    params: { themeId: themeId }
  });
}
