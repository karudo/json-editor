<template>
  <json-editor :schemaId="schemaId" v-model="value"/>
</template>

<script>
import {getEditorSchema, generateVuexID} from './schema'
import {vuexModuleName} from './constants'
export default {
  props: ['value'],
  data: () => ({
    schemaId: generateVuexID()
  }),
  created () {
    const schema = getEditorSchema(this.value)
    this.$store.commit(`${vuexModuleName}/addEditor`, {
      id: this.schemaId,
      schema
    })
  }
}
</script>
