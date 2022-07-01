import { ThemeMixin } from '@tdp/theme';
import AppDemoList from './list/list.component.vue';
import AppDemoInfo from './info/info.component.vue';

/**
 * Demo
 */
export default {
  name: 'app-demo',
  mixins: [ThemeMixin],
  components: { AppDemoList, AppDemoInfo },

  data() {
    return {
      selectedId: '',
      shown: 'list'
    };
  },

  methods: {
    onGoto(type, id = '') {
      this.selectedId = id;
      this.shown = type;

      if (this.shown === 'list') {
        this.$refs.listRef.getList();
      }
    }
  }
};
