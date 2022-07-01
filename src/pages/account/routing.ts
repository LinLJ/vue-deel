import { RouteConfig } from 'vue-router';

export const ACCOUNT_ROUTES: RouteConfig[] = [
  {
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "account" */ './login/login.component.vue'),
    meta: {
      title: '用户登录'
    }
  }
  // {
  //   name: 'register',
  //   path: '/register',
  //   component: () => import(/* webpackChunkName: "account" */ './register/register.component.vue'),
  //   meta: {
  //     title: '用户注册'
  //   }
  // },
  // {
  //   name: 'forgot',
  //   path: '/forgot',
  //   component: () => import(/* webpackChunkName: "account" */ './forgot/forgot.component.vue'),
  //   meta: {
  //     title: '忘记密码'
  //   }
  // }
];

export default ACCOUNT_ROUTES;
