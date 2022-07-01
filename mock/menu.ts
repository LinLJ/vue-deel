import {
  buildFailure,
  buildFailure2,
  buildQueryString,
  buildSuccess,
  deepClone,
  generateId,
  getQueryString,
  Mock,
  MockHttpRequest
} from './mock';

interface IMockMenu {
  [key: string]: any;
  menuIdentity: 'app' | 'root';
  children?: Partial<IMockMenu>[];
}

const menus: IMockMenu[] = [
  {
    menuName: '用户信息',
    menuCode: 'userinfo',
    menuLink: '/org/user',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: '',
    parentId: 'TJ2886865cf34138015cf34d81470001',
    menuIdentity: 'app',
    orderNo: 0,
    id: 'TJb2f05a0779b142d09b54744c2a0065'
  },
  {
    menuName: '首页',
    menuCode: 'home',
    menuLink: '/',
    linkType: 'ROUTE',
    target: 'iframe',
    menuIcon: 'el-icon-apple',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 0,
    id: 'TJ7a3b7fd05ba046d19bd5536778955c'
  },
  {
    menuName: '菜单管理',
    menuCode: 'menuManage',
    menuLink: '/menu',
    linkType: 'ROUTE',
    target: '',
    menuIcon: '',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 1,
    id: 'TJ604d32ec2c494c198bd8ec231c7a3b'
  },
  {
    menuName: '字典管理',
    menuCode: 'dictionaryManager',
    menuLink: '',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-s-order',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 94,
    id: 'TJ2883ea4ef24d8f014ef24e111b0008'
  },
  {
    menuName: '角色管理',
    menuCode: 'roleManager',
    menuLink: '/authorize/role',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-user-solid',
    parentId: 'TJ2881155d073213015d074fbbd400ab',
    menuIdentity: 'app',
    orderNo: 1,
    id: 'TJ2881155d073213015d0752c26f00ac'
  },
  {
    menuName: '部门管理',
    menuCode: 'dept',
    menuLink: '/org/dept',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-coin',
    parentId: 'TJ2886865cf34138015cf34423460000',
    menuIdentity: 'app',
    orderNo: 1,
    id: 'TJ2886865cf34138015cf34f0aff0002'
  },
  {
    menuName: '登录注销',
    menuCode: 'SystemSysLogviewSign',
    menuLink: '/log/view/list/sign',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: '',
    parentId: 'TJ28868a5d116dd2015d1171afa30001',
    menuIdentity: 'app',
    orderNo: 1,
    id: 'TJ28868a5e7e6b1b015e7f07616b0068'
  },
  {
    menuName: '授权管理',
    menuCode: 'permiss',
    menuLink: '',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-cold-drink',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 2,
    id: 'TJ2881155d073213015d074fbbd400ab'
  },
  {
    menuName: '组织机构',
    menuCode: 'org',
    menuLink: '',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-food',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 2,
    id: 'TJ2886865cf34138015cf34423460000'
  },
  {
    menuName: '用户管理',
    menuCode: 'user',
    menuLink: '',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-user',
    parentId: 'TJ2886865cf34138015cf34423460000',
    menuIdentity: 'app',
    orderNo: 2,
    id: 'TJ2886865cf34138015cf34d81470001'
  },
  {
    menuName: '注销人员',
    menuCode: 'logoffuser',
    menuLink: '/org/user/logout',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: '',
    parentId: 'TJ2886865cf34138015cf34d81470001',
    menuIdentity: 'app',
    orderNo: 2,
    id: 'TJ2886895d12067c015d1238ede50038'
  },
  {
    menuName: '资源管理',
    menuCode: 'RESOURCE',
    menuLink: '/authorize/resource',
    linkType: 'ROUTE',
    target: 'iframe',
    menuIcon: 'el-icon-receiving',
    parentId: 'TJ2881155d073213015d074fbbd400ab',
    menuIdentity: 'app',
    orderNo: 2,
    id: 'TJ30c6573715f14f0ca60154f3eb102c'
  },
  {
    menuName: '数据范围',
    menuCode: 'dataScope',
    menuLink: '/authorize/data-scope',
    linkType: 'ROUTE',
    target: 'iframe',
    menuIcon: '',
    parentId: 'TJ2881155d073213015d074fbbd400ab',
    menuIdentity: 'app',
    orderNo: 2,
    id: 'TJa8fbe9253c95471dadf5c27943acb3'
  },
  {
    menuName: '群组管理',
    menuCode: 'group',
    menuLink: '/org/group',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-postcard',
    parentId: 'TJ2886865cf34138015cf34423460000',
    menuIdentity: 'app',
    orderNo: 3,
    id: 'TJ2886865cf6a406015cf6a891900000'
  },
  {
    menuName: '密码管理',
    menuCode: 'passwordManager',
    menuLink: '/org/user/password',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: '',
    parentId: 'TJ2886865cf34138015cf34d81470001',
    menuIdentity: 'app',
    orderNo: 3,
    id: 'TJ2886895d1657c2015d165cc0060000'
  },
  {
    menuName: '系统日志',
    menuCode: 'sysLogger',
    menuLink: '',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: 'el-icon-circle-plus-outline',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 3,
    id: 'TJ28868a5d116dd2015d1171afa30001'
  },
  {
    menuName: '参数配置',
    menuCode: 'paramConfig',
    menuLink: '/param/config',
    linkType: 'ROUTE',
    target: 'iframe',
    menuIcon: 'el-icon-s-operation',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 21,
    id: 'TJ55d163b25eb14881934de66d269185'
  },
  {
    menuName: '系统字典',
    menuCode: 'sysDictionary',
    menuLink: '/dict/system',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: '',
    parentId: 'TJ2883ea4ef24d8f014ef24e111b0008',
    menuIdentity: 'app',
    orderNo: 94,
    id: 'TJ28868f5d2b20b5015d2b5c6ac30000'
  },
  {
    menuName: '应用字典',
    menuCode: 'appDictionary',
    menuLink: '/dict/app',
    linkType: 'ROUTE',
    target: '',
    isPrivate: 0,
    menuIcon: '',
    parentId: 'TJ2883ea4ef24d8f014ef24e111b0008',
    menuIdentity: 'app',
    orderNo: 94,
    id: 'TJ28868f5d2b20b5015d2b6013430002'
  },
  {
    menuName: 'Demo',
    menuCode: 'demo',
    menuLink: '/crud',
    linkType: 'ROUTE',
    target: '',
    menuIcon: 'el-icon-s-operation',
    parentId: '',
    menuIdentity: 'root',
    orderNo: 34,
    id: 'TJ55d163b25eb14881934de66d269133'
  }
];

