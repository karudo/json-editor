<template>
  <div>
    <slot name="name"></slot>
    <json-editor-props-menu
      :schema="schema"
    ></json-editor-props-menu>
    <input type="checkbox" v-model="cValue">
    {{strVal}}
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin],
  computed: {
    strVal () {
      return `${this.value}`
    }
  }
}
</script>
