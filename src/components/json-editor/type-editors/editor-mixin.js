import {jsonEditorSymbol} from '../constants'
import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
const typesNames = ['number', 'string', 'array', 'object', 'boolean', 'null']
export default {
  props: {
    path: Array,
    schemaPath: Array,
    schema: null,

    parentMenuItems: {
      type: Array,
      default: () => []
    }
  },
  inject: {
    jsonEditor: {
      from: jsonEditorSymbol
    }
  },
  computed: {
    value: {
      get () {
        return this.jsonEditor.getValue(this.path)
      },
      set (v) {
        this.jsonEditor.setValue(this.path, v)
      }
    },
    menuItems () {
      const {type} = this.schema
      return typesNames.map(tn => ({
        cb: () => this.changeType(tn),
        title: tn,
        selected: tn === type
      })).concat(this.parentMenuItems)
    }
  },
  methods: {
    changeType (newType) {
      if (this.schema.type !== newType) {
        this.schema.changeType(newType)
      }
    }
  },
  components: {JsonEditorPropsMenu, EditableSpan}
}
