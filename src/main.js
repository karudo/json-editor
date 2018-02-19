// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'

import JsonEditor from './components/json-editor'

/*
const $emit = Vue.prototype.$emit

let x = 1000
Vue.prototype.$emit = function (...args) {
  console.log(x++, args, this)
  $emit.apply(this, args)
}
*/

Vue.config.productionTip = false

Vue.use(ElementUI, {
  locale,
  size: 'small'
})

Vue.use(JsonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
