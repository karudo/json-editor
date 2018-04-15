<template>
  <div>
    <component :is="`json-editor-${schema.typeName}`"
               :path="[]"
               :schema-path="[]"
               :schema="schema"
               :value="value"
    />
  </div>
</template>

<script>
import {getValueByPath, getValuePathPySchemaPath} from './utils'
export default {
  props: ['schema', 'value'],
  created () {
    this.schema.setCtx({
      getPath: () => [],
      getValue: this.getValue,
      setValue: this.setValue,
      deleteValue: this.deleteValue
    })
  },
  methods: {
    getValue (schemaPath) {
      const path = getValuePathPySchemaPath(this.schema, schemaPath)
      return getValueByPath(this.value, path)
    },
    setValue (schemaPath, newValue) {
      const path = getValuePathPySchemaPath(this.schema, schemaPath)
      if (path.length) {
        const objPath = [...path]
        const key = objPath.pop()
        const obj = getValueByPath(this.value, objPath)
        this.$set(obj, key, newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
    deleteValue (schemaPath) {
      const path = getValuePathPySchemaPath(this.schema, schemaPath)
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
