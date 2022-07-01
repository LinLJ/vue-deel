import { ACLService } from '@tdp/acl';
import { TokenService } from '@tdp/auth';
import { createSingleClass } from '@tdp/core';
import { responseData, responseResult, ResponseResult, HttpApi, HttpApiService, responseReject } from '@tdp/http';
import { NavService, SettingsService } from '@tdp/theme';
import { LoginResult, ValidatorCode, AccountLogin, SMSLogin } from '../model';

const API_HOST = '/system';

class PassportApi implements HttpApi {
  login = `${API_HOST}/login` as const;
  loginSMS = `${API_HOST}/login-sms` as const;
  loginCodeCheck = `${API_HOST}/login/code/check` as const;
  logout = `${API_HOST}/logout` as const;

  /** 获取验证码图片 */
  validatorCode = `${API_HOST}/verify/code` as const;
}

class PassportServiceCtor extends HttpApiService<PassportApi> {
  httpApi = new PassportApi();

  httpModuleKey = 'passport';

  /**
   * 获取验证码
   */
  validatorCode(): Promise<ValidatorCode> {
    return this.http.get(this.api.validatorCode).then(responseData);
  }

  /**
   * 用户登录
   * @param account 登录用户信息
   */
  login(account: AccountLogin): Promise<ResponseResult<LoginResult>> {
    const clonedLoginUser = { ...account, password: window.btoa(account.password) };
    return this.http.post(this.api.login, clonedLoginUser).then(responseResult, responseReject);
  }

  /**
   * 校验验证码
   * @param code 验证码
   * @param codeId 验证码标识
   */
  loginCodeCheck(code: string, codeId: string): Promise<ResponseResult> {
    return this.http.get(this.api.loginCodeCheck, { params: { code, codeId } }).then(responseResult);
  }

  /**
   * 短信验证码登录
   * @param sms 短信验证码信息
   */
  smsLogin(sms: SMSLogin): Promise<ResponseResult<LoginResult>> {
    return this.http.post(this.api.loginSMS, sms).then(responseResult, responseReject);
  }

  /**
   * 退出登录
   */
  logout() {
    const result = this.api.logout
      ? this.http.get(this.api.logout).then(responseResult, responseReject)
      : Promise.resolve();
    return result.then(() => this.clearUserInfo());
  }

  /**
   * 清除登录用户的相关信息, 包括个人信息, 认证信息及权限信息
   */
  clearUserInfo() {
    TokenService.clear();
    SettingsService.setUser();
    ACLService.set({});
    NavService.clear();
  }
}

/** 通行证服务类 [单例] */
export const PassportService = createSingleClass(PassportServiceCtor);