menus.forEach((element) => {
  element.menuIcon = 'o_home';
});

Mock.mock(/\/mock.system.menu.nav.list/, 'get', () =>
  buildSuccess(
    // mock 数据应手动打破双向绑定
    deepClone(menus)
  )
);
Mock.mock(/\/mock.system.menu.list/, 'get', () => buildSuccess(menus));
Mock.mock(/\/mock.system.menu.save/, 'post', controllerSaveMenu);
Mock.mock(/\/mock.system.menu.delete/, 'delete', controllerDeleteMenu);
Mock.mock(/\/mock.system.menu.code.check/, 'get', controllerCheckDuplicated('menuCode', '编码重复'));

function controllerSaveMenu(req: MockHttpRequest) {
  const menu = JSON.parse(req.body);
  if (menu.id) {
    delete menu.children;
    const foundIndex = menus.findIndex((item) => item.id === menu.id);
    if (foundIndex > -1) {
      Object.assign(menus[foundIndex], menu);
    }
  } else {
    menu.id = generateId();
    menus.push(menu);
  }

  // 后台只会返回 `id`
  return buildSuccess({ id: menu.id });
}

function controllerDeleteMenu(req: MockHttpRequest) {
  const id = getQueryString(req.url, 'id');
  if (!id) {
    return buildFailure('Not found id');
  }

  const foundIndex = menus.findIndex((item) => item.id === id);
  if (foundIndex > -1) {
    menus.splice(foundIndex, 1);
    return buildSuccess(id);
  }

  return buildFailure(`Can't found menu`);
}

function controllerCheckDuplicated(key: string, message: string) {
  return (req: MockHttpRequest) => {
    const qs = buildQueryString(req.url);
    const id = qs('id');
    const valueOfKey = qs(key);
    const dulicated = menus.find((menu) => menu.id !== id && menu[key] === valueOfKey);
    return dulicated ? buildFailure2('', message) : buildSuccess(null);
  };
}
