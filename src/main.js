import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free-webfonts/less/fontawesome.less'
import '@fortawesome/fontawesome-free-webfonts/less/fa-solid.less'
import '@fortawesome/fontawesome-free-webfonts/less/fa-brands.less'

import store from './store'

import JsonEditor from './components/json-editor'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.use(JsonEditor)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
