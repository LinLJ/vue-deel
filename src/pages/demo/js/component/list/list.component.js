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
