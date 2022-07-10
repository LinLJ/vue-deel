import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { TDPIFrameComponent } from '@tdp/common';
import { ACLGuard } from '@tdp/acl';
import { TokenGuard } from '@tdp/auth';
import { LayoutComponent } from '@layout';
import { HAPPY_ROUTES, DEF_LAYOUT_CHILD_ROUTES, DEF_LAYOUT_ROUTE_NAME } from './route';
import './routing';
import HomeComponent from '@pages/home/home.component.vue';

Vue.use(VueRouter);

// 添加一级路由页面
const addToFirstRoutes = (...routes: Array<RouteConfig[]>) => {
  HAPPY_ROUTES.splice(0, 0, routes.flat());
  return HAPPY_ROUTES.flat();
};

// 添加默认布局子路由
const addToChildRoutes = (...routes: Array<RouteConfig[]>) => {
  DEF_LAYOUT_CHILD_ROUTES.splice(0, 0, routes.flat());
  // if (process.env.NODE_ENV === 'development') {
  //   // 生产环境不添加 `demo` 模块路由且不打包其模块文件
  DEF_LAYOUT_CHILD_ROUTES.push(require('@pages/demo').default);
  // }
  return DEF_LAYOUT_CHILD_ROUTES.flat();
};

const ALL_ROUTES = addToFirstRoutes([
  {
    path: '/',
    name: DEF_LAYOUT_ROUTE_NAME,
    component: LayoutComponent,
    meta: {
      canActivate: [TokenGuard],
      canActivateChild: [ACLGuard]
    },
    children: addToChildRoutes([
      {
        path: '',
        name: 'home',
        component: HomeComponent,
        meta: {
          title: '首页',
          // 忽略此页路由权限验证
          acl: false
        }
      }
    ])
  }
] as RouteConfig[]) as RouteConfig[];

/** 路由器实例 */
const router = new VueRouter({
  routes: ALL_ROUTES,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 };
  }
});

// IFrame 导航路由, 请保持此路由 (:menuId) 位于布局路由 `children` 的最后一项
const IFRAME_ROUTE = { path: 'ipage/:menuId', props: true, component: TDPIFrameComponent };
router.addRoute(DEF_LAYOUT_ROUTE_NAME, IFRAME_ROUTE);

// 通配符路由, 请保持此路由最后添加
const ASTERISK_ROUTE: RouteConfig = { path: '*', redirect: '/404' };
router.addRoute(ASTERISK_ROUTE);

export default router;
