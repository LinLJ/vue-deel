import { RouteConfig } from 'vue-router';

export const EXCEPTION_ROUTES: RouteConfig[] = [
  {
    name: '403',
    path: '/403',
    component: () => import(/* webpackChunkName: "exception" */ './403.component.vue'),
    meta: {
      title: '403'
    }
  },
  {
    name: '404',
    path: '/404',
    component: () => import(/* webpackChunkName: "exception" */ './404.component.vue'),
    meta: {
      title: '404'
    }
  },
  {
    name: '500',
    path: '/500',
    component: () => import(/* webpackChunkName: "exception" */ './500.component.vue'),
    meta: {
      title: '500'
    }
  }
];

export default EXCEPTION_ROUTES;
