import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './quasar';
import './tdp';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery';
import jsPlumb from 'jsplumb';
import VueCompositionAPI from '@vue/composition-api';
// import waves from '@pages/datax/directive/waves/index.js';

import { preloader } from '@tdp/theme';
import { StartupService } from '@core';
// Vue.use(waves.install);

Vue.prototype.$jsPlumb = jsPlumb.jsPlumb;
Vue.use(VueCompositionAPI);
(window as any).jQuery = $;
(window as any).$ = $;
if (process.env.NODE_ENV !== 'production') {
  // 生产环境不导入 `Mock` 数据且不打包 `Mock` 相关文件
  require('@mock');
}
Vue.use(Element, {
  size: 'medium' // set element-ui default size
});
Vue.config.productionTip = false;

// 预加载完成
preloader();

// 程序启动过程
StartupService.bootstrap().then(() => {
  // app启动
  (window as any).appBootstrap();

  new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount('#app');
});
