import request from '@/utils/request';

export function getJobPage(data) {
  return request({
    url: '/datamodel/getjoblist',
    method: 'post',
    data
  });
}
export function addJob(data) {
  return request({
    url: '/datamodel/addjob',
    method: 'post',
    data
  });
}
export function getOne(id) {
  return request({
    url: '/datamodel/getone',
    method: 'get',
    params: { id: id }
  });
}
export function updateJob(data) {
  return request({
    url: '/datamodel/update',
    method: 'post',
    data
  });
}
// 日志相关

export function logDetail(id) {
  return request({
    url: '/datamodel/logDetail',
    method: 'get',
    params: { jobLogId: id }
  });
}

// 探查任务相关
export function getAllTable(id) {
  return request({
    url: '/datamodel/getalltable',
    method: 'get',
    params: { datasourceId: id }
  });
}
export function getExplorationTable(id) {
  return request({
    url: '/datamodel/getexplorationtable',
    method: 'get',
    params: { levelId: id }
  });
}
// 获取指定的三种层级
export function getlevellist(id) {
  return request({
    url: '/datamodel/getlevellist',
    method: 'get',
    params: { levelId: id }
  });
}
// delete
export function deletedatamodel(id) {
  return request({
    url: '/datamodel/del',
    method: 'get',
    params: { jobId: id }
  });
}
/**
 * 日志相关
 */
export function logPage(data) {
  return request({
    url: '/datamodel/logpage',
    method: 'post',
    data
  });
}
export function gettableinfo(data) {
  return request({
    url: '/datamodel/gettableinfo',
    method: 'post',
    data
  });
}
