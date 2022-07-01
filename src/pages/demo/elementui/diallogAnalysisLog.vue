<template>
  <div class="app-container">
    <div class="filter-container">
      <div style="float: right">
        <el-select class="filter-item" v-model="listQuery.filters.levelId" placeholder="请选择">
          <el-option v-for="item in levels" :key="item.id" :label="item.levelName" :value="item.id"></el-option>
        </el-select>
        <el-select class="filter-item" v-model="listQuery.filters.themeId" @change="selectTheme" placeholder="请选择">
          <el-option v-for="item in themes" :key="item.id" :label="item.cnName" :value="item.id"></el-option>
        </el-select>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData" v-waves>
          查询
        </el-button>
        <el-button class="filter-item" style="margin-left: 10px" icon="el-icon-refresh" @click="resetTemp">
          重置
        </el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      ref="gridTable"
      :row-class-name="tableRowClassName"
      @selection-change="checkItems"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" width="50px" align="center"></el-table-column>
      <el-table-column prop="levelName" label="层级" align="center" />
      <el-table-column prop="themeName" label="主题" align="center" />
      <el-table-column prop="tableName" label="表" align="center" />
      <el-table-column label="解析类型" align="center">
        <template slot-scope="scope">
          <span>{{ getResolveType(scope.row.resolveType) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="resolveTime" label="解析时间" align="center" />
      <el-table-column prop="resolveResult" label="解析结果" align="center" />
      <el-table-column label="问题数据" align="center">
        <template slot-scope="{ row }">
          <el-button v-if="row.resolveResult === '失败'" type="text" @click="downErrorData(row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      :pageSizes="pageSizes"
      @pagination="fetchData"
    />
  </div>
</template>

<script>
import { getDlFileResolveLogPage, downloadProblemDataFile } from '@/api/coverge/file-manage.js';
import { createQueryParams } from '@/utils/queryParams.js';
import { getAllTable, getExplorationTable, addJob, updateJob, getlevellist } from '@/api/coverge/data-model';
import { getThemeByLevelId } from '@/api/govern/model-manage';
import Pagination from '@/components/Pagination';
import { blobFileDownload } from '@/utils/file';
import * as governDatastandardApi from '@/api/govern/govern-datastandard.js';
import * as dataElementApi from '@/api/govern/data-element';
export default {
  name: 'codeValue',
  components: { Pagination },

  props: {
    detail: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  filters: {
    getstandardType(val) {
      let str = '';
      switch (val) {
        case '0':
          str = '国标';
          break;
        case '1':
          str = '行标';
          break;
        case '2':
          str = '地方标准';
          break;
        case '3':
          str = '其他';
          break;
        default:
          str = '';
      }
      return str;
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      selectedLogs: [],
      levels: [],
      themes: [],
      levelId: '',
      themeId: '',
      total: 0,
      pageSizes: [5, 10, 20, 50],

      listQuery: {
        filters: { fileId: this.detail.id },
        pageNum: 1,
        pageSize: 5,
        orders: [
          {
            column: 'resolveTime',
            sorting: 'desc'
          }
        ]
      },
      ResolveTypes: [
        { label: '建模', value: '1' },
        { label: '注入数据', value: '2' },
        { label: '建模并注入数据', value: '3' }
      ],

      rules: {
        name: [{ required: true, message: 'this is required', trigger: 'blur' }],
        description: [{ required: true, message: 'this is required', trigger: 'blur' }]
      }
    };
  },
  watch: {
    'listQuery.filters.levelId': {
      handler(val) {
        if (val) {
          this.listQuery.filters.themeId = '';
          this.setTheme(val);
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    selectTheme() {
      this.$forceUpdate();
    },
    setTheme(val) {
      getThemeByLevelId(val).then((e) => {
        this.themes = e.data;
      });
    },
    async downErrorData(row) {
      console.log('下载 ', row);
      const file = await downloadProblemDataFile(row.id);
      blobFileDownload(file);
    },
    getResolveType(resolveType) {
      return this.ResolveTypes.find((item) => item.value === resolveType).label;
    },
    async fetchData() {
      this.listLoading = true;
      if (this.levels.length == 0) {
        const levelResp = await getlevellist();
        this.levels = levelResp.data;
      }
      const pageResp = await getDlFileResolveLogPage(createQueryParams(this.listQuery));
      const { records } = pageResp.data;
      const { total } = pageResp.data;
      console.log(pageResp.data, total);
      this.total = total;
      this.list = records;
      this.listLoading = false;
    },
    checkItems(selection) {
      this.selectedLogs = selection;
    },
    tableRowClassName(row) {
      //设置row对象的index
      row.row.index = row.rowIndex;
    },
    addValue() {
      this.list.push({
        codeInfoId: this.detail.id,
        valueName: '',
        valueCode: '',
        valueDesc: ''
      });
    },
    resetTemp() {
      Object.keys(this.listQuery.filters).forEach((key) => (this.listQuery.filters[key] = ''));
      this.listQuery.filters.fileId = this.detail.id;
      this.fetchData();
    },
    handleDelete(row, index) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //有id的调接口
        if (row.id) {
          let list = [];
          list.push(row.id);
          governDatastandardApi.batchRomoveCodeValue(list).then((res) => {
            if (res.data) {
              this.$notify({
                message: '删除成功',
                type: 'success'
              });
            }
          });
        }
        this.list.splice(index, 1);
      });
    },
    batchDelHandler() {
      this.$confirm('此操作将批量删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectedLogs.length !== 0) {
          const parameterKeys = [];
          const selectedIndex = [];
          this.selectedLogs.forEach((log) => {
            selectedIndex.push(log.index);
            if (log.id) {
              parameterKeys.push(log.id);
            }
          });
          governDatastandardApi
            .batchRomoveCodeValue(parameterKeys)
            .then(() => {
              selectedIndex.sort((a, b) => {
                return b - a;
              });
              selectedIndex.forEach((index) => {
                this.list.splice(index, 1);
              });
              this.$notify({
                showClose: true,
                message: '删除成功',
                type: 'success'
              });
            })
            .catch(() => {
              this.$notify({
                type: 'warning',
                message: '删除失败'
              });
            });
        } else {
          this.$notify({
            type: 'info',
            message: '请勾选数据'
          });
        }
      });
    },
    submitCodeValue() {
      this.listLoading = true;
      let valid = true;
      this.list.every((item) => {
        if (item.valueName === '' || item.valueCode === '') {
          valid = false;
          return false;
        } else {
          valid = true;
          return true;
        }
      });
      if (valid) {
        governDatastandardApi.saveCodeValue(this.list).then((response) => {
          if (response.data) {
            this.$emit('close');
            this.$emit('fetchData');
            this.$notify({
              message: '操作成功',
              type: 'success'
            });
          }
          this.listLoading = false;
        });
      } else {
        this.$notify({
          message: '请填写代码和名称',
          type: 'warning'
        });
        this.listLoading = false;
      }
    },
    closeDialog() {
      this.$emit('close');
    }
  }
};
</script>
<style scoped>
.m-left {
  margin-left: 10px;
}
</style>
