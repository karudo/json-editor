<template>
  <div>
    <component :is="`json-editor-${schema.type}`"
               :path="[]"
               :schema-path="[]"
               :schema="schema"
               :value="value"
    />
  </div>
</template>

<script>
import {symbolRoot} from './symbols'
import {getValueByPath, getSchemaByPath, getValuePathPySchemaPath} from './utils'
import {convertValue} from './schema'
export default {
  props: ['schema', 'value'],
  provide () {
    return {
      [symbolRoot]: {
        setValue: this.setValue,
        changeType: this.changeType,
        changeKey: this.changeKey,
        insert: this.insert,
        remove: this.remove
      }
    }
  },
  methods: {
    getValueBySchemaPath (schemaPath) {
      const valuePath = getValuePathPySchemaPath(this.schema, schemaPath)
      return getValueByPath(this.value, valuePath)
    },
    setValue (path, newValue) {
      if (path.length) {
        const [...objPath] = path
        const key = objPath.pop()
        const obj = getValueByPath(this.value, objPath)
        this.$set(obj, key, newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
    changeType (schemaPath, newType) {
      const schema = getSchemaByPath(this.schema, schemaPath)
      schema.changeType(newType)

      const valuePath = getValuePathPySchemaPath(this.schema, schemaPath)
      const value = getValueByPath(this.value, valuePath)
      this.setValue(valuePath, convertValue(newType, value))
    },
    changeKey (schemaPath, idx, newKey) {
      const schema = getSchemaByPath(this.schema, schemaPath)
      const oldKey = schema.schema.props[idx].key
      schema.callMethod('changeKey', idx, newKey)

      const obj = this.getValueBySchemaPath(schemaPath)
      this.$set(obj, newKey, obj[oldKey])
      this.$delete(obj, oldKey)
    },
    insert (schemaPath, idx) {
      const schema = getSchemaByPath(this.schema, schemaPath)
      schema.callMethod('insert', idx)

      const arr = this.getValueBySchemaPath(schemaPath)
      arr.splice(idx, 0, '')
    },
    remove (schemaPath, idx) {
      const schema = getSchemaByPath(this.schema, schemaPath)
      schema.callMethod('remove', idx)

      const arr = this.getValueBySchemaPath(schemaPath)
      arr.splice(idx, 1)
    }
  }
}
</script>

<style scoped>

</style>
