import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import { firestorePlugin } from 'vuefire'
import VuePaginate from 'vue-paginate'


export const eventBus=new Vue()

Vue.use(BootstrapVue)
Vue.use (BootstrapVueIcons)
Vue.use(firestorePlugin)
Vue.use(VuePaginate)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

document.title = 'Cellphone Online Store';