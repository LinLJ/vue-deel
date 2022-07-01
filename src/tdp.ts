import Vue from 'vue';
import Core from '@tdp/core';
import Acl from '@tdp/acl';
import Auth, { HttpTokenInterceptor } from '@tdp/auth';
import Http from '@tdp/http';
import Util from '@tdp/util';
import Common from '@tdp/common';
import Theme, { SettingsService } from '@tdp/theme';
import QuasarComponents from '@tdp/quasar-components/packages/index.js';
import { AppHttpResponseInterceptor, RouterAfterEachGuard, RouterBeforeEachGuard } from '@shared';
import router from '@router';
import CssVars from '@styles/index.scss';

// 基础模块
Vue.use(Core, {
  // 路由器实例
  router,
  // 全局路由守卫
  guards: {
    beforeEachs: [RouterBeforeEachGuard],
    afterEachs: [RouterAfterEachGuard]
  }
});

// 访问权限控制模块
Vue.use(Acl);

// 用户认证模块
Vue.use(Auth);

// HTTP 请求模块
Vue.use(Http, {
  // 配置, 同 `AxiosRequestConfig`
  requestConfig: {
    baseURL: './'
  },
  // 拦截器
  interceptors: {
    request: [HttpTokenInterceptor],
    response: [AppHttpResponseInterceptor]
  },
  // API 地址配置
  apiConfig: () => SettingsService.api
});

// 工具模块
Vue.use(Util);

// 主题模块
Vue.use(Theme, { cssVars: CssVars });

// 通用模块
Vue.use(Common);

// 表单设计器组件
Vue.use(QuasarComponents);
