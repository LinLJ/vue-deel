<template>
  <q-page :class="`app-profile flex q-pa-${pagePadding}`">
    <q-card class="col column" flat>
      <q-toolbar>
        <q-tabs v-model="tabName" class="text-primary">
          <q-tab name="user" label="个人信息" />
          <q-tab name="password" label="修改密码" />
        </q-tabs>
      </q-toolbar>
      <q-card-section class="col-grow">
        <q-form ref="userFormRef" class="row" :class="{ 'q-field--dark': $q.dark.isActive }" v-show="tabName == 'user'">
          <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
            <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
              <div class="col-12 col-sm-6">
                <div class="text-body2 q-mb-sm">姓名</div>
                <q-input v-model.trim="user.fullName" class="q-field--with-bottom" outlined dense readonly />
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-body2 q-mb-sm">用户账号</div>
                <q-input v-model.trim="user.loginName" class="q-field--with-bottom" outlined dense readonly />
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-body2 q-mb-sm">所属公司</div>
                <q-input v-model.trim="user.companyName" class="q-field--with-bottom" outlined dense readonly />
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-body2 q-mb-sm">所属部门</div>
                <q-input v-model.trim="user.deptName" class="q-field--with-bottom" outlined dense readonly />
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-body2 q-mb-sm">所属机构</div>
                <q-input v-model.trim="user.officeName" class="q-field--with-bottom" outlined dense readonly />
              </div>
              <div class="col-12 col-sm-6">
                <div class="text-body2 q-mb-sm">邮箱</div>
                <q-input v-model.trim="user.email" class="q-field--with-bottom" readonly outlined dense />
              </div>
              <div class="col-12 col-sm-12">
                <div class="text-body2 q-mb-sm">工作电话</div>
                <q-input v-model.trim="user.telephone" class="q-field--with-bottom" outlined dense readonly />
              </div>
            </div>
          </div>
        </q-form>
        <q-form
          ref="passwordFormRef"
          class="row"
          :class="{ 'q-field--dark': $q.dark.isActive }"
          v-show="tabName == 'password'"
        >
          <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
            <div class="column q-col-gutter-sm">
              <div>
                <div class="text-body2 q-mb-sm">原密码</div>
                <q-input
                  v-model="password.oldPassword"
                  type="password"
                  outlined
                  autofocus
                  dense
                  :rules="rules.oldPassword"
                  :maxlength="24"
                />
              </div>
              <div>
                <div class="text-body2 q-mb-sm">新密码</div>
                <q-input
                  v-model="password.newPassword"
                  type="password"
                  outlined
                  autofocus
                  dense
                  :maxlength="24"
                  :rules="[...rules.newPassword, validNewPassword]"
                />
              </div>
              <div>
                <div class="text-body2 q-mb-sm">密码强度</div>
                <q-btn-group spread outline class="q-field--with-bottom">
                  <q-btn
                    :color="password.pwdStrong === 1 ? 'warning' : ''"
                    :outline="password.pwdStrong !== 1"
                    label="弱"
                  />
                  <q-btn
                    :color="password.pwdStrong === 2 ? 'info' : ''"
                    :outline="password.pwdStrong !== 2"
                    label="中"
                  />
                  <q-btn
                    :color="password.pwdStrong === 3 ? 'primary' : ''"
                    :outline="password.pwdStrong !== 3"
                    label="强"
                  />
                </q-btn-group>
              </div>
              <div>
                <div class="text-body2 q-mb-sm">确认密码</div>
                <q-input
                  v-model="password.rePassword"
                  type="password"
                  outlined
                  autofocus
                  dense
                  :maxlength="24"
                  :rules="[...rules.rePassword, validRePassword]"
                />
              </div>
            </div>
          </div>
        </q-form>
        <q-inner-loading :showing="loading" />
      </q-card-section>
      <q-card-section align="right">
        <q-btn
          v-if="tabName == 'password'"
          class="q-px-sm"
          :loading="updating"
          color="primary"
          unelevated
          @click="onUpdatePassword()"
          label="修改"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script src="./profile.component.ts"></script>
