import {vuexModuleName} from './constants'
import {getSchemaByPath} from './schema'

const plugin = {
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
      const schema = getSchemaByPath(state.editors[id], path)
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
