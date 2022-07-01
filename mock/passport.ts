import { Mock, MockHttpRequest, getQueryString, buildSuccess, buildFailure, buildFailure2 } from './mock';

const fakeCodes = ['1k7T', 'pqJU', 'gfor'];
const codes = [
  // 1k7T
  {
    codeId: 'MWs3dDsxNjMyOTgzNTEyMjA3==',
    code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAAAIeF9DAAAA/UlEQVR42u3YPQrCQBBA4Zwhp7D1DPbewMJKPI943pUUAVmSMOvMmJnse7CdBMzH/mUYiIiIiIiIiIjIu/PtWaZh9bzrOJZp8GYVGEcFuT/epWWEwQBkZ5BvBEsQL4zX5VTqoUUKu0RlBVkbaUDWlqcMIK1IkiUs7GnKCmTG2AKR/EaLI91TDn/slWJ4zZR0+8deIF6zohUDkGAYXYEsvXjPDf7Xo293IDVOlJnR9QxZwomE0e2SZQ2ivaWnwLAA2VqePEAO8cnkHyCedw8tBiCGKBYfFEOC1J/bJSMSiPb/dwEiedkaEOvZkWLJ8k5zJ7GaHURERERERETufQAjRPwAloqhGwAAAABJRU5ErkJggg==',
    verifyCode: true
  },

  // pqJU
  {
    code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAAAIeF9DAAABEUlEQVR42u3Y0Q3CIBRAURYwcQUdwUn8NXEFF9AV3BnTjyakAXzwgAK9NyHRVH84oS0YQ0REREREREREZMz7/LU5/3u8TnYZpX97eAxAACFAAOkD5Hb92GW4n90xC8g6wUOAhDB6RJkaJDb5PYKsGIcAybku7X552u0AJHPCNSA+AN/3lg/0IUA0YCkYoRUDSEOQ3OuAFASRTDYgCpDSqyMHRPNAHwKk5htWzdtVLkjKJE/1yit5WLdeHcOBlNyl/wORgLkA21ECJDbZqbe2ZmdYms2gBKQ1hm/CY2PXQ0UfSqmdeereoyaGFGWXc6Ha51Sh4xLN0cnU7XFwCEaFHTggk6wOQDoLjE5RmAUiIqJ4P0aAV4V/4Yz5AAAAAElFTkSuQmCC',
    codeId: 'cHFqdTsxNjMyOTgxMzAzMDc2==',
    verifyCode: true
  },

  // gfor
  {
    codeId: 'Z2ZvcjsxNjMyOTgzNzg5MDE0==',
    code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAoCAYAAAAIeF9DAAAA8UlEQVR42u2YywnDMBQE3YovKSAVpIGc0oUL8D3HgFOzcjIY4x/WvnglZkB3sYO00msaAAAAAAAAAIDD3F5DIgUDCUuLZC6WQRpGQkgCIfXR3t9pXLVfV5/um+bLUoayxM/K6Z+PNF9REmyETE+DuwyVFMtTsSQgV4qqP7aCV0ixlaG+shRC9gLPPSmWfREpJLfQj4SNEJPrSi2kiJcUQih0hCifuwi5+POHkAJlKITs/UOqEzJKUV5dqvnVVujVPXnXJCjHJ4o9RoxOiu2Ps1LUE97IGVZR/RHZM/Cn0wGiD+Far5CWSaGTEAAAAAD48gPxRjRY1cOVzQAAAABJRU5ErkJggg==',
    verifyCode: true
  }
];
let fakeCodeIndex = 0;

const users = [
  {
    id: '001',
    name: '管理员',
    loginName: 'admin',
    password: '1234',
    avatar: './static/img/avatar.jpg',
    email: 'admin@taiji.mail.com.cn',
    dept: '智云SBU',
    creator: '管理员',
    created: '2019-03-26 13:25:21',
    modificator: '管理员',
    modified: '2019-03-26 13:30:20'
  }
];
for (let i = 1; i < 5; i++) {
  users.push({
    id: '' + i,
    name: '名称' + i,
    loginName: 'user' + i,
    avatar: '',
    email: 'user' + i + '@mail.taiji.com.cn',
    dept: '智云SBU',
    password: '1234',
    creator: '管理员',
    created: '2019-03-26 13:25:' + (i < 10 ? '0' : '') + i,
    modificator: '管理员',
    modified: '2019-03-26 13:30:2' + i
  });
}

Mock.mock(/\/mock.system.login*/, 'post', controllerLogin);

Mock.mock(/\/mock.system.login.code.check/, 'get', controllerCheckCode);

Mock.mock(/\/mock.system.verify.code/, 'get', controllerVerifyCode);

function controllerLogin(req: MockHttpRequest) {
  const loginUser = JSON.parse(req.body);
  loginUser.password = window.atob(loginUser.password);
  const user: any = users.find((u) => u.loginName === loginUser.loginName && u.password === loginUser.password);

  if (!user) {
    return buildFailure(undefined, '用户名或密码错误');
  }
  const result = {
    token: Math.floor(Math.random() * 10_000_000_000),
    user
  } as Record<string, any>;
  return buildSuccess(result, '登录成功');
}

function controllerCheckCode(req: MockHttpRequest) {
  const codeId = getQueryString(req.url, 'codeId')!;
  const code = getQueryString(req.url, 'code');
  const fc = fakeCodes[fakeCodeIndex];
  const codeValid = fc.toLowerCase() === code ? code.toLowerCase() : '';
  const errorMessage = `验证码输入错误！(${fc})`;
  return codeValid ? buildSuccess('') : buildFailure2({ code: errorMessage }, errorMessage);
}

// 生成验证码
function controllerVerifyCode() {
  return buildSuccess(nextCode());
}

function createCode() {
  return Math.random().toString(32).substr(2, 4);
}

function nextCode() {
  if (fakeCodeIndex === fakeCodes.length - 1) {
    fakeCodeIndex = 0;
  } else {
    ++fakeCodeIndex;
  }
  return codes[fakeCodeIndex];
}
