import { RouteConfig } from 'vue-router';

export const PROFILE_ROUTES: RouteConfig[] = [
  {
    name: 'profile',
    path: 'profile',
    component: () => import('./profile/profile.component.vue'),
    meta: {
      title: '个人信息',
      // 忽略此页路由权限验证
      acl: false
    }
  }
];

export default PROFILE_ROUTES;
