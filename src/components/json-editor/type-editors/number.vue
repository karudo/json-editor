<template>
  <div>
    <slot name="name"></slot>
    <json-editor-props-menu
      :schema="schema"
    ></json-editor-props-menu>
    <editable-span v-model="sValue" class="number"/>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin],
  computed: {
    sValue: {
      get () {
        return `${this.cValue}`
      },
      set (v) {
        v = parseFloat(v)
        this.cValue = isNaN(v) ? 0 : v
      }
    }
  }
}
</script>

<style scoped>
.number {
  color: blue;
}
</style>
