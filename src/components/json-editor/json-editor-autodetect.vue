<template>
  <json-editor :schemaId="schemaId" v-model="val"/>
</template>

<script>
import {getEditorSchema, generateVuexID} from './schema'
import {vuexModuleName} from './constants'
export default {
  props: ['value'],
  data: () => ({
    schemaId: generateVuexID()
  }),
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  created () {
    const schema = getEditorSchema(this.value)
    this.$store.commit(`${vuexModuleName}/addEditor`, {
      id: this.schemaId,
      schema
    })
  }
}
</script>
