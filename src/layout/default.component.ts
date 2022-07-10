import Vue from 'vue';
import { RawLocation } from 'vue-router';
import { Layout, Menu, SettingsService, User } from '@tdp/theme';
import { MenuService } from '@tdp/system';
import { ACLService } from '@tdp/acl';
import { PassportService } from '@shared';
import { TokenService } from '@tdp/auth';

export default Vue.extend({
  name: 'app-layout',
  data() {
    const { NODE_ENV, VUE_APP_MODE } = process.env;
    return {
      settingsSrv: SettingsService.INSTANCE,
      menus: undefined as unknown as Menu[],
      showSettingBtn: NODE_ENV === 'development' || (NODE_ENV === 'production' && VUE_APP_MODE === 'preview')
    };
  },
  computed: {
    layout(): Layout {
      return this.settingsSrv.layout;
    },
    user(): User {
      return this.settingsSrv.user || {};
    },
    isFullscreen() {
      return this.$q.fullscreen.isActive;
    }
  },
  created() {
    this.loadMenu();
  },
  methods: {
    async loadMenu() {
      // this.menus = await MenuService.getNavs();
      this.menus = [];

      // if (process.env.NODE_ENV === 'development') {
      // 生产环境不添加 `demo` 模块路由&菜单且不打包其模块文件
      const demoMenus = require('@pages/demo').DEMO_MENUS;
      if (demoMenus) {
        this.menus = this.menus.concat(JSON.parse(JSON.stringify(demoMenus)));
      }
      // }

      this.$nextTick(() => {
        // 获取到菜单数据后验证一次当前路由权限
        const can = ACLService.canRoute(this.$route);
        if (!can) {
          let route: RawLocation = {
            path: ACLService.guardUrl,
            query: {
              redirect: this.$route.fullPath
            }
          };
          if (this.$route.query && this.$route.query.redirectedByLogin) {
            route = { path: '/' };
          }
          this.$router.push(route);
        }
      });
    },
    /**
     * 退出登录
     */
    logout() {
      this.$q
        .dialog({
          title: '提示',
          message: '确认退出 ?',
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          PassportService.logout().then(() => {
            this.$router.push({ path: TokenService.loginUrl });
          });
        });
    },
    toggleFullscreen() {
      this.$q.fullscreen.toggle();
    },
    userInfo() {
      const route = '/profile';
      this.$route.path !== route && this.$router.push({ path: route });
    }
  }
});
