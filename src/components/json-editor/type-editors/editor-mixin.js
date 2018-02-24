import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
import {getEmptySchema, convertValue} from '../schema'
import {typeSymbol, rootSymbol} from '../symbols'
export default {
  props: {
    path: Array,
    value: null,
    schema: null
  },
  inject: {
    jsonEditor: {
      from: rootSymbol
    }
  },
  provide () {
    return {
      [typeSymbol]: {
        changeType: (t) => {
          this.changeType(t)
        }
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
    changeType (newType) {
      if (this.schema.type !== newType) {
        Object.assign(this.schema, getEmptySchema(newType, this.path))
        this.jsonEditor.setValue(this.path, convertValue(newType, this.value))
      }
    }
  },
  components: {JsonEditorPropsMenu, EditableSpan}
}
