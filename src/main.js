import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import { FormInputPlugin } from 'bootstrap-vue'

import VueLazyLoad from 'vue-lazyload'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(FormInputPlugin)
Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
}).$mount('#app')

