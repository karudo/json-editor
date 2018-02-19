<template>
  <div>
    <slot name="name"></slot>
    <json-editor-props-menu
      :schema="schema"
    ></json-editor-props-menu>
    <editable-span v-model="cValue"/>
  </div>
</template>

<script>
import EditorMixin from './editor-mixin'
export default {
  mixins: [EditorMixin]
}
</script>
