import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
import {symbolTypeEditor, symbolRoot} from '../symbols'
const defaultTypes = ['number', 'string', 'array', 'object', 'boolean', 'null']
export default {
  props: {
    path: Array,
    value: null,
    schema: null,
    schemaPath: Array,

    parentMenuItems: {
      type: Array,
      default: () => []
    }
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
    },
    menuItems () {
      const type = this.schema.type
      return defaultTypes.map(tn => {
        return {
          cb: () => this.changeType(tn),
          title: tn,
          selected: tn === type
        }
      }).concat(this.parentMenuItems)
    }
  },
  methods: {
    changeType (newType) {
      if (this.schema.type !== newType) {
        this.jsonEditor.changeType(this.schemaPath, newType)
      }
    }
  },
  components: {JsonEditorPropsMenu, EditableSpan}
}
