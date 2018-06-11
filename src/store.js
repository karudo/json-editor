import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  modules: {
    jsonEditor: {
      namespaced: true,
      state: {
        editors: {}
      },
      getters: {
        getEditorById: state => id => state.editors[id]
      },
      mutations: {
        addEditor (state, {id, schema}) {
          state.editors[id] = schema
        },
        arrayAddElement (state, {id, path, idx, type}) {

        },
        arrayRemoveElement (state, {id, path, idx}) {

        },
        objectAddProp (state, {id, path, key, type}) {

        },
        objectRemoveProp (state, {id, path, key}) {

        }
      }
    }
  }
})

export default store
