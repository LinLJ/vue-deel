import { RouterBeforeGuard, RouterAfterGuard } from '@tdp/core';
import { Route } from 'vue-router';

/**
 * 全局路由守卫 - 前置守卫
 */
export class RouterBeforeEachGuard implements RouterBeforeGuard {
  handle(to: Route, from: Route) {
    // TODO
    return;
  }
}

/**
 * 全局路由守卫 - 后置守卫
 */
export class RouterAfterEachGuard implements RouterAfterGuard {
  handle(to: Route, from: Route) {
    // TODO
  }
}
