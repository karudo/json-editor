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
import {rootSymbol} from './symbols'
function getByPath (obj, path) {
  for (let i = 0; i < path.length; i++) {
    obj = obj[path[i]]
  }
  return obj
}
export default {
  props: ['schema', 'value'],
  provide () {
    return {
      [rootSymbol]: {
        setValue: (path, newValue) => {
          const [...objPath] = path
          const key = objPath.pop()
          const obj = getByPath(this.value, objPath)
          this.$set(obj, key, newValue)
        },
        changeKey: (path, key, newKey) => {
          const obj = getByPath(this.value, path)
          this.$set(obj, newKey, obj[key])
          this.$delete(obj, key)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
