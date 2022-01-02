import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin,VBTooltipPlugin,CardPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VBTooltipPlugin)
Vue.use(CardPlugin)