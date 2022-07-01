<template>
  <q-card class="app-demo-info col column" flat>
    <q-card-section class="row justify-between items-center">
      <span class="text-subtitle1">Demo Info</span>
      <q-btn icon="arrow_back" :ripple="false" dense flat @click="onBack()" label="返回" />
    </q-card-section>
    <q-card-section class="col-grow">
      <q-form ref="formRef" class="row" :class="{ 'q-field--dark': $q.dark.isActive }">
        <!-- 一行一列, 控制偏移 -->
        <div class="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4">
          <!-- 控制间距 -->
          <div class="column q-col-gutter-sm">
            <div>
              <div class="q-field__label text-body2 q-mb-sm">Demo Name</div>
              <q-input v-model="demo.demoName" :rules="rules.demoName" outlined autofocus dense />
            </div>
            <div>
              <div class="q-field__label text-body2 q-mb-sm">Field 1</div>
              <q-input v-model.trim="demo.field1" :rules="rules.field1" outlined dense />
            </div>
            <div>
              <div class="q-field__label text-body2 q-mb-sm">Field 2</div>
              <q-input v-model.trim="demo.field2" :rules="rules.field2" outlined dense />
            </div>
            <div>
              <div class="q-field__label text-body2 q-mb-sm">Field 3</div>
              <q-input v-model.trim="demo.field3" :rules="rules.field3" outlined dense />
            </div>
            <div>
              <div class="q-field__label text-body2 q-mb-sm">Field 6</div>
              <q-field class="q-field--with-bottom" dense borderless>
                <q-btn-toggle
                  v-model="demo.field6"
                  :options="[
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 }
                  ]"
                  :class="`${prefixCls}-btn-group--outline full-width`"
                  spread
                  unelevated
                />
              </q-field>
            </div>
            <div>
              <div class="q-field__label text-body2 q-mb-sm">Field 4</div>
              <q-field class="q-field--with-bottom" dense borderless>
                <q-radio v-model="demo.field4" val="0" label="否" dense />
                <q-radio v-model="demo.field4" val="1" label="是" dense class="q-ml-md" />
              </q-field>
            </div>
            <div>
              <div class="q-field__label text-body2 q-mb-sm">Field 5</div>
              <q-input v-model="demo.field5" type="textarea" autogrow outlined />
            </div>
          </div>
        </div>
        <!-- 一行两列, 控制偏移 -->
        <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-xl-6 offset-xl-3">
          <!-- 控制间距 -->
          <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
            <div class="col-12 text-subtitle1 text-center q-pa-md">一行两列</div>
            <div class="col-12 col-sm-6">
              <div class="q-field__label text-body2 q-mb-sm">Demo Name</div>
              <q-input v-model="demo.demoName" :rules="rules.demoName" outlined dense />
            </div>
            <div class="col-12 col-sm-6">
              <div class="q-field__label text-body2 q-mb-sm">Field 1</div>
              <q-input v-model.trim="demo.field1" :rules="rules.field1" outlined dense />
            </div>
            <div class="col-12 col-sm-6">
              <div class="q-field__label text-body2 q-mb-sm">Field 2</div>
              <q-input v-model.trim="demo.field2" :rules="rules.field2" outlined dense />
            </div>
            <div class="col-12 col-sm-6">
              <div class="q-field__label text-body2 q-mb-sm">Field 3</div>
              <q-input v-model.trim="demo.field3" :rules="rules.field3" outlined dense />
            </div>
            <div class="col-12 col-sm-6">
              <div class="q-field__label text-body2 q-mb-sm">Field 6</div>
              <q-field class="q-field--with-bottom" dense borderless>
                <q-btn-toggle
                  v-model="demo.field6"
                  :options="[
                    { label: '选项1', value: 1 },
                    { label: '选项2', value: 2 }
                  ]"
                  :class="`${prefixCls}-btn-group--outline full-width`"
                  spread
                  unelevated
                />
              </q-field>
            </div>
            <div class="col-12 col-sm-6">
              <div class="q-field__label text-body2 q-mb-sm">Field 4</div>
              <q-field class="q-field--with-bottom" dense borderless>
                <q-radio v-model="demo.field4" val="0" label="否" dense />
                <q-radio v-model="demo.field4" val="1" label="是" dense class="q-ml-md" />
              </q-field>
            </div>
            <div class="col-12">
              <div class="q-field__label text-body2 q-mb-sm">Field 5</div>
              <q-input v-model="demo.field5" type="textarea" autogrow outlined />
            </div>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-section align="right">
      <q-btn :class="`${prefixCls}-btn--outline q-px-sm q-mr-sm`" unelevated @click="onReset()" label="重置" />
      <q-btn class="q-px-sm" :loading="saving" color="primary" unelevated @click="onSave()" label="保存" />
    </q-card-section>
  </q-card>
</template>

<script src="./info.component.js"></script>
