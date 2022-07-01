<template>
  <q-page :class="`app-demo flex q-pa-${pagePadding}`">
    <app-demo-list ref="listRef" v-show="shown === 'list'" @goto="onGoto" />
    <app-demo-info v-if="shown === 'info'" :id="selectedId" @goto="onGoto" />
  </q-page>
</template>

<script>
import { ThemeMixin } from '@tdp/theme';
import AppDemoList from './list.component.vue';
import AppDemoInfo from './info.component.vue';

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
</script>
