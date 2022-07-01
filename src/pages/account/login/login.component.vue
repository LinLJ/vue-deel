<template>
  <q-layout>
    <q-page-container class="column">
      <q-page class="flex flex-center">
        <q-card class="col-auto card">
          <div class="row">
            <div class="col-6 card__left">
              <div class="card__leftImg column">
                <div class="text-white text-h5">TDP 太极低代码开发平台</div>
                <div class="text-white text-subtitle1 q-mt-lg">通用系统功能和组件</div>
                <div class="text-white text-body2 q-mt-md col-grow">
                  提供应用系统开发中通用的系统管理、组织机构管理、授权管理、应用菜单管理等通用功能和组件
                </div>
                <div class="card__leftSeparator"></div>
                <div class="text-white text-overline q-mt-lg text-center">太极创新研究院为您提供技术支持</div>
              </div>
            </div>
            <div class="col-6">
              <div class="card__right full-height">
                <q-card-section>
                  <q-tabs
                    v-model="tab"
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    narrow-indicator
                  >
                    <q-tab name="account" label="账户密码登录" />
                    <q-tab name="sms" label="短信验证登录" />
                  </q-tabs>
                  <q-tab-panels v-model="tab" animated class="q-mt-md">
                    <q-tab-panel name="account" class="tab__panel">
                      <q-form ref="accountFormRef" :model="accountModel">
                        <q-input
                          v-model="accountModel.loginName"
                          label="账户"
                          :rules="[(val) => !!val || '请输入账户']"
                        >
                          <template v-slot:prepend>
                            <q-icon size="20px" name="person" />
                          </template>
                        </q-input>
                        <q-input
                          v-model="accountModel.password"
                          label="密码"
                          :type="isPwd ? 'password' : 'text'"
                          :rules="[(val) => !!val || '请输入密码']"
                        >
                          <template v-slot:prepend>
                            <q-icon size="20px" name="lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
                          </template>
                        </q-input>
                        <q-input
                          v-model="accountModel.code"
                          label="验证码"
                          :rules="[codeValidator]"
                          lazy-rules="ondemand"
                          ref="accountCodeInputRef"
                          @blur="onCodeBlur()"
                        >
                          <template v-slot:prepend>
                            <q-icon size="20px" name="confirmation_number" />
                          </template>
                          <template v-slot:append>
                            <q-img
                              class="login-validator-code"
                              @click.native="fetchCodeImg()"
                              :src="validatorCode.code"
                            >
                              <template v-slot:error>
                                <q-icon name="error" />
                              </template>
                            </q-img>
                          </template>
                        </q-input>
                      </q-form>
                    </q-tab-panel>
                    <q-tab-panel name="sms" class="tab__panel">
                      <q-form ref="smsFormRef" :model="smsModel">
                        <q-input
                          v-model="smsModel.phoneNumber"
                          label="手机号码"
                          :rules="[(val) => !!val || '请输入手机号码']"
                        >
                          <template v-slot:prepend>
                            <q-icon size="20px" name="phone" />
                          </template>
                        </q-input>
                        <q-input
                          v-model="smsModel.messageCode"
                          label="短信验证码"
                          :rules="[(val) => !!val || '请输入短信验证码']"
                        >
                          <template v-slot:prepend>
                            <q-icon size="20px" name="chat_bubble" />
                          </template>
                          <template v-slot:append>
                            <q-btn
                              style="width: 100px"
                              unelevated
                              outline
                              dense
                              color="primary"
                              :label="code"
                              :disable="disabled"
                              @click="getMessageCode"
                            />
                          </template>
                        </q-input>
                        <q-input v-model="smsModel.code" label="验证码" :rules="[(val) => !!val || '请输入验证码']">
                          <template v-slot:prepend>
                            <q-icon size="20px" name="confirmation_number" />
                          </template>
                          <template v-slot:append>
                            <q-img
                              class="login-validator-code"
                              @click.native="fetchCodeImg()"
                              :src="validatorCode.code"
                            >
                              <template v-slot:error>
                                <q-icon name="error" />
                              </template>
                            </q-img>
                          </template>
                        </q-input>
                      </q-form>
                    </q-tab-panel>
                  </q-tab-panels>
                  <div class="flex items-center q-mt-sm" v-show="tab === 'account'">
                    <q-checkbox dense v-model="keep" label="记住状态" @input="keepState" />
                    <q-space />
                    <div class="text-primary cursor-pointer" @click="forgotPassword">忘记密码？</div>
                  </div>
                  <div class="flex items-center q-mt-sm" v-show="tab === 'sms'">
                    <q-space />
                    <div class="text-primary cursor-pointer">收不到验证码？</div>
                  </div>
                </q-card-section>
                <q-card-actions>
                  <q-btn
                    class="full-width tdf-button-shadow"
                    unelevated
                    label="登录"
                    text-color="white"
                    color="primary"
                    @click="login"
                  />
                  <div class="flex q-mt-md items-center full-width">
                    <div class="q-mr-md">其他方式</div>
                    <q-btn
                      color="warning"
                      text-color="white"
                      icon="title"
                      dense
                      round
                      unelevated
                      size="12px"
                      class="q-mr-xs"
                      @click="loginByTDFOS"
                    />
                    <q-space />
                    <div class="self-end q-pb-xs">
                      <span class="text-primary cursor-pointer" @click="register"> 点击注册 </span>
                    </div>
                  </div>
                </q-card-actions>
              </div>
            </div>
          </div>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script src="./login.component.ts"></script>
<style lang="scss" scoped src="./login.component.scss"></style>
