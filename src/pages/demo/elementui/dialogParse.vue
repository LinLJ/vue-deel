<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :rules="form.resolveTypeName === '注入数据' ? injectRules : noInjectRules"
      label-width="160px"
    >
      <el-form-item label="选择层级" prop="levelId">
        <el-select class="filter-item" v-model="form.levelId" placeholder="请选择">
          <el-option v-for="item in levels" :key="item.id" :label="item.levelName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="选择主题" prop="themeId">
        <el-select class="filter-item" v-model="form.themeId" placeholder="请选择">
          <el-option v-for="item in themes" :key="item.id" :label="item.cnName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="解析类型" prop="resolveTypeName">
        <el-radio-group v-model="form.resolveTypeName" @change="removeValidataion">
          <el-radio v-for="item in resolveTypeList" :key="item.value" :label="item.label"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        v-show="form.resolveTypeName !== '建模' && form.resolveTypeName !== '建模并注入数据'"
        label="选择表"
        prop="tableId"
      >
        <el-select v-model="form.tableId" filterable placeholder="请选择">
          <el-option v-for="item in tables" :key="item.id" :label="item.tableName" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-show="form.resolveTypeName !== '注入数据'" label="中文表名" prop="tableShowName">
        <el-input v-model="form.tableShowName"></el-input>
      </el-form-item>
      <el-form-item v-show="form.resolveTypeName !== '注入数据'" label="英文表名" prop="tableName">
        <el-input v-model="form.tableName"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitAdd()">确 定</el-button>
    </div>
  </div>
</template>

<script>
import { getThemeByLevelId } from '@/api/govern/model-manage';
import { getlevellist } from '@/api/coverge/data-model';
import { getTableByThemeId } from '@/api/conversion/handle';

import { uploadDlDocument, getOne, addOrUpdate, parse } from '@/api/coverge/file-manage.js';
const commonRules = {
  levelId: [{ required: true, message: '请输入', trigger: 'blur' }],
  themeId: [{ required: true, message: '请输入', trigger: 'blur' }]
};
export default {
  name: 'add',
  props: {
    detail: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: { levelId: '', themeId: '', tableId: '', tableShowName: '', tableName: '', resolveTypeName: '建模' },
      edit: false,
      levels: [],
      themes: [],
      tables: [],
      resolveTypeList: [
        { label: '建模', value: '1' },
        { label: '注入数据', value: '2' },
        { label: '建模并注入数据', value: '3' }
      ],
      injectRules: {
        ...commonRules,

        tableId: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      noInjectRules: {
        ...commonRules,
        tableShowName: [{ required: true, message: '请输入', trigger: 'blur' }],
        tableName: [{ required: true, message: '请输入', trigger: 'blur' }]
      },

      showTreeWin: false
    };
  },
  watch: {
    'form.levelId': {
      handler(val, oldVal) {
        if (val) {
          if (val !== oldVal) {
            this.form.themeId = '';
            this.form.tableId = '';
          }
          // this.form.themeId = '';
          // this.form.tableId = '';
          this.setTheme(val);
        }
      },
      immediate: true
    },
    'form.themeId': {
      handler(val, oldVal) {
        if (val) {
          if (val !== oldVal) {
            this.form.tableId = '';
          }
          this.setTable(val);
        }
      },
      immediate: true
    }
    // 'form.resolveTypeName': {
    //   handler(val, oldVal) {
    //     console.log(val);
    //     this.$refs['formRef'].clearValidate();
    //   }
    // }
  },
  mounted() {
    this.init();
  },
  methods: {
    removeValidataion() {
      this.$refs['formRef'].clearValidate();
    },
    setTheme(val) {
      getThemeByLevelId(val).then((e) => {
        this.themes = e.data;
      });
    },
    setTable(val) {
      getTableByThemeId(val).then((e) => {
        this.tables = e.data;
      });
    },

    close() {
      this.$emit('close');
      this.$refs.formRef.resetFields();
    },
    async init() {
      if (this.levels.length == 0) {
        const levelResp = await getlevellist();
        this.levels = levelResp.data;
      }
    },
    submitAdd() {
      this.listLoading = true;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.form.fileId = this.detail.id;
          if (this.form.tableId)
            this.form.tableName = this.tables.find((item) => item.id === this.form.tableId).tableName;

          this.form.resolveType = this.resolveTypeList.find((type) => type.label === this.form.resolveTypeName).value;
          // delete this.form.resolveTypeName;
          parse(this.form).then((response) => {
            if (response.data) {
              this.$emit('close');
              this.$emit('fetchData');
              this.$notify({
                message: '操作成功',
                type: 'success'
              });
            }
            this.listLoading = false;
            this.$refs.formRef.resetFields();
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.dialog-footer {
  width: 100%;
  text-align: right;
  margin-top: 20px;
}
</style>
