/**
 * 填充库
 * @author zhouwf
 */

import 'babel-polyfill';

import Proxy from 'es6-proxy-polyfill';

/**
 * polyfill proxy & location
 */
((global) => {
  // proxy
  if (!global.Proxy) {
    global.Proxy = Proxy;
    global.isPolyfillProxy = true;
  }

  if (!global.location.origin) {
    const location: any = global.location;
    const { protocol, hostname, port } = location;
    location.origin = `${protocol}//${hostname}${port ? ':' + port : ''}`;
  }
})(window);
