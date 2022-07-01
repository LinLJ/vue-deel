import {
  buildFailure,
  buildSuccess,
  deepClone,
  generateId,
  getQueryString,
  Mock,
  mockDatasQuery,
  MockHttpRequest
} from './mock';

const demos = new Array(134).fill(null).map((_, i) => {
  const demo = {
    id: 'id_' + i,
    demoName: 'name_' + i,
    field1: `f1_${i}`,
    field2: `f2_${i}`,
    field3: `13:23:30`,
    field4: `f4_${i}`,
    field5: `f5_${i}`,
    field6: 1,
    field7: Mock.Random.integer(-100, 100)
  };
  return demo;
});

Mock.mock(/\/mock.system.demo.page/, 'post', controllerDemoList);
Mock.mock(/\/mock.system.demo.info/, 'get', controllerDemoInfo);
Mock.mock(/\/mock.system.demo.save/, 'post', controllerDemoSave);
Mock.mock(/\/mock.system.demo.delete/, 'delete', controllerDemoDelete);

function controllerDemoList(req: MockHttpRequest) {
  const query = JSON.parse(req.body);
  console.log('controller_demo_list query:', query);
  const result = mockDatasQuery(demos, query, ['demoName', 'field1', 'field2', 'field3'], ['field7']);
  return buildSuccess(result);
}

function controllerDemoInfo(req: MockHttpRequest) {
  const id = getQueryString(req.url, 'id');
  const data = demos.find((item) => item.id === id);
  return data ? buildSuccess(deepClone(data)) : buildFailure(null, 'Not Found');
}

function controllerDemoSave(req: MockHttpRequest) {
  const demo = JSON.parse(req.body);
  if (demo.id) {
    const item = demos.find((w) => w.id === demo.id);
    Object.assign(item, demo);
  } else {
    demo.id = generateId();
    demo.field7 = Mock.Random.integer(-100, 100);
    demos.push(demo);
  }
  return buildSuccess({ id: demo.id });
}

function controllerDemoDelete(req: MockHttpRequest) {
  const ids = getQueryString(req.url, 'ids');
  if (ids) {
    ids.split(';').forEach((id) => {
      const foundIndex = demos.findIndex((item) => item.id === id);
      if (foundIndex > -1) {
        demos.splice(foundIndex, 1);
      }
    });
  }
  return buildSuccess(null);
}
