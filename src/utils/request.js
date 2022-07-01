import axios from 'axios';
import { MessageBox, Message, Notification } from 'element-ui';
import { getToken } from '@/utils/auth';
import { SettingsService } from '@tdp/theme';

const service = axios.create({
  // baseURL: '/',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    config.url = SettingsService.api.server + config.url;
    config.headers['Authorization'] = getToken();
    return config;
  },
  (error) => {
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  async (response) => {
    const res = response.data;
    const { config } = response;
    if (config?.responseType === 'blob') {
      return response;
    }
    if (res.message) {
      res.msg = res.message;
    } else if (res.msg) {
      res.message = res.msg;
    } else {
      let successMsg = '操作成功';
      let errorMsg = '未返回错误消息';
      if (res.code == 200) {
        if (res.status && res.status == 'success') {
          res.message = successMsg;
          res.msg = successMsg;
        }
      } else {
        res.message = errorMsg;
        res.msg = errorMsg;
      }
    }

    if (res.code !== 20000 && res.code !== 0 && res.code !== 200) {
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
        ).then(() => {
          location.reload();
        });
      } else if (res.code === 1001 || res.code === 500) {
        return res;
      }
      Message({
        message: response.data.message || response.data.msg || '未返回错误信息',
        type: 'error'
      });
      return Promise.reject(new Error(response.data.message || 'Error'));
    } else {
      const { data } = response;
      const { code } = data;
      // 状态码为0||200表示api成功
      if (code === 0) {
        const { data: res } = data;
        return res;
      } else if (code === 200) {
        return data;
      } else {
        // 返回数据
        return res;
      }
    }
  },
  (error) => {
    if (error.stack.includes('timeout')) {
      Notification({
        message: '操作超时',
        type: 'error'
      });
    } else if (error.response) {
      Notification({
        message: error.response.data.message || error.message,
        type: 'error'
      });
      if (error.response.status === 401) {
        window.location.replace(window.location.origin + '/#/login');
      } else return Promise.reject(error);
    }
  }
);

export default service;
