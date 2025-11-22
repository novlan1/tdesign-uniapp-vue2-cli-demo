import Vue from 'vue';
import App from './App';
import DemoBaseMixin from './mixins/demo-base';
import './uni.promisify.adaptor';
import './style/app.less';


Vue.config.productionTip = false;
Vue.mixin(DemoBaseMixin);

App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();
