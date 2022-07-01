<template>
  <div class="app-demo-list col column">
    <q-card flat>
      <q-card-section>
        <q-form class="row q-col-gutter-sm">
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-input v-model="filterModel.field1" outlined dense>
              <template #before>
                <span :class="`${prefixCls}-field__label--xs text-body2 text-right`">Field 1</span>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-input v-model="filterModel.field2" outlined dense>
              <template #before>
                <span :class="`${prefixCls}-field__label--xs text-body2 text-right`">Field 2</span>
              </template>
            </q-input>
          </div>
          <div class="col-12 col-sm-6 col-md-4 col-lg-3">
            <q-select
              v-model="filterModel.field3"
              :options="field3Options"
              emit-value
              map-options
              clearable
              outlined
              dense
            >
              <template #before>
                <span :class="`${prefixCls}-field__label--xs text-body2 text-right`">Field 3</span>
              </template>
            </q-select>
          </div>
          <div class="col row justify-end">
            <q-btn
              color="primary"
              :icon="$q.screen.gt.sm ? 'search' : undefined"
              @click="onSearch()"
              unelevated
              label="搜索"
            />
            <q-btn
              :icon="$q.screen.gt.sm ? 'refresh' : undefined"
              :class="`${prefixCls}-btn--outline q-ml-sm`"
              @click="onReset()"
              unelevated
              label="重置"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <q-table
      row-key="id"
      selection="multiple"
      :data="demos"
      :columns="columns"
      :selected.sync="selections"
      :pagination.sync="pagination"
      :loading="loading"
      ref="dataTableRef"
      class="col-grow full-width q-mt-md"
      table-class="full-width q-px-md"
      :table-header-class="{ 'bg-grey-2': !$q.dark.isActive }"
      :rows-per-page-label="`共 ${pagination.rowsNumber} 条${$q.screen.gt.sm ? ', 每页条数:' : ''}`"
      flat
      @request="onTableRequest($event)"
    >
      <template #top>
        <span class="text-subtitle1">DEMO 列表</span>
        <q-space />
        <q-btn
          color="primary"
          :icon="$q.screen.gt.sm ? 'add' : undefined"
          unelevated
          @click="onCreate()"
          label="新建"
        />
        <q-btn
          color="negative"
          :icon="$q.screen.gt.sm ? 'delete' : undefined"
          class="q-ml-sm"
          unelevated
          @click="onDelete()"
          :disable="!selections.length"
          label="删除"
        />
      </template>

      <template #header-selection="props">
        <q-checkbox v-model="props.selected" dense color="primary" />
      </template>

      <!-- 自定义数据显示 -->
      <template #body-selection="props">
        <q-checkbox v-model="props.selected" dense color="primary" />
      </template>
      <template #body-cell-demoName="props">
        <q-td :props="props">
          <q-btn :label="props.value" color="primary" @click="onEdit(props.key)" no-caps flat dense />
        </q-td>
      </template>

      <!-- 重写分页组件 -->
      <template #pagination="props">
        <q-pagination
          v-model="props.pagination.page"
          :max-pages="7"
          :max="pagination.totalPages"
          direction-links
          unelevated
          :boundary-links="$q.screen.gt.sm"
          :input="$q.screen.lt.sm"
          @input="onPageNumChange($event)"
        />
        <template v-if="$q.screen.gt.sm">
          <span>前往</span>
          <q-pagination
            v-model="props.pagination.page"
            :max="pagination.totalPages"
            input
            :direction-links="false"
            :boundary-links="false"
            @input="onPageNumChange($event)"
          />
          <span>页</span>
        </template>
      </template>
    </q-table>
  </div>
</template>

<script src="./list.component.js"></script>
