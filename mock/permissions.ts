import { buildSuccess, Mock } from './mock';

const permissions = {
  roles: ['SYSTEM_ADMINISTRATOR'],
  resources: {
    role: ['userList', 'delete', 'create', 'withSetup', 'list', 'info', 'save', 'authorizing', 'deleteUser'],
    manager: ['application', 'administrator'],
    resource: [
      'info',
      'create',
      'deleteAuthority',
      'editor',
      'deleteGroup',
      'editorGroup',
      'delete',
      'createAuthority',
      'saveAuthority',
      'save',
      'saveGroup',
      'page',
      'createGroup',
      'editorAuthority',
      'authorityGroup'
    ],
    dept: ['editor', 'moveup', 'create', 'delete', 'list', 'info', 'movedown', 'save'],
    company: ['editor', 'create', 'delete', 'list', 'info', 'save'],
    dataScope: ['create', 'save', 'delete'],
    menu: ['save', 'info', 'create', 'editor', 'delete', 'visit'],
    task: [
      'logInfo',
      'logList',
      'delete',
      'triggerinfo',
      'editor',
      'create',
      'save',
      'editorTrigger',
      'jobList',
      'saveTrigger',
      'createTrigger',
      'runningList',
      'triggerList',
      'jobInfo',
      'deleteTrigger',
      'deleteTaskLog'
    ],
    application: ['save', 'delete', 'createGroup', 'saveGroup', 'editorGroup', 'deleteGroup', 'create', 'editor'],
    param: ['delete', 'refresh', 'editor', 'save', 'create'],
    systemlog: ['loginList', 'delete'],
    dict: ['save', 'delete', 'create', 'list', 'info', 'editor'],
    user: [
      'resetPassword',
      'passwordList',
      'deletePassword',
      'save',
      'editor',
      'passwordInfo',
      'logoff',
      'list',
      'delete',
      'move',
      'create',
      'movelogoff',
      'info'
    ],
    group: ['list', 'userList', 'save', 'create', 'delete', 'info', 'editor', 'addUser', 'deleteUser'],
    module: ['create', 'save', 'editor', 'delete']
  }
};

Mock.mock(/\/mock\/system\/user\/permissions/, 'get', () => {
  console.log('mock permissions:', permissions);
  return buildSuccess(permissions);
});
