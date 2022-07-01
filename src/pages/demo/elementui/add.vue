<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="160px">
      <el-row>
        <el-col>
          <el-form-item label="文件资源名称" prop="fileResourceName">
            <el-input v-model="form.fileResourceName" placeholder="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="文件名称">
            <el-input readonly v-model="form.fileName" placeholder="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="文件类型">
            <el-input readonly v-model="form.fileType" placeholder="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="文件来源" prop="fileSource">
            <el-input v-show="false" v-model="form.fileSource" />
            <el-input readonly v-model="form.fileSourceName" style="width: 40%" />
            <el-button type="primary" @click="showTreeWin = true" style="margin-left: 15px">选择</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <!--      <el-row>-->
      <!--        <el-col>-->
      <!--          <el-form-item label="导入文件">-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-row>-->
      <el-row>
        <el-col>
          <el-form-item v-if="!edit" label="上传文件" prop="filePath">
            <el-input v-show="false" v-model="form.filePath" />
            <el-upload
              ref="upload"
              :action="'#'"
              :multiple="false"
              :limit="1"
              accept=".pdf,.docx,.doc,.xls,.xlsx,.csv"
              :http-request="uploadHttpRequest"
              class="upload-demo"
            >
              <el-button slot="trigger" size="small" type="primary">上传文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="描述" prop="busDesc">
            <el-input v-model="form.busDesc" type="textarea" :rows="2" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="submitAdd()">确 定</el-button>
    </div>
    <el-dialog
      append-to-body
      v-if="showTreeWin"
      :visible.sync="showTreeWin"
      title="部门"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="35%"
    >
      <DialogDeptTree @selectDetp="selectDetp" />
    </el-dialog>
  </div>
</template>

<script>
import DialogDeptTree from './dialogDeptTree.vue';

import { uploadDlDocument, getOne, addOrUpdate } from '@/api/coverge/file-manage.js';

export default {
  name: 'add',
  components: { DialogDeptTree },
  props: {
    detail: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: this.initForm(),
      edit: false,
      rules: {
        fileResourceName: [
          { required: true, message: '请输入', trigger: 'blur' },
          { max: 50, message: '限长50个字符', trigger: 'blur' }
        ],
        fileSource: [
          { required: true, message: '请输入', trigger: 'blur' },
          { max: 50, message: '限长50个字符', trigger: 'blur' }
        ],
        filePath: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      showTreeWin: false
    };
  },
  mounted() {
    this.getInfoById();
  },
  methods: {
    selectDetp(deptId, deptName) {
      this.showTreeWin = false;

      this.form.fileSource = deptId;
      this.form.fileSourceName = deptName;
    },
    initForm() {
      return {
        fileName: '',
        fileSource: '',
        busDesc: '',
        filePath: ''
      };
    },
    close() {
      this.$emit('close');
      this.$refs.formRef.resetFields();
    },
    getInfoById() {
      if (this.detail.id !== '') {
        getOne(this.detail.id).then((response) => {
          this.form = response.data;
          this.edit = true;
        });
      } else {
        this.form = this.initForm();
      }
    },
    uploadHttpRequest(param) {
      const formData = new FormData(); // FormData对象，添加参数只能通过append('key', value)的形式添加
      formData.append('uploadFile', param.file); // 添加文件对象
      uploadDlDocument(formData)
        .then((res) => {
          if (res && res.status === 'success') {
            this.$notify.success(res);
            this.form.filePath = res.data.filePath;
            this.form.fileName = res.data.fileName;
            this.form.fileType = res.data.fileType;
          } else {
            this.$notify.warning('上传失败');
          }
        })
        .catch((err) => {
          console.log('失败', err);
          param.onError(); // 上传失败的文件会从文件列表中删除
        });
    },
    submitAdd() {
      this.listLoading = true;
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          addOrUpdate(this.form).then((response) => {
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
