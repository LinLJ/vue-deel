import { RouteConfig } from 'vue-router';

export const DEMO_ROUTES: RouteConfig[] = [
  {
    path: 'demo/antv6',
    component: () => import(/* webpackChunkName: "demo" */ './antv6/index.vue'),
    meta: {
      title: 'antv6',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/echart',
    component: () => import(/* webpackChunkName: "demo" */ './echart/index.vue'),
    meta: {
      title: 'echart',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/elementui',
    component: () => import(/* webpackChunkName: "demo" */ './elementui/index.vue'),
    meta: {
      title: 'elementui',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/jquery',
    component: () => import(/* webpackChunkName: "demo" */ './jquery/index.vue'),
    meta: {
      title: 'jquery',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/ts',
    component: () => import(/* webpackChunkName: "demo" */ './ts/index.vue'),
    meta: {
      title: 'ts',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/bigImg',
    component: () => import(/* webpackChunkName: "demo" */ './bigImg/index.vue'),
    meta: {
      title: 'bigImg',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/compositionapi',
    component: () => import(/* webpackChunkName: "demo" */ './compositionapi/index.vue'),
    meta: {
      title: 'compositionapi',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/axios',
    component: () => import(/* webpackChunkName: "demo" */ './axios/index.vue'),
    meta: {
      title: 'axios',
      // 忽略权限验证
      acl: false
    }
  },
  {
    path: 'demo/codemirror',
    component: () => import(/* webpackChunkName: "demo" */ './codemirror/index.vue'),
    meta: {
      title: 'codemirror',
      // 忽略权限验证
      acl: false
    }
  }
];

export const DEMO_MENUS = (() => {
  const menus = [];
  const demoMenu = {
    id: 'TJ_CRUD_DEMO',
    menuName: 'CRUD Demo',
    menuCode: 'CRUDDemo',
    menuIdentity: 'root',
    menuIcon: 'tag_faces',
    orderNo: 9999
  };
  menus.push(demoMenu);
  DEMO_ROUTES.forEach((route, i) => {
    const id = route.path.replace('/', '_').toUpperCase();
    menus.push({
      id: id,
      menuName: route.meta?.title,
      menuCode: id,
      parentId: demoMenu.id,
      menuLink: `/${route.path}`,
      linkType: 'ROUTE',
      menuIcon: 'tag_faces',
      orderNo: i
    });
  });
  return menus;
})();

export default DEMO_ROUTES;
