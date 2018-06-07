import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    jsonEditor: {
      namespaced: true,
      state: {

      },
      mutations: {
        addEditor (state, {id, schema}) {

        },
        addElementToArray (state, {id, idx, element}) {

        },
        addPropToObject (state, {id, key, prop}) {

        }
      }
    }
  }
})

export default store
