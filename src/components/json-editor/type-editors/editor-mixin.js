import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
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
  computed: {
    cValue: {
      get () {
        return this.value
      },
      set (v) {
        this.schema.typeObject.setValue(v)
      }
    },
    menuItems () {
      const type = this.schema.typeName
      return defaultTypes.map(tn => ({
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
