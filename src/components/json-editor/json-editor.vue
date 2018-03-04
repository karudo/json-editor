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
    changeKey (path, key, newKey) {
      const obj = getValueByPath(this.value, path)
      this.$set(obj, newKey, obj[key])
      this.$delete(obj, key)
    },
    insert (schemaPath, idx) {
      const schema = getSchemaByPath(this.schema, schemaPath)
      schema.callMethod('insert', idx)

      const valuePath = getValuePathPySchemaPath(this.schema, schemaPath)
      const arr = getValueByPath(this.value, valuePath)
      arr.splice(idx, 0, '')
    },
    remove (schemaPath, idx) {
      const schema = getSchemaByPath(this.schema, schemaPath)
      schema.callMethod('remove', idx)

      const valuePath = getValuePathPySchemaPath(this.schema, schemaPath)
      const arr = getValueByPath(this.value, valuePath)
      arr.splice(idx, 1)
    }
  }
}
</script>

<style scoped>

</style>
