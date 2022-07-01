import request from '@/utils/request';

// 数据治理-数据标准-数据元

// 获取机构分类tree
export function getTree() {
  return request({
    url: '/datasource/dlOrganizationInfo/list',
    method: 'get'
  });
}

export function addAndUpdate(data) {
  return request({
    url: `/datasource/dlOrganizationInfo/addOrUpdate`,
    method: 'POST',
    data
  });
}
export function getPage(data) {
  return request({
    url: `/datasource/dlOrganizationInfo/page`,
    method: 'post',
    data
  });
}
export function remove(id = '') {
  return request({
    url: `/datasource/dlOrganizationInfo/remove`,
    method: 'get',
    params: {
      id: id
    }
  });
}
