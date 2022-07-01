import { PagingQuery } from '@tdp/http';
import {
  Mock,
  buildSuccess,
  MockHttpRequest,
  generateId,
  getQueryString,
  buildQueryString,
  buildFailure,
  mockDatasQuery,
  deepClone
} from './mock';

interface IMockParamConfig {
  id: string;
  configName: string;
  configKey: string;
  configValue: string;
  configType: number;
  status: number;
  [key: string]: any;
}

const paramConfigs: IMockParamConfig[] = [];
for (let i = 0; i < 125; i++) {
  paramConfigs.push({
    id: generateId(),
    configName: '参数' + i,
    configKey: 'key' + i,
    configValue: 'value' + i,
    configType: Mock.Random.integer(0, 1),
    status: Mock.Random.integer(0, 1),
    remark: Mock.Random.cparagraph(1, 3),
    createdTime: Mock.Random.datetime()
  });
}

// Routes
Mock.mock(/\/mock.system.config.page/, 'post', controllerConfigPage);
Mock.mock(/\/mock.system.config.info/, 'get', controllerConfigInfo);
Mock.mock(/\/mock.system.config.save/, 'post', controllerConfigSave);
Mock.mock(/\/mock.system.config.delete/, 'delete', controllerConfigDelete);
Mock.mock(/\/mock.system.config.refresh/, 'post', controllerConfigRefresh);
Mock.mock(/\/mock.system.config.active/, 'get', controllerConfigActive);
Mock.mock(/\/mock.system.config.key.check/, 'get', controllerConfigKeyCheck);

function controllerConfigPage(req: MockHttpRequest) {
  const query = JSON.parse(req.body) as PagingQuery;
  const stringFields = ['configName', 'configKey', 'createdTime'];
  const result = mockDatasQuery<IMockParamConfig>(paramConfigs, query, stringFields, []);
  return buildSuccess(result);
}

function controllerConfigInfo(req: MockHttpRequest) {
  const id = getQueryString(req.url, 'id');
  const data = paramConfigs.find((item) => item.id === id);
  return data ? buildSuccess(deepClone(data)) : buildFailure(null, 'Not Found');
}

function controllerConfigSave(req: MockHttpRequest) {
  const config = JSON.parse(req.body);
  if (config.id) {
    const item = paramConfigs.find((w) => w.id === config.id);
    Object.assign(item, config);
  } else {
    config.id = generateId();
    config.createdTime = Mock.Random.now('second');
    paramConfigs.push(config);
  }
  return buildSuccess({ id: config.id });
}

function controllerConfigDelete(req: MockHttpRequest) {
  const ids = getQueryString(req.url, 'ids');
  if (ids) {
    ids.split(';').forEach((id) => {
      const foundIndex = paramConfigs.findIndex((pc) => pc.id === id);
      if (foundIndex > -1) {
        paramConfigs.splice(foundIndex, 1);
      }
    });
  }
  return buildSuccess(null);
}

function controllerConfigRefresh() {
  return buildSuccess(null);
}

function controllerConfigActive(req: MockHttpRequest) {
  const qs = buildQueryString(req.url);
  const id = qs('ids');
  const active = qs('active')!;

  const found = paramConfigs.find((pc) => pc.id === id);
  if (found) {
    found.status = Number.parseInt(active, 10);
  }
  return buildSuccess(null);
}

function controllerConfigKeyCheck(req: MockHttpRequest) {
  const qs = buildQueryString(req.url);
  const id = qs('id');
  const configKey = qs('configKey');

  const hasConfigKey = !!paramConfigs.find((pc) => pc.id !== id && pc.configKey === configKey);
  return hasConfigKey ? buildFailure('', '已存在') : buildSuccess(null);
}
