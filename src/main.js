import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/index.css'
import JsonEditor from './components/json-editor'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(ElementUI, {
  locale,
  size: 'small'
})

Vue.use(JsonEditor)

new Vue({
  render: h => h(App)
}).$mount('#app')
