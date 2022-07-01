import Vue from 'vue';
import { User, OrgService } from '@tdp/system';
import { ThemeMixin } from '@tdp/theme';
import { createQFormRules, passwordChar } from '@tdp/util';
import { QForm } from 'quasar';
import { TokenService } from '@tdp/auth';

/**
 * 个人信息
 */
export default Vue.extend({
  name: 'app-profile',
  mixins: [ThemeMixin],
  data() {
    const user = new User();

    const password: {
      oldPassword: string;
      newPassword: string;
      pwdStrong: number;
      rePassword: string;
    } = {
      oldPassword: '',
      newPassword: '',
      pwdStrong: 0,
      rePassword: ''
    };

    return {
      tabName: 'user',
      loading: false,
      updating: false,
      user,
      password,
      rules: createQFormRules({
        oldPassword: [{ required: true, message: '请输入原密码' }, { min: 6 }, { max: 24 }],
        newPassword: [{ required: true, message: '请输入新密码' }, { min: 6 }, { max: 24 }],
        rePassword: [{ required: true, message: '请再次输入密码' }, { min: 6 }, { max: 24 }]
      })
    };
  },

  created() {
    this.loadUser();
  },

  methods: {
    /**
     * 加载用户信息
     */
    loadUser() {
      this.loading = true;
      OrgService.getCurrentUser()
        .then((user) => {
          this.user = user;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    onUpdatePassword() {
      this.passwordFormRef()
        .validate()
        .then((outcome) => {
          if (!outcome) {
            return;
          }

          this.updating = true;

          OrgService.updatePassword({ password: this.password.oldPassword, newPassword: this.password.newPassword })
            .then((result) => {
              if (result.status === 'success') {
                this.$router.push({ path: TokenService.loginUrl });
              }
            })
            .finally(() => (this.updating = false));
        });
    },

    /**
     * 校验密码
     */
    validNewPassword(val: string) {
      if (val) {
        this.password.pwdStrong = OrgService.getPasswordStrong(val);
        const illegal = passwordChar(val);
        return illegal && illegal.message;
      }
    },

    /**
     * 确认密码校验
     * @param val
     */
    validRePassword(val: string) {
      if (val) {
        if (this.password.newPassword !== val) {
          return '两次输入密码不一致';
        } else {
          const illegal = passwordChar(val);
          return illegal && illegal.message;
        }
      }
    },

    passwordFormRef() {
      return this._getRefByName<QForm>('passwordFormRef');
    },

    _getRefByName<T>(refName: string) {
      return (this as any).$refs[refName] as any as T;
    }
  }
});
