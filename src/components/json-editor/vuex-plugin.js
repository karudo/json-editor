import Vue from 'vue'
import {vuexModuleName} from './constants'
import {getSchemaByPath} from './schema'

const plugin = {
  namespaced: true,
  state: {},
  getters: {
    getEditorById: state => id => state[id],
    getSchema: state => (id, path) => getSchemaByPath(state[id], path)
  },
  mutations: {
    addEditor (state, {id, schema}) {
      Vue.set(state, id, schema)
    },
    arrayAddElement (state, {id, path, idx, type}) {

    },
    arrayRemoveElement (state, {id, path, idx}) {
      const schema = getSchemaByPath(state[id], path)
      schema.items.splice(idx, 1)
    },
    objectAddProp (state, {id, path, key, type}) {

    },
    objectRemoveProp (state, {id, path, key}) {

    }
  }
}

export default function (store) {
  store.registerModule(vuexModuleName, plugin)
}
