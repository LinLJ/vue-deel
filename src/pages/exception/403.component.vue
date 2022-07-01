<template>
  <tdp-exception :type="403" :logout="true" @logout="logout" />
</template>

<script lang="ts">
import Vue from 'vue';
import { TokenService } from '@tdp/auth';
import { PassportService } from '@shared';

/**
 * 无权限
 * @author zhouwf
 */
export default Vue.extend({
  name: 'app-exception-403',
  methods: {
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
    }
  }
});
</script>
