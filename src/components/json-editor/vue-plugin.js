import JsonEditorArray from './type-editors/array'
import JsonEditorBoolean from './type-editors/boolean'
import JsonEditorNull from './type-editors/null'
import JsonEditorNumber from './type-editors/number'
import JsonEditorObject from './type-editors/object'
import JsonEditorString from './type-editors/string'

import JsonEditor from './json-editor'
import JsonEditorAutodetect from './json-editor-autodetect'

const components = {
  JsonEditorArray,
  JsonEditorBoolean,
  JsonEditorNull,
  JsonEditorNumber,
  JsonEditorObject,
  JsonEditorString,
  JsonEditor,
  JsonEditorAutodetect
}

export default {
  install (Vue, config) {
    Object.keys(components).forEach(compName => {
      Vue.component(compName, components[compName])
    })
  }
}
