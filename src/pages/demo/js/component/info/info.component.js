import { ThemeMixin } from '@tdp/theme';
import { createQFormRules, illegalChar } from '@tdp/util';
import { Demo } from '../../model';
import { DemoService } from '../../service';

/**
 * Demo 详细信息
 */
export default {
  name: 'app-demo-info',
  mixins: [ThemeMixin],
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    const demo = new Demo();
    const original = new Demo();

    const field2Validator = (value) => {
      if (value) {
        const illegal = illegalChar(value);
        if (illegal) {
          return illegal.message;
        }
      }
      return true;
    };

    const rules = createQFormRules({
      demoName: [{ required: true, min: 2, max: 10 }],
      field1: [{ required: true, message: '请输入 Field1' }],
      field2: [{ required: true, message: '请输入 Field2' }, { validator: field2Validator }],
      field3: [{ validator: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v), message: '时间不合法 hh:mm:ss' }]
    });

    return {
      /** Demo Model */
      demo,
      /** 缓存初始数据, 用于表单 reset 操作 */
      original,
      rules,
      saving: false,
      loading: false
    };
  },
  computed: {
    formRef() {
      return this.$refs.formRef;
    }
  },
  created() {
    this.id && this.getInfo();
  },
  methods: {
    async getInfo() {
      this.loading = true;

      const data = await DemoService.info(this.id);
      this.demo = data;
      this.original = Object.assign(this.original, data);

      this.loading = false;
    },

    async onSave() {
      const vaild = await this.formRef.validate();
      if (!vaild) {
        return;
      }
      this.saving = true;
      const result = await DemoService.save(this.demo);
      if (result && result.status === 'success') {
        this.$q.notify({ type: 'positive', position: 'top', message: result.message });
        this.onBack();
      }
      this.saving = false;
    },

    onBack() {
      this.$emit('goto', 'list');
    },

    onReset() {
      this.demo = Object.assign({}, this.original);
    }
  }
};
