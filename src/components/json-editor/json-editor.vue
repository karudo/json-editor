<template>
  <div>
    <component :is="`json-editor-${schema.type}`"
               :schema="schema"
               :value="value"
    />
  </div>
</template>

<script>
import {rootSymbol} from './symbols'
import _ from 'lodash'
export default {
  props: ['schema', 'value'],
  provide () {
    return {
      [rootSymbol]: {
        setValue: (path, newValue) => {
          const pl = path.length - 1
          let val = this.value
          for (let i = 0; i < pl; i++) {
            val = val[path[i]]
          }
          this.$set(val, path[path.length - 1], newValue)
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
