import { RouteConfig } from 'vue-router';

/** 默认布局路由名称 */
export const DEF_LAYOUT_ROUTE_NAME = 'layout';

/** 默认布局子路由 */
export const DEF_LAYOUT_CHILD_ROUTES = [] as Array<RouteConfig | RouteConfig[]>;

/** 一级路由 */
export const HAPPY_ROUTES = [] as Array<RouteConfig | RouteConfig[]>;

// 一级路由文件名称匹配规则
const ROUTING_FILENAME = /\/routing(\.ts|\.js)$/;

// 默认布局子路由文件名称匹配规则
const CHILD_ROUTING_FILENAME = /\/child-routing(\.ts|\.js)$/;

const requireRouting = require.context(
  // 路由模块目录的相对路径
  '../pages',
  // 是否查询其子目录
  true,
  // 路由文件名的匹配规则
  /\/(child-){0,1}routing(\.ts|\.js)$/
);

// 添加匹配到的路由模块
requireRouting.keys().forEach((fileName) => {
  // 获取路由配置
  const config = requireRouting(fileName);

  if (!config.default) {
    return;
  }

  if (ROUTING_FILENAME.test(fileName)) {
    HAPPY_ROUTES.push(config.default);
  } else if (CHILD_ROUTING_FILENAME.test(fileName)) {
    DEF_LAYOUT_CHILD_ROUTES.push(config.default);
  }
});
