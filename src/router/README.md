# 路由

工程中的业务路由模块默认入口目录为 `src/pages`, 各路由模块按规则提供的对应路由文件将默认添加到应用路由中

- `HAPPY_ROUTES`: 一级路由数组对象
- `DEF_LAYOUT_CHILD_ROUTES`: 默认布局子路由数组对象

## 一级路由

在路由模块下添加 `routing.(ts|js)` 文件, 并在文件中默认导出该模块路由配置数据, 一级路由中的 `path` 需以 `/` 开头, 此路由配置将被默认添加在数组对象 `HAPPY_ROUTES` 中

示例:

```ts
export default [
  {
    path: '/test-full1',
    name: 'test-full1',
    component: () => import(/* webpackChunkName: "test-full" */ './component/test-full1.component.vue'),
    meta: {
      title: '测试页面1'
    }
  },
  {
    path: '/test-full2',
    name: 'test-full2',
    component: () => import(/* webpackChunkName: "test-full" */ './component/test-full2.component.vue'),
    meta: {
      title: '测试页面1'
    }
  }
];
```

## 默认布局子路由

在路由模块下添加 `child-routing.(ts|js)` 文件, 并在文件中默认导出该模块路由配置数据, 此路由配置将被默认添加在数组对象 `DEF_LAYOUT_CHILD_ROUTES` 中

示例:

```ts
export default [
  {
    path: 'test-child1',
    name: 'test-child1',
    component: () => import(/* webpackChunkName: "test-child" */ './component/child1.component.vue'),
    meta: {
      title: '测试子页面1'
    }
  },
  {
    path: 'test-child2',
    name: 'test-child2',
    component: () => import(/* webpackChunkName: "test-child" */ './component/child2.component.vue'),
    meta: {
      title: '测试子页面2'
    }
  }
];
```

## 外部路由模块

`TDP` 系统管理等业务路由模块将以外部 `lib` 包的形式添加, 在 `package.json` 中添加相关路由模块包的依赖配置后, 需在当前目录下的 `routing.ts` 文件中进行路由注册

> `TDP` 提供的系统管理相关业务路由模块中都是子页面, 需要放在页面容器组件之下

示例:

`package.json`

```json
{
  ...
  "dependencies": {
    "@tdp/system-menu": "^1.0.0",
    "@tdp/system-fake": "^1.0.0"
  },
  ...
}
```

`src/router/routing.ts`

```ts
// 添加 [菜单管理] 模块到默认布局子路由中
CHILD_ROUTES.push(require('@tdp/system-menu').default);

// 添加 [测试页面] 模块到一级路由中 - PS: Fake, 实际中并没有此包, 仅做演示说明
HAPPY_ROUTES.push(require('@tdp/system-fake').default);
```

## 其它

路由模块下如未提供 `routing.(ts|js)` 和 `child-routing.(ts|js)` 文件, 则该模块的路由注册应按实际需求自行处理, 如 `src/pages/demo` 模块, 其路由配置在模块下的 `index.ts` 中导出, 为了生产环境不添加此模块, 在 `src/router/index.ts` 中按条件决定是否添加到 `DEF_LAYOUT_CHILD_ROUTES` 中
