import Vue from 'vue';
import { QForm, QInput } from 'quasar';
import { ACLService } from '@tdp/acl';
import { SettingsService } from '@tdp/theme';
import { TokenModel, TokenService } from '@tdp/auth';
import { OrgService, PermissionsService } from '@tdp/system';

import { AccountLogin, LoginResult, PassportService, SMSLogin, ValidatorCode } from '@shared';

export default Vue.extend({
  name: 'app-login',

  data() {
    const accountModel: AccountLogin = { loginName: '', password: '', code: '', codeId: '' };
    const smsModel: SMSLogin = { phoneNumber: '', messageCode: '', code: '', codeId: '' };
    const tab = 'account' as 'account' | 'sms';
    const validatorCode: ValidatorCode = { verifyCode: false, code: '', codeId: '' };

    return {
      accountModel,
      smsModel,
      tab,
      isPwd: true,
      randomCode: '',
      randomCode2: '',
      keep: false,
      code: '获取验证码',
      validatorCode,
      disabled: false,
      time: 0
    };
  },

  created() {
    // clear token
    TokenService.clear();
    SettingsService.setUser();
    ACLService.set({});

    const loginPath = SettingsService.layout.loginUrl as string | undefined;
    if (loginPath) {
      const hasQuesMark = loginPath.includes('?') ? '&' : '?';
      location.href = loginPath + hasQuesMark + 'redirect=' + this.$route.fullPath;
      return;
    }

    this.fetchCodeImg();

    // 键盘 enter 事件
    window.addEventListener('keydown', this.keyDown);
  },

  methods: {
    keyDown(e: any) {
      if (e.keyCode == 13) {
        this.login();
      }
    },
    getMessageCode() {
      if (this.smsModel.phoneNumber === '') {
        this.warning('请输入手机号码');
        return;
      }
      if (!/^1(3|4|5|7|8)\d{9}$/.test(this.smsModel.phoneNumber) || this.smsModel.phoneNumber.length !== 11) {
        this.warning('请输入正确的手机号码');
        return;
      }
      this.time = 60;
      this.timer();
    },
    timer() {
      if (this.time > 0) {
        this.disabled = true;
        this.time--;
        this.code = this.time + ' s';
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.code = '获取验证码';
        this.disabled = false;
      }
    },
    keepState() {
      this.$emit('keepState', this.keep);
    },
    forgotPassword() {
      this.$router.push('/forgot');
    },
    register() {
      this.$router.push('/register');
    },
    login() {
      if (this.tab === 'account') {
        this.validateForm().then((success) => {
          if (!success) {
            return this.warning('请检查必填项');
          }

          PassportService.login(this.accountModel)
            .then((result) => {
              const data = result.data;
              if (data) {
                let tokenValue = data.token;
                const tokenData: TokenModel = { token: tokenValue };
                if (data[tokenValue]) {
                  const tokenKey = tokenValue;
                  TokenService.config.sendKey = tokenKey;
                  tokenValue = data[tokenKey];
                  tokenData.key = tokenKey;
                  tokenData.token = tokenValue;
                }
                if (result.code === 307) {
                  tokenData.code = result.code;
                }

                TokenService.set(tokenData);

                this.afterLogin(data);
              } else {
                // 登录失败时刷新验证码
                this.accountModel.code = '';
                this.fetchCodeImg();
              }
            })
            .catch(() => {
              // 登录异常时刷新验证码
              this.accountModel.code = '';
              this.fetchCodeImg();
            });
        });
      } else {
        this.validateForm().then((success) => {
          if (!success) {
            return this.warning('请检查必填项');
          }

          PassportService.smsLogin(this.smsModel)
            .then(() => {
              console.log('sms login success');
            })
            .catch(() => {});
        });
      }
    },

    async afterLogin(data: LoginResult) {
      if (TokenService.get().token) {
        const promises = [PermissionsService.getConfig()];
        promises.push(data.user ? Promise.resolve(data.user) : OrgService.getCurrentUser());
        await Promise.all(promises).then(([permissions, user]) => {
          ACLService.set(permissions);
          SettingsService.setUser(user);
        });
      }
      const redirectUrl = this.$route.query ? (this.$route.query.redirect as string) : '';
      const location = redirectUrl ? { path: redirectUrl, query: { redirectedByLogin: 'true' } } : { path: '/' };
      this.$router.push(location).catch((e) => {});
    },

    loginByTDFOS() {
      this.$emit('loginByTDFOS');
    },

    /** 验证码输入框 blur */
    onCodeBlur() {
      const ref = this.$refs.accountCodeInputRef as QInput;
      ref && ref.validate();
    },

    /** 校验验证码 */
    codeValidator(val: string) {
      if (!this.validatorCode.verifyCode) {
        return true;
      }

      if (!val) {
        return '请输入验证码';
      }

      return new Promise<boolean>((resolve, reject) => {
        PassportService.loginCodeCheck(this.accountModel.code, this.validatorCode.codeId!).then((result) => {
          if (result && result.status === 'error') {
            this.fetchCodeImg();
            reject(result.message);
          } else {
            resolve(true);
          }
        });
      });
    },

    validateForm() {
      const formRef = (this.tab === 'account' ? this.$refs.accountFormRef : this.$refs.smsFormRef) as QForm;
      return formRef.validate();
    },

    /** 获取验证码图片信息 */
    fetchCodeImg() {
      PassportService.validatorCode()
        .then((data) => {
          this.validatorCode = data;
          if (data.codeId) {
            this.accountModel.codeId = data.codeId;
          }
        })
        .catch(() => (this.validatorCode = { verifyCode: false }));
    },
    warning(message: string) {
      this.$q.notify({ type: 'warning', position: 'top', message: message });
    }
  },
  destroyed() {
    window.removeEventListener('keydown', this.keyDown, false);
  }
});
