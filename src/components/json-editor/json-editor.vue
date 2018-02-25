<template>
  <div>
    <component :is="`json-editor-${schema.type}`"
               :path="[]"
               :schema="schema"
               :value="value"
    />
  </div>
</template>

<script>
import {symbolRoot} from './symbols'
import {getByPath} from './utils'
export default {
  props: ['schema', 'value'],
  provide () {
    return {
      [symbolRoot]: {
        setValue: this.setValue,
        changeKey: this.changeKey,
        addItem: this.addItem
      }
    }
  },
  methods: {
    setValue (path, newValue) {
      if (path.length) {
        const [...objPath] = path
        const key = objPath.pop()
        const obj = getByPath(this.value, objPath)
        this.$set(obj, key, newValue)
      } else {
        this.$emit('input', newValue)
      }
    },
    changeKey (path, key, newKey) {
      const obj = getByPath(this.value, path)
      this.$set(obj, newKey, obj[key])
      this.$delete(obj, key)
    },
    addItem (path, item) {
      const arr = getByPath(this.value, path)
      arr.push(item)
    }
  }
}
</script>

<style scoped>

</style>
