<template>
  <div>
    <component :is="`json-editor-${schema.type}`"
               :path="[]"
               :schema-path="[]"
    />
  </div>
</template>

<script>
import {getValueByPath} from './schema'
import {jsonEditorSymbol, vuexModuleName} from './constants'
export default {
  props: ['schemaId', 'value'],
  provide () {
    return {
      [jsonEditorSymbol]: {
        schemaId: this.schemaId,
        getValue: this.getValue,
        setValue: this.setValue,
        objectRemoveProp: this.objectRemoveProp,
        arrayRemoveElement: this.arrayRemoveElement
      }
    }
  },
  computed: {
    schema () {
      return this.$store.getters[`${vuexModuleName}/getEditorById`](this.schemaId)
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
        const obj = this.getValue(objPath)
        this.$set(obj, key, newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
    objectRemoveProp (path) {
      if (path.length) {
        const objPath = [...path]
        const key = objPath.pop()
        const obj = getValueByPath(this.value, objPath)
        this.$delete(obj, key)
      }
    },
    arrayRemoveElement (path, idx) {
      const arr = this.getValue(path)
      arr.splice(idx, 1)
    }
  }
}
</script>

<style scoped>

</style>
