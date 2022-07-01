export interface LoginUser {
  loginName: string;
  password: string;
  code: string;
  codeId: string;
}

/** 账号密码登录 */
export interface AccountLogin {
  loginName: string;
  password: string;
  code: string;
  codeId: string;
}

/** 短信验证码登录 */
export interface SMSLogin {
  phoneNumber: string;
  messageCode: string;
  code: string;
  codeId: string;
}

export interface LoginResult {
  token: string;
  user?: any;

  [key: string]: any;
}

export interface ValidatorCode {
  verifyCode: boolean;
  code?: string;
  codeId?: string;
}
