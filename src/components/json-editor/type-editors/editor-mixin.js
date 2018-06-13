import {jsonEditorSymbol, vuexModuleName} from '../constants'
import {typesCheckers, typesNames} from '../schema'
import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
export default {
  props: {
    path: Array,
    schemaPath: Array,

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
    schema () {
      return this.$store.getters[`${vuexModuleName}/getSchema`](this.jsonEditor.schemaId, this.schemaPath)
    },
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
        this.$store.commit(`${vuexModuleName}/changeType`, {
          id: this.jsonEditor.schemaId,
          path: this.schemaPath,
          type: newType
        })
        this.value = typesCheckers[newType].defValue(this.value)
      }
    }
  },
  components: {JsonEditorPropsMenu, EditableSpan}
}
