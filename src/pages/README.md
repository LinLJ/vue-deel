# 路由模块

路由配置中建议以异步方式导入业务路由页面, 为了更好的打包异步 `chunk`, 建议按模块提供 `webpackChunkName`, 复杂或模块中页面较多的情况可按业务划分适当配置多个 `webpackChunkName` 合理化合并/拆分打包后的文件, 如希望模块下的每个页面打包后都是一个独立的 `chunk` 文件则无需配置 `webpackChunkName`

每个**路由模块**应保持除路由配置信息外不向外导出任何资源, **路由模块中禁止引用其它路由模块中的资源**, 如果有多个路由模块可复用的组件/模型/服务等应提取到一个非路由模块中, 由该模块向外导出提供给多各个路由模块引用, 默认可放在共享模块 **`shared`** 中

## 模块文件结构推荐

```
src
└── pages
    ├── test                                      // 业务模块
    |   ├── component                             // 模块页面
    |   |   ├── page1                             // 页面1
    |   |   |   ├── form                          // 页面1中的表单
    |   |   |   |   ├── form.component.scss
    |   |   |   |   ├── form.component.ts
    |   |   |   |   └── form.component.vue
    |   |   |   ├── list                          // 页面1中的列表
    |   |   |   |   ├── list.component.scss
    |   |   |   |   ├── list.component.ts
    |   |   |   |   └── list.component.vue
    |   |   |   ├── page1.component.scss          // 页面1入口组件样式
    |   |   |   ├── page1.component.ts            // 页面1入口组件脚本
    |   |   |   └── page1.component.vue           // 页面1入口组件模板
    |   |   |
    |   |   ├── page2                             // 页面2
    |   |   |   ├── form                          // 页面2中的表单
    |   |   |   |   ├── form.component.scss
    |   |   |   |   ├── form.component.ts
    |   |   |   |   └── form.component.vue
    |   |   |   ├── tree                          // 页面2中的树
    |   |   |   |   ├── tree.component.scss
    |   |   |   |   ├── tree.component.ts
    |   |   |   |   └── tree.component.vue
    |   |   |   ├── page2.component.scss          // 页面2入口组件样式
    |   |   |   ├── page2.component.ts            // 页面2入口组件脚本
    |   |   |   └── page2.component.vue           // 页面2入口组件模板
    |   |   |
    |   |   └── *                                 // 其它页面
    |   |
    |   ├── model                                 // 模块模型
    |   |   ├── acl.ts                            // 模块资源权限定义: 可按不同业务/页面再次拆分
    |   |   ├── api.ts                            // 模块 API 地址: 可按不同业务/页面再次拆分
    |   |   ├── test.ts                           // 模块数据模型: 可按不同业务/页面再次拆分
    |   |   └── index.ts                          // 当前目录资源统一导出文件
    |   |
    |   ├── service                               // 模块服务
    |   |   ├── test.service.ts                   // 服务类: 可按不同业务/页面再次拆分
    |   |   └── index.ts                          // 当前目录资源统一导出文件
    |   |
    |   └── (routing | child-routing).ts          // 模块路由
    |
    └── *                                         // 其它模块
```

如果路由模块中无需定义模型与服务可精简目录层级, 参考 `account` 或 `exception` 模块
