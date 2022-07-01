<template>
  <tdp-layout :menus="menus">
    <template slot="headerActionbar">
      <!-- 切换全屏模式 -->
      <q-btn
        flat
        class="self-stretch no-border-radius"
        :icon="`fullscreen${isFullscreen ? '_exit' : ''}`"
        @click="toggleFullscreen"
      >
        <q-tooltip>{{ isFullscreen ? '退出全屏' : '全屏模式' }}</q-tooltip>
      </q-btn>
      <!-- 布局配置按钮: 仅在开发环境和预览环境显示 -->
      <q-btn
        v-if="showSettingBtn"
        flat
        class="self-stretch no-border-radius"
        icon="o_settings"
        @click="layout.rightSide.toggleVisible()"
      >
        <q-tooltip>布局配置</q-tooltip>
      </q-btn>

      <!-- 当前登录用户信息 -->
      <q-btn-dropdown flat padding="xs sm" class="self-stretch no-border-radius">
        <template v-slot:label>
          <q-avatar size="md" v-bind="user.avatar ? {} : { icon: 'account_circle' }">
            <img v-if="user.avatar" :src="user.avatar" />
          </q-avatar>
          <span class="gt-xs q-ml-sm">{{ user.fullName || user.name }}</span>
        </template>
        <div class="row no-wrap q-pa-md">
          <div class="column">
            <div class="text-caption q-mb-xs">公司</div>
            <div class="text-body2 q-mb-xs">{{ user.companyName || '-' }}</div>
            <div class="text-caption q-mb-xs">邮箱</div>
            <div class="text-body2 q-mb-xs">{{ user.email || '-' }}</div>
            <div class="text-right">
              <q-btn label="更多信息" unelevated size="sm" v-close-popup @click="userInfo" />
            </div>
          </div>
          <q-separator vertical inset class="q-mx-lg" />
          <div class="column items-center">
            <q-avatar v-bind="user.avatar ? {} : { icon: 'account_circle' }">
              <img v-if="user.avatar" :src="user.avatar" />
            </q-avatar>
            <div class="text-body2 q-mt-md q-mb-xs">{{ user.fullName || user.name }}</div>
            <q-btn color="primary" label="退出" unelevated size="sm" v-close-popup @click="logout" />
          </div>
        </div>
      </q-btn-dropdown>
    </template>
  </tdp-layout>
</template>

<script src="./default.component.ts"></script>
<style lang="scss" scoped src="./default.component.scss"></style>
