import Vue, { PluginObject } from 'vue';
import 'quasar/dist/quasar.ie.polyfills';
import lang from 'quasar/lang/zh-hans.js';
import Quasar, { Notify, Dialog, Loading, AppFullscreen, LoadingBar, Meta } from 'quasar';
import QIconPicker from '@quasar/quasar-ui-qiconpicker';

Vue.use(Quasar, {
  config: {},
  plugins: {
    Notify,
    Dialog,
    Loading,
    LoadingBar,
    Meta,
    AppFullscreen
  },
  lang: lang
});

// quasar-ui-qiconpicker v1 版本的类型声名写的有问题, 在此做下类型断言
Vue.use(QIconPicker as unknown as PluginObject<undefined>);
