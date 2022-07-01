import { HttpClient, responseResult } from '@tdp/http';
import { ACLService } from '@tdp/acl';
import { TokenService } from '@tdp/auth';
import { SettingsService } from '@tdp/theme';
import { PermissionsService } from '@tdp/system';

/**
 * 应用启动服务
 * @author zhouwf
 */
export class StartupService {
  /**
   * 程序启动
   */
  static async bootstrap() {
    const baseUrl = (document.querySelector('base') as any).href;
    const config = await HttpClient.get(`${baseUrl}static/config/config.json`).then(responseResult);
    SettingsService.setConfig(config);

    try {
      const tokenModel = TokenService.get();
      if (tokenModel && tokenModel.token) {
        // 获取当前用户的权限配置
        const permissions = await PermissionsService.getConfig();
        ACLService.set(permissions);
      }
    } catch (e) {
      // 当前 catch 的异常主要是为了跳过 `token` 超期的情况
      // 如果是获取权限配置接口的其它异常情况拦截器中会有全局异常提示
    }

    return config;
  }
}
