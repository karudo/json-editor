<template>
  <div>
    <component :is="`json-editor-${schema.typeName}`"
               :path="[]"
               :schema-path="[]"
               :schema="schema"
    />
  </div>
</template>

<script>
import {getValueByPath} from './schema2'
import {jsonEditorSymbol} from './symbols'
export default {
  props: ['schemaId', 'value'],
  created () {
    this.schema.setCtx({
      getPath: () => [],
      getValue: this.getValue,
      setValue: this.setValue,
      deleteValue: this.deleteValue
    })
  },
  provide () {
    return {
      [jsonEditorSymbol]: {
        schemaId: this.schemaId,
        getValue: this.getValue,
        setValue: this.setValue,
        deleteValue: this.deleteValue
      }
    }
  },
  computed: {
    schema () {
      return this.$store.jsonEditor.getters.getEditorById(this.schemaId)
    }
  },
  methods: {
    getValue (path) {
      return getValueByPath(this.value, path)
    },
    setValue (path, newValue) {
      if (path.length) {
        const objPath = [...path]
        const key = objPath.pop()
        const obj = getValueByPath(this.value, objPath)
        this.$set(obj, key, newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
    deleteValue (path) {
      if (path.length) {
        const objPath = [...path]
        const key = objPath.pop()
        const obj = getValueByPath(this.value, objPath)
        this.$delete(obj, key)
      }
    }
  }
}
</script>

<style scoped>

</style>
