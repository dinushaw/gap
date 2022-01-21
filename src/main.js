import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import { FormInputPlugin } from 'bootstrap-vue'

import VueEasyLightbox from 'vue-easy-lightbox'
import truncate from 'vue-truncate-collapsed';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueEasyLightbox)
Vue.use(FormInputPlugin)

// Vue.use(truncate)

new Vue({
  components: {
    truncate
  },
  render: h => h(App),
}).$mount('#app')

