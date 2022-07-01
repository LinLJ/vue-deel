declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.scss';

declare module 'es6-proxy-polyfill';

declare interface Window {
  isPolyfillProxy: boolean;
}

// 表单设计器组件
declare module '@tdp/quasar-components/packages/index.js';
