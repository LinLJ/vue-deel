import { DEF_LAYOUT_CHILD_ROUTES as CHILD_ROUTES } from './route';

// 由脚手架安装业务模块时写入
CHILD_ROUTES.push(require('@tdp/system-module').default);
CHILD_ROUTES.push(require('@tdp/system-menu').default);
CHILD_ROUTES.push(require('@tdp/system-param-config').default);
CHILD_ROUTES.push(require('@tdp/system-dict').default);
CHILD_ROUTES.push(require('@tdp/system-org').default);
CHILD_ROUTES.push(require('@tdp/system-authorize').default);
CHILD_ROUTES.push(require('@tdp/system-log').default);
