<template>
  <div class="qwe">
    <div class="row">
      <div><pre>{{value}}</pre></div>
      <div><pre>{{schemaId}}</pre></div>
    </div>
    <div class="row">
      <!--json-editor :schema="schema" v-model="value"/-->
    </div>
  </div>
</template>

<script>
import {getEditorSchema, generateVuexID} from '@/components/json-editor/schema2'
export default {
  data () {
    const value = {
      abgytfjyg: 9,
      'swelkwh_9': {
        xsss: 'yes!'
      },
      a1: [{ex5: false}, [null, false, 9]]
    }
    return {
      value,
      schemaId: generateVuexID()
    }
  },
  created () {
    const schema = getEditorSchema(this.value)
    this.$store.commit('jsonEditor/addEditor', {
      id: this.schemaId,
      schema
    })
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
