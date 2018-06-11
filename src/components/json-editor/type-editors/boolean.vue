<template>
  <div>
    <slot name="name"></slot>
    <json-editor-props-menu :menu-items="menuItems"/>
    <input type="checkbox" v-model="value">
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
