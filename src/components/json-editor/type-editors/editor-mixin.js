import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
import {getEmptySchema, convertValue} from '../schema'
import {symbolTypeEditor, symbolRoot} from '../symbols'
export default {
  props: {
    path: Array,
    value: null,
    schema: null
  },
  inject: {
    jsonEditor: {
      from: symbolRoot
    }
  },
  provide () {
    return {
      [symbolTypeEditor]: {
        changeType: this.changeType
      }
    }
  },
  computed: {
    cValue: {
      get () {
        return this.value
      },
      set (v) {
        this.jsonEditor.setValue(this.path, v)
      }
    }
  },
  methods: {
    getEmptySchema (newType) {
      return getEmptySchema(newType)
    },
    changeType (newType) {
      if (this.schema.type !== newType) {
        Object.assign(this.schema, this.getEmptySchema(newType))
        this.jsonEditor.setValue(this.path, convertValue(newType, this.value))
      }
    }
  },
  components: {JsonEditorPropsMenu, EditableSpan}
}
