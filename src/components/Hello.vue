<template>
  <div class="qwe">
    <div class="row">
      <div><pre>{{value}}</pre></div>
      <div><pre>{{schema}}</pre></div>
    </div>
    <div class="row">
      <json-editor :schema="schema" v-model="value"/>
    </div>
  </div>
</template>

<script>
import {getEditorSchema} from '@/components/json-editor/schema'
export default {
  data () {
    const value = {
      abgytfjyg: 9,
      'swe"lkwh_9': {
        x: 'yes!'
      },
      a1: [{ex5: false}, [null]]
    }
    return {
      value,
      schema: getEditorSchema(value)
    }
  }
}
</script>

<style scoped lang="less">
.qwe {
  display: flex;
  .row {
    width: 50%;
  }
}
</style>
