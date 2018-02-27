import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
import {getSchemaForType, convertValue} from '../schema'
import {symbolTypeEditor, symbolRoot} from '../symbols'
export default {
  props: {
    path: Array,
    value: null,
    schema: null,
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
      return ['number', 'string', 'array', 'object', 'boolean', 'null'].map(tn => {
        return {
          cb: () => this.changeType(tn),
          title: tn,
          selected: tn === this.schema.type
        }
      }).concat(this.parentMenuItems)
    }
  },
  methods: {
    getEmptySchema (newType) {
      return getSchemaForType(newType)
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
