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

<script>
import { ThemeMixin } from '@tdp/theme';
import { buildQuery, TablePagination } from '@tdp/util';

import { DemoService } from '../../service';

/**
 * Demo 列表
 */
export default {
  name: 'app-demo-list',
  mixins: [ThemeMixin],

  data() {
    const demos = [];
    const selections = [];

    const filterModel = {
      field1: '',
      field2: '',
      field3: ''
    };

    const pagination = new TablePagination();

    return {
      demos,
      selections,

      filterModel,

      field3Options: [
        { value: 'v1', label: 'v1' },
        { value: 'v2', label: 'v2' }
      ],

      /** 表格 `<q-table :columns="columns" />` 列配置 */
      columns: [
        { name: 'demoName', label: '名称', field: 'demoName', align: 'left', sortable: true },
        { name: 'field1', label: 'Field 1', field: 'field1', align: 'left' },
        { name: 'field2', label: 'Field 2', field: 'field2', align: 'left' },
        { name: 'field3', label: 'Field 3', field: 'field3', align: 'left' },
        { name: 'field5', label: 'Field 5', field: 'field5', align: 'left' },
        { name: 'field7', label: 'Field 7 (数字)', field: 'field7', align: 'left', sortable: true }
      ],

      /** 表格 `<q-table :pagination.sync="pagination" />` 分页配置 */
      pagination,

      loading: false
    };
  },

  mounted() {
    this.triggerTableRequest();
  },

  methods: {
    /** 获取数据 */
    getList() {
      if (this.loading) {
        return;
      }

      this.loading = true;
      this.selections = [];

      DemoService.list(buildQuery(this.pagination, this.filterModel))
        .then((data) => {
          this.demos = data.records;
          this.pagination.rowsNumber = data.total;
          TablePagination.updateTotalPages(this.pagination);
        })
        .finally(() => (this.loading = false));
    },

    onSearch() {
      this.triggerTableRequest();
    },

    onReset() {
      this.filterModel.field1 = '';
      this.filterModel.field2 = '';
      this.filterModel.field3 = '';
    },

    onCreate() {
      // 前往 `info` 页
      this.$emit('goto', 'info');
    },

    onDelete() {
      this.$q.dialog({ title: '提示', message: '确定删除选中数据？', color: 'negative', cancel: true }).onOk(() => {
        const ids = this.selections.map((sel) => sel.id);
        DemoService.delete(ids).then((result) => {
          if (result && result.status === 'success') {
            this.$q.notify({ type: 'positive', position: 'top', message: result.message });
            this.triggerTableRequest();
          }
        });
      });
    },

    /** 响应表格 `@request` 事件 */
    onTableRequest(payload) {
      TablePagination.updateByRequestPayload(this.pagination, payload);
      this.getList();
    },

    /** 编辑数据 */
    onEdit(id) {
      this.$emit('goto', 'info', id);
    },

    /** 页码变化 */
    onPageNumChange(pageVal) {
      this.pagination.page = pageVal;
      this.triggerTableRequest();
    },

    /** 触发表格请求 */
    triggerTableRequest() {
      this.$refs.dataTableRef.requestServerInteraction();
    }
  }
};
</script>
