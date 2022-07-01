import request from '@/utils/request';
// 标准参考文件
export function getStandardReferenceDocPage(data) {
  return request({
    url: '/api/dlStandardReferenceDocument/page',
    method: 'post',
    data
  });
}

export function saveStandardReferenceDocInfo(data) {
  return request({
    url: '/api/dlStandardReferenceDocument/insertOrUpdate',
    method: 'post',
    data
  });
}

export function findStandardReferenceDocById(params) {
  return request({
    url: '/api/dlStandardReferenceDocument/findByid',
    method: 'get',
    params
  });
}

export function uploadStandardReferenceDoc(data) {
  return request({
    url: '/api/dlStandardReferenceDocument/upload',
    method: 'post',
    data
  });
}

export function removeInfo(params) {
  return request({
    url: '/api/dlStandardReferenceDocument/remove',
    method: 'get',
    params
  });
}
// 命名规范管理
export function getNamingSpecPage(data) {
  return request({
    url: '/api/dlNamingSpecInfo/page',
    method: 'post',
    data
  });
}

export function saveNamingSpecInfo(data) {
  return request({
    url: '/api/dlNamingSpecInfo/insertOrUpdate',
    method: 'post',
    data
  });
}

export function findNamingSpecById(params) {
  return request({
    url: '/api/dlNamingSpecInfo/findByid',
    method: 'get',
    params
  });
}

export function removeNamingSpec(params) {
  return request({
    url: '/api/dlNamingSpecInfo/remove',
    method: 'get',
    params
  });
}
//获取未选择过的主题
export function getThemeByLevelId(levelId) {
  return request({
    url: '/api/dlThemeInfo/getThemeByWithDlNamingSpecInfo',
    method: 'get',
    params: {
      levelId
    }
  });
}
// 码表
export function getCodeTablePage(data) {
  return request({
    url: '/api/dlCodeTablesInfo/page',
    method: 'post',
    data
  });
}

export function saveCodeTableInfo(data) {
  return request({
    url: '/api/dlCodeTablesInfo/insertOrUpdate',
    method: 'post',
    data
  });
}

export function findCodeTableById(params) {
  return request({
    url: '/api/dlCodeTablesInfo/findByid',
    method: 'get',
    params
  });
}

export function removeCodeTable(params) {
  return request({
    url: '/api/dlCodeTablesInfo/remove',
    method: 'get',
    params
  });
}

export function batchRemoveCodeTable(data) {
  return request({
    url: '/api/dlCodeTablesInfo/batchRemove',
    method: 'post',
    data
  });
}
//根据代码ID获得代码值列表
export function getCodeValueTable(params) {
  return request({
    url: '/api/dlCodeTablesInfo/codevalue/getbycodeid',
    method: 'get',
    params
  });
}
//添加或修改码表值
export function saveCodeValue(data) {
  return request({
    url: '/api/dlCodeTablesInfo/codevalue/addorupdate',
    method: 'post',
    data
  });
}
//根据ID批量删除码表值
export function batchRomoveCodeValue(data) {
  return request({
    url: '/api/dlCodeTablesInfo/codevalue/del',
    method: 'post',
    data
  });
}