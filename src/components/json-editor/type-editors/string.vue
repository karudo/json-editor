<template>
  <div>
    <slot name="name"></slot>
    <json-editor-props-menu
      :schema="schema"
    ></json-editor-props-menu>
    <span class="value">"<editable-span v-model="cValue"/>"</span>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin]
}
</script>

<style scoped>
.value {
  color: green;
}
</style>
