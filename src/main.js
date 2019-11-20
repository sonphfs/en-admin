import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Paginate from 'vuejs-paginate'
import SortedTablePlugin from "vue-sorted-table";
 
Vue.component('paginate', Paginate)
Vue.use(SortedTablePlugin);
Vue.use(VueSweetalert2);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
