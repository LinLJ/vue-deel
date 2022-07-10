<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" type="primary" @click="downloadTemplate()"> 模板下载 </el-button>
      <el-button class="filter-item" type="primary" @click="openAdd()"> 新增 </el-button>
      <el-button class="filter-item" style="margin-left: 10px" @click="batchDelHandler">批量删除</el-button>

      <!--      <el-button class="filter-item" style="margin-left: 10px">下载</el-button>-->
      <div style="float: right">
        <el-input
          v-model="listQuery.filters['fileName:like']"
          clearable
          placeholder="文件名称"
          style="width: 200px"
          class="filter-item"
        />
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetchData"> 查询 </el-button>
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
      border
      fit
      highlight-current-row
      @selection-change="checkItems"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="文件资源名称" align="center">
        <template slot-scope="scope">{{ scope.row.fileResourceName }}</template>
      </el-table-column>
      <el-table-column label="文件名称" align="center">
        <template slot-scope="scope">{{ scope.row.fileName }}</template>
      </el-table-column>
      <el-table-column label="文件类型" align="center">
        <template slot-scope="scope">{{ scope.row.fileType }}</template>
      </el-table-column>
      <el-table-column label="解析记录" align="center">
        <template slot-scope="{ row }">
          <el-button type="text" @click="openCodeTable(row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="文件来源" align="center">
        <template slot-scope="scope">{{ scope.row.fileSourceName }}</template>
      </el-table-column>
      <el-table-column label="上传人" align="center">
        <template slot-scope="scope">{{ scope.row.fullName }}</template>
      </el-table-column>
      <el-table-column label="上传时间" width="160" align="center">
        <template slot-scope="scope">{{ scope.row.createdTime }}</template>
      </el-table-column>
      <el-table-column label="操作" class-name="small-padding" align="center">
        <template slot-scope="{ row }">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link" @click="handleClickOptions(row)">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown" v-loading="parseLoading">
              <el-dropdown-item @click.native="handleUpdate(row)">编辑</el-dropdown-item>
              <el-dropdown-item v-if="row.status !== 'deleted'" @click.native="handleDelete(row)"
                >删除</el-dropdown-item
              >
              <el-dropdown-item divided @click.native="dowmloadFile(row)">预览</el-dropdown-item>
              <el-dropdown-item
                v-if="['csv', 'xlsx', 'xls'].includes(row.fileType) && row.fileStatus !== '解析中'"
                @click.native="handleParse(row)"
                >解析</el-dropdown-item
              >
              <el-dropdown-item disabled v-if="row.fileStatus === '解析中'">解析中</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.pageNum"
      :limit.sync="listQuery.pageSize"
      @pagination="fetchData"
    />
    <el-dialog
      :visible.sync="showAdd"
      :title="winTitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="40%"
    >
      <add v-if="showAdd" :detail="detail" @close="closeAdd" @fetchData="fetchData"></add>
    </el-dialog>
    <el-dialog
      :visible.sync="showParse"
      title="文件解析"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="40%"
    >
      <DialogParse v-if="showParse" :detail="detail" @close="closeParse" @fetchData="fetchData"></DialogParse>
    </el-dialog>
    <el-dialog
      :visible.sync="showCodeValue"
      :title="'解析历史'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="60%"
    >
      <AnalysisLog :detail="detail" v-if="showCodeValue" ref="codeValue"></AnalysisLog>
    </el-dialog>
  </div>
</template>

<script>
import { getPage, batchRemove, remove, downloadFile, downloadTemplate, getOne } from '@/api/coverge/file-manage.js';
import * as queryParams from '@/utils/queryParams.js';
import Pagination from '@/components/Pagination';
import add from './add.vue';
import DialogParse from './dialogParse.vue';
import AnalysisLog from './diallogAnalysisLog.vue';
import { blobFileDownload } from '@/utils/file';

export default {
  name: 'standardReferenceDoc',
  components: { Pagination, add, AnalysisLog, DialogParse },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      parseLoading: true,
      showAdd: false,
      showParse: false,
      total: 0,
      winTitle: '',
      detail: {},
      showCodeValue: false,
      selectedLogs: [],

      listQuery: {
        filters: {
          fileName: '',
          fileSource: ''
        },
        pageNum: 1,
        pageSize: 10,
        orders: []
      },
      rules: {
        name: [{ required: true, message: 'this is required', trigger: 'blur' }],
        description: [{ required: true, message: 'this is required', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.fetchData();
  },

  methods: {
    handleClickOptions(row) {
      this.parseLoading = true;
      console.log(row.id);
      getOne(row.id).then((response) => {
        console.log(response.data);

        row.fileStatus = response.data.fileStatus;
        this.parseLoading = false;

        // this.form = response.data;
      });
    },
    async downloadTemplate() {
      const file = await downloadTemplate();
      blobFileDownload(file);
    },
    async dowmloadFile(row) {
      const file = await downloadFile(row.id);
      blobFileDownload(file);
    },
    checkItems(selection) {
      this.selectedLogs = selection;
    },
    fetchData() {
      this.listLoading = true;
      getPage(queryParams.createQueryParams(this.listQuery)).then((response) => {
        const { records } = response.data;
        const { total } = response.data;
        this.total = total;
        this.list = records;
        this.listLoading = false;
      });
    },
    openCodeTable(row) {
      this.detail.id = row.id;
      this.showCodeValue = true;
    },
    resetTemp() {
      Object.keys(this.listQuery.filters).forEach((key) => (this.listQuery.filters[key] = ''));
      this.fetchData();
    },
    openAdd() {
      this.detail.id = '';
      this.winTitle = '上传文件';
      this.showAdd = true;
    },
    handleParse(row) {
      this.detail.id = row.id;
      this.showParse = true;
    },
    closeAdd() {
      this.showAdd = false;
    },
    closeParse() {
      this.showParse = false;
    },
    handleUpdate(row) {
      this.detail.id = row.id;
      this.winTitle = '编辑上传文件';
      this.showAdd = true;
    },
    batchDelHandler() {
      this.$confirm('此操作将批量删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectedLogs.length !== 0) {
          const parameterKeys = [];
          this.selectedLogs.forEach((log) => {
            parameterKeys.push(log.id);
          });
          batchRemove(parameterKeys)
            .then(() => {
              this.fetchData();
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
    handleDelete(row) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(row.id).then((response) => {
          if (response.data) {
            this.fetchData();
            this.$notify({
              message: '删除成功',
              type: 'success'
            });
          } else {
            this.$notify({
              message: response.message,
              type: 'warning'
            });
          }
        });
      });
    }
  }
};
</script>
<style scoped>
.m-left {
  margin-left: 10px;
}
</style>
