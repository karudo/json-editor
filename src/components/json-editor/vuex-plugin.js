import Vue from 'vue'
import {vuexModuleName} from './constants'
import {getSchemaByPath, createSchemaItem, createObjectProp} from './schema'

const module = {
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
    changeType (state, {id, path, type}) {
      const newSchema = createSchemaItem(type)
      if (path.length) {
        const sPath = [...path]
        const idx = sPath.pop()
        const schema = getSchemaByPath(state[id], sPath)
        if (schema.type === 'array') {
          Vue.set(schema.items, idx, newSchema)
        }
        if (schema.type === 'object') {
          Vue.set(schema.properties[idx], 'prop', newSchema)
        }
      } else {
        Vue.set(state, id, newSchema)
      }
    },
    arrayAddElement (state, {id, path, idx, type}) {
      const schema = getSchemaByPath(state[id], path)
      schema.items.splice(idx, 0, createSchemaItem(type))
    },
    arrayRemoveElement (state, {id, path, idx}) {
      const schema = getSchemaByPath(state[id], path)
      schema.items.splice(idx, 1)
    },
    objectAddProp (state, {id, path, name, type}) {
      const schema = getSchemaByPath(state[id], path)
      schema.properties.push(createObjectProp(name, createSchemaItem(type)))
    },
    objectChangeKey (state, {id, path, idx, newName}) {
      const schema = getSchemaByPath(state[id], path)
      Vue.set(schema.properties[idx], 'key', newName)
    },
    objectRemoveProp (state, {id, path, idx}) {
      const schema = getSchemaByPath(state[id], path)
      schema.properties.splice(idx, 1)
    }
  }
}

export default function (store) {
  store.registerModule(vuexModuleName, module)
}
