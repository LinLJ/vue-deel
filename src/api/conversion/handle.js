import request from '@/utils/request';

export function getLevelList() {
  return request({
    url: '/api/dlLevelInfo/list',
    method: 'get'
  });
}
export function getThemeByLevelId(levelId) {
  return request({
    url: '/api/dlThemeInfo/getThemeByLevelId',
    method: 'get',
    params: {
      levelId
    }
  });
}

export function getTableByThemeId(themeId) {
  return request({
    url: '/api/dlTableInfo/getTableByThemeId',
    method: 'get',
    params: {
      themeId
    }
  });
}

export function getMetaData(data) {
  return request({
    url: '/kettle/taskJobinfo/metadata',
    method: 'post',
    data
  });
}

export function getTableColumns(tableId) {
  return request({
    url: '/api/dlColumnInfo/getColumnByTableId',
    method: 'get',
    params: { tableId }
  });
}

export function saveJobInfo(data) {
  return request({
    url: '/kettle/taskJobinfo/saveJobInfo',
    method: 'post',
    data
  });
}

export function getJobTemplates(data) {
  return request({
    url: '/kettle/taskJobinfo/jobTemplate/page',
    method: 'post',
    data
  });
}

export function getStepNames(data) {
  return request({
    url: `/kettle/taskJobinfo/getStepNames`,
    method: 'post',
    data
  });
}
