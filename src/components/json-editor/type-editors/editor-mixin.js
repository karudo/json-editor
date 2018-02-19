import JsonEditorPropsMenu from '../json-editor-props-menu'
import EditableSpan from '../editable-span'
export default {
  props: {
    value: null,
    schema: null
  },
  computed: {
    cValue: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  components: {JsonEditorPropsMenu, EditableSpan}
}
