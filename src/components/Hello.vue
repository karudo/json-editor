<template>
  <div>
    <pre>{{schema}}</pre>
    <pre>{{value}}</pre>
    <json-editor :schema="schema" :value="value"/>
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
