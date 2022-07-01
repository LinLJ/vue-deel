# 核心模块

> 用于提供启动服务及其它可在 `Vue` 应用创建前执行的事件, 如 `License` 验证或系统初始化验证等

## 启动服务
获取 `web` 端配置信息, 

(待定) `License` 验证 & 系统初始化验证

```ts
import { StartupService } from '@core';

StartupService.bootstrap().then(() => {
  new Vue({
    ...
  })
});

```