import Vue from 'vue'
import Vuex from 'vuex'

import jsonEditorPlugin from '@/components/json-editor/vuex-plugin'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  plugins: [jsonEditorPlugin]
})

export default store
